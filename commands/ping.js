const Command = require("../classes/voyunPride/Command");

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            aliases: ["pong"]
        });
    }

    async run(message, suffix, args) { // eslint-disable-line no-unused-vars
        try {
            const msg = await message.channel.send("🏓 Ping!");
            msg.edit(`🏓 Pong! (Aramızdaki gecikme: ${msg.createdTimestamp - message.createdTimestamp}ms. 💙: ${Math.round(this.client.ping)}ms.)`);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = Ping;
