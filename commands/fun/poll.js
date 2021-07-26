const {
    MessageEmbed
} = require('discord.js');

const Discord = require('discord.js');
const UserIDCount = new Set();


module.exports = {

    name: "poll",
    run: async (client, message, PREFIX) => {

        var iyes = 0;
        var xno = 0;

        let args = message.content.substring(PREFIX.length).split(" ");

        let suggestion = args.slice(1).join(" ");

        let suggestionembed = new MessageEmbed()
            .setTitle('New Poll')
            .setDescription(suggestion)
            .setFooter(`Suggestion from ${message.author.username}`)
            .setTimestamp()
            .setColor('BLUE')


        message.channel.send(suggestionembed)
            .then(m => {
                m.react('✅');
                m.react('❌');


                const yesfilter = (reaction, user) => reaction.emoji.name === '✅';
                const yescollector = m.createReactionCollector(yesfilter, {
                    max: 100,
                });

                yescollector.on('collect', async (reaction, user) => {

                    let useravatar = user.displayAvatarURL({
                        format: 'png',
                        dynamic: true
                    });

                    if (user.id === "830087071413567519") return;
                    reaction.users.remove(user.id);

                    if (!UserIDCount.has(user.id)) {

                        xno = xno - 1;

                    }

                    if (UserIDCount.has(user.id)) return;

                    iyes = iyes + 1 * 1

                    const editsuggestion = new MessageEmbed()
                        .setTitle(`New Poll`)
                        .setDescription(suggestion) // ${i}
                        .addField('Yes', iyes)
                        .addField('No', xno)
                        .setTimestamp()
                        .setColor('BLUE')

                    UserIDCount.add(user.id);
                    m.edit(editsuggestion);


                });



                const nofilter = (reaction, user) => reaction.emoji.name === '❌';
                const nocollector = m.createReactionCollector(nofilter, {
                    max: 100,
                });

                nocollector.on('collect', async (reaction, user) => {

                    let useravatar = user.displayAvatarURL({
                        format: 'png',
                        dynamic: true
                    });

                    if (user.id === "830087071413567519") return;
                    reaction.users.remove(user.id);

                    if (UserIDCount.has(user.id)) {

                        iyes = iyes - 1

                    }

                    if (!UserIDCount.has(user.id)) return;

                    xno = xno + 1 * 1

                    const editsuggestion = new MessageEmbed()
                        .setTitle(`New Poll`)
                        .setDescription(suggestion) // ${i}
                        .addField('Yes', iyes)
                        .addField('No', xno)
                        .setTimestamp()
                        .setColor('BLUE')

                    UserIDCount.delete(user.id);
                    m.edit(editsuggestion);


                });



            })
    }

}