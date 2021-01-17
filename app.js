// Require packages
const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv/config');

// Init bot
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Import config from dotenv
let prefix;
const owner = process.env.OWNER;
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
client.on('message', msg => {
  console.log(msg.content);
});

// Bot Login
client.login(token);