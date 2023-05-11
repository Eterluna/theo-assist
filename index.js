const dotenv = require("dotenv");
const fs = require("fs");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

// configure dotenv
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.commands = new Collection();
client.commandArray = [];

const fnFolders = fs.readdirSync(`./src/functions`);
for (const folder of fnFolders) {
  const fnFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of fnFiles) {
    require(`./src/functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();

// uncomment code below to check if it's working
// console.log(process.env.TOKEN);

client.login(process.env.TOKEN);
