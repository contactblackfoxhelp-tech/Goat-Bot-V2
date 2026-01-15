module.exports = {
  config: {
    name: "slot",
    version: "1.0",
    author: "OtinXSandip",
    shortDescription: {
      en: "Slot game",
    },
    longDescription: {
      en: "Slot game.",
    },
    category: "Game",
  },
  langs: {
    en: {
      invalid_amount: "🕸—͟͟͞͞𝐄𝐧𝐭𝐞𝐫 𝐀 𝐯𝐚𝐥𝐢𝐝 𝐀𝐧𝐝 𝐏𝐨𝐬𝐢𝐭𝐢𝐯𝐞 𝐚𝐦𝐨𝐮𝐧𝐭 𝐭𝐨 𝐡𝐚𝐯𝐞 𝐚 𝐜𝐡𝐚𝐧𝐜𝐞 𝐭𝐨 𝐰𝐢𝐧 𝐝𝐨𝐮𝐛𝐥𝐞",
      not_enough_money: "—͟͟͞͞𝐂𝐇𝐄𝐂𝐊 𝐘𝐎𝐔𝐑 𝐁𝐀𝐋𝐀𝐍𝐂𝐄 𝐈𝐅 𝐘𝐎𝐔 𝐇𝐀𝐕𝐄 𝐓𝐇𝐀𝐓 𝐀𝐌𝐎𝐔𝐍𝐓_",
      spin_message: "⛧⃝𝐒𝐏𝐈𝐍𝐍𝐈𝐍𝐆...",
      win_message: "⛧⃝𝐘𝐨𝐮 𝐖𝐨𝐧 $%1, 𝐁𝐮𝐝𝐝𝐲!",
      lose_message: "⛧⃝𝐘𝐨𝐮 𝐋𝐨𝐬𝐭 $%1, 𝐁𝐮𝐝𝐝𝐲.",
      jackpot_message: "🕸—͟͟͞͞𝐉𝐀𝐂𝐊𝐏𝐎𝐓! 𝐘𝐨𝐮 𝐖𝐨𝐧 $%1 𝐖𝐢𝐭𝐡 𝐓𝐡𝐫𝐞𝐞 %2 𝐒𝐲𝐦𝐛𝐨𝐥𝐬, 𝐁𝐮𝐝𝐝𝐲!",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);
    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply(getLang("invalid_amount"));
    }

    if (amount > userData.money) {
      return message.reply(getLang("not_enough_money"));
    }

    const slots = ["💚", "💛", "💙", "💛", "💚", "💙", "💙", "💛", "💚"];
    const slot1 = slots[Math.floor(Math.random() * slots.length)];
    const slot2 = slots[Math.floor(Math.random() * slots.length)];
    const slot3 = slots[Math.floor(Math.random() * slots.length)];

    const winnings = calculateWinnings(slot1, slot2, slot3, amount);

    await usersData.set(senderID, {
      money: userData.money + winnings,
      data: userData.data,
    });

    const messageText = getSpinResultMessage(slot1, slot2, slot3, winnings, getLang);

    return message.reply(messageText);
  },
};

function calculateWinnings(slot1, slot2, slot3, betAmount) {
  if (slot1 === "💚" && slot2 === "💚" && slot3 === "💚") {
    return betAmount * 10;
  } else if (slot1 === "💛" && slot2 === "💛" && slot3 === "💛") {
    return betAmount * 5;
  } else if (slot1 === slot2 && slot2 === slot3) {
    return betAmount * 3;
  } else if (slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
    return betAmount * 2;
  } else {
    return -betAmount;
  }
}

function getSpinResultMessage(slot1, slot2, slot3, winnings, getLang) {
  if (winnings > 0) {
    if (slot1 === "💙" && slot2 === "💙" && slot3 === "💙") {
      return getLang("jackpot_message", winnings, "💙");
    } else {
      return getLang("win_message", winnings) + `\[ ${slot1} | ${slot2} | ${slot3} ]`;
    }
  } else {
    return getLang("lose_message", -winnings) + `\[ ${slot1} | ${slot2} | ${slot3} ]`;
  }
        }
