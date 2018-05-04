/*--------------------------------------------------------------
 *  Copyright (c) linuxgemini. All rights reserved.
 *  Licensed under the Apache License 2.0.
 *-------------------------------------------------------------*/

"use strict";

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    
    run(message) {
        if (message.author.bot) return;
        if (message.content.startsWith(this.client.ayarlar.kapi)) {
            let m = message.content.slice(this.client.ayarlar.kapi.length),
                args = m.split(" ").slice(1),
                command = m.split(" ")[0],
                suffix = args.join(" ");

            let isHodor = this.client.isHodor(message.author.id),
                cmd = this.client.komutlar.get(command) || this.client.komutlar.get(this.client.takmaadlar.get(command));

            if (!cmd) return;
            if (cmd && !message.guild && cmd.conf.guildOnly) return message.channel.send("Bu komut özel mesajlara uygun bir komut değil. Lütfen komutu bir sunucu içinde çalıştırın.").then(msg => { msg.delete(3000); });
            if (!isHodor && cmd.conf.hodorRequired) {
                if (this.client.ayarlar.broadcastSystemMessages) return message.channel.send("Bu komutu kullanma izniniz yok kardeşim!").then(msg => { msg.delete(3000); });
                return;
            }

            let channelType = (message.channel.type === "text" ? "text" : "dm");
            let channelID = (message.channel.type === "text" ? message.guild.id : message.channel.id);

            if (this.client.utils.isCommandLimited(cmd, channelType, channelID) && !isHodor) {
                return message.reply("Komutu tekrar kullanmak için bekle yiğidim!").then(msg => { msg.delete(3000); });
            }

            this.client.logger.cmd(`[CMD] isHodor: ${isHodor}, ${message.author.tag} ran command ${cmd.meta.name}`);
            cmd.run(message, suffix, args);
            !isHodor && this.client.utils.commandUsageLimiter(cmd, channelType, channelID);
        }
    }
};
