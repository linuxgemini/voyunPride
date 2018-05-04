const Command = require("../classes/voyunPride/Command");

class Yardım extends Command {
    constructor(client) {
        super(client, {
            name: "yardım",
            enabled: true,
            guildOnly: false,
            aliases: ["help"],
            hodorRequired: false,
            timeout: 1000
        });
    }

    async run(message, suffix, args) { // eslint-disable-line no-unused-vars
        let isHodor = this.client.isHodor(message.author.id);
        let commands = (isHodor ? this.client.komutlar.map(komut => komut.meta.name).join(", ") : this.client.komutlar.filter(komut => komut.conf.hodorRequired === false).map(komut => komut.meta.name).join(", "));
        message.reply("📮").then(message => {
            message.delete(1000);
        });
        message.author.send(`Helö, bottan yardım istedin.\nlinuxgemini ve kodbilen yapımı bir botum vurmayın pls.\n\nKomutlar: \`${commands}\``);
    }
}

module.exports = Yardım;
