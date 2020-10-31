const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const commandsScript  = require("./scripts/commandsReader");

const unknowCommand = require("./scripts/unknowCommand");

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

client.on("ready",()=>{
    client.user.setActivity("🎮 Among Us");
    console.log(`Starting ${client.user.tag}...`);
});


client.on("message", async (msg)=>{ 
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
    
    const havePrefix = await db.get('prefixes').find({guildId: msg.guild.id}).value();
    var prefix;

    if(!havePrefix){
        prefix = '@';
    } else {
        prefix = havePrefix.prefix;
    }
    if(!msg.content.startsWith(prefix)) return;
    const args = msg.content.toLowerCase().split(" ");

    const commands = commandsScript(prefix);

    if(args[0].split("")[0] === prefix) {
        if(!msg.author.bot && msg.guild){
            const args = msg.content.toLowerCase().split(" ");
            if(commands[args[0]]) commands[args[0]](client,msg);
            else if(args[0].split("")[0] == prefix) unknowCommand(client,msg);
        }
    }
});

client.login(config.token);