const {
    MessageEmbed,
    MessageFlags
} = require('discord.js');


module.exports = {
    name: 'remove',

    run: async (client, message, args) => {

        if (message.channel.id == '587956575315034114') {

            let useembed = new MessageEmbed()
                .setTitle('Incorrect Usage')
                .setDescription('Its `<username | user id> <role name>')
                .setColor('RED')

            let STTpermissions = new MessageEmbed()
                .setDescription('Please give the Bot Permissions to do this!')
                .addField('Needed', '`MANAGE_ROLES`')
                .setColor('RED')

            let nomember = new MessageEmbed()
                .setDescription('Please mention someone, or provide an ID!')
                .addField('Also check, if the user is still on this Server!', `Request: ${message.author.username}`)
                .setColor('RED')

            let norole = new MessageEmbed()
                .setDescription('Please mention a role!')
                .setColor('RED')


            if (!message.guild.me.hasPermission('MANAGE_ROLES')) {

                return message.channel.send(STTpermissions);

            }


            if (!args[0] || !args[1]) return message.channel.send(useembed);


            try {

                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

                let Dontownrole = new MessageEmbed()
                    .setTitle('Wait a second!')
                    .setDescription('You cant remove roles that you dont have!')
                    .addField('You tried to remove ', `${roleName}`)
                    .setColor('RED')
                    .setTimestamp()

                if (!member) return message.channel.send(nomember);
                if (args[0].length == 18) console.log('An ID was being used!');

                const alreadyHasRole = member._roles.includes(roleName.id);

                if (!alreadyHasRole) return message.channel.send('This User does not have that Role!');
                if (!message.member.roles.cache.some(role => role.name === roleName.name)) return message.channel.send(Dontownrole);


                const embed = new MessageEmbed()
                    .setTitle(`${roleName.name} was removed!`)
                    .setDescription(`You updated the roles for ${member.user}`)
                    .addField('Removed', `${roleName}`, true)
                    .addField('Role ID', `${roleName.id}`, true)
                    .setColor('GREEN')
                    .setTimestamp()
                    .setFooter(`${message.author.username}`)
                    .setThumbnail(member.user.displayAvatarURL({
                        dynamic: true
                    }))

                return member.roles.remove(roleName).catch((e) => {

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

            console.log('*RETURN was used in the wrong channel!');
            message.channel.send('This command is currently unavailable!');
            return;

        }

    }
}