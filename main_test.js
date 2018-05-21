/*jshint esversion: 6 */

/*
 * 15/05/2018 : début prototypage bot
 * */

const express 		= require('express');
const bodyParser 	= require('body-parser');
const http 			= require('http');

var main = function (){
	console.log("helloworld"); 
	
	//initialisation du server
	const server = express();
	
	server.use(bodyParser.urlencoded({
	    extended: true
	}));

	server.use(bodyParser.json());
	
	server.post('/get-movie-details', (req, res) => {

	    const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
	    const reqUrl = encodeURI(`http://www.omdbapi.com/?t=${movieToSearch}&apikey=f176436d&t`);
	    console.log("movieToSearch: "+movieToSearch);
	    
	});
	
	server.listen((process.env.PORT || 8000), () => {
	    console.log("Server is up and running...");
	});
	
	return;
};

main();
