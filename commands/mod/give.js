const {
    MessageEmbed,
    MessageFlags
} = require('discord.js');


module.exports = {
    name: 'give',

    run: async (client, message, args) => {

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

        let norole = new MessageEmbed()
            .setDescription('Please mention a role!')
            .setColor('RED')

        let rolefirst = new MessageEmbed()
            .setDescription('Please dont put the role in the front! Its `<username | user id> <role name> !')
            .setColor('RED')



        if (!message.guild.me.hasPermission('MANAGE_ROLES')) {

            return message.channel.send(STTpermissions);

        }

        if (!message.channel.id == '587956575315034114') return;

        if (!args[0] || !args[1]) return message.channel.send(useembed);


        try {

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

            if (args[0] = roleName) return message.channel.send()

            if (!member) return message.channel.send(nomember);
            if (!roleName) return message.channel.send(norole);

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

            return message.channel.send('Error').then(() => console.log(e));
        }


    }
}