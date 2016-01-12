var xeneIP = '176.31.16.76'; //old server IP Address
var xeneServer = 'play.xenecraft.com';
var xeneFBPageID = '328124197290784';
var fbAppID = '1525071057809503';
var lastOnline, playersOn, playersMax, motd, version;

$(document).ready(function(){
	$.ajaxSetup({ cache: true });
  // $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
  //   FB.init({
  //     appId: fbAppID,
  //     version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
  //   });
		// // FB.api('/'+xeneFBPageID+'/posts', function(response){
		// // });
  // });  
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

var stdBlocks = ['Stone', 'Grass', 'Dirt', 'Sand', 'Gravel', 'Wood', 'Acacia_Wood', 'Birch_Wood', 'Dark_Oak_Wood', 'Jungle_Wood', 'Spruce_Wood', 'Snow', 'Cactus', 'Netherrack', 'Wool'];
var stdJoined = [];
var rareBlocks = ['Clay', 'Soul_Sand', 'Glowstone', 'Moss_Stone', 'Sponge'];
var rareJoined = [];
var eggChoices = ['Bat', 'Chicken', 'Cow', 'Creeper', 'Enderman', 'Horse', 'Ocelot', 'Pig', 'Skeleton', 'Slime', 'Spider', 'Squid', 'Witch', 'Wolf', 'Zombie', 'Zombie_Pigman'];
var eggJoined = [];

var blockNameFilter = function(blockName){
	return blockName.replace(/_/g, ' ');
};

if(window.location.pathname === '/exchange-and-donation/'){
	for(var i = 0; i < stdBlocks.length; i++){
		stdJoined.push('<tr><td>'+(i+1)+'</td><td><strong>'+blockNameFilter(stdBlocks[i])+'</strong></td><td><img class="img-responsive img-limited img-center" src="/images/blocks/'+stdBlocks[i]+'.png"></td></tr>');
	}
	var stringTemplate = stdJoined.join('');

	for(var r = 0; r < rareBlocks.length; r++){
		rareJoined.push('<tr><td>'+(r+1)+'</td><td><strong>'+blockNameFilter(rareBlocks[r])+'</strong></td><td><img class="img-responsive img-limited img-center" src="/images/blocks/'+rareBlocks[r]+'.png"></td></tr>');
	}

	for(var e = 0; e < eggChoices.length; e++){
		eggJoined.push('<tr><td>'+(e+1)+'</td><td><strong>'+blockNameFilter(eggChoices[e])+'</strong></td><td><img class="img-responsive img-limited img-center" src="/images/eggs/Grid_Spawn_'+eggChoices[e]+'.png"></td></tr>');
	}

	var standardTemplate = stdJoined.join('');
	var rareTemplate = rareJoined.join('');
	var eggTemplate = eggJoined.join('');
	$('#stdHeader').after(standardTemplate);
	$('#rareHeader').after(rareTemplate);
	$('#eggHeader').after(eggTemplate);
}

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