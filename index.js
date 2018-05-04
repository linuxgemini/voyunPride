/*--------------------------------------------------------------
 *  Copyright (c) linuxgemini. All rights reserved.
 *  Licensed under the Apache License 2.0.
 *-------------------------------------------------------------*/

"use strict";

if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const voyunPride = require("./classes/index");
const bihter = new voyunPride.Main();

/*
Don't do this. I really mean it.

process.on("uncaughtException", (err) => {
    var e = err.stack.replace(new RegExp(`${__dirname.replace(/\\/g, "\\\\")}`, "g"), ".");
    if (!bihter.logger) return console.error(e);
    return bihter.logger.error(`Uncaught exception!\n${e}`);
});
process.on("unhandledRejection", (rej) => {
    var re = rej.stack.replace(new RegExp(`${__dirname.replace(/\\/g, "\\\\")}`, "g"), ".");
    if (!bihter.logger) return console.error(re);
    return bihter.logger.error(`Promise Rejection!\n${re}`);
});
*/

const initiator = async () => {
    bihter.ucagiKaldir();
};

initiator();
