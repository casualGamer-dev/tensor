const {MessageCollector} = require('discord.js')
const fetch = require('node-fetch')
const fs = require('fs')
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node')
const Jimp = require('jimp')
module.exports.run = async(client, message) => {
    message.reply('Please send the image you want to classify.')

   let filter = m => m.author.id === message.author.id
    const collector = new MessageCollector(message.channel, filter, {max: 1})
    collector.on('end', async m => {
    
        m.forEach(async(m)=> {    
            m.channel.send('Thank you for submitting the image')
            m.attachments.forEach(async(u) => {console.log(u.url)            
               let res=  await fetch(u.url)
            const buffer = await res.buffer()
            await Jimp.read(buffer)
  .then(lenna => {
    return lenna
      .resize(1080, 720) // resize
      .quality(100)  // set greyscale
      .write('./image.jpg'); // save
  })
  .catch(err => {
    console.error(err);
  });
fs.readFile('image.jpg', (err, data) => {
      console.log(err)
      const tens = tfnode.node.decodeImage(data)
      check(tens)
  })
const check = async(tens) => {
            const model = await mobilenet.load();
    const predictions = await model.classify(tens);
    
    console.log('Predictions: ');
    console.log(predictions[0].className);
    message.channel.send(`Your results for image classification are here the result are as follows
   ** Name - ${predictions[0].className}**
   ** Probability - ${predictions[0].probability}**`)
}
fs.unlink('image.jpg', err  => {
    if(err){
        console.log(err)
    }
})
})

})



    })

};


module.exports.help = {
    name: "classify",
    aliases: ["cl"],
    description: "classify images",
    usage: "(command name)",
    category: "Ai-commands",
    cooldown: 0// Counted in MS
};

module.exports.config = {
    restricted: false,
    ownerOnly: false
};