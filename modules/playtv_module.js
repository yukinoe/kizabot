/**
 * http://usejsdoc.org/
 */

var request	= require('request');
var json 	= require('json');


module.exports = {
channel_list	: [{id:'tf1', name:'tf1'},{id:'2',name:'France2'},{id:'3', name:'France3'},{id:'4', name:'France4'},
	{ id:'5', name: 'France5'},{ id:'m6', name: 'm6'},{id:'arte', name:'arte'},{id:'c8', name: 'c8'}, {id:'w9', name:'w9'}, 
	{id:'tmc', name:'tmc'}, {id:'12', name:'rtl9'}, {id:'14', name:'nt1'}, {id:'1144', name:'tf1-series-films'}, {id: '1123', name: 'cstar'}, {id: '15', name: 'nrj12'}, {id: '622', name: '6ter'}, {id: '1145', name: 'tfx'}  ]
,
/*
 * tv_channel		= 
 * msg_gen_callback = function "compare_ssb"
 * final_callback	= callback given as a parameter for compare_ssb/msg_gen_callback 
 * */
getTvProgram	: function(tv_channel, msg_gen_callback, final_callback){
	
	var today = new Date();
	
	var log=function(poster, movie_title,movie_rank, total_movie_ranked, movie_year, movie_time, tv_channel, cb){
		var str ='';
		var today = new Date();
		var movie_airing_date = today.getDate().toLocaleString('en', {minimumIntegerDigits:2,useGrouping:false})+'/'+today.getMonth().toLocaleString('en', {minimumIntegerDigits:2,useGrouping:false});
			
		console.log('movie_title: '+movie_title);
		console.log('poster: '+poster);
		if( (movie_time.getMinutes()=== 'undefined') || (movie_time.getMinutes()===0)){
			str = 'Ce soir ('+movie_airing_date+') sur '+tv_channel.name+' à '+movie_time.getHours()+'h'+', \"'+movie_title+'\", film #'+movie_rank+'/'+total_movie_ranked+' de la liste des années '+movie_year;
		}else
			{str = 'Ce soir sur ('+movie_airing_date+') sur '+tv_channel.name+' à '+movie_time.getHours()+'h'+movie_time.getMinutes()+', \"'+movie_title+'\", film #'+movie_rank+'/'+total_movie_ranked+' de la liste des années '+movie_year;}
		if (str.length < 280) {
			str = str+" #SuperCineBattle #dailytweet";
			if(str.length < 280){
				str = str+" cc @SuperCineBattle";
			}
		}
		
		console.log("Calling callback with "+str);
		cb(str, poster);
	};
	
	request(
			{url:'http://m.playtv.fr/api/programmes/?preset=next_programmes&channel_id='+tv_channel.id,
				encoding : 'utf8',
				gzip : true,
				json : true
				
			},
			function (error, response, body) {	
				if (!error && response.statusCode === 200) {
					//callback = compare_ssb = function(error, channel, channel_progam_json, cb)
					msg_gen_callback(null, tv_channel,  body, log, final_callback);
					
				}
			}
		);//fin request
}


};