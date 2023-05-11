import { config } from "dontenv";
import fs from "fs";

import { REST, Routes } from "discord.js";

config();

module.exports = (client) => {
  client.handleCommands = async () => {
    const cmdFolders = fs.readdirSync("./src/commands");
    for (const folder of cmdFolders) {
      const cmdFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of cmdFiles) {
        const cmd = require(`../../commands/${folder}/${file}`);
        commands.set(commmand.data.name, cmd);
        commandArray.push(command.data.toJSON());
      }
    }

    // initialize client_id
    const clientId = process.env.CLIENT_ID;

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    try {
      console.log("Theo Assist | Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommand(clientId), {
        body: client.commandArray,
      });

      console.log(
        "Theo Assist | Successfully refreshed application (/) commands!"
      );
    } catch (err) {
      console.error(err);
    }
  };
};
