/*jshint esversion: 6 */

let {google} = require('googleapis');
let privatekey = require("../resources/KizabotAgent-530799de37b9.json");

//This @Onibaki_ shared supercinebattle Google Sheet 
/* /!\ Important Note: This spreadsheet needs to be shared with the 
 * service account email (in privatekey.client_email) in order to work*/
const SuperCineBattleShareSheetID	= '1gEZBHedLVHfX8o0fpmGN7QglY3njv6-sXE7WK229tOE';

const apis = ['https://www.googleapis.com/auth/spreadsheets','https://www.googleapis.com/auth/drive'];

//https://docs.google.com/spreadsheets/d/1g	EZBHedLVHfX8o0fpmGN7QglY3njv6-sXE7WK229tOE/edit#gid=1447928535
let spreadsheetID = '1gEZBHedLVHfX8o0fpmGN7QglY3njv6-sXE7WK229tOE';

//Google Sheets API
let sheets = google.sheets('v4');

var self = module.exports = {

	    //email	=privatekey.client_email,
		//key 	=privatekey.private_key
		//callback
		connect : function (email, key,callback) {
			//configure a JWT auth client
			let jwtClient = new google.auth.JWT(
			       email,
			       null,
			       key,
			       apis);
			//authenticate request
			jwtClient.authorize(function (err, tokens) {
			 if (err) {
			   console.log(err);
			   return;
			 } else {
			   console.log("Successfully connected! ");
			   self.getSheetList(jwtClient);
			 }
			});
		},
		

		getSheetList : function(jwtClient,callback){
			//liste des feuilles excel du classeur "Super Ciné Battle Ultimate list"
			
			//Pour récupérer les infos du classeur (notamment le nom de chaque feuille)
			sheets.spreadsheets.get({auth: jwtClient,spreadsheetId: spreadsheetID}, 
					function(err, response){
						if(err){
							console.error(err);
							return;
						}
						else {
							var sheets_list = [];
							//
							console.log(response.data.sheets);
							for (var i = 0; i < response.data.sheets.length; i++) {
						           var file = response.data.sheets[i].properties.title;
						           //console.log('%s (%s)', file.name, file.id);
						           self.parseSheet(jwtClient,file,callback);
						    }
					           
							console.log(" ");
							}
			});
		},

			parseSheet : function(jwtClient, sheetName, callback){
				sheets.spreadsheets.values.get({
					   auth: jwtClient,
					   spreadsheetId: spreadsheetID,
					   range: sheetName+'!A:J',
					   majorDimension: 'ROWS',
					   valueRenderOption: 'UNFORMATTED_VALUE',
					   dateTimeRenderOption: 'FORMATTED_STRING'
					}, function (err, response) {
					   if (err) {
					       console.log('The API returned an error: ' + err);
					   } else {
					       console.log('Movie list from Google Sheets:');
					       callback(response.data);       
					   }
					});
			

			}

/*		
		//Google Drive API
		let drive = google.drive('v3');
		drive.files.list({
		   auth: jwtClient,
		   q: "name contains 'Battle'"
		}, function (err, response) {
		   if (err) {
		       console.log('The API returned an error: ' + err);
		       return;
		   }
		   var files = response.data.files;
		   if (files.length === 0) {
		       console.log('No files found.');
		   } else {
		       console.log('Files from Google Drive:');
		       for (var i = 0; i < files.length; i++) {
		           var file = files[i];
		           //console.log('%s (%s)', file.name, file.id);
		           console.log(' ');
		       }
		   }
		});
*/
};

self.connect( privatekey.client_email,privatekey.private_key);