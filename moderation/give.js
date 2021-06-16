const {
    MessageEmbed
} = require('discord.js');


module.exports = {
    name: 'give',

    run: async (client, message, args) => {

        let permsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> You can't use that ${message.author.username}!`)
            .addField("Error", 'Missing `MANAGE_ROLES`')
            .setColor("RED")

        let useembed = new MessageEmbed()
            .setTitle('Incorrect Usage')
            .setDescription('Its `<username | user id> <role name | id>')
            .setColor('RED')

        let STTpermissions = new MessageEmbed()
            .setDescription('<:STT_no:778545452218974209> Please give the Bot Permissions to do this!')
            .addField('Needed', '`MANAGE_ROLES`')
            .setColor('RED')


        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(permsembed);

        if (!message.guild.me.hasPermission('MANAGE_ROLES')) {

            return message.channel.send(STTpermissions);

        }

        if (!args[0] || !args[1]) return message.channel.send(useembed);


        try {

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

            const alreadyHasRole = member._roles.includes(roleName.id);

            if (alreadyHasRole) return message.channel.send('User already has that role');


            const embed = new MessageEmbed()
                .setTitle(`Role Name: ${roleName.name}`)
                .setDescription(`Successfully transfered the role ${roleName} to ${member.user}`)
                .setColor('f3f3f3')
                .setThumbnail(member.user.displayAvatarURL({
                    dynamic: true
                }))

            return member.roles.add(roleName).then(() => message.channel.send(embed));




        } catch (e) {

            return message.channel.send('Error').then(() => console.log(e));
        }


    }
}