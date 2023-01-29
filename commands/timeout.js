/**
 * timeout.js is a command that timesout a member of a server for a desired length.
 * 
 */
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timesout a member in the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option => 
            option.setName('Target')
            .setDescription('Name of member.')
            .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('time')
            .setDescription('Length of timeout.')
            .setRequired(true)
            )
        .addStringOption( option =>
            option.setName('Reason')
            .setDescription('Reason for the timeout.')
            ),
    async execute(interaction){
        const {channel, options} = interaction;

        const user = options.getUser('Target');
        const reason = options.getString('Reason') || 'No reason provided';
        let time = options.getInteger('time');
        if (!time){
            time = null;
        }
        const timeConvert = time * 60 * 1000;

        const member = await interaction.guild.members.fetch(user.id);

        const noPermEmbed = new EmbedBuilder()
            .setDescription(`You cannot kick ${user.username} due to higher permissions.`)
            .setColor(0xc72c3b)

        if (member.roles.highest.position >= interaction.member.highest.position){
            return interaction.reply({embeds: [noPermEmbed], ephemeral: true})
        }
        await member.timeout(time == null  ? null : timeConvert).catch(console.error); 

        const embed = new EmbedBuilder()
            .setDescription(`Successfully Timedout ${user} with reason ${reason} for ${timeConvert}`);
        
            await interaction.reply({embeds: [embed],})
    },
};