var xeneIP = '176.31.16.76'; //old server IP Address
var xeneServer = 'play.xenecraft.com';
var xeneFBPageID = '328124197290784';
var fbAppID = '1525071057809503';
var lastOnline, playersOn, playersMax, motd, version;

$(document).ready(function(){
	$.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: fbAppID,
      version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
    });
		// FB.api('/'+xeneFBPageID+'/posts', function(response){
		// });
  });  
	$('#xeneIp').append(xeneServer);
});	

$.get('https://mcapi.us/server/status?ip='+xeneServer, function(response){
	if(!response.online){
		lastOnline = response.last_online;
		$('#server').append(' Offline').addClass('btn-danger');
	}else
		$('#server').append(' Online').addClass('btn-success');
	version = response.server.name;
	$('#version').append(version);
	playersOn = response.players.now;
	playersMax = response.players.max;
	$('#players').append(playersOn + '/' + playersMax);
});

// $.get('http://craftapi.com/api/server/info/'+xeneServer, function(response){
// 	motd = response.motd;
// 	playersOn = response.players.online;
// 	playersMax = response.players.max;
// 	$('#players').append(playersOn + '/' + playersMax);
// });

// var j = new JSONAPI({
// 	host: xeneServer,
// 	port: '25565',
// 	username: 'chatonly',
// 	password: 'example'
// });

// j.call('getPlayerNames', console.log);

// $.get(xeneServer+'/api/call?method=getPlayerLimit', function(response){
// 	console.log(response);
// });