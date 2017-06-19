/*************************
 * KEVEN IMBEAULT - 2017 *
 *************************/

//TODO CLEANING DU CODE - création de fonction réutilisable si nécessaire, etc...
const Discord = require('discord.js');
const opusscript = require("opusscript");
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };

const client = new Discord.Client();

var alreadyPlaying = false;
var queue = [];
var queueLength = queue.length;
var broadcast;
var channelMusic;

client.login('Mjg5NDUzNjA1NTI0NzMzOTUy.DBNDGw.TynFOFo7NcPtkodh5i10JLbeogk');

client.on('ready', () => {
  console.log(`Le bot est lancé !`);
  client.user.setGame('!commandes pour les commandes');
  broadcast = client.createVoiceBroadcast();
  channelMusic = client.channels.get('306122580425834506');
});

//TODO pouvoir choisir quel channel join
function voiceChannelBroadcast(serverId, filename){
  var serverToJoin = client.channels.get(serverId);

  const broadcast = client.createVoiceBroadcast();

  serverToJoin.join()
  .then(connection => {
    broadcast.playFile(filename);
    const dispatcher = connection.playBroadcast(broadcast);
    broadcast.on('end', () => {
      channelMusic.leave();
    });
  })
  .catch(console.error);
}

//TODO supporter les playlists youtube et chansons/playlists soundcloud
function streamMusic(replacedYtTexte) {
  queueLength = queue.length;
  const stream = ytdl(replacedYtTexte, { filter : 'audioonly' });
  broadcast.playStream(stream);
  broadcast.on('end', () => {
    if (queueLength > 0) {
      replacedYtTexte = queue[0];
      queue.shift();
      streamMusic(replacedYtTexte);
      console.log(queue);
    } else {
      channelMusic.leave();
      alreadyPlaying = false;
    }
  });
}

