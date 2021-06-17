const {
    MessageEmbed,
    MessageFlags
} = require('discord.js');


module.exports = {
    name: 'remove',

    run: async (client, message, args) => {

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
            .setColor('RED')

        let norole = new MessageEmbed()
            .setDescription('Please mention a role!')
            .setColor('RED')



        if (!message.guild.me.hasPermission('MANAGE_ROLES')) {

            return message.channel.send(STTpermissions);

        }

        if (!message.channel.id == '587956575315034114') return;


        if (!args[0] || !args[1]) return message.channel.send(useembed);


        try {

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

            if (!member) return message.channel.send(nomember);
            //if (!roleName) return message.channel.send(norole);

            const alreadyHasRole = member._roles.includes(roleName.id);

            if (!alreadyHasRole) return message.channel.send('This User does not have that Role!');


            const embed = new MessageEmbed()
                .setTitle(`${roleName.name} was removed!`)
                .setDescription(`${roleName} was removed from ${member.user}`)
                .setColor('f3f3f3')
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
                .setDescription("An unexpected Error occured! If you see this, please contact the Developer!")
                .addField('Developer Info', e)
                .setColor('RED')

            return message.channel.send(errorembed).then(() => console.log(e));
        }


    }
}