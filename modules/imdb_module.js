/**
 * http://usejsdoc.org/
 */

var request	= require('request');
var json 	= require('json');

var self = module.exports = {
		
		imdb_getPoster : function(request_url, cb){
			
			request(
					{url: request_url,
						encoding : 'utf8',
						gzip : true,
						json : true
					},
					function (error, response, body) {			
						if (!error && response.statusCode === 200) {
							var json_object = JSON.parse(JSON.stringify(body));
							
							cb(json_object.Poster);
						}
						else { cb(null);}
					}
				);//fin request
		}
		
};

