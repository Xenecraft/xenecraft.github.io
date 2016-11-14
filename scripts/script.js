'use strict';
var xeneIP = '176.31.16.76'; //old server IP Address
var xenePort= '25985';
var xeneServer = 'play.xenecraft.com';
var xeneFBPageID = '328124197290784';
var fbAppID = '1525071057809503';
var lastOnline, playersOn, playersMax, motd, version;

$(document).ready(()=>{

    // //	`https://graph.facebook.com/oauth/access_token?client_id=APP_ID_HERE&client_secret=APP_SECRET_HERE&grant_type=fb_exchange_token&fb_exchange_token=ACCESS_TOKEN_HERE`
    // var profile_id = "328124197290784";

    // //App Info, needed for Auth
    // var aid = "1525071057809503";
    // var asc = "295f7ac57f6003da91a93d545b4b49f0";

    // //Retrieve auth token
    // $.get(`https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id=${aid}&client_secret=${asc}`, (response) => {
    //     $.get(`https://graph.facebook.com/${profile_id}/feed?${response}`, (response) => {
    //         console.log(response);
    //     });
    // });

    $.ajaxSetup({ cache: true });
    $('#xeneIp').append(xeneServer);
});

$.get('https://mcapi.us/server/status?ip=' + xeneServer + '&port=' + xenePort, function(response) {
    console.log(response);
    if (!response.online) {
        lastOnline = response.last_online;
        $('#server').append(' Offline').addClass('btn-danger');
    } else
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

var blockNameFilter = function(blockName) {
    return blockName.replace(/_/g, ' ');
};

var exchangePageName = '/exchange-and-contributions/';
if (window.location.pathname === exchangePageName) {
    for (var i = 0; i < stdBlocks.length; i++) {
        stdJoined.push('<tr><td>' + (i + 1) + '</td><td><strong>' + blockNameFilter(stdBlocks[i]) + '</strong></td><td><img class="img-responsive img-limited img-center" src="/images/blocks/' + stdBlocks[i] + '.png"></td></tr>');
    }
    var stringTemplate = stdJoined.join('');

    for (var r = 0; r < rareBlocks.length; r++) {
        rareJoined.push('<tr><td>' + (r + 1) + '</td><td><strong>' + blockNameFilter(rareBlocks[r]) + '</strong></td><td><img class="img-responsive img-limited img-center" src="/images/blocks/' + rareBlocks[r] + '.png"></td></tr>');
    }

    for (var e = 0; e < eggChoices.length; e++) {
        eggJoined.push('<tr><td>' + (e + 1) + '</td><td><strong>' + blockNameFilter(eggChoices[e]) + '</strong></td><td><img class="img-responsive img-limited img-center" src="/images/eggs/Grid_Spawn_' + eggChoices[e] + '.png"></td></tr>');
    }

    var standardTemplate = stdJoined.join('');
    var rareTemplate = rareJoined.join('');
    var eggTemplate = eggJoined.join('');
    $('#stdHeader').after(standardTemplate);
    $('#rareHeader').after(rareTemplate);
    $('#eggHeader').after(eggTemplate);
}
