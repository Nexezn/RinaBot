/**
 * ban.js is a command that bans a member for a desired length.
 * 
 */
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a member from the server.')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => 
            option.setName('Target')
            .setDescription('User to be banned.')
            .setRequired(true)
        )
        .addStringOption( option =>
            option.setName('Reason')
            .setDescription('Reason for the ban.')
            ),
    //TODO: create integer option for amount of days to be banned.
    async execute(interaction){
        const {channel, options} = interaction;

        const user = options.getUser('Target');
        const reason = options.getString('Reason') || 'No reason provided';

        const member = await interaction.guild.members.fetch(user.id);

        const noPermEmbed = new EmbedBuilder()
            .setDescription(`You cannot ban ${user.username} due to higher permissions.`)
            .setColor(0xc72c3b)

        if (member.roles.highest.position >= interaction.member.highest.position){
            return interaction.reply({embeds: [noPermEmbed], ephemeral: true})
        }
        await member.ban({ deleteMessageDays: 1, reason: reason}).catch(console.error);

        const embed = new EmbedBuilder()
            .setDescription(`Successfully banned ${user} with reason ${reason}`);
        
            await interaction.reply({embeds: [embed],})
    },
};