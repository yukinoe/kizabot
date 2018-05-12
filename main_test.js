/*jshint esversion: 6 */

/**
 * 21/08/17:
 * - Start
 * 
 * 28/08/17:
 * - first @K1zaBot tweet 
 * 
 * 02/09/17:
 * - Got the tv programs from playtv (JSON format) and parsed the JSON file.  
 * 
 * 03/09/17:
 * - Splitting code (twitter_module.js and playtv_module.js)
 * 
 * 16/09/17:
 * - Finally found the problem with the encoding (actually a wrong setting of Eclipse's console) 
 * - Displaying all tv programs (main loop) 
 * 
 * 17/09/17:
 * - added module ssb_list_extractor.js 
 * - module ssb_list_extractor.js: Managed to retrieve the 2000's movie list from supercinebattle.com, stored and displayed on the console 
 * 
 * 18/09/17 : 
 * - html-decode-entites on the movie list
 * - add loop for the other decades
 * - need to wrap the whole ssb retrieving in a function with a callback
 * 
 * 19/09/17:
 * - Usage of "module.exports" and self reference for ssb_module.js
 * - SSB's list retrieval done in main.js (as well as tv program retrieval) 
 * 
 * 24/09/17:
 * - Linking and adding all the necessary functions and callback to link the main modules
 * 
 *  25/09/17:
 * - minor changes
 * 
 * 26/09/17:
 * - added main loop with setInterval function
 * 
 * 01/10/17
 * - Kiz@abot first get! "Le pianiste"
 * - Changing the output to tweeter friendly message when a SSB movie is broadcasted.New parameters added to the "log" function 
 * - Call of the tweet funtion added to the main program
 * - The main function is now called once a day (theoricaly every at every hours/min from the first run)
 * 
 * 09/10/17
 * - Now the "log" function gives the rank of the detected movie relatively to the total amount of movies listed 
 * - Minor changes to the "log" function for better modularity 
 * - the variable "channel_list" is now part of the playtv_module
 * - added comments for some functions 
 * 
 * 19/10/17:
 * - CompareSSB now test the year of the tv program to avoid false positive (like Ironman on france4 which is cartoon and not a movie)
 * - CompareSSB now filters the TV program depending on the starting time
 * 		
 * 20/10/17:
 * - channel 12 added
 * 
 * 28/10/17
 * - The tweet displays the tv channel full name  	
 */


var tweeter_module 	= require('./modules/tweeter_module.js');
var playtv_module	= require('./modules/playtv_module.js');
var ssb_module		= require('./modules/ssb_module.js');

var process_program = function(str) {
	console.log(str);
};


//main
//pour chaque chaine TV 
var main = function (){

	
	
	console.log("\n"+new Date().toISOString());
	
	for (var j=0; j<playtv_module.channel_list.length; j++){	
		//recuperer le programme télé  
		playtv_module.getTvProgram(playtv_module.channel_list[j], ssb_module.compare_ssb, process_program);	
 	}
};

var onedayinms= 86400000;

main();

