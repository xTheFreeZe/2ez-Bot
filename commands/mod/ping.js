const {
    MessageEmbed,
    Message
} = require('discord.js');

module.exports = {
    name: "ping",
    category: "mod",
    description: "Ping of the Bot",
    run: async (client, message) => {

        var ping = client.ws.ping;

        let highping = ping > 150;

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(":ping_pong: Ping of 2ez Bot is `" + `${ping}` + " ms`")
        await message.channel.send(embed);
        
        if (highping) message.channel.send('High Ping detected! This could lead to slow messages!');
    }
}