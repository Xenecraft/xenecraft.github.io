// var xeneServer = '176.31.16.76'; //old server IP Address
var xeneServer = 'play.xenecraft.com';
var lastOnline, playersOn, playersMax, motd, version;

$(document).ready(function(){
	$('#xeneIp').append(xeneServer);
});

$.get('http://craftapi.com/api/server/info/'+xeneServer, function(response){
	motd = response.motd;
	playersOn = response.players.online;
	playersMax = response.players.max;
	$('#players').append(playersOn + '/' + playersMax);
});

$.get('https://mcapi.us/server/status?ip='+xeneServer, function(response){
	if(!response.online){
		lastOnline = response.last_online;
		$('#server').append(' Offline').addClass('btn-danger');
	}else
		$('#server').append(' Online').addClass('btn-success');
	version = response.server.name;
	$('#version').append(version);
});