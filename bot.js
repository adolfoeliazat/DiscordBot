const Discord = require('discord.js');
const client = new Discord.Client();

client.login('Mjg5NDUzNjA1NTI0NzMzOTUy.DBNDGw.TynFOFo7NcPtkodh5i10JLbeogk');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setGame('!commandes pour les commandes');
});

client.on('message', message => {
  var channelArray = ['Music', 'Salon 1', 'Salon 2', 'Salon 3', 'Dofus', 'MMORPG', 'League Of Legend', 'League of Legend #2', 'Csgo Comp 1', 'Rocket League Comp'];
  var channelIdArray = ['306122580425834506', '173548541623402496', '173548573022093312', '173548653665845248', '300379395082682378', '319282707404161024', '159023107464626177', '283381636576575489', '159023019514265600', '202851392694648841'];

  var chatArray = ['general', 'bot'];
  var chatIdArray = ['159022801058136064', '287857533941448704']

  var guild = client.guilds.get('159022801058136064');

  var texte = message.content;
  var nouveauTexte = texte.replace("!", "");
  //console.log(nouveauTexte);

  if (message.channel.name === 'bot') {
    console.log('yeeee');
    if (nouveauTexte === 'commandes') {
      message.reply('Toutes les commandes pour les admins sont sur ce document : https://docs.google.com/document/d/1sP-z-wsfERoeswe9sq5gshL_fRO5QRriKwWyDFOxloo/edit?usp=sharing')
    } else if (nouveauTexte.indexOf('purge') !== -1) {
      var purgeTexte = nouveauTexte.replace("purge ", "");
      //console.log('PUUUUURRRRGGGGGEEE', purgeTexte);

      /**********************
       * PURGE DES CHANNELS *
       **********************/

       var texteArray = [];
       texteArray = purgeTexte.split(" ", 2); //Prend les deux salons pour la purge
       console.log(purgeTexte);
       console.log(texteArray);

       var purgeId; //Variable qui gardera l'id du salon à purge
       var otherId; //Variable qui gardera l'id du salon vers ou envoyer les utilisateurs purge

       //Boucle pour trouver l'emplacement du salon à Purge dans l'array
       for (var i = 0; i < channelArray.length; i++) {
         //console.log("Trouve l'id du salon " + texteArray[0]);
         if (channelArray[i].indexOf(texteArray[0]) !== -1) {
           purgeId = channelIdArray[i];
           //console.log("L'id de " + texteArray[0] + ' est ' + purgeId);
         }
       }

       //Boucle pour trouver l'emplacement du salon à Purge dans l'array
       for (var i = 0; i < channelArray.length; i++) {
         //console.log("Trouve l'id du salon " + texteArray[1]);
         if (channelArray[i].indexOf(texteArray[1]) !== -1) {
           otherId = channelIdArray[i];
           //console.log("L'id de " + texteArray[1] + ' est ' + otherId);
         }
       }

       //Envoie un message pour dire que la purge est en cours
       message.reply('Envoie tous les membres dans le salon ' + texteArray[0] + ' vers le salon ' + texteArray[1]);

       //Trouve tous les membres du channel à purge et les envoie dans le channel choisi
       var users = client.channels.get(purgeId).members;
       //console.log('Les utilisateurs.. ' + users);
       users.forEach(function(valeur, clé) {
         console.log(clé);
         console.log('Envoyer le joueur id -> ' + clé + ' vers le salon 1!');
         var user = client.channels.get(purgeId).members.find('id', clé);
         user.setVoiceChannel(client.channels.get(otherId));
         user.send('__**AVERTISSEMENT**__ Vous avez été changer de channel par un admin, faites attention à ne pas être dans le mauvais channel pour votre jeux !');
       });

    } else if (nouveauTexte.indexOf('move') !== -1) {

       var replacedMoveText = nouveauTexte.replace('move ', '');
       var moveTexte = replacedMoveText.split(' ', 2);
       var moveId;
       console.log(replacedMoveText);
       console.log(moveTexte);

       //Trouve l'id du salon ou envoyer l'utilisateur
       for (var i = 0; i < channelArray.length; i++) {
         //console.log("Trouve l'id du salon " + texteArray[1]);
         if (channelArray[i].indexOf(moveTexte[1]) !== -1) {
           moveId = channelIdArray[i];
           //console.log("L'id de " + texteArray[1] + ' est ' + otherId);
         }
       }


       var user = client.users.find('username', moveTexte[0]);
       console.log('user ' + user);
       var userId = user.id;
       console.log(userId);
       user = guild.members.find('id', userId);
       user.setVoiceChannel(moveId);
       user.send('__**AVERTISSEMENT**__ Vous avez été changer de channel par un admin, faites attention à ne pas être dans le mauvais channel pour votre jeux !');
    } else if (nouveauTexte.indexOf('broadcast') !== -1) {
      var replacedBroadcastTexte = nouveauTexte.replace('broadcast ', '');
      var chatTexte = replacedBroadcastTexte.split(' ', 1);
      var chatId;

      for (var i = 0; i < chatArray.length; i++) {
        //console.log("Trouve l'id du salon " + texteArray[1]);
        if (chatArray[i].indexOf(chatTexte[0]) !== -1) {
          chatId = chatIdArray[i];
          //console.log("L'id de " + texteArray[1] + ' est ' + otherId);
        }
      }

      var broadcastTexte = replacedBroadcastTexte.replace(chatTexte[0], '');
      var chat = client.channels.get(chatId);
      chat.send(broadcastTexte);
    }
  } else if (message.channel.name === 'general') {
    if (message.content.indexOf('!purge') !== -1) {
      message.reply('a essayé de purge mais n\'était pas asser puissant !')
    }
  }
});
