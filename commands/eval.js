// don't ever use this if you don't know what this is.

const Command = require("../classes/voyunPride/Command");

class Eval extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            aliases: ["ev"],
            hodorRequired: true,
            timeout: 20000
        });
    }

    async run(message, suffix, args) { // eslint-disable-line no-unused-vars
        const code = args.join(" ");
        try {
            const evaled = eval(code);
            const clean = await this.client.utils.clean(evaled);
            // sends evaled output as a file if it exceeds the maximum character limit
            // 6 graves, and 2 characters for "js"
            const MAX_CHARS = 3 + 2 + clean.length + 3;
            if (MAX_CHARS > 2000) {
                message.channel.send("Output exceeded 2000 characters. Sending as a file.", { files: [{ attachment: Buffer.from(clean), name: "output.txt" }] });
            }
            message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${await this.client.utils.clean(err)}\n\`\`\``);
        }
    }
}

module.exports = Eval;