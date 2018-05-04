const Command = require("../classes/voyunPride/Command");

class botukapat extends Command {
    constructor(client) {
        super(client, {
            name: "botukapat", // komutun adı
            enabled: true, // komutun açık olup olmadığını belirler
            guildOnly: false, // komutun sadece sunucularda mı çalışacağını belirler
            aliases: ["shutdown"], // komutun takma adlarını belirler
            hodorRequired: true, // komutun sadece config.js'de belirtilen kullanıcıların çalıştırabileceğini belirler
            timeout: 0 // komut çalıştırıldıktan sonra, 1 saniye boyunca kullanılamaz.
        });
    }

    async run(message, suffix, args) { // eslint-disable-line no-unused-vars
        try {
            message.channel.send("ResidentSleeper").then(() => {
                this.client.logger.log("ResidentSleeper received.");
                process.exit(0);
            });
        } catch (error) {
            message.channel.send("Bir hata oluştu. Geliştirici konsolunu kontrol edin.", { code: true });
            this.client.logger.error(error);
        }
    }
}

module.exports = botukapat;