const axios = require("axios");

module.exports = {
  config: {
    name: "stalk",
    aliases: ["userinfo", "fbstalk", "fbs"],
    version: "2.0",
    role: 0,
    author: "RUBISH",
    description: "Get Facebook user information and profile + cover photo",
    category: "utility",
    countDown: 5,
    guide: {
      en: "{pn} [@tag | uid | fbLink] (or reply to message)",
    },
  },

  onStart: async ({ event, message, api, args }) => {
    try {
      const { threadID, messageID, messageReply, mentions, attachments } = event;
      let uid = event.senderID;
      const input = args.join(" ");

      if (messageReply) {
        uid = messageReply.senderID;
      } else if (mentions && Object.keys(mentions).length > 0) {
        uid = Object.keys(mentions)[0];
      } else if (/^\d+$/.test(input)) {
        uid = input;
      } else if (input.includes("facebook.com") || input.includes("fb.com")) {
        const match = input.match(/(?:id=)?(\d{6,})/);
        if (match && match[1]) {
          uid = match[1];
        } else if (attachments?.[0]?.target?.id) {
          uid = attachments[0].target.id;
        } else {
          return api.sendMessage(`⚠️ | Couldn't detect UID from the Facebook link.`, threadID, messageID);
        }
      }

      const res = await axios.get(`https://noobs-api.top/dipto/fbinfo?id=${uid}&key=dipto008`);
      const data = res.data;

      if (!data || Object.keys(data).length === 0) {
        return api.sendMessage(`⚠️ | No data found for this UID.`, threadID, messageID);
      }

      const userInfo = await api.getUserInfo(uid);

      let genderText = "❓ Unknown";
      switch (userInfo[uid]?.gender) {
        case 1:
          genderText = "👩‍🦰 Female";
          break;
        case 2:
          genderText = "👨‍🦱 Male";
          break;
      }

      const verified = data.verify ? "✅ Verified" : "❌ Not Verified";
      const followers = data.subscribers?.summary?.total_count || data.follow || "No Data";
      const profileLink = data.idlink || `https://www.facebook.com/${data.user_name}`;

      let workData = "No Data";
      if (Array.isArray(data.work) && data.work.length > 0) {
        workData = data.work.map(job => {
          const employer = job.employer?.name || "Unknown";
          const position = job.position?.name ? ` — ${job.position.name}` : "";
          const startDate = job.start_date || "Unknown Date";
          return `• ${employer}${position} (Since ${startDate})`;
        }).join("\n");
      }

      const userInformation = `
🔍 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗦𝗧𝗔𝗟𝗞 𝗥𝗘𝗣𝗢𝗥𝗧 🔍
━━━━━━━━━━━━━━━━━━━━━

📁 𝗕𝗔𝗦𝗜𝗖 𝗜𝗡𝗙𝗢
╰👤 Name: ${data.name}
╰⚡ Fast Name: ${data.fast}
╰🆔 UID: ${data.uid}
╰🔗 Username: ${data.user_name}
╰🌐 Profile Link: ${profileLink}
╰📅 Created: ${data.account_crt}
╰☑️ Verified: ${verified}

👤 𝗣𝗘𝗥𝗦𝗢𝗡𝗔𝗟 𝗜𝗡𝗙𝗢
╰🎂 Birthday: ${data.birthday}
╰🚻 Gender: ${genderText}
╰💘 Relationship: ${data.rlsn}
╰📛 Nickname: ${userInfo[uid]?.alternateName || "None"}
╰💞 Love Status: ${data.love}
╰🧠 About: ${data.about}
╰💬 Quotes: ${data.quotes}

🌍 𝗟𝗢𝗖𝗔𝗧𝗜𝗢𝗡 & 𝗪𝗘𝗕
╰🏠 Hometown: ${data.home}
╰📌 Locale: ${data.local}
╰🌐 Website: ${data.web}

📊 𝗦𝗢𝗖𝗜𝗔𝗟 𝗔𝗖𝗧𝗜𝗩𝗜𝗧𝗬
╰👥 Followers: ${followers}
╰🏢 Works At:
${workData}

━━━━━━━━━━━━━━━━━━━━━`;

      const attachment = [];
      if (data.photo) attachment.push(await global.utils.getStreamFromURL(data.photo));
      if (data.cover) attachment.push(await global.utils.getStreamFromURL(data.cover));

      return api.sendMessage(
        {
          body: userInformation,
          attachment,
        },
        threadID,
        messageID
      );

    } catch (error) {
      console.error(error);
      return message.reply("❌ Sorry bro, the ID may be locked or some error occurred.");
    }
  },
};
