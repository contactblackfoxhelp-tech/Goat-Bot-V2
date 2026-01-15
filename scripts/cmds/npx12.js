const fs = require("fs");
module.exports = {
  config:{
  name: "npx12",
  version: "1.0.1",
  premium: false,  
  prefix: true,
  role: 0,
  author: "Gok", 
  description: "Fun",
  category: "no prefix",
  guide: "😒",
        cooldowns: 5, 
},

onChat: async function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  const content = event.body ? event.body : '';
  const body = content.toLowerCase();
  const axios = require('axios')
  const NAYAN = ['https://files.catbox.moe/9y20cv.mp4','https://files.catbox.moe/a6qzh9.mp4','https://files.catbox.moe/7y129u.mp4','https://files.catbox.moe/2f16gy.mp4','https://files.catbox.moe/ngcvrh.mp4','https://files.catbox.moe/vqrlbg.mp4','https://files.catbox.moe/n2qe9k.mp4','https://files.catbox.moe/kkgf7l.mp4','https://files.catbox.moe/z5qlny.mp4','https://files.catbox.moe/cn52xm.mp4']
    var rndm = NAYAN[Math.floor(Math.random() * NAYAN.length)];
const media = (
    await axios.get(
      `${rndm}`,
      { responseType: 'stream' }
    )
  ).data;

  if (body.indexOf("🥵")==0 || body.indexOf("💋")==0 || body.indexOf("🫦")==0 || body.indexOf("👅")==0 || body.indexOf("👄")==0 || body.indexOf("🔥")==0 || body.indexOf(" ")==0 || body.indexOf(" ")==0 || body.indexOf(" ")==0 || body.indexOf(" ")==0) {
    var msg = {
        body: "●❯────────────────❮●\n         -♦𝐓𝐀𝐍𝐕𝐈𝐑-𝐁𝐎𝐓♦-         \n●❯────────────────❮●\n•┈✤⋆⃝🥵লু্ঁচ্চা্ঁগু্ঁলা্ঁ সঁর্ এ্ঁনঁতে্ঁ•✤'⋆⃝💚😘\n●❯────────────────❮● ",
        attachment: media
      }
      api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("🖤", event.messageID, (err) => {}, true)
    }
  },
  onStart: function({ nayan }) {
  }
}
