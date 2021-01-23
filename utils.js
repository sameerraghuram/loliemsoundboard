require('dotenv/config');

const webhookId = process.env.WEBHOOK_ID;

function isSoundBardMessage(message) {
    return message.webhookID && message.webhookID === webhookId
}

function isMessageServiceable(message) {
    if (isSoundBardMessage(message)) {
        return true
    }

    else if (message.bot) {
        return false;
    }
    
    return true;
}

function getVoiceChannelId(message) {
    if(!isSoundBardMessage(message) && !message.bot) {
        // human
        return message.member.voice.channel;
    }
    const userId = message.author.username;

    let voiceChannels = message.guild.channels.cache.filter((channel) => {
        if (!(channel.type === "voice")) {
            return false;
        }
        let memberIdSet = new Set()
        channel.members.forEach((m) => {
            memberIdSet.add(m.id);
        })
        
        return memberIdSet.has(userId);
    });

    if (voiceChannels.size > 0) {
        return voiceChannels.first();
    }

    return null;
}

module.exports = {isMessageServiceable, getVoiceChannelId}
