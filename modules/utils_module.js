/**
 * http://usejsdoc.org/
 */

module.exports = {

	log : function(poster, movie_title, movie_rank, total_movie_ranked, movie_year, movie_time, tv_channel, cb){
		var str ='';
		var today = new Date();
		var movie_airing_date = today.getDate().toLocaleString('en', {minimumIntegerDigits:2,useGrouping:false})+'/'+(today.getMonth()+1).toLocaleString('en', {minimumIntegerDigits:2,useGrouping:false});
			
		console.log('movie_title: '+movie_title);
		console.log('poster: '+poster);
		if( (movie_time.getMinutes() === 'undefined') || (movie_time.getMinutes() === 0)){
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
	}
	
};