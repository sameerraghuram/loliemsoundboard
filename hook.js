const Discord = require('discord.js');

const config = {
    webhookID: '800560313656934432',
    webhookToken: 'zCuPPENSTyes-NkjMnR5HFY7H5WXylEl0i8oyDh9_9KtDD3e81WU-XnKXvCnXF7TIWIO',
    clientId: '317641730708996107'
};
const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

webhookClient.send('!play tunaa', {
    username: config.clientId,
    avatarURL: 'https://i.imgur.com/wSTFkRM.png',
}).then(() => setTimeout(() => {
    webhookClient.delete
    }, 1000) 
);
