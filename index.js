const Discord = require('discord.js');

const client = new Discord.Client();

const {
    MessageEmbed
} = require('discord.js');

const PREFIX = '*';
const SniffCheck = new Set;



//const Canvas = require('canvas');

client.on('ready', () => {
    const channel = client.channels.cache.get('589929952837894144');
    const rebootAdminchannel = client.channels.cache.get('753693196680429698');
    let restartembed = new MessageEmbed()
        .setDescription('Bot restarted!')
        .setColor('RANDOM')
    console.log("Ready to welcome some people!")
    rebootAdminchannel.send(restartembed);
    client.user.setActivity(`with ${channel.guild.memberCount} people!`)
});

const {
    Collection
} = require("discord.js");

client.commands = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on('message', async message => {

    let PREFIX = '*';

    if (!message.guild) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);

    if (command)
        command.run(client, message, args);

})

/*

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

*/


client.on('message', message => {
    if (message.content === '*join') {

        if (message.author.id !== '420277395036176405') return;

        client.emit('guildMemberAdd', message.member);
    }
});

client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    let author = msg.author

    switch (args[0]) {
        case "toggleSniffoff":

            if (!msg.guild) return;

            if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You can not use that!');

            SniffCheck.add(msg.guild.id);


            msg.channel.send('The Sniff-Emote reaction has been toggled to `off`');



    }
})


client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    let author = msg.author

    switch (args[0]) {
        case "toggleSniffon":

            if (!msg.guild) return;
            if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You can not use that!');

            SniffCheck.delete(msg.guild.id);


            msg.channel.send('The Sniff-Emote reaction has been toggled to `on`');



    }
})


client.on('message', message => {
    if (message.content === '*test') {

        if (message.author.id !== '420277395036176405') return;

        const channel = client.channels.cache.get('589929952837894144');
        const welcomechannel = client.channels.cache.get('585883817458401342');

        if (`${channel.guild.memberCount}` == 990) welcomechannel.send('Just testing something!');
    }
});

client.on('message', message => {

    if (message.channel.id == '585883817458401342') {

        if (SniffCheck.has(message.guild.id)) return;

        if (message.author.id == '317630435008053248') {

            if (SniffCheck.has(message.guild.id)) return;

            message.react('<:Sniff_SWAG:766369729338146846>');

        }

        return;

    }
})

client.on('message', message => {
    if (message.content.toLowerCase().includes("sniff")) {

        if (SniffCheck.has(message.guild.id)) return;
        if (message.author.bot) return;

        message.react('<:Sniff_SWAG:766369729338146846>')
    }
});


client.on('message', message => {
    if (message.content === '*members') {

        const channel = client.channels.cache.get('589929952837894144');
        const welcomechannel = client.channels.cache.get('585883817458401342');

        const embed = new MessageEmbed()
            .setDescription(`${message.guild.name} has **${message.guild.memberCount}** members.`)
            .setColor('RANDOM')

        message.channel.send(embed);
    }
});


client.on('guildMemberAdd', async member => {

    const errorembed = new MessageEmbed()
        .setDescription('<:2ez_No:837430657667825677> An Error occurred!')
        .setColor('RED')

    const reembed = new MessageEmbed()
        .setDescription(`${member}`)


    const welcomechannel = client.channels.cache.get('585883817458401342');

    const channel = client.channels.cache.get('589929952837894144');

    if (!channel) return console.log('welcome returned.');
    if (!welcomechannel) return console.log('no welcome channel found!');

    const embedcontent = [
        `Please welcome **${member.displayName}** to the Server <:pogU:836244303034318908>`,
        " ",
        `**${channel.guild.name}** now has **${channel.guild.memberCount}** members`
    ]

    const embed = new MessageEmbed()
        .setDescription(embedcontent)
        .setColor('RANDOM')
        .setTimestamp()

    const content = [
        `Remember to read the rules in <#753238962050695228>.`,
        ` `,
        `You can assign yourself the roles you want in <#822811391240962048>!`

    ]

    const pictures = [
        'https://cdn.discordapp.com/attachments/681060754564448257/830346710404431892/2ez_banner_1.png',
        'https://cdn.discordapp.com/attachments/681060754564448257/830346717329096714/2ez_banner_2.png',
        'https://cdn.discordapp.com/attachments/681060754564448257/830346731157192724/2ez_banner_3.png'
    ]

    if (!pictures) console.log('welcome returned! No Links found');

    const randompicture = pictures[Math.floor(Math.random() * pictures.length)];


    if (!randompicture) {

        console.log('An Error occurred! No random pictures were found!')
        return channel.send(errorembed), welcomechannel.send(embed)

    }

    const welcomeembed = new MessageEmbed()
        .setTitle(`Welcome to the 2ez Community Server!`)
        .setDescription(content)
        .setImage(randompicture)
        .setColor('RANDOM')

    await channel.send(`Welcome to the Server ${member}!`, welcomeembed);

    welcomechannel.send(embed);



})






client.login(process.env.token);