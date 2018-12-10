/**
 * http://usejsdoc.org/
 */

var request		= require('request');
var json		= require('json');
var ssb_module	= require('./ssb_module.js');

module.exports = {
channel_list	: [{id:'tf1', name:'tf1'},{id:'2',name:'France2'},{id:'3', name:'France3'},{id:'4', name:'France4'},
	{ id:'5', name: 'France5'},{ id:'m6', name: 'm6'},{id:'arte', name:'arte'},{id:'c8', name: 'c8'}, {id:'w9', name:'w9'}, 
	{id:'tmc', name:'tmc'}, {id:'12', name:'rtl9'}, {id:'14', name:'nt1'}, {id:'1144', name:'tf1-series-films'}, {id: '1123', name: 'cstar'}, {id: '15', name: 'nrj12'}, {id: '622', name: '6ter'}, {id: '1145', name: 'tfx'}  ]
,
/*
 * tv_channel		= 
 * msg_gen_callback = comparison function 
 * ouput_callback	= callback given as a parameter for compare_ssb/msg_gen_callback 
 * */
getTvProgram	: function(tv_channel, msg_gen_callback){
	
	var today = new Date();
		
	request(
			{url:'http://m.playtv.fr/api/programmes/?preset=next_programmes&channel_id='+tv_channel.id,
				encoding : 'utf8',
				gzip : true,
				json : true				
			},
			function (error, response, body) {	
				if (!error && response.statusCode === 200) {
					//msg_gen_callback
					msg_gen_callback(null, tv_channel,  body, ssb_module.ssb_list_processer);					
				}
			}
		);//fin request
}

};