
var tweeter_module 	= require('../modules/tweeter_module.js');
var playtv_module	= require('../modules/playtv_module.js');
var ssb_module		= require('../modules/ssb_module.js');
var utils			= require('../modules/utils_module.js');

var request	= require('request');
var json 	= require('json');

var process_program = function(str) {
	console.log(str);
};

var json = require('./test_data/program_tfx_ligneverte.json');

ssb_module.compare_ssb(null, {id:'12', name:'rtl9'}, json, utils.log, process_program);
