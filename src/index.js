/*
Rinabot updated to DiscordJS v14.

*/
import { config } from 'dotenv';
import { Client } from 'discord.js';

//Loads in variables in .env file.
config();

const client = new Client({intents: ['Guilds', 'GuildMessages']});
const TOKEN = process.env.BOT_TOKEN;

client.login(TOKEN);