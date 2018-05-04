const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const Command = require("../classes/voyunPride/Command");

class Durum extends Command {
    constructor(client) {
        super(client, {
            name: "durum",
            timeout: 20000
        });
    }
    
    async run(message, suffix, args) { // eslint-disable-line no-unused-vars
        const duration = moment.duration(this.client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
        message.channel.send(`= İSTATİSTİKLER =
  • RAM Kullanımı      :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
  • Çalışma Süresi     :: ${duration}
  • Kullanıcılar       :: ${this.client.users.size.toLocaleString()}
  • Sunucular          :: ${this.client.guilds.size.toLocaleString()}
  • Kanallar           :: ${this.client.channels.size.toLocaleString()}
  • Discord.js         :: v${version}
  • Node               :: ${process.version}`, { code: "asciidoc" });
    }
}

module.exports = Durum;
