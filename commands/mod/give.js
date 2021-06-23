const {
    MessageEmbed,
    MessageFlags
} = require('discord.js');


module.exports = {
    name: 'give',

    run: async (client, message, args) => {


        if (message.channel.id == '821393051561361493') {

            let useembed = new MessageEmbed()
                .setTitle('Incorrect Usage')
                .setDescription('Its `<username | user id> <role name> !')
                .setColor('RED')

            let STTpermissions = new MessageEmbed()
                .setDescription('Please give the Bot Permissions to do this!')
                .addField('Needed', '`MANAGE_ROLES`')
                .setColor('RED')

            let nomember = new MessageEmbed()
                .setDescription('Please mention someone, or provide an ID!')
                .setColor('RED')

            let Nservermember = new MessageEmbed()
                .setDescription('It looks like this person is no longer on this server!')
                .setColor('RED')

            let norole = new MessageEmbed()
                .setDescription('Please mention a role!')
                .setColor('RED')

            let memberfirst = new MessageEmbed()
                .setDescription('Please mention a member as your first argument!')
                .setColor('RED')


            if (!message.guild.me.hasPermission('MANAGE_ROLES')) {

                return message.channel.send(STTpermissions);

            }

            if (!args[0] || !args[1]) return message.channel.send(useembed);


            try {

                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));


                if (!member) message.channel.send(nomember).then(() => {
                    if (!message.guild.member) return message.channel.send(Nservermember);
                })
                //if (!roleName) return message.channel.send(norole);

                const alreadyHasRole = member._roles.includes(roleName.id);

                if (alreadyHasRole) return message.channel.send('User already has that role');


                const embed = new MessageEmbed()
                    .setTitle(`${roleName.name} was transferred!`)
                    .setDescription(`${roleName} was given to ${member.user}`)
                    .setColor('f3f3f3')
                    .setTimestamp()
                    .setFooter(`${message.author.username}`)
                    .setThumbnail(member.user.displayAvatarURL({
                        dynamic: true
                    }))

                return member.roles.add(roleName).catch((e) => {

                    message.channel.send('An Error occured!' + " " + e);

                    embed.setTitle('ERROR')
                    embed.setDescription('>' + " " + e)
                    embed.setColor('RED')



                }).then(() => message.channel.send(embed));




            } catch (e) {

                const errorembed = new MessageEmbed()

                    .setTitle('Error')
                    .setDescription("An unexpected Error occured!")
                    .addField('Make sure', 'you mentioned a role!')
                    .addField('Make sure', 'you got the right order! <user> <role>!')
                    .addField('Developer Info', e)
                    .setColor('RED')

                return message.channel.send(errorembed).then(() => console.log('An Error occured. Check the error message!'));
            }


        } else {

            console.log('*GIVE was used in the wrong channel!');
            message.channel.send('You can not use this command here!');
            return;

        }

    }

}