const Command = require("../classes/voyunPride/Command");

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Zar extends Command {
    constructor(client) {
        super(client, {
            name: "zar",
            enabled: true,
            guildOnly: false,
            aliases: ["dice"],
            hodorRequired: false,
            timeout: 10000
        });
    }

    async run(message, suffix) { // eslint-disable-line no-unused-vars
        if (!suffix) return message.channel.send(`Usage:\n\n${this.client.ayarlar.kapi}zar min-max`, { code: true });
        if (!suffix.includes("-")) return message.channel.send("Ayırıcı eksik.\n\nKullanılması gereken ayraç: -", { code: true });

        let arr = suffix.split("-");
        if (arr.length !== 2) return message.reply("fazla fazla gir hele oh. İki sayıyla bir aralık vermen lazım. 12-45 gibi.");

        let val1 = parseInt(arr[0]);
        if (!val1 && val1 !== 0) return message.reply("ula ilk sayı yok!");

        let val2 = parseInt(arr[1]);
        if (!val2 && val2 !== 0) return message.reply("ulan ikinci sayı yok!");

        if (val1 >= val2) return message.reply("şu sayıları düzgün ver lütfen.");

        message.channel.send(`I pick ${getRandomIntInclusive(val1, val2)}`);
    }
}

module.exports = Zar;
