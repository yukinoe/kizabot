
var tweeter_module 	= require('../modules/tweeter_module.js');
var playtv_module	= require('../modules/playtv_module.js');
var ssb_module		= require('../modules/ssb_module.js');

var process_program = function(str) {
	console.log(str);
};


/**
 * http://usejsdoc.org/
 */

var request	= require('request');
var json 	= require('json');

var json = require('./program_rtl9_28oct17.json');

/*
 * tv_channel		= 
 * msg_gen_callback = function "compare_ssb"
 * final_callback	= callback given as a parameter for compare_ssb/msg_gen_callback 
 * */
	
var log=function(movie_title,movie_rank, total_movie_ranked, movie_year, movie_time, tv_channel,  cb){
			
		var str = 'Ce soir sur '+tv_channel.name+' à '+movie_time.getHours()+'h'+movie_time.getMinutes()+' \",'+movie_title+'\", film #'+movie_rank+'/'+total_movie_ranked+' de la liste des années '+movie_year+' ';
		if (str.length < 140) {
			str = str+" #SuperCineBattle";
			if(str.length < 140){
				str = str+" cc @SuperCineBattle";
			}
		}
		
	console.log("Calling callback with "+str);
	cb(str);
};

//callback = compare_ssb = function(error, channel, channel_progam_json, cb)
ssb_module.compare_ssb(null, {id:'12', name:'rtl9'}, json, log, process_program);


