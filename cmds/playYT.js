const fs = require('fs');
const ytdl = require('ytdl-core');
const utils = require('../utils');
const cwd = process.cwd();

module.exports.run = async (client, message, args) => {
    if(!args.length) {
        message.channel.send('needs input');
    }
    const voiceChannel = utils.getVoiceChannelId(message)
    if (voiceChannel) {
        const connection = await voiceChannel.join();
        const ytUrl = args[0];
        let info = await ytdl.getInfo(ytUrl);

        const dispatcher = connection.play(
            ytdl(
                info.videoDetails.video_url, 
                {
                    'format': 'lowestaudio'
                }
            )
        );
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
    name: 'playYT'
}