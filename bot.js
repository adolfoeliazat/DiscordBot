const Discord = require('discord.js');
const client = new Discord.Client();

client.login('Mjg5NDUzNjA1NTI0NzMzOTUy.DBNDGw.TynFOFo7NcPtkodh5i10JLbeogk');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setGame('!commandes pour les commandes');
});

client.on('message', message => {
  var musicChannel = client.channels.get('306122580425834506'); //Music
  var salonChannel = client.channels.get('173548541623402496'); //Salon 1  - Serveur de renvoie
  var salon2Channel = client.channels.get('173548573022093312') //Salon 2
  var salon3Channel = client.channels.get('173548653665845248') //Salon 3
  var dofusChannel = client.channels.get('300379395082682378') //Dofus
  var mmoChannel = client.channels.get('319282707404161024'); //MMORPG
  var lol1Channel = client.channels.get('159023107464626177'); //LoL 1
  var lol2Channel = client.channels.get('283381636576575489'); //LoL 2
  var csgoChannel = client.channels.get('159023019514265600'); //CSGO
  var rocketChannel = client.channels.get('202851392694648841'); //Rocket League

  var guild = client.guilds.get('159022801058136064');

  var textChat = client.channels.find('name', 'bot');

  var texte = message.content;
  var nouveauTexte = texte.replace("!", "");
  //console.log(nouveauTexte);

  if (nouveauTexte === 'commandes') {
    message.reply('Toutes les commandes disponibles pour l\'instant sont !purge [salon] écrit exactement comme dans Discord. Exemple : !purge MMORPG. Ces commandes renvoie les utilisateurs du salon dans "Salon 1" et leurs envoie un message en privé pour les avertir !')
  } else if (nouveauTexte.indexOf('purge') !== -1) {
    var purgeTexte = nouveauTexte.replace("purge ", "");
    //console.log('PUUUUURRRRGGGGGEEE', purgeTexte);

    /**********************
     * PURGE DES CHANNELS *
     **********************/

    if (purgeTexte === 'MMORPG') {
      message.reply('Purge le channel "MMORPG"');
      var users = mmoChannel.members;
      users.forEach(function(valeur, clé) {
        console.log(clé);
        console.log('Envoyer le joueur id -> ' + clé + ' vers le salon 1!');
        var user = mmoChannel.members.find('id', clé);
        user.setVoiceChannel(salonChannel);
        user.send('__**AVERTISSEMENT**__ Vous avez été changer de channel par un admin, faites attention à ne pas être dans le mauvais channel pour votre jeux !');
      });
    } else if (purgeTexte === 'Dofus') {
      message.reply('Purge le channel "Dofus"');
      var users = dofusChannel.members;
      users.forEach(function(valeur, clé) {
        console.log(clé);
        console.log('Envoyer le joueur id -> ' + clé + ' vers le salon 1!');
        var user = dofusChannel.members.find('id', clé);
        user.setVoiceChannel(salonChannel);
        user.send('__**AVERTISSEMENT**__ Vous avez été changer de channel par un admin, faites attention à ne pas être dans le mauvais channel pour votre jeux !');
      });
    } else if (purgeTexte === 'League Of Legend') {
      message.reply('Purge le channel "League Of Legend"');
      var users = lol1Channel.members;
      users.forEach(function(valeur, clé) {
        console.log(clé);
        console.log('Envoyer le joueur id -> ' + clé + ' vers le salon 2!');
        var user = lol1Channel.members.find('id', clé);
        user.setVoiceChannel(salon2Channel);
        user.send('__**AVERTISSEMENT**__ Vous avez été changer de channel par un admin, faites attention à ne pas être dans le mauvais channel pour votre jeux !');
      });
    } else if (purgeTexte === 'League Of Legend #2') {
      message.reply('Purge le channel "League Of Legend #2"');
      var users = lol2Channel.members;
      users.forEach(function(valeur, clé) {
        console.log(clé);
        console.log('Envoyer le joueur id -> ' + clé + ' vers le salon 2!');
        var user = lol2Channel.members.find('id', clé);
        user.setVoiceChannel(salon2Channel);
        user.send('__**AVERTISSEMENT**__ Vous avez été changer de channel par un admin, faites attention à ne pas être dans le mauvais channel pour votre jeux !');
      });
    } else if (purgeTexte === 'Csgo Comp 1') {
      message.reply('Purge le channel "Csgo Comp 1"');
      var users = csgoChannel.members;
      users.forEach(function(valeur, clé) {
        console.log(clé);
        console.log('Envoyer le joueur id -> ' + clé + ' vers le salon 3!');
        var user = csgoChannel.members.find('id', clé);
        user.setVoiceChannel(salon3Channel);
        user.send('__**AVERTISSEMENT**__ Vous avez été changer de channel par un admin, faites attention à ne pas être dans le mauvais channel pour votre jeux !');
      });
    } else if (purgeTexte === 'Rocket League Comp') {
      message.reply('Purge le channel "Rocket League Comp"');
      var users = rocketChannel.members;
      users.forEach(function(valeur, clé) {
        console.log(clé);
        console.log('Envoyer le joueur id -> ' + clé + ' vers le salon 3!');
        var user = rocketChannel.members.find('id', clé);
        user.setVoiceChannel(salon3Channel);
        user.send('__**AVERTISSEMENT**__ Vous avez été changer de channel par un admin, faites attention à ne pas être dans le mauvais channel pour votre jeux !');
      });
    } else {
      console.log(purgeTexte);
      var user = client.users.find('username', purgeTexte);
      var userId = user.id;
      console.log(user);
      console.log(userId);
      user = guild.members.find('id', userId);
      user.setVoiceChannel(salonChannel);
      user.send('__**AVERTISSEMENT**__ Vous avez été changer de channel par un admin, faites attention à ne pas être dans le mauvais channel pour votre jeux !');
    }
  }
});
