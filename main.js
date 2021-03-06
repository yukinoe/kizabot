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
 * 
 * 29/10/17
 * - "comparessb" function is now part of ssb_module?js
 * - "tweet" function is now passed as a parameters of getTvProgram	(allowing to switch for a console output during test phase 
 * - The output now displays the starting time of the movie (in hh24:mm format)
 * - New playtv_module testing module which enables more detailed testing process from a single json file as input and a console ouput
 * 
 * 05/11/17
 * - added "imdb module" poster retrieving module
 * 
 * 25/12/17
 * - ssb_module/compare_ssb : added extra request in order to look for a poster one year prior the year given by french television
 * - tweeter_module : change console.log data output by a simple console.log function
 * 
 * 12/05/2018
 * - Added dev mode to avoid unwanted tweets
 * - The program displayed string time is in Paris timezone
 * 
 * 21/05/2018
 * - Changed matching to 19h instead until javascript timezone issue is fixed 
 * 
 * 11/06/2018
 * - Added webapp feature (helloworld) 
 * 
 * 05/11/2018
 * - security patch
 */


var tweeter_module 	= require('./modules/tweeter_module.js');
var playtv_module	= require('./modules/playtv_module.js');
var ssb_module		= require('./modules/ssb_module.js');
var utils			= require('./modules/utils_module.js');
var express			= require('express');
var bodyParser = require('body-parser');

var process_program = function(str) {
	console.log(str);
};

//main
//pour chaque chaine TV 
var main = function (){
	
	if (process.env.COMPUTERNAME==="ULTRAMAN"){
		console.log("Kizabot will work is dev mode, no tweet will be send...\n");
	}
	
	if (process.env.NODE_ENV==="production"){
		console.log("Kizabot is in a production environment...\n");
	}
	
	console.log("Kizabot waked up at "+new Date().toLocaleString('UTC', {
	    timeZone: 'Europe/Paris'
	  })+"\n");
	
	for (var j=0; j<playtv_module.channel_list.length; j++){	
		//recuperer le programme télé  
		playtv_module.getTvProgram(playtv_module.channel_list[j], ssb_module.compare_allssb_with_channel);
		
 	}
};

var main_bis = function (){
	
	if (process.env.COMPUTERNAME==="ULTRAMAN"){
		console.log("Kizabot will work is dev mode, no tweet will be send...\n");
	}
	
	if (process.env.NODE_ENV==="production"){
		console.log("Kizabot is in a production environment...\n");
	}
		
	console.log("Kizabot waked up at "+new Date().toLocaleString('UTC', {
	    timeZone: 'Europe/Paris'
	  })+"\n");
	
	for (var i=0; i<Object.keys(ssb_module.ssb_liste_ultime_array).length; i++){	
		//recuperer le programme télé  
		console.log(ssb_module.ssb_liste_ultime_array[(1970+(i*10)).toString()]);
 	}
};


/*
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', function (req, res) {
	res.send('Hello World!');
	console.log("url: "+req.hostname+" body: "+req.body);		
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});
*/

var onedayinms= 86400000;

main();
setInterval(main,onedayinms);
