const axios = require('axios');

module.exports = {
  config: {
    name: "bom",
    author: "Mostakim",
    role: 2,
    category: "owner"
  },
  onStart: async function ({ api, event, args }) {
    const url1 = "https://raw.githubusercontent.com/Alifhosson/ALIF-BOT.json/refs/heads/main/bom.json";
    const url2 = "https://raw.githubusercontent.com/Alifhosson/ALIF-BOT.json/refs/heads/main/bom2.json";
    
    try {
      const [response1, response2] = await Promise.all([
        axios.get(url1),
        axios.get(url2)
      ]);

      const message1 = response1.data.message;
      const message2 = response2.data.message;

      const amount = parseInt(args[0]) || 5; // যদি সংখ্যা না দেয়, তাহলে ৫ হবে

      for (let i = 0; i < amount; i++) {
        setTimeout(() => {
          api.sendMessage(message1, event.threadID);
          setTimeout(() => {
            api.sendMessage(message2, event.threadID);
          }, 1500); // ১.৫ সেকেন্ড পর দ্বিতীয় মেসেজ যাবে
        }, i * 3000);
      }
    } catch (error) {
      api.sendMessage("Error fetching messages from GitHub JSON.", event.threadID);
      console.error(error);
    }
  }
}
