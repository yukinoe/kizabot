/*jshint esversion: 6 */
/**
 * http://usejsdoc.org/
 */

var request = require('request'); 
var fs		= require('fs');
var Twit = require('twit');


//var URI 	= require("uri-js");

var str		= 'http://www.omdbapi.com/?apikey=f176436d&t=Predator%202&y=1990';


var client = new Twit({
	  consumer_key: 'kgjmptnIsdWh0OTEtPGP7yojW',
	  consumer_secret: 'd6JbEWDx6YnI2A369nEpayJroXTEKSoL6bQTqC4iUJK6kfNguY',
	  access_token: '901217331522809857-AkpKrx6CMBlH5Q0CLd6A8Efr0qEq2km',
	  access_token_secret: 'mQg2ywzJ13bC2z0cRlBDb2RcGspydWRJWt2DZFAif1eiK',
	  timeout_ms : 60*1000
	});


request(
			{url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNThjZjI4NTgtZDk4Mi00ZjI1LWExZGUtNTRkOWY1ZTY3M2FlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', 
			encoding : 'binary'
			},
			function (error, response, body) {							
				
				var file 		= fs.writeFileSync('./out.jpg', body, 'binary');
				var b64content = fs.readFileSync('./out.jpg', { encoding: 'base64' });
				 
                
				if (!error && response.statusCode === 200) {
					
//					var img_size = JSON.parse(JSON.stringify(response));
	//				console.log('size :'+img_size.headers['content-length']+' type :'+img_size.headers['content-type']);
					client.post('media/upload', {media_data: b64content},  function(error, data, response) {
						  if(error) {
							  throw error;
						  }
						  client.post('statuses/update',{ status: 'test!',media_ids: data.media_id_string}, function(err,data,response){console.log(data);});
						});

					//tweet.tweet('test');
					
				}
				else { return -1; }
			}
		);//fin request

