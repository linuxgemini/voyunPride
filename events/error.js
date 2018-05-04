/*--------------------------------------------------------------
 *  Copyright (c) linuxgemini. All rights reserved.
 *  Licensed under the Apache License 2.0.
 *-------------------------------------------------------------*/

"use strict";

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    run(err) {
        if (!this.client.logger) return console.error(err.stack);
        return this.client.logger.error(err.stack);
    }
};