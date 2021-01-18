// Require packages
const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const utils  = require('./utils');
require('dotenv/config');

// Init bot
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Import config from dotenv
const prefix = process.env.BOT_PREFIX;
const owner = process.env.OWNER;
const clientId = process.env.BOT_CLIENT_ID;
const token = process.env.TOKEN;


// Read command files
fs.readdir('./cmds', (err, files) => {
  if (err) {
    console.log(err);
  }

  let cmdFiles = files.filter(f => f.split('.').pop() === 'js');

  if (cmdFiles.length === 0) {
    console.log('No files found');
    return;
  }

  cmdFiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i+1}: ${f} loaded`);
    client.commands.set(props.help.name, props);
  })

})

// Ready notification in console
client.on('ready', async () => {
  console.log('Hello. I am ready!');
});

// Command handler
client.on('message', message => {
  if (!message.content.startsWith(prefix) || !utils.isMessageServiceable(message)) return;

  let msg_array = message.content.split(' ');
  let command = msg_array[0];
  let args = msg_array.slice(1);

  if(client.commands.get(command.slice(prefix.length))) {
    let cmd = client.commands.get(command.slice(prefix.length));
    if (cmd) {
      cmd.run(client, message, args);
    }
  }
  console.log(`${message.author.username} said: ${message.content}`);
});

// Bot Login
client.login(token);