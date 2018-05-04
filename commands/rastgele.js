const Command = require("../classes/voyunPride/Command");

class Rastgele extends Command {
    constructor(client) {
        super(client, {
            name: "rastgele",
            enabled: true,
            guildOnly: false,
            aliases: ["flip"],
            hodorRequired: false,
            timeout: 10000
        });
    }

    async run(message, suffix, args) { // eslint-disable-line no-unused-vars
        if (!suffix) return message.channel.send(`Usage:\n\n${this.client.ayarlar.kapi}rastgele something|anotherthing`, { code: true });
        if (!suffix.includes("|")) return message.channel.send("Ayırıcı eksik.\n\nKullanılması gereken ayraç: |", { code: true });
        try {
            let arr = suffix.split("|");
            let msg = this.client.utils.arrand(arr);
            if (msg.length === 0) msg = "** **";
            await message.channel.send(msg);
        } catch (error) {
            await message.channel.send("Bir hata oldu, acaba bir şeyleri eksik mi yazdın yoksa ben mi çöpüm?");
            this.client.logger.error(error);
        }
    }
}

module.exports = Rastgele;
