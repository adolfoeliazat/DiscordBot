//8RoHQfsKmtvE24IM4GxaKjKqpWs6voxJ

const Discord = require('discord.js');
const client = new Discord.Client();

client.login('Mjg5NDUzNjA1NTI0NzMzOTUy.DBNDGw.TynFOFo7NcPtkodh5i10JLbeogk');

var prefix = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setGame('This is a test !');
});

client.on('message', message => {
  if (message.content === '!join') {
    console.log(message.author.username); 
  }
});
