const {
    MessageEmbed,
    ReactionCollector
} = require('discord.js');

module.exports = {
    name: "send",
    category: "information",
    description: "Gives info about the selected command!",
    run: async (client, message, args) => {


        let ruleembeddesc = [
            "1) Disruptive behaviour is not tolerated. This includes (but is not limited to) spam, slurs, hate speech, harassment, insults, witch-hunting, and impersonation.",
            " ",
            "2) NSFW (Not Safe For Work) content is prohibited in all text and voice channels.",
            " ",
            "3) The discussion of the following topics are not permitted: Race, Religion, Politics.",
            " ",
            "4) If you create a consistently negative experience for others, even if you're not technically breaking the rules in any specific instance, we'll treat it as breaking the rules.",
            " ",
            "5) Posting content known to crash Discord or that could cause non-malicious effects to a members PC are prohibited in all text channels.",
            " ",
            "6) Advertisement is only permitted in #deleted-channel. Discord invite links are not permitted unless discussed with the management team.",
            " ",
            "7) This server is English speaking. We kindly ask that you only use English to communicate with members on this server.",
            " ",
            "8) Final verdict and rule interpretation is at management team discretion. If you are asked by an Admin/C-Rep to stop doing something, stop doing it.",
            "• If you have questions regarding a decision made by either an Admin or C-Rep, please contact us by sending a DM to @ModMail.",
            " ",
            "Infractions will typically progress as such: warn -> mute -> ban. Steps in this progression may be skipped based on the severity of the infraction.",
            " ",
            "In addition to these rules, the management team reserves the right to remove messages and users from the server that are detrimental to the discussion and community.",
            "Since this is the first page you are seeing, ignorance of the rules does not excuse breaking them."
        ]

        const rulesembed = new MessageEmbed()
            .setTitle('2ez Rules')
            .setDescription(ruleembeddesc)
            .setColor('BLUE')
            .setThumbnail('https://cdn.discordapp.com/attachments/753238962050695228/813016413131243550/Rules.png')

        if (!args[0]) {

            return message.channel.send('Chose from one of the following options  : *send rules ');

        } else if (args[0] == 'rules') {

            return message.channel.send(rulesembed);

        } else {

            return message.channel.send('Thats not a valid option!');

        }




    }
}