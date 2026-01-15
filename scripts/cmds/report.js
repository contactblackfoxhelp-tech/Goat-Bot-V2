const cook = "datr= L3hnY90pdJwWsZbe0g2eMefE; fr= .AWVOCDud0U20K4q0_BFO_iok7vg.Bkh6Z0.tN.AAA.0.0.Bkh7CA.AWWR8bmDjiM; m_page_voice= 100093251606743; sb= L3hnY0hcf4RwphDv-h38Ehu1; xs= 24%3AyAsSvyR7aDhMQw%3A2%3A1686613606%3A-1%3A-1; c_user= 100093251606743;";

const encodedCook = encodeURIComponent(cook).replace(/%(?![0-9a-fA-F]{2}|3[Bb])/g, '%25');

module.exports = {
config: {
  name: "report",
  aurthor:"TANVIR",
  role: 2,
  shortDescription: " ",
  longDescription: "",
  category: "social",
  guide: "{pn}"
},

  onStart: async function ({ api, event, args }) {
  const axios = require("axios");
  let { messageID, threadID, senderID, body } = event;
  const response = args.join(" ");

  if (!args[0]) return api.sendMessage("Prefix: fbreport [uid]", threadID, messageID);

  try {
    api.sendMessage(`_𝐋𝐄𝐓 𝐓𝐇𝐄𝐌 𝐁𝐔𝐑𝐍 𝐈𝐃:\n\n𝐡𝐭𝐭𝐩𝐬://𝐰𝐰𝐰.𝐟𝐚𝐜𝐞𝐛𝐨𝐨𝐤.𝐜𝐨𝐦/𝐩𝐫𝐨𝐟𝐢𝐥𝐞.𝐩𝐡𝐩?𝐢𝐝=${response}\n\n𝐁𝐘 𝐀𝐂𝐒 𝐓𝐄𝐀𝐌`, threadID, messageID);
    const res = await axios.get(`https://apimahiro--mahirochan1.repl.co/api?cookie=${encodedCook}&id=${response}`);
    console.log(res); // Log the entire res object
    const respond = res.data.message;
    api.sendMessage(respond, threadID, messageID);
    api.sendMessage("Report has been successfully sent!", threadID, messageID);
  } catch (error) {
    console.log(error);
    api.sendMessage("𝐑𝐄𝐏𝐎𝐑𝐓 𝐇𝐀𝐒 𝐁𝐄𝐄𝐍 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘 𝐒𝐄𝐍𝐓 !\n\n𝐉𝐔𝐒𝐓 𝐖𝐀𝐈𝐓 𝐀 𝐌𝐈𝐍𝐔𝐓𝐄, 𝐈'𝐌 𝐆𝐎𝐈𝐍𝐆 𝐓𝐎 𝐃𝐄𝐒𝐓𝐑𝐎𝐘 𝐀𝐋𝐋 𝐇𝐈𝐒 𝐃𝐄𝐕𝐈𝐂𝐄 𝐈𝐃'𝐒 𝐑𝐈𝐆𝐇𝐓 𝐍𝐎𝐖_☣️", threadID, messageID);
  }
},
};
