/**
 * http://usejsdoc.org/
 */

/*jshint esversion: 6 */

var Twit = require('twit');
var fs 	 = require('fs');
var request = require('request').defaults({ encoding: null });

//tweeter_module.js.js
//========
var self = module.exports = {
createTweeter: function () {
	
	var tweeter = new Twit({
		consumer_key: process.env.twitter_consumer_key, 
		consumer_secret: process.env.twitter_consumer_secret, 
		access_token: process.env.twitter_access_token, 
		access_token_secret: process.env.twitter_access_token_secret 
	});
	
	return tweeter;
},
	tweet_media : function(tweet_status, tweet_img_url){
		
		if (process.env.COMPUTERNAME==="ULTRAMAN"){
			
			if(tweet_img_url === undefined || tweet_img_url === null)
				{
					console.log(tweet_status+" (would have been tweeted)");
				}
			else
				{
				console.log(tweet_status+" (would have been tweeted with an attachment)");
				}
			return;
		}

		//post a tweet with media
				
		
		var tweeter =  self.createTweeter();
		
		if(tweet_img_url === undefined || tweet_img_url === null){
			
			tweeter.post('statuses/update', {status : tweet_status}, function (err, data, response) {
				   if (err) {
					   console.error(err);
					   return;
				   }
			   });
		}
		else {
			
			//b64content = fs.readFileSync(imgpath, { encoding: 'base64' });
			var b64content;
			request.get(tweet_img_url, function (error, response, body) {
			    if (!error && response.statusCode === 200) {
			    	b64content = new Buffer(body).toString('base64');
			    	
					//first we must post the media to Twitter
					tweeter.post('media/upload', { media_data: b64content }, function (err, data, response) {
					
					if (err) { console.log('upload error');}
					// now we can assign alt text to the media, for use by screen readers and
					// other text-based presentations and interpreters
					var mediaIdStr = data.media_id_string;
					var altText = "attachment";
					var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
				
					tweeter.post('media/metadata/create', meta_params, function (err, data, response) {
					 if (!err) {
					   // now we can reference the media and post a tweet (media will attach to the tweet)
					   var params = { status: tweet_status, media_ids: [mediaIdStr] };
				
					   tweeter.post('statuses/update', params, function (err, data, response) {
						   if (err) {
							   console.error(err);
							   return;
						   }
					   });
					 }
					 else {
						 console.error(err);
						 return;
					 }
					});
					});

			    }
			    else { console.error(error);}
				});
			}
		
	}

};
