/*--------------------------------------------------------------
 *  Copyright (c) linuxgemini. All rights reserved.
 *  Licensed under the Apache License 2.0.
 *-------------------------------------------------------------*/

"use strict";

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {
        await this.client.utils.sleep(1000);
        var messageArray = [];
        messageArray.push(`[READY] ${this.client.user.tag} is ready!`);
        messageArray.push(`    Serving ${this.client.guilds.size} guilds`);
        messageArray.push(`        ${this.client.channels.filter(c => c.type === "text").size} text channels`);
        messageArray.push(`        ${this.client.channels.filter(c => c.type === "voice").size} voice channels`);
        messageArray.push(`    Ready event received at ${new Date().toUTCString()}`);
        this.client.logger.log(messageArray.join("\n"), "ready");
        return Promise.resolve(true);
    }
};