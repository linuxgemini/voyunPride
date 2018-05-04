const Command = require("../classes/voyunPride/Command");

class PurgeCommands extends Command {
    constructor(client) {
        super(client, {
            name: "purgecommands",
            enabled: true,
            guildOnly: false,
            aliases: ["clearcommands"],
            hodorRequired: true,
            timeout: 10000000
        });
    }

    async run(message, suffix, args) { // eslint-disable-line no-unused-vars
        if (!message.channel.permissionsFor(message.guild.member(this.client.user)).has("MANAGE_MESSAGES")) return;
        let m = (await message.channel.fetchMessages({ limit: 100 }))
            .filter(m => m.content.startsWith(this.client.ayarlar.kapi))
            .filter(m => m.deletable)
            .sort((a, b) => a.id - b.id);

        if (m.size > 0) await message.channel.bulkDelete(m);
    }
}

module.exports = PurgeCommands;
