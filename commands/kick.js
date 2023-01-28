/**
 * kick.js is a command that kicks a user should the executor has the correct permissions.
 * 
 */
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a member from the server.')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option => 
            option.setName('Target')
            .setDescription('User to be kicked.')
            .setRequired(true)
        )
        .addStringOption( option =>
            option.setName('Reason')
            .setDescription('Reason for the kick.')
            ),
    async execute(interaction){
        const {channel, options} = interaction;

        const user = options.getUser('Target');
        const reason = options.getString('Reason') || 'No reason provided';

        const member = await interaction.guild.members.fetch(user.id);

        const noPermEmbed = new EmbedBuilder()
            .setDescription(`You cannot kick ${user.username} due to higher permissions.`)
            .setColor(0xc72c3b)

        if (member.roles.highest.position >= interaction.member.highest.position){
            return interaction.reply({embeds: [noPermEmbed], ephemeral: true})
        }
        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setDescription(`Successfully kicked ${user} with reason ${reason}`);
        
            await interaction.reply({embeds: [embed],})
    },
};