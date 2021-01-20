const fs = require('fs');
const utils = require('../utils');
const cwd = process.cwd();

module.exports.run = async (client, message, args) => {
    if(!args.length) {
        message.channel.send('needs input');
    }
    const voiceChannel = utils.getVoiceChannelId(message)
    if (voiceChannel) {
        const connection = await voiceChannel.join();
        const commandFilename = args[0]
        
        const dispatcher = connection.play(fs.createReadStream(`${cwd}/static/${commandFilename}.ogg`), { type: 'ogg/opus' });
        dispatcher.on('finish', () => {
            setTimeout(() => {
                console.log('audio has finished playing!');
                connection.disconnect();
                message.delete();
            }, 1000)
        });
	}
}
  
module.exports.help = {
    name: 'play'
}