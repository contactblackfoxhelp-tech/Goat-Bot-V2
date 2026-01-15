module.exports.config = {
 name: "call",
 version: "1.0.0",
 role: 2,
 author: "Gok", //don't change my credit 
 description: "কল বোম্বার, শুধুমাত্র বাংলাদেশি নাম্বারের জন্য",
 category: "Tool",
 usages: "/call 01xxxxxxxxx",
 cooldowns: 15,
 guide: { "axios": "" }
};
 
module.exports.onStart = async ({ api, event, args }) => {
 const axios = require('axios');
 const number = args[0];
 
 if (!number || !/^01[0-9]{9}$/.test(number)) {
 return api.sendMessage("𝙿𝙻𝚉 𝙿𝙰𝚂𝚃𝙴 𝙾𝙽𝙻𝚈 𝙱𝙳 𝙽𝚄𝙼𝙱𝙴𝚁 (𝙴𝚇𝙰𝙼𝙿𝙻𝙴: /𝙲𝙰𝙻𝙻  01𝚡𝚡𝚡𝚡𝚡𝚡𝚡𝚡𝚡)\n\n 𝙳𝙾𝙽'𝚃 𝚃𝚁𝚈 𝚃𝙷𝙸𝚂 𝚃𝙾𝙾𝙻𝚂 𝙱𝙰𝙳 𝚆𝙾𝚁𝙺_🎀,\n 𝚃𝙷𝙸𝚂 𝙵𝙸𝙻𝙴 𝙸𝚂 𝙵𝚄𝙽𝙽𝚈_💀", event.threadID, event.messageID);
 }
 
 api.sendMessage(`👾-𝙲𝙰𝙻𝙻 𝚁𝙸𝙽𝙶𝙸𝙽𝙶 𝚂𝚃𝙰𝚁𝚃 𝙽𝙾𝚆: ${number} 𝚃𝙷𝙸𝚂 𝙽𝚄𝙼𝙱𝙴𝚁...📞💣\n 𝙰𝚃𝚃𝙴𝙽𝚃𝙸𝙾𝙽 𝙳𝙾𝙽'𝚃 𝚄𝚂𝙴 𝚃𝙷𝙸𝚂 𝚃𝙾𝙾𝙻𝚂_🗣`, event.threadID, async (err, info) => {
 try {
 const response = await axios.get(`https://tbblab.shop/callbomber.php?mobile=${number}`);
 setTimeout(() => {
 api.unsendMessage(info.messageID);
 }, 90000);
 
 return api.sendMessage(`✅—͟͟͞͞𝙲𝙰𝙻𝙻 𝙸𝚂 𝙽𝙾𝚆 𝚂𝚄𝙲𝙲𝙴𝚂𝚂𝙵𝚄𝙻𝙻𝚈 𝙱𝙾𝚂𝚂- ${number} 𝚃𝙷𝙸𝚂 𝙽𝚄𝙼𝙱𝙴𝚁-🎀`, event.threadID, event.messageID);
 } catch (error) {
 return api.sendMessage(`❌𝙴𝚛𝚛𝚘𝚛-: ${error.message}`, event.threadID, event.messageID);
 }
 });
};
