const create = async(client) => {
      const channel = client.channels.cache.get('798851679017369600'); //This Gets That Channel
  const sowner = guild.owner.user; //This Gets The Guild Owner
  if(!channel) return; //If the channel is invalid it returns
  const embed = new Discord.MessageEmbed()
      .setTitle('I Joined A Guild!')
      .setDescription(`**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}\n**Owner:** ${sowner.tag}`)
      .setTimestamp()
      .setColor('RANDOM')
      .setFooter(`I'm In ${bot.guilds.cache.size} Guilds Now!`);
  channel.send(embed);

}
module.exports.init = create