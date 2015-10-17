var xeneServer = '176.31.16.76';
var lastOnline, playersOn, playersMax, motd, version;

$(document).ready(function(){
	$('#xeneIp').append(xeneServer);
});

$.get('https://mcapi.us/server/status?ip='+xeneServer, function(response){
	console.log(response);
	if(!response.online){
		lastOnline = response.last_online;
		$('#server').append(' Offline').addClass('btn-danger');
	}else
		$('#server').append(' Online').addClass('btn-success');
	motd = response.motd;
	playersOn = response.players.now;
	playersMax = response.players.max;
	version = response.server.name;
	$('#players').append(playersOn + '/' + playersMax);
	$('#players').append(version);

});