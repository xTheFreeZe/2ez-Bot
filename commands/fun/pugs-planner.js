const {
    MessageEmbed,
    Client,
} = require('discord.js');


const Discord = require('discord.js');
const UserIDCount = new Set();
const UsedPlan = new Set();


module.exports = {
    name: "plan",
    run: async (client, message, PREFIX) => {

        let args = message.content.substring(PREFIX.length).split(" ");

        var time = args.slice(1).join(" ");

        if (isNaN(time)) {

            message.channel.send('Please only provide numbers! Example : *plan 20 ( All times in CEST ) ').then(m => (m.delete({
                timeout: 10000
            })))
            return;

        }

        if (time > 24) {

            message.channel.send('Please keep your time in the following format : 0 - 24');
            return;

        }

        if (time < 0) {

            message.channel.send('Please keep your time in the following format : 0 - 24');
            return;

        }


        let avatar = message.author.displayAvatarURL({
            format: 'png',
            dynamic: true
        });

        if (!time) return message.channel.send('Time missing!');

        var i = 0;

        let pugsembed = new MessageEmbed()
            .setTitle(`${message.author.username}'s unoffical pugs`)
            .setDescription('React below to enter the Pugs!')
            .addField('Time', `${time} CEST`)
            .setFooter(`${message.author.username}`, avatar)
            .setTimestamp()
            .setColor('GREEN')

        UsedPlan.add(message.author.id);

        message.channel.send(pugsembed)
            .then(m => {
                m.react('✅');
                m.react('❌');
                m.react('🔁');
                m.react('🧨');

                const filter = (reaction, user) => reaction.emoji.name === '✅'; // && user.id === message.author.id;
                const collector = m.createReactionCollector(filter, {
                    max: 100,
                });

                collector.on('collect', async (reaction, user) => {

                    let useravatar = user.displayAvatarURL({
                        format: 'png',
                        dynamic: true
                    });

                    if (user.id === "830087071413567519") return;
                    reaction.users.remove(user.id);
                    if (UserIDCount.has(user.id)) return;

                    i = i + 1 * 1

                    var userNamesYES = [

                    ];

                    userNamesYES.push(user.username);

                    const editpugs = new MessageEmbed()
                        .setTitle(`${message.author.username}'s unoffical pugs`)
                        .setDescription(`Available users : ${i}`) // ${i}
                        .addField('Time', time)
                        .addField('Available', userNamesYES)
                        .setFooter(`${user.username}`, useravatar)
                        .setTimestamp()
                        .setColor('GREEN')

                    UserIDCount.add(user.id);
                    m.edit(editpugs);

                    //One hour in milliseconds = 3,600,000!

                });

                const crossfilter = (reaction, user) => reaction.emoji.name === '❌';
                const crosscollector = m.createReactionCollector(crossfilter, {
                    max: 100,
                });

                crosscollector.on('collect', async (reaction, user) => {

                    if (user.id === "830087071413567519") return;
                    reaction.users.remove(user.id);
                    if (!UserIDCount.has(user.id)) return;

                    i = i - 1 * 1

                    if (i < 0) {

                        i = 0;
                    }

                    var userNamesNO = [
                        "Users",
                    ];

                    var userNamesNOsecond = [
                        user.username,
                    ]

                    const userNamesNOfinal = userNamesNO.concat(userNamesNOsecond);

                    userNamesNO.push(user.username);

                    const editpugs = new MessageEmbed()
                        .setTitle(`${message.author.username}'s unoffical pugs`)
                        .setDescription(`Available users : ${i}`)
                        .addField('Time', time)
                        .addField('Not available', userNamesNOfinal)
                        .setTimestamp()
                        .setColor('GREEN')

                    if (i = 0) editpugs.setDescription('React below to enter the Pugs!');

                    UserIDCount.delete(user.id);
                    m.edit(editpugs);

                });


                const resetfilter = (reaction, user) => reaction.emoji.name === '🔁';
                const resetcollector = m.createReactionCollector(resetfilter, {
                    max: 100,
                });

                resetcollector.on('collect', async (reaction, user) => {

                    if (user.id === "830087071413567519") return;

                    await reaction.users.remove(user.id);

                    if (user.id !== message.author.id) {

                        return message.channel.send(`> ${user}: Only the creator of the Pug (${message.author.username}) can reset the Counter!`).then(message => message.delete({
                            timeout: 3000
                        }));

                    }

                    if (i = 0) return message.channel.send('The counter already is at 0!');


                    i = 0;
                    UserIDCount.delete(user.id);

                    const editpugs = new MessageEmbed()
                        .setTitle(`${message.author.username}'s unoffical pugs`)
                        .setDescription(`Available users : ${i}`) // ${i}
                        .addField('Time', time) // time
                        .setFooter(`${message.author.username}`, avatar)
                        .setTimestamp()
                        .setColor('GREEN')

                    m.edit(editpugs);

                    message.channel.send("Counter is back to 0.").then(message => message.delete({
                        timeout: 3000
                    }));

                });


                const crashfilter = (reaction, user) => reaction.emoji.name === '🧨';
                const crashcollector = m.createReactionCollector(crashfilter, {
                    max: 100,
                });

                crashcollector.on('collect', async (reaction, user) => {

                    if (user.id === "830087071413567519") return;

                    await reaction.users.remove(user.id);

                    if (user.id !== message.author.id) {

                        return message.channel.send(`> ${user}: Only the creator of the Pug (${message.author.username}) can collaps this message`).then(message => message.delete({
                            timeout: 5000
                        }));

                    } else {

                        m.delete();
                        message.delete()
                        message.channel.send('Your Pug Message has been deleted!').then(message => message.delete({
                            timeout: 5000
                        }))

                    }

                });

            })
            .catch(err => console.error(err));

    }
}