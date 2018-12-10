/**
 * http://usejsdoc.org/
 */

var request 		= require('request');
var html_parser2 	= require("htmlparser2"); 
var entities 		= require('ent');
var ci 				= require('case-insensitive');
var ssb 			= require('../modules/ssb_module.js');

var log_film = function (film_list,json,year){
	console.log('Extract de la liste des années '+year);
	for(var i=0;i<film_list.length;i++){
		console.log(film_list[i].rank+' '+film_list[i].titre);
	}
};

var json = require('./test_data/program_tfx_ligneverte.json');


ssb.ssb_list_processer(null,1990,'https://www.supercinebattle.fr/la-liste-ultime-des-films-des-annees-90/',json,log_film);
