'use strict';
var xenePort = '25565';
var xeneServer = 'play.xenecraft.com';
var xeneFBPageID = '328124197290784';
var lastOnline, playersOn, playersMax, motd, version;

// Main Pages anywhere
$(document).ready(() => {
  $.ajaxSetup({ cache: true });
  $('.xeneIp').append(xeneServer);

  // Modal Popups!
  $('[data-target="#post-display-modal"]').on("click", function(item){
    let imageToModal = $(item.target).attr('src');
    $('#post-image').attr('src', imageToModal);

    // Set the modal size to be "dynamic,"" by default the modal that allows users to see the image closer will display at 90% or else we will use the custom width set by the page. If the window size becomes less than a bootstrap lg, then we will also use 90%
    let modalSize = 90;
    const largeWidth = 1200; 
    let windowWidth = $(window).width();
    if (windowWidth > largeWidth){
      let modalTargetSize = $(this).attr('data-target-size');
      if(modalTargetSize)
        modalSize = modalTargetSize;
    }
    $('.modal-fitted').css('width', `${modalSize}%`);
  });

});

// Populate the Sidebar with current Server Status
$.get('https://mcapi.us/server/status?ip=' + xeneServer + '&port=' + xenePort, function(response) {
  if (!response.online) {
    lastOnline = response.last_online;
    $('.serverStatus').append(' Offline').addClass('btn-danger');
  } else
    $('.serverStatus').append(' Online').addClass('btn-success');
  version = response.server.name;
  $('#version').append(version);
  playersOn = response.players.now;
  playersMax = response.players.max;
  $('#players').append(playersOn + '/' + playersMax);
  $('.xeneMotd').append(response.motd);

});

// Other Pages
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

  // Note: This section will prevent users from going to donate now. Not necessary as we are capable of self funding!
  // $('#contrib').click(() => {
  //   var doContribute = confirm('Are you sure you want to contribute? You can opt to trade in Diamonds instead!');
  //   if (doContribute)
  //     window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=W5TDJXTPXNMUG', '_blank');
  // });
}
