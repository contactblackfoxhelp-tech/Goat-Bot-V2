const axios = require('axios');

module.exports.config = {
    name: "imageedit",
    aliases: ["imgedit","editimg","ie"],
    version: "6.9",
    author: "dipto",
    countDown: 5,
    role: 0,
    category: "AI",
    description: "Edit images using Edit AI",
    guide: {
        en: "Reply to an image with {pn} [prompt]"
    }
};

async function handleEdit(api, event, args, commandName) {
    const url = event.messageReply?.attachments[0]?.url;
    const prompt = args.join(" ") || "What is this";

    if (!url) {
        return api.sendMessage("❌ 𝙿𝙻𝙴𝚂𝙴 𝚁𝙴𝙿𝙻𝚈 𝚃𝙾 𝙰𝙽.𝙸𝙽𝙰𝙶𝙴 𝚃𝙾 𝙴𝙳𝙸𝚃 𝙸𝚃", event.threadID, event.messageID);
    }

    try {
        const response = await axios.get(`${global.GoatBot.config.api2}/edit?url=${encodeURIComponent(url)}&prompt=${encodeURIComponent(prompt)}&key=dipto008`, {
            responseType: 'stream',
            validateStatus: () => true
        });

        // Check if response is image
        if (response.headers['content-type']?.startsWith('image/')) {
            return api.sendMessage(
                { attachment: response.data },
                event.threadID,
                (error, info) => {
                    global.GoatBot.onReply.set(info.messageID, {
                        commandName: commandName,
                        type: "reply",
                        messageID: info.messageID,
                        author: event.senderID,
                    });
                },
                event.messageID
            );
        }

        // If not image, try to parse as JSON
        let responseData = '';
        for await (const chunk of response.data) {
            responseData += chunk.toString();
        }

        const jsonData = JSON.parse(responseData);
        if (jsonData?.response) {
            return api.sendMessage(
                jsonData.response,
                event.threadID,
                (error, info) => {
                    global.GoatBot.onReply.set(info.messageID, {
                        commandName: commandName,
                        type: "reply",
                        messageID: info.messageID,
                        author: event.senderID,
                    });
                },
                event.messageID
            );
        }

        return api.sendMessage(
            "❌ No valid response from the API",
            event.threadID,
            (error, info) => {
                global.GoatBot.onReply.set(info.messageID, {
                    commandName: commandName,
                    type: "reply",
                    messageID: info.messageID,
                    author: event.senderID,
                });
            },
            event.messageID
        );

    } catch (error) {
        console.error("Edit command error:", error);
        return api.sendMessage(
            "❌ 𝙵𝙰𝙸𝙻𝙴𝙳 𝚃𝙾 𝙿𝚁𝙾𝙲𝙴𝚂𝚂 𝚈𝙾𝚄𝚁 𝚁𝙴𝚀𝚄𝙴𝚂𝚃. 𝙿𝙻𝙴𝚂𝙴 𝚃𝚁𝚈 𝙰𝙶𝙰𝙸𝙽.",
            event.threadID,
            (error, info) => {
                global.GoatBot.onReply.set(info.messageID, {
                    commandName: commandName,
                    type: "reply",
                    messageID: info.messageID,
                    author: event.senderID,
                });
            },
            event.messageID
        );
    }
}

module.exports.onStart = async ({ api, event, args }) => {
    if (!event.messageReply) {
        return api.sendMessage(
            "❌ 𝙿𝙻𝙴𝚂𝙴 𝚁𝙴𝙿𝙻𝚈 𝚃𝙾 𝙰𝙽.𝙸𝙽𝙰𝙶𝙴 𝚃𝙾 𝙴𝙳𝙸𝚃 𝙸𝚃",
            event.threadID,
            event.messageID);
    }
    await handleEdit(api, event, args, this.config.name);
};

module.exports.onReply = async function ({ api, event, args,Reply }) {
const { author } = Reply
if(event.senderID != author) return;
    if (event.type === "message_reply") {
        await handleEdit(api, event, args, this.config.name);
    }
};
