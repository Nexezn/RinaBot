const { Events, GuildMember } = require('discord.js');


module.exports = {
    name: Events.GuildMemberRemove,
    once: false,

    /**
     * 
     * @param {object} member 
     */
    async execute(member){
        //TODO: Notify server someone left in specific channel and log it.
        const welcomeChannel = member.guild.channels.get('989288360281526303');
        welcomeChannel.send({ content: `${member.user.tag} has left the server.`});
    },
};