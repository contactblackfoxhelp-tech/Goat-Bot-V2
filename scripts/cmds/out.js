const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
module.exports = {
config: {
name: "Out",
aliases: ["l"],
version: "1.0",
author: "Sandy",
countDown: 5,
role: 2,
shortDescription: "bot will leave gc",
longDescription: "",
category: "admin",
guide: {
vi: "{pn} [tid,blank]",
en: "{pn} [tid,blank]"
}
},

onStart: async function ({ api,event,args, message }) {
var id;
if (!args.join(" ")) {
id = event.threadID;
} else {
id = parseInt(args.join(" "));
}
return api.sendMessage('▣𝙶𝙾𝙺 𝙶𝙾𝙺 𝙱𝙾𝚃 𝙻𝙴𝙰𝚅𝙴:\n》𝙰𝚖𝚒 𝚝𝚘𝚍𝚎𝚛 𝚜𝚞𝚔𝚑 𝚍𝚎𝚠𝚊𝚛 𝚓𝚘𝚗𝚗𝚘 𝙰𝚜𝚑𝚌𝚑𝚒𝚕𝚊𝚖 𝚝𝚘𝚛𝚊 𝚎𝚝𝚊𝚛 𝚓𝚘𝚐𝚐𝚘 𝚗𝚊.\n\n➤𝙱𝙴𝚈 𝙷𝙰𝙻𝙰 𝚁𝙰🐫', id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
}
}
