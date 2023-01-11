const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uwu')
        .setDescription('eh?~ watashi?'),
    async execute(interaction){
        await interaction.reply('OwO');
    },
};