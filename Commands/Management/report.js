const schema = require('../../schemas/outage')
const channelid = '798405494863429673'
const {MessageEmbed} = require('discord.js')

module.exports.run = async(client, message, args) => {
let reason = args.join(" ")
let reportertag = message.author.username
let reporterid = message.author.id
let guildname = message.guild.name
let guildid = message.guild.id
const channel = client.channels.cache.get(channelid)
let reporteruser = reportertag + '#' + message.author.discriminator
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const reportchannel = client.channels.cache.get(channelid)
await new schema({
    time: Date.now(),
    date: date,
    reporterid: reporterid,
    reporterguild: guildid,
    acknowledged: false,
    resolved: false,
    reason: reason,
  
}).save()
message.reply('Thank you for letting us know. There is a small chance that the developer team will get in contact with you.')


const embed = new MessageEmbed()
.setAuthor('New report')
.setDescription(`**Reason** - ${reason} \n **Reporter ID** - ${reporterid}  **Reporter username** - ${reporteruser} \n **Guild ID** - ${guildid} **Guild Name** - ${guildname}`)
.setColor('BLUE')
reportchannel.send(embed)
}
module.exports.help = {
    name: "report",
    aliases: ["rep"],
    description: "Report a bug",
    usage: "(command name) (The problem)",
    category: "General",
    cooldown: 1 // Counted in MS
};

module.exports.config = {
    restricted: false,
    ownerOnly: false
};