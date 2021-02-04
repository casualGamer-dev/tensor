const schema = require('../../schemas/chatbot-channel')
module.exports.run = async(client, message) => {
    const chan = message.mentions.channels.first()
const data = await schema.findOneAndUpdate({
    guildid: message.guild.id,
},{$set: {
    channelid: chan.id
}},{
    upsert: true
})
console.log(data)
message.reply(`Chatbot channel set to <#${chan.id}>`)
};


module.exports.help = {
    name: "setchatchannel",
    aliases: ["scc"],
    description: "Set the channel for the chatboot :D to talk to it autonomously without any command",
    usage: "(command name) (Mention)",
    category: "chat",
    cooldown: 60 // Counted in MS
};

module.exports.config = {
    restricted: false,
    ownerOnly: true
};