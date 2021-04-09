const Discord = require('discord.js');

const client = new Discord.Client();

const {
    MessageEmbed
} = require('discord.js');


const Canvas = require('canvas');

client.on('ready', () => {
    console.log("Ready to welcome some people!")
    client.user.setActivity('with 2ez')
});



const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');


    let fontSize = 70;

    do {

        ctx.font = `${fontSize -= 10}px sans-serif`;

    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
};



client.on('guildMemberAdd', async member => {

    const channel = client.channels.cache.get('589929952837894144');

    if (!channel) return console.log('Welcome message wasnt sent! Channel did not exist!');


    const canvas = Canvas.createCanvas(700, 250);

    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./pictures/2ez banner 2.png');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';

    ctx.strokeRect(0, 0, canvas.width, canvas.height);


    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);


    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#000000';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);


    ctx.beginPath();

    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);

    ctx.closePath();

    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: 'jpg'
    }));

    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachement = new Discord.MessageAttachment(canvas.toBuffer(), 'stt-logo.jpg');


    const messagetext = [
        `**Welcome to the server ${member}!** `,
        `**Remember to read the rules in <#753238962050695228>.**`,
        `*You can assign yourself the roles you want in <#822811391240962048>*`
    ]




    channel.send(messagetext, attachement);
})


client.on('message', message => {
    if (message.content === '*join') {
        client.emit('guildMemberAdd', message.member);
    }
});






client.login(process.env.token);