/**
 * profile.js defines a command that is mainly used for testing image manipulation.
 * This code will be integrated with guildMemberAdd.js 
 * 
 */
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { request } = require('undici');
const Canvas = require('@napi-rs/canvas');
const { applyText } = require('../utils/textUtil.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Test command for join event.'),
    async execute(interaction){

        //TODO: Attach image of them.
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('images/wallpaper.png');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);


        /*
        TODO: Fix not a function error coming from textUtil
        context.font = '28px sans-serif';
        context.fillStyle = '#ffffff';
		context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);

        context.font = applyText(Canvas, `${interaction.member.displayName}!`);
		context.fillStyle = '#ffffff';
		context.fillText(`${interaction.member.displayName}`, canvas.width / 2.5, canvas.height / 1.8);
        */
        

        
        context.font = '60px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText(interaction.member.displayName, (canvas.width / 2), (canvas.height / 1.8));
        


        //DrawShapes with pen
        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        //Draw images onto the entire canvas
        const { body } = await request(interaction.user.displayAvatarURL( { extension: 'jpg'}));
        const avatar = await Canvas.loadImage(await body.arrayBuffer());
        context.drawImage(avatar, 25, 25, 200, 200);

        //Use attatchment class to process file
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-join-image.png' });

        interaction.reply({ content: `Welcome ${interaction.client.user.tag} to HeartBeat Garage!`, files: [attachment]})

    },
};