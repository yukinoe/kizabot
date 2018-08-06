/*jshint esversion: 6 */

const {google} = require('googleapis');
const privatekey = require("../resources/KizabotAgent-530799de37b9.json");
const sheets = google.sheets('v4');


//This @Onibaki_ shared supercinebattle Google Sheet 
/* /!\ Important Note: This spreadsheet needs to be shared with the 
 * service account email (in privatekey.client_email) in order to work*/
const SuperCineBattleShareSheetID	= '1gEZBHedLVHfX8o0fpmGN7QglY3njv6-sXE7WK229tOE';

//const SuperCineBattleSheetID		= ;
console.log(privatekey.client_email);

//configure a JWT auth client
let jwtClient = new google.auth.JWT(
       privatekey.client_email,
       null,
       privatekey.private_key,
       ['https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive']);
//authenticate request
jwtClient.authorize(function (err, tokens) {
 if (err) {
   console.log(err);
   return;
 } else {
   console.log("Successfully connected! ");
 }
});


//https://docs.google.com/spreadsheets/d/1g	EZBHedLVHfX8o0fpmGN7QglY3njv6-sXE7WK229tOE/edit#gid=1447928535


	
/*Google Drive API
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
           console.log('%s (%s)', file.name, file.id);
       }
   }
});*/

var self = module.exports = {
		checkAndcopy	: function () {
		},
		load	: function (spreadsheetID) {
			
			//récupération des informations du spreadsheet			
			sheets.spreadsheets.get({auth: jwtClient,spreadsheetId: spreadsheetID}, 
					function(err, response){
						if(err){
							console.error(err);
							return;
						}
						else {
							var json 			= require('json');
							var dataResponseJson 	= JSON.parse(JSON.stringify(response.data));
							//extraction des ID de chaque sheet du spreadsheet
							console.log(dataResponseJson.sheets.forEach(function(x){
								console.log(x.properties.sheetId);}
							)
							);
							
							//console.log(response.data);
						}
			});

			sheets.spreadsheets.values.get({
			   auth: jwtClient,
			   spreadsheetId: spreadsheetID,
			   range: 'A1:B1',
			   majorDimension: 'DIMENSION_UNSPECIFIED',
			   valueRenderOption: 'UNFORMATTED_VALUE',
			   dateTimeRenderOption: 'FORMATTED_STRING'
			}, function (err, response) {
			   if (err) {
			       console.log('The API returned an error: ' + err);
			   } else {
			       console.log('Sheet list from Google Sheets:');
			       console.log(response.data.values);
			       
			   }
			});
			
		}
};
