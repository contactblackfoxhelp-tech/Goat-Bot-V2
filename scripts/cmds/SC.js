const axios = require('axios');

module.exports = {
  config: {
    name: "SC",
    aliases: ["bombing"],
    version: "1.3",
    author: "RUBISH",
    countDown: 600,
    premium: true,
    role: 2,
    money: 1000,
    shortDescription: "Mix Bomber",
    longDescription: "Powerful BD mix bomber {SMS and call}",
    category: "PREMIUM",
    guide: {
      en: "{pn} <number> - <limit>\n\nExample:\n.bomb 01819191980 - 3"
    }
  },

  onStart: async function ({ message, args, event, usersData }) {
    const [number, countStr] = args.join(" ").split("-").map(arg => arg.trim());
    const count = parseInt(countStr);

    if (!number || !count || isNaN(count)) {
      return message.reply(
        `⚠️ | Please enter a valid number and count.\n\n📌 Example: .bomb 01819191980 - 3`
      );
    }

    if (count > 1000) {
      return message.reply(`⚠️ | Maximum bomb limit is 1000.\nPlease enter a lower count.`);
    }

    const user = await usersData.get(event.senderID);
    if (user.money < 1000) {
      return message.reply(
        `❌ | You need at least 1000 money to use this command.\n💡 Use ".daily" to get rewards or contact Rubish.`
      );
    }

    try {
      const url = `https://www.noobs-api.top/dipto/bomber?number=${number}&limit=${count}&key=dipto00869`;

      const waitMsg = await message.reply(
        `⏳ | MIX BOMBING STARTED\n\n📞 Target: ${number}\n🔢 Count: ${count}\n💸 Cost: 1000 Money`
      );

      const response = await axios.get(url);
      await message.unsend(waitMsg.messageID);

      if (response.status === 200) {
        await usersData.set(event.senderID, {
          money: user.money - 1000
        });

        return message.reply(
          `✅ | Mix Bombing sent successfully to ${number}.\n💸 1000 money deducted from your account.`
        );
      } else {
        return message.reply("❌ | Something went wrong with the bombing request.");
      }
    } catch (error) {
      console.error("❌ Error:", error.message);
      return message.reply("❌ | An unexpected error occurred while sending the SMS.");
    }
  }
};
