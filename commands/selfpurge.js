const Command = require("../classes/voyunPride/Command");

class SelfPurge extends Command {
    constructor(client) {
        super(client, {
            name: "selfpurge",
            enabled: true,
            guildOnly: false,
            hodorRequired: true,
            timeout: 1000000
        });
    }

    async run(message, suffix, args) { // eslint-disable-line no-unused-vars
        if (!message.channel.permissionsFor(message.guild.member(this.client.user)).has("MANAGE_MESSAGES")) return;
        let m = (await message.channel.fetchMessages({ limit: 100 }))
            .filter(m => m.author.id === this.client.user.id)
            .filter(m => m.deletable)
            .sort((a, b) => a.id - b.id);
        
        if (m.size > 0) await message.channel.bulkDelete(m);
    }
}

module.exports = SelfPurge;
