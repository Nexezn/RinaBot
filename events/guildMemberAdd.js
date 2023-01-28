/* 
Sends 
*/
const { Events, AttachmentBuilder, GuildMember } = require('discord.js');
const { request } = require('undici');
const Canvas = require('@napi-rs/canvas');
const { applyText } = require('../utils/textUtil.js');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,

    /**
     * 
     * @param {object} member 
     */
    async execute(member){

        //Get welcome channel ID and set it.
        const channelID = '989288360281526303';
        const welcomeChannel = member.guild.channels.cache.get(channelID);

        //Create background of welcome image.
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('images/wallpaper.png');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        //Draw Black Rectangle for text to be visible.
        context.fillStyle = '#000000';
        context.fillRect( 250, 50, 425, 150);

        //Settings for Welcome title.
        context.font = '36px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText('Welcome', 380, 75);
        
        //Settings for new user name.
        context.font = '60px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText(member.displayName, (canvas.width / 2), (canvas.height / 1.8));

        //DrawShapes with pen
        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        //TODO: REPLACE interaction.user with new user.
        const { body } = await request(member.client.user.displayAvatarURL( { extension: 'jpg'}));
        const avatar = await Canvas.loadImage(await body.arrayBuffer());
        context.drawImage(avatar, 25, 25, 200, 200);

        //Use attatchment class to process file
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-join-image.png' });

        welcomeChannel.send({ content: `Welcome ${member.client.user.tag} to HeartBeat Garage!`, files: [attachment]});
    },
};