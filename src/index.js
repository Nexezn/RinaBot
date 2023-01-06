/*
Rinabot updated to DiscordJS v14.
Invoke with 'npm run start:dev'
*/
import { config } from 'dotenv';
import { Client, CommandInteractionOptionResolver, Message, RouteBases, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

//Loads in variables in .env file.
config();



const client = new Client({intents: ['Guilds', 'GuildMessages']});
const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({version: '10'}).setToken(TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in!`);
});

async function main(){
    const commands = [
        {
            name: 'ping',
            description: 'Echos Pong!',
        }
    ];

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

//client.on('messageCreate.content', (message) => {
    //console.log(message.content);
//});