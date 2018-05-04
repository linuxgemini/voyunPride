const Command = require("../classes/voyunPride/Command");

/**
 * Returns random number.
 * @param {Number} min 
 * @param {Number} max 
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class MMR extends Command {
    constructor(client) {
        super(client, {
            name: "mmr",
            enabled: true,
            guildOnly: false,
            hodorRequired: false,
            timeout: 10000
        });
    }

    async run(message, suffix, args) { // eslint-disable-line no-unused-vars
        let mmr = getRandomIntInclusive(100, 9000);
        await message.reply(`MMR'ın ${mmr}!`);
    }
}

module.exports = MMR;