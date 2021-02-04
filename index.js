const { Client, Intents } = require("discord.js");
const Events = require("./Src/Handlers/EventHandler");
const conf = require("./Settings/conf.json");
const Session = require("./Training/Session.js");
const use = require("@tensorflow-models/universal-sentence-encoder");
const tf = require("@tensorflow/tfjs-node");
const JW = require("./Training/JaroWinkler.js");
const Fs = require("fs");
const mongo = require('./mongo')
const schema = require('./schemas/chatbot-channel')
const server = require('./server.js')

console.clear();

const client = new Client({
 partials: ['MESSAGE', 'CHANNEL', 'REACTION'] 
});

server.init(client)

client.on("ready", async() => {
Events.ready.init(client)
await mongo().then(console.log('Connected to MongoDB'));
})
client.on('guildCreate', (guild) => {
    console.log(`Joined ${guild.name} now at ${client.guilds.cache.size}`)
    guild.owner.send('Thank you for inviting me set the chat channel with j!scc in the channel of your choice! Vote for me on top.gg here https://top.gg/bot/771628747501731840/vote')
})
client.on('guildDelete', (guild) => {
    console.log(`Left ${guild.name} now at ${client.guilds.cache.size}`)
})
client.on("message", (message) => Events.message.init(client, message));
client.on('message',async message => {
    if(message.channel.type === 'dm'){
    if(message.author.id === '723560525358825542'){
        console.log(`toivi ${message.content}`)
    }
    }
    if(message.partial) await message.fetch()
    if(message.author.bot) return
        let msg = message.content.split()
        if(msg.length === 0){return}
         const tox = require('./toxication')
    tox(message)
   const data = await schema.findOne({guildid: message.guild.id})
   if(!data) return 

    if (message.channel.id === data.channelid &&message.author.id != client.user.id) {
        args = message.content.slice().trim().split(/ +/g);
    var model = Session.getModel();
    if (!model) {
        model = await tf.loadLayersModel("file:///home/container/TextAI/model.json");
    
        Session.addModel(model);
    }
        let phrase = args.slice(0 ).join(" ")
    
        message.channel.startTyping();
        const sentenceEncoder = await use.load();
    var Data = [{ message: phrase }];
    var Sentences = Data.map(t => t.message.toLowerCase());
    const xPredict = await sentenceEncoder.embed(Sentences);
    var prediction = await model.predict(xPredict).data();
    var highest = [0, 0];
    for (let i = 0; i < prediction.length; ++i) {
        if (highest[1] < prediction[i]) {
            highest[0] = i;
            highest[1] = prediction[i];
        }
    }
    var predicted = "";
    switch (highest[0]) {
        case 0:
            predicted = "Greeting";
            break;
        case 1:
            predicted = "Goodbye";
            break;
        case 2:
            predicted = "Insult";
            break;
        case 3:
            predicted = "Compliment";
            break;
    }

    var Dataset = JSON.parse(Fs.readFileSync("./Convo/Dataset.json"));
    var input = [undefined, 0];

    Dataset[predicted.toLowerCase()].patterns.forEach(msg => {
        var weight = JW(phrase, msg);
        if (weight > input[1]) {
            input[0] = msg;
            input[1] = weight;
        }
    });

    var possibleResponses = [];
    if (input[1] > 0.5) {
        Dataset[predicted.toLowerCase()].responses.forEach(res => {
            if (res.question == input[0]) {
                possibleResponses.push(res.message);
            }
        });
    }
    if (possibleResponses.length == 0) {
        Dataset[predicted.toLowerCase()].responses.forEach(res => {
            if (res.question == "DEFAULT") {
                possibleResponses.push(res.message);
            }
        })
    }
    message.channel.stopTyping();
    message.channel.send(`> Replying to **${message.author.username}** \n ${possibleResponses[Math.floor(Math.random() * possibleResponses.length)]}`)

    var Meta = JSON.parse(Fs.readFileSync("./Training/Meta.json"));
    if (Meta.selflearning && highest[1] > 0.6) {
        if (Dataset[predicted.toLowerCase()].patterns.includes(phrase)) return;
        Dataset[predicted.toLowerCase()].patterns.push(phrase);
        Fs.writeFileSync("./Convo/Dataset.json", JSON.stringify(Dataset));
    }
    
    }
     message.channel.stopTyping();
  });

client.login(conf.Discord.token);