client.on('message', message => {

  //Noms et ids des salon vocaux
  var channelArray = ['Music', 'S1', 'S2', 'S3', 'Dofus', 'MMORPG', 'LOL1', 'LOL2', 'CSGO', 'RL', 'AFK'];
  var channelIdArray = ['306122580425834506', '173548541623402496', '173548573022093312', '173548653665845248', '300379395082682378', '319282707404161024', '159023107464626177', '283381636576575489', '159023019514265600', '202851392694648841', '190255116878741504'];

  //Noms et ids dans chats
  var chatArray = ['general', 'bot'];
  var chatIdArray = ['159022801058136064', '287857533941448704']

  //ID du serveur
  var guild = client.guilds.get('159022801058136064');

  //Préfixe des commandes => !commandes, !purge
  var prefix = '!'

  //Retire le préfixe du texte
  var texte = message.content; //prend le texte complet
  var texteCommande = texte.replace(prefix, "");

  /**************************
   * COMMANDES DU SALON BOT *
   **************************/
  if (message.channel.name === 'bot') {
    if (texteCommande === 'commandes') {
      message.reply('Toutes les commandes pour les admins sont sur ce document : https://docs.google.com/document/d/1sP-z-wsfERoeswe9sq5gshL_fRO5QRriKwWyDFOxloo/edit?usp=sharing')
    } else if (texteCommande.indexOf('purge') !== -1) {
       var purgeTexte = texteCommande.replace("purge ", "");

       var texteArray = [];
       texteArray = purgeTexte.split(" ", 2); //Prend les deux salons pour la purge

       //Variables pour les ids des salons
       var purgeId;
       var otherId;

       //Trouve l'id du salon à purge
       for (var i = 0; i < channelArray.length; i++) {
         if (channelArray[i].indexOf(texteArray[0]) !== -1) {
           purgeId = channelIdArray[i];
         }
       }

       //Trouve l'id du salon vers les utilisateurs seront envoyés
       for (var i = 0; i < channelArray.length; i++) {
         if (channelArray[i].indexOf(texteArray[1]) !== -1) {
           otherId = channelIdArray[i];
         }
       }

       message.reply('Envoie tous les membres dans le salon ' + texteArray[0] + ' vers le salon ' + texteArray[1]);

       //Trouve tous les membres du channel à purge et les envoie dans le channel choisi
       var users = client.channels.get(purgeId).members;
       users.forEach(function(valeur, clé) {
         console.log('Déplace le joueur avec l\'id -> ' + clé);
         var user = client.channels.get(purgeId).members.find('id', clé);
         user.setVoiceChannel(client.channels.get(otherId));
         user.send('__**AVERTISSEMENT**__ Vous avez été changer de channel par un admin, faites attention à ne pas être dans le mauvais channel pour votre jeux !');
       });

    } else if (texteCommande.indexOf('move') !== -1) {

       var replacedMoveText = texteCommande.replace('move ', '');
       var moveTexte = replacedMoveText.split(' ', 2);
       var moveId;

       //TODO move plusieurs personnes

       //Trouve l'id du salon ou envoyer l'utilisateur
       for (var i = 0; i < channelArray.length; i++) {
         if (channelArray[i].indexOf(moveTexte[1]) !== -1) {
           moveId = channelIdArray[i];
         }
       }

       var user = client.users.find('username', moveTexte[0]);
       var userId = user.id;
       console.log('Déplace le joueur avec l\'id -> ' + userId);

       user = guild.members.find('id', userId);
       user.setVoiceChannel(moveId);
       user.send('__**AVERTISSEMENT**__ Vous avez été changer de channel par un admin, faites attention à ne pas être dans le mauvais channel pour votre jeux !');
    } else if (texteCommande.indexOf('broadcast') !== -1) {
      var replacedBroadcastTexte = texteCommande.replace('broadcast ', '');
      var chatTexte = replacedBroadcastTexte.split(' ', 1);
      var chatId;

      for (var i = 0; i < chatArray.length; i++) {
        if (chatArray[i].indexOf(chatTexte[0]) !== -1) {
          chatId = chatIdArray[i];
        }
      }

      var broadcastTexte = replacedBroadcastTexte.replace(chatTexte[0], '');
      var chat = client.channels.get(chatId);
      chat.send(broadcastTexte);
    } else if (texteCommande.indexOf('afk') !== -1) {
      var replacedAfkTexte = texteCommande.replace('afk ', '');

      var user = client.users.find('username', replacedAfkTexte);
      var userId = user.id;
      user = guild.members.find('id', userId);
      user.setVoiceChannel(client.channels.get('190255116878741504'));
    } else if (texteCommande.indexOf('mute') !== -1) {
      var replacedMuteTexte = texteCommande.replace('mute ', '');
      var user = client.users.find('username', replacedMuteTexte);
      var userId = user.id;
      user = guild.members.find('id', userId);

      if (user.serverMute) {
        user.setMute(false);
      } else {
        user.setMute(true);
      }
    } else if (texteCommande.indexOf('leeroy') !== -1) {
      var serverId = message.member.voiceChannelID;
      voiceChannelBroadcast(serverId, 'sounds/Leeroy.mp3');

    } else if (texteCommande.indexOf('forcequit') !== -1) {
      channelMusic.leave();
      queue = [];
      alreadyPlaying = false;
      queueLength = queue.length;
      client.user.setGame('!commandes pour les commandes');
    }
    /*********************************
     * COMMANDES DES MESSAGES PRIVÉS *
     *********************************/
  } else if (message.channel.type === 'dm'){
    if (texteCommande.indexOf('broadcast') !== -1) {
      var replacedBroadcastTexte = texteCommande.replace('broadcast ', '');
      var chatTexte = replacedBroadcastTexte.split(' ', 1);
      var chatId;

      for (var i = 0; i < chatArray.length; i++) {
        if (chatArray[i].indexOf(chatTexte[0]) !== -1) {
          chatId = chatIdArray[i];
        }
      }

      var broadcastTexte = replacedBroadcastTexte.replace(chatTexte[0], '');
      var chat = client.channels.get(chatId);
      chat.send(broadcastTexte);
    } else if (texteCommande.indexOf('yt') !== -1) {
      client.user.setGame('DJ du channel Music !');
      var replacedYtTexte = texteCommande.replace('yt ', '');

      console.log(alreadyPlaying);

      if (alreadyPlaying == false) {
        alreadyPlaying = true;
        console.log(alreadyPlaying);
        channelMusic.join()
        .then(connection => {
          var i = 0;
          streamMusic(replacedYtTexte);
          const dispatcher = connection.playBroadcast(broadcast);

        })
        .catch(console.error);
      } else {
          queue.push(replacedYtTexte);
          queueLength = queue.length;
          console.log(queue, queueLength);
      }

    }
  }
});
