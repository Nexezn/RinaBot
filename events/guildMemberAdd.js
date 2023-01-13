const { Events, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

module.exports = {
    name: Events.GuildMemberAdd,

    async execute(interaction){
        //TODO:Greet user first in the bridge!

        //TODO: Attach image of them.
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('yimages/wallpaper.png');

        //Stretch image onto the entire canvas
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        //Use attatchment class to process file
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-join-image.png' });

        interaction.reply({ content: `Welcome ${interaction.client.user.tag} to HeartBeat Garage!`, files: [attachment]})
    },
};