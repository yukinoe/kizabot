/**
 * http://usejsdoc.org/
 */

var request 				= require('request');
var html_parser2 			= require("htmlparser2"); 
var entities 				= require('ent');
var ci 				= require('case-insensitive');

//global var

var self = module.exports = {

		ssb_liste_ultime_array  : {
				1970:'https://www.supercinebattle.fr/la-liste-ultime-des-films-des-annees-70/',
				1980:'https://www.supercinebattle.fr/la-liste-ultime-des-films-des-annees-80/',
				1990:'https://www.supercinebattle.fr/la-liste-ultime-des-films-des-annees-90/',
				2000:'https://www.supercinebattle.fr/la-liste-ultime-des-films-des-annees-2000/'
			}
		,
		//callback definition
		ssb_list_extractor : function (body, json, year, callback) {			
				var inside_table	= false;
				var inside_line		= false;
				var column_rank		= 0; 		//indice de colonne dans le tableau des meilleurs films de la décennie
				var object_temp		= {};				
				var film_list		= [];
				
				var parser = new html_parser2.Parser(
						{
						    onopentag: function(name, attribs){
						        if(name === "tbody"){
						            //console.log("SSB List Extraction! Start! Hooray!");
						            inside_table=true;
						        }
						        if(name === "tr"){
						            inside_line=true;          
						        } // fin if 
						        if(name === "td"){
						        	//reset car on est arrivé à la fin d'une ligne du tableau des meilleurs films
						            column_rank++;						            	
						        }
						    } // fin onopentag
							,
							ontext: function(text){
								if (inside_table && inside_line && text.trim().length>0){
									
									switch(column_rank) {
								    case 1:	//si la balise correspond au rang du film
								    	object_temp.rank=text;
								    	
								        break;
								    case 2:	//si la balise correspond au titre du film
								    	object_temp.titre= entities.decode(text);
								        break;
								    case 3:	//si la balise correspond à l'épisode du film
								    	object_temp.episode=text;
								    break;
								    default:
								        console.log("[FilmList] Impossible d'enregistrer une valeur issue du tableau des meilleurs films!");
									}	 																									
								} 							
							}						
							,
							onclosetag: function(name, attribs){
								if(name === "tbody"){
									//console.log("SSB List Extraction! End!");
									inside_table=false;
								}
								if(name === "tr"){
									//adding movie to the list 
									if (column_rank>0) { //in order to not push a empty movie, case of </tr>
										film_list.push(object_temp);
									}
					            	//resetting
									inside_line=false;									            	
					            	object_temp={};
					            	column_rank=0;	
								}
							}
						}, 
						{decodeEntities: false}
						);
				
				parser.parseComplete(body);
				parser.end();
				
				//affichage
				if (film_list===null || film_list===undefined) 
				{
					console.log("ssb_list_extractor: movie list is empty!");
				}
				else {callback(film_list,json,year);}
					
		}
,
//error, channel, channel_progam_json
		ssb_list_processer : function (error, year, ssb_list_link, channel_progam_json, callback,callback2){
			
			if (error instanceof Error){
				console.log('ssb_list_processer: '+error);
				return; 
			}
			
			 request(
					ssb_list_link,
					function(err, response, body){
						if (err instanceof Error){
							console.log('ssb_list_processer/request: '+err+ ' url '+ssb_list_link);
						}
						else {
							/*calling the callback (html parsing function) with the following parameters:
							 * - body 		: html body the SSB list (for a specific decade)
							 * - callback2 	: the comparison function
							 * */
							callback(body,channel_progam_json, year,callback2);
							
						}
					}
				);
			
		}
,
		//call: extraction des de la liste des films des années 
		getAllSSBList : function (json,callback){
			
			for(var i=0; i<Object.keys(self.ssb_liste_ultime_array).length;i++){
								
				self.ssb_list_processer (
					null,
					1970+(i*10),
					self.ssb_liste_ultime_array[1970+(i*10)],
					json,
					self.ssb_list_extractor,
					callback //look_for_film
				);//fin request
			}
		}
,
/*function "compare_ssb"
 * called by : main
 * 				playtv_module.getTvProgram
 * 					compare_ssb 
 * called with the following : 
 * (error, channel, channel_progam_json, cb) => null, tv_channel,  body, log 
 * */
compare_ssb : function(error, channel, channel_progam_json, callback, final_callback){
	console.log("Finding match between www.supercinebattle.fr with "+channel.name+" ...");

	var json_object = JSON.parse(JSON.stringify(channel_progam_json));
	
	/*sub-function "look_for_film"
	 * called by : ssb_module.getAllSSBList
	 * 				 ->ssb_module.ssb_list_processer
	 * 					 ->ssb_list_extractor
	 * called with the following : arguments film_list,json,year 
	 * */
	var look_for_film = function(list_film, json, year){
		
		list_film.forEach(function(elt, i) {
			
			Object.keys(json_object).forEach(function(k) { 
				//program starting datetime 
				var displayed_date = new Date(json_object[k].start*1000).toLocaleString('UTC', {
				    timeZone: 'Europe/Paris'
				  });

				var d = new Date(json_object[k].start*1000);
				
				if (process.env.COMPUTERNAME!=="ULTRAMAN"){
					d.setHours(d.getHours()+1); //TODO !!!!!!GMT+2 patch. A fixer au plus vite!!!
				}
				if (elt.titre==="L'histoire sans fin" ){
					console.log(json_object[k].program.title+' '+elt.titre+' '+d);
				}
				
				if ( (ci(elt.titre).equals(json_object[k].program.title) || ci(elt.titre).equals(json_object[k].program.originaltitle) ) && ((json_object[k].program.year>=year) && (json_object[k].program.year<(year+10)) && (d.getHours()>=19))){
					console.log("\'"+json_object[k].program.originaltitle+"\' fully matched, program starting datetime "+d);
					//callback = log = function(movie_title,movie_rank, movie_year, tv_channel, tweet_action_cb)
					
					//removing all dots in the movie name for omdb api call
					var moviename_without_dots=json_object[k].program.originaltitle;
					moviename_without_dots=moviename_without_dots.split('.').join('');
					
					var omdb_api_key  = process.env.omdb_api;
					
					if (omdb_api_key === undefined){
						throw 'OMDB API KEY not found!';
					}
					
					//var url_imdb = encodeURI('http://www.omdbapi.com/?apikey=f176436d&t='+moviename_without_dots+'&y='+json_object[k].program.year+'&callback=http://kizabot-kizabot.7e14.starter-us-west-2.openshiftapps.com/');
					var url_imdb = encodeURI('http://www.omdbapi.com/?apikey='+omdb_api_key+'&t='+moviename_without_dots+'&y='+json_object[k].program.year);					
					console.log('url_imdb: '+url_imdb);
					request(
							{url: url_imdb,
								encoding : 'utf8',
								gzip : true,
								json : true
							},
							function (error, response, body) {
								if (error || response.statusCode !== 200 || typeof(body) === 'undefined' || !body){
									
									return (callback(null, json_object[k].program.title, elt.rank,list_film.length,year, d, channel, final_callback)); 
								} 
								else {
									
										//trying to find the poster without the year given by french television 
										url_imdb = encodeURI('http://www.omdbapi.com/?apikey='+omdb_api_key+'&t='+moviename_without_dots);										
										console.log('url_imdb: '+url_imdb);
										request(
												{url: url_imdb,
													encoding : 'utf8',
													gzip : true,
													json : true
												},
												function (error, response, body) {
													if (error || response.statusCode !== 200 || typeof(body) === 'undefined' || !body){
														
														return (callback(null, json_object[k].program.title, elt.rank,list_film.length,year, d, channel, final_callback)); 
													} 
													else {
														if ((body.Response )==='True') {				
																var poster_object = JSON.parse(JSON.stringify(body));									
																return callback(poster_object.Poster,json_object[k].program.title, elt.rank,list_film.length,year, d, channel, final_callback);
														}
														else {
															return (callback(null, json_object[k].program.title, elt.rank,list_film.length,year, d, channel, final_callback));
														}
													}
												}
										);										
									 
								}
							} //fin function
						); //fin request					
				}// fin if principal
			});
		}
		);
	};
	self.getAllSSBList(channel_progam_json, look_for_film);
}
};
