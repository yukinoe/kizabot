/*jshint esversion: 6 */

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete credentials.json.
const TOKEN_PATH = 'credentials.json';

const oauth2Client = new google.auth.OAuth2(
		  '598228785002-7sqeh8cn137l0vq3g6fmfgts1u1mjefe.apps.googleusercontent.com',
		  'f9LkpGLgYLV-ElzTP8K5kP3V',
		  'http://localhost:8000'
		);

const redirect_url = oauth2Client.generateAuthUrl({
	access_type	: 'offline',
	scope 		: 'https://www.googleapis.com/auth/drive.metadata.readonly'
});

console.log(redirect_url);

