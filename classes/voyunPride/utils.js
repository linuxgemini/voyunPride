/*--------------------------------------------------------------
 *  Copyright (c) linuxgemini. All rights reserved.
 *  Licensed under the Apache License 2.0.
 *-------------------------------------------------------------*/

"use strict";

const path = require("path");
const { promisify } = require("util");

/**
 * @typedef CommandObject
 * @type {Object}
 *
 * @property {Function} run Main command module of the command file.
 *
 * @property {Object} conf Command configuration object.
 * @param {boolean} conf.enabled Flag to enable or disable the command.
 * @param {boolean} conf.guildOnly Flag to make the command work only on guilds.
 * @param {Array<string>} conf.aliases Other names of the command.
 * @param {boolean} conf.hodorRequired Flag to make the command work only for bot developers.
 * @param {number} conf.timeout Miliseconds to timeout the command after usage.
 * @param {string} conf.location Filepath of the command file.
 *
 * @property {Object} meta
 * @param {string} meta.name
 */

/**
 * @class utils
 * @author linuxgemini
 */
class utils {

    constructor(client) {
        this.client = client;
    }

    /**
     * Import given command to the bot.
     * Stolen code from AnIdiotsGuide/guidebot-class/modules/functions.js
     * @author eslachance, YorkAARGH, Soumil07
     * @param {string} commandPath
     * @param {string} commandName
     */
    loadCommand(commandPath, commandName) {
        try {
            /**
             * @type {CommandObject}
             */
            const props = new (require(`${commandPath}${path.sep}${commandName}`))(this.client);
            this.client.logger.log(`Loading Command: ${props.meta.name}. 👌`);
            props.conf.location = commandPath;
            if (props.init) {
                props.init(this.client);
            }
            this.client.komutlar.set(props.meta.name, props);
            props.conf.aliases.forEach(alias => {
                this.client.takmaadlar.set(alias, props.meta.name);
            });
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    }

    /**
     * Remove given command from the bot.
     * Stolen code from AnIdiotsGuide/guidebot-class/modules/functions.js
     * @author eslachance, YorkAARGH, Soumil07
     * @param {string} commandPath
     * @param {string} commandName
     */
    async unloadCommand(commandPath, commandName) {
        /**
         * @type {CommandObject}
         */
        let command;
        if (this.client.komutlar.has(commandName)) {
            command = this.client.komutlar.get(commandName);
        } else if (this.client.takmaadlar.has(commandName)) {
            command = this.client.komutlar.get(this.client.takmaadlar.get(commandName));
        }
        if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

        if (command.shutdown) {
            await command.shutdown(this.client);
        }
        delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }

    /**
     * If the command has a set limited period, it sets the command as limited.
     * @param {CommandObject} cmd
     * @param {"dm" | "text"} targetType 
     * @param {string} targetID 
     */
    commandUsageLimiter(cmd, targetType, targetID) {
        const base = (targetType === "dm" ? this.client.channels : this.client.guilds);
        const inf = base.get(targetID);
        if (!inf.limitedCommands) inf.limitedCommands = {};
        if (cmd.conf.timeout && cmd.conf.timeout > 0) {
            inf.limitedCommands[cmd.meta.name] = true;
            setTimeout(() => {
                inf.limitedCommands[cmd.meta.name] = false;
            }, cmd.conf.timeout);
        }
        return false;
    }

    /**
     * Checks if the command is in a limited period.
     * @param {CommandObject} cmd
     * @param {"dm" | "text"} targetType 
     * @param {string} targetID 
     */
    isCommandLimited(cmd, targetType, targetID) {
        const base = (targetType === "dm" ? this.client.channels : this.client.guilds);
        const inf = base.get(targetID);
        if (!inf.limitedCommands) return false;
        if (!inf.limitedCommands[cmd.meta.name]) return false;
        return true;
    }

    /**
     * Cleans the output from sensitive information and turns any type to string.
     * @param {string} text text to be cleaned
     * @author eslachance
     */
    async clean(text) {
        var path = this.client.packagePath
            .replace(/\\/g, "\\\\");
        var projectRootRegex = new RegExp(`${path}`, "g");
        if (text && text.constructor.name == "Promise") text = await text;
        if (typeof evaled !== "string") text = require("util").inspect(text, { depth: 0 });

        text = text
            .replace(projectRootRegex, ".")
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(this.client.ayarlar.anahtar, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

        return text;
    }

    /**
     * Pick array element randomly
     * @param {Array<*>} arr
     */
    arrand(arr) {
        if (!Array.isArray(arr)) throw new Error("not an array");
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /*
        Until Node has full support for ESnext and has
        public instance class fields, this or some other "hack" has to be used.

        I didn't want to do this method but had to.
    */

    get readdir() {
        return promisify(require("fs").readdir);
    }
    get sleep() {
        return promisify(setTimeout);
    }
}

module.exports = utils;