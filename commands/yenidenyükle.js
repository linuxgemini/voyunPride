const Command = require("../classes/voyunPride/Command");

class Yenidenyükle extends Command {
    constructor(client) {
        super(client, {
            name: "yenidenyükle",
            hodorRequired: true
        });
    }

    async run(message, suffix, args) { // eslint-disable-line no-unused-vars
        if (!args || args.size < 1) return message.reply("Geri yüklenmesi için komut lazım, derp.");

        const commands = this.client.komutlar.get(args[0]) || this.client.commands.get(this.client.takmaadlar.get(args[0]));
        if (!commands) return message.reply(`\`${args[0]}\` komutu yok veya bir takma ad değil.`);

        let response = await this.client.utils.unloadCommand(commands.conf.location, commands.meta.name);
        if (response) return message.reply(`Dışlama hatası: ${response}`);

        response = this.client.utils.loadCommand(commands.conf.location, commands.meta.name);
        if (response) return message.reply(`Yükleme hatası: ${response}`);

        message.reply(`\`${commands.meta.name}\` komutu geri yüklendi.`);
    }
}
module.exports = Yenidenyükle;
