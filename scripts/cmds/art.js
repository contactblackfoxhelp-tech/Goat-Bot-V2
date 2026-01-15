const axios = require("axios");

module.exports = {
  config: {
    name: "art",
    aliases: [],
    version: "1.0",
    author: "Mostakim",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Get AI-generated art images"
    },
    longDescription: {
      en: "Sends 1 to 5 AI-generated art images of a given keyword"
    },
    category: "fun",
    guide: {
      en: "+art <keyword> - <1 to 5>\nExample: +art cat - 3"
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const input = args.join(" ");
      const [keywordRaw, countRaw] = input.split(" - ");
      const keyword = keywordRaw?.trim();
      const count = parseInt(countRaw?.trim());

      if (!keyword || isNaN(count) || count < 1 || count > 5) {
        return api.sendMessage("❌ Format: +art <keyword> - <1 to 5>\nউদাহরণ: +art cat - 3", event.threadID, event.messageID);
      }

      const res = await axios.get(`https://www.x-noobs-apis.42web.io/art?name=${encodeURIComponent(keyword)}`);
      const images = res.data;

      if (!Array.isArray(images) || images.length === 0) {
        return api.sendMessage(`😿 কোনো ছবি পাওয়া যায়নি '${keyword}' এর জন্য।`, event.threadID, event.messageID);
      }

      
      const selected = [];
      for (let i = 0; i < count; i++) {
        const randomImg = images[Math.floor(Math.random() * images.length)];
        selected.push(randomImg);
      }

      const attachments = await Promise.all(selected.map(url => global.utils.getStreamFromURL(url)));

      api.sendMessage({
        body: `🎨 '${keyword}' এর ${count}টি AI art:`,
        attachment: attachments
      }, event.threadID, event.messageID);

    } catch (e) {
      console.error(e);
      api.sendMessage("❌ আর্ট আনতে সমস্যা হয়েছে, পরে চেষ্টা করো।", event.threadID, event.messageID);
    }
  }
};
