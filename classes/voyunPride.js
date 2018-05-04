/*--------------------------------------------------------------
 *  Copyright (c) linuxgemini. All rights reserved.
 *  Licensed under the Apache License 2.0.
 *-------------------------------------------------------------*/

"use strict";

const Discord = require("discord.js");
const DiscordJSClient = Discord.Client;

const Enmap = require("enmap");
const path = require("path");
const klaw = require("klaw");

/**
 * @class voyunPride
 * @classdesc main "koşan (running) class"
 * @author linuxgemini
 * @extends {DiscordJSClient}
 */
class voyunPride extends DiscordJSClient {
    constructor(djsOptions = {}) {
        super(djsOptions);
        try {
            this.utils = new (require("./voyunPride/utils"))(this);
            this.logger = require("./voyunPride/logger");
        } catch (e) {
            throw new Error(`Err in startup\n${e.stack}\n`);
        }

        try {
            /**
             * @description Object containing the necessary configurations for the bot.
             */
            this.ayarlar = require("../config.js");
        } catch (exc) {
            throw new Error(`Config file is non-existant or something else has happened.\n${exc.stack}\n`);
        }

        if (!this.ayarlar.googleConfig.api_key) delete this.ayarlar.googleConfig;
        this.komutlar = new Enmap(),
        this.takmaadlar = new Enmap(),
        this.isBotConstructed = false,
        this.packagePathRelative = path.relative(__dirname, path.dirname(require.main.filename)),
        this.packagePath = path.dirname(require.main.filename);
    }

    /**
     * Import every command to the bot.
     * Stolen code from AnIdiotsGuide/guidebot-class/index.js
     * @author eslachance, bdistin, YorkAARGH, Soumil07
     */
    constructCommands() {
        return new Promise(async (resolve) => {
            await klaw("./commands").on("data", (item) => {
                const cmdFile = path.parse(item.path);
                if (!cmdFile.ext || cmdFile.ext !== ".js") return;
                const response = this.utils.loadCommand(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
                if (response) this.logger.error(response);
            });
            await this.constructEvents();
            this.isBotConstructed = true;
            resolve(true);
        });
    }

    /**
     * Import every command to the bot.
     * Stolen code from AnIdiotsGuide/guidebot-class/index.js
     * @author eslachance, bdistin, YorkAARGH, Soumil07
     */
    constructEvents() {
        return new Promise(async (resolve) => {
            const evtFiles = await this.utils.readdir("./events/");
            this.logger.log(`Loading a total of ${evtFiles.length} events.`, "log");
            await evtFiles.forEach(file => {
                const eventName = file.split(".")[0];
                const event = new (require(`../events/${file}`))(this);
                this.on(eventName, (...args) => event.run(...args));
                delete require.cache[require.resolve(`../events/${file}`)];
            });
            resolve(true);
        });
    }

    /**
     * Return if client commands are loaded.
     * @returns {null}
     */
    async ucagiKaldir() {
        await this.constructCommands();
        this.isBotConstructed && this.login(this.ayarlar.anahtar);
        return null;
    }
    
    /**
     * Checks if user is superuser.
     * @param {string} uid ID of the user.
     */
    isHodor(uid) {
        return (this.ayarlar.hodorlar.indexOf(uid) !== -1);
    }
}

module.exports = voyunPride;