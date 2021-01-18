const fs = require('fs');
const cwd = process.cwd();

module.exports.run = async (client, message, args) => {
    if(!args.length) {
        message.channel.send('needs input');
    }
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        const commandFilename = args[0]
        
        const dispatcher = connection.play(fs.createReadStream(`${cwd}/static/${commandFilename}.ogg`), { type: 'ogg/opus' });
        dispatcher.on('finish', () => {
            setTimeout(() => {
                console.log('audio has finished playing!');
                connection.disconnect();
            }, 1000)
        });
	}
}
  
module.exports.help = {
    name: 'play'
}