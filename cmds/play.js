const fs = require('fs');
const cwd = process.cwd();

module.exports.run = async (client, message, args) => {
    if(!args.length) {
        message.channel.send('needs input');
    }
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        const commandFilename = args[0]
        
        connection.play(fs.createReadStream(`${cwd}/static/${commandFilename}.ogg`), { type: 'ogg/opus' });
	}
}
  
module.exports.help = {
    name: 'play'
}