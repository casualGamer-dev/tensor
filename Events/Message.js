const Command = require("../Src/Handlers/CommandHandler");
const conf = require("../Settings/conf.json");
const Session = require("../Training/Session.js");
const use = require("@tensorflow-models/universal-sentence-encoder");
const tf = require("@tensorflow/tfjs-node");
const JW = require("../Training/JaroWinkler.js");

const Message = async(client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (message.channel.name.toLowerCase() == "training") {
            Session.receive(message);
        }
    if (message.content.indexOf(conf.Discord.prefix) !== 0) return;
    if (!message.content.startsWith(conf.Discord.prefix)) return;

    const args = message.content.slice(conf.Discord.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    Command.trigger(client, message, args, cmd);
    
  
};

module.exports.init = Message;