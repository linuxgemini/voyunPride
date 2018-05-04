/*--------------------------------------------------------------
 *  Copyright (c) linuxgemini. All rights reserved.
 *  Licensed under the Apache License 2.0.
 *-------------------------------------------------------------*/

"use strict";

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    run(disconnectEvent) {
        if (!this.client.logger) return console.error("disconnected with code " + disconnectEvent.code);
        return this.client.logger.error("disconnected with code " + disconnectEvent.code);
    }
};