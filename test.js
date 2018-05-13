/**
 * 
 */

var start	= 1508363400;
var end		= 1508363700;

var s = new Date(start*1000);

var e = new Date(end*1000);

process.env.TZ = 'Europe/Amsterdam'; 
	
var date= new Date().toISOString();

console.log(date);

process.env.TZ = 'America/Toronto'; 
	
date= new Date().toISOString();

console.log(date);

var nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
  });

console.log(nDate);

var nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Paris'
  });

console.log(nDate);
return 0;

