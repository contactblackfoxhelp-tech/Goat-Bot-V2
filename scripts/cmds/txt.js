const axios = require("axios");

module.exports = {
  config: {
    name: "txt",
    version: "1.0",
    author: "Mostakim",
    shortDescription: "Reply করা ছবির লেখা বের করো",
    longDescription: "একটি ছবিতে লেখা থাকলে সেটি বের করে দেখায়। শুধু reply করা ছবির জন্য কাজ করে।",
    category: "tools",
    guide: {
      en: "Reply to an image and type {pn} to extract text."
    }
  },

  onStart: async function ({ message, event }) {
   
    if (
      event.type !== "message_reply" ||
      !event.messageReply.attachments ||
      event.messageReply.attachments.length === 0 ||
      event.messageReply.attachments[0].type !== "photo"
    ) {
      return message.reply("❌ অনুগ্রহ করে একটি ছবির রিপ্লাই দিয়ে কমান্ড দিন।");
    }

    const imageUrl = event.messageReply.attachments[0].url;

    try {
      const { data } = await axios.get(
        `https://mostakim.onrender.com/ocr?url=${encodeURIComponent(imageUrl)}&filetype=jpg`
      );

      const text = data?.ParsedResults?.[0]?.ParsedText?.trim();

      if (text) {
        return message.reply(`📝 OCR ফলাফল:\n\n${text}`);
      } else {
        return message.reply("❌ ছবিতে কোনো লেখা পাওয়া যায়নি।");
      }
    } catch (err) {
      console.error("OCR Error:", err);
      return message.reply("❌ সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  }
};
