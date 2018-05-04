/*--------------------------------------------------------------
 *  Copyright (c) linuxgemini. Partial rights reserved.
 * 
 *  Used work from AnIdiotsGuide/guidebot-class/base/Command.js
 *  Original file committed by YorkAARGH with MIT License.
 *  See LICENSE-GUIDEBOT at repository root.
 * 
 *  Released under the Apache License 2.0.
 *-------------------------------------------------------------*/

"use strict";

class Command {
    constructor(client, {
        name = null,
        enabled = true,
        guildOnly = false,
        hodorRequired = false,
        aliases = [],
        timeout = 0
    }) {
        this.client = client,
        this.conf = { enabled, guildOnly, aliases, hodorRequired, timeout },
        this.meta = { name };
    }
}

module.exports = Command;
