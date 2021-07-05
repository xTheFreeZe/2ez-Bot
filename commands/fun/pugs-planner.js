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
            .setTitle('Unoffical Pugs')
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
                var i;
                const collector = m.createReactionCollector(filter, {
                    max: 100,
                }); // 5 min

                collector.on('collect', (reaction, user) => {

                    pugsembed.setDescription(`${user.tag} joined the Pugs!`);
                    pugsembed.setFooter('You successfully joined the Pugs!');

                    message.channel.send(pugsembed);

                });
            })
            .catch(err => console.error(err));

    }
}