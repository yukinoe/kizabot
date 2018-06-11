/*jshint esversion: 6 */

/*
 * 15/05/2018 : début prototypage bot
 * */

const express 		= require('express');
const bodyParser 	= require('body-parser');
const http 			= require('http');

var main = function (){
	console.log("Starting server..."); 
	
	//initialisation du server
	const server = express();
	
	server.use(bodyParser.urlencoded({
	    extended: true
	}));

	server.use(bodyParser.json());
	

	server.get('/get-movie-details', (request, response) => {
		response.json({fulfillmentText: 'This is my response for a GET/! Kizabot!'});
		console.log('This is my response for a GET/ request. Kizabot!');
	});
	
	server.post('/get-movie-details', (request, response) => {
		response.json({fulfillmentText: 'This is my response for a POST/! Kizabot!'});
		console.log('This is my response for a POST/ request. Kizabot!');
	});
	
	server.listen((process.env.PORT || 8080), () => {
	    console.log("Server is up and running...");
	});
	
	return;
};

main();
