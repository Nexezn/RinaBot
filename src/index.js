/*
Rinabot updated to DiscordJS v14.
Invoke with 'npm run start:dev'
*/
require('dotenv').config();
const {Client, Collection, Events, GatewayIntentBits, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const  fs  = require('fs');
const  path  = require('path');


const client = new Client({intents: ['Guilds', 'GuildMessages']});
client.commands = new Collection();

//Dynamically retrieve command files.
const commands = [];
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    //Set new item in collection with the key as the command name and the vlaue as exported module.
    if ('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());

    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}


const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({version: '10'}).setToken(TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in!`);
});

//Command listener which responds with proper command if exists, logs and ignores if nonexistent.
client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()){

        const command = client.commands.get(interaction.commandName);

        if (!command){
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try{
            await command.execute(interaction);
        } catch (error){
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
});

/**
 * main is a asynchronous function which updates commands supported by Rina, additionally it will also login the bot.
 * 
 */
async function main(){

    

    try{
        console.log("Started refreshing application (/) commands.");
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
      client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
}

main();
