const {
    MessageEmbed,
    Client,
} = require('discord.js');


const Discord = require('discord.js');


module.exports = {
    name: "plan",
    run: async (client, message, PREFIX) => {

        let args = message.content.substring(PREFIX.length).split(" ");

        let time = args.slice(1).join(" ");

        let avatar = message.author.displayAvatarURL({
            format: 'png',
            dynamic: true
        })

        if (!time) return message.channel.send('Time missing!');

        let pugsembed = new MessageEmbed()
            .setTitle(`${message.author.username}'s unoffical pugs`)
            .setDescription('React below to enter the Pugs')
            .addField('Time', time)
            .setFooter(`${message.author.username}`, avatar)
            .setTimestamp()
            .setColor('GREEN')


        message.channel.send(pugsembed)
            .then(m => {
                m.react('✅');
                m.react('❌');

                const filter = (reaction, user) => reaction.emoji.name === '✅'; // && user.id === message.author.id;
                const collector = m.createReactionCollector(filter, {
                    max: 100,
                }); // 5 min

                collector.on('collect', async (reaction, user) => {

                    pugsembed.setTitle(`${user.username} joined the Pugs!`);
                    pugsembed.setDescription('`Number of players!`');
                    pugsembed.setFooter(user.id)

                    if (user.id === "830087071413567519") return;

                    await message.channel.send(pugsembed).then(m => m.delete({
                        timeout: 5000
                    })).catch(() => {
                        message.channel.send('An unknown error occured!');
                    })

                    message.channel.send(`${user.tag} joined the Pugs!`);

                });
            })
            .catch(err => console.error(err));

    }
}