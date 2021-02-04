let CommandLoader = require("../Src/Loaders/Commands");
let CommandsReloader = require("../Src/Reloaders/CommandsReloader");
let EventsReloader = require("../Src/Reloaders/EventsReloader");
let ProcessHandler = require("../Src/Handlers/ProcessHandler");

let conf = require("../Settings/conf.json")
let Ready = async(client) => {
    client.user.setActivity(`Watching ${client.guilds.cache.size} guilds`)
    if (client.guilds.cache.size < 1) {
        client.generateInvite({
            permissions: conf.Discord.invite_link_perms,
        }).then(link => console.log(`Generated bot invite link: \n${link}`)).catch(console.error);
    }
    console.log("[Ready Event]: Bot Online And Ready!");
    console.log(client.user.username)
    console.log(client.user.id)
    console.log(`${client.guilds.cache.size} Guilds! and ${client.users.cache.size} Users!`)
    client.conf = conf;
    ProcessHandler.init();
    CommandLoader.load();
    CommandsReloader.init();
    EventsReloader.init(client);
};
module.exports.init = Ready;