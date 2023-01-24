const { Events, AttachmentBuilder } = require('discord.js');
const { request } = require('undici');
const Canvas = require('@napi-rs/canvas');


module.exports = {
    name: Events.GuildMemberAdd,
    once: false,

    /**
     * 
     * @param {object} client 
     */
    async execute(client){

        const welcomeChannel = member.guild.channels.get('989288360281526303');

        //TODO: Attach image of them.
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('images/wallpaper.png');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        //TODO: REPLACE interaction.user with new user.
        const { body } = await request(interaction.user.displayAvatarURL( { extension: 'jpg'}));
        const avatar = await Canvas.loadImage(await body.arrayBuffer());


        //Text for user
        context.font = '28px sans-serif';

        //DrawShapes with pen
        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        //Draw images onto the entire canvas
        
        context.drawImage(avatar, 25, 25, 200, 200, canvas.height);

        //Use attatchment class to process file
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-join-image.png' });

        welcomeChannel.send({ content: `Welcome ${client.user.tag} to HeartBeat Garage!`, files: [attachment]});
    },
};