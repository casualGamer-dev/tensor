const discord = require('discord.js')
module.exports.run = (client, message) => {
const embed = new discord.MessageEmbed()
.setAuthor('Invite links!')
.setColor('BLUE')
.setDescription("My invite links are as follows \n \n [Admin link](https://discord.com/api/oauth2/authorize?client_id=771628747501731840&permissions=8&scope=bot) \n \n [Essential permissions](https://discord.com/api/oauth2/authorize?client_id=771628747501731840&permissions=130144&scope=bot) \n \n [No permissions](https://discord.com/api/oauth2/authorize?client_id=771628747501731840&permissions=0&scope=bot)")

.setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`)
message.channel.send(embed)
},
module.exports.help = {
    name: "invite",
    aliases: ["inv"],
    description: "Get the bot invite link",
    usage: "(command name)",
    category: "General",
    cooldown: 10 // Counted in MS
};

module.exports.config = {
    restricted: false,
    ownerOnly: false
};