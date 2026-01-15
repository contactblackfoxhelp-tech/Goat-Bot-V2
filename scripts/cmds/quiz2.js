const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`
  );
  return base.data.api;
};

module.exports = {
  config: {
    name: "quiz2",
    aliases: ["qz2"],
    version: "1.0",
    author: "Dipto",
    countDown: 0,
    role: 0,
    category: "game",
    guide: "{p}quiz2 \n{pn}quiz2 bn \n{p}quiz2 en",
  },

  onStart: async function ({ api, event, usersData, args }) {
    const input = args.join('').toLowerCase() || "bn";
    let timeout = 300;
    let category = "bangla";
    if (input === "bn" || input === "bangla") {
      category = "bangla";
    } else if (input === "en" || input === "english") {
      category = "english";
 }

    try {
      const response = await axios.get(
        `${await baseApiUrl()}/quiz?category=${category}&q=random`,
      );

      const quizData = response.data.question;
      const { question, correctAnswer, options } = quizData;
      const { a, b, c, d } = options;
      const namePlayerReact = await usersData.getName(event.senderID);
      const quizMsg = {
        body: `\n╭──◊ ${question}\n├─⦿ 𝗔) ${a}\n├─⦿ 𝗕) ${b}\n├─⦿ 𝗖) ${c}\n├─⦿ 𝗗) ${d}\n╰──────────────────◊\n𝚁𝚎𝚙𝚕𝚢 𝚝𝚘 𝚝𝚑𝚒𝚜 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚠𝚒𝚝𝚑 𝚢𝚘𝚞𝚛 𝚊𝚗𝚜𝚠𝚎𝚛.`,
      };

      api.sendMessage(
        quizMsg,
        event.threadID,
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            type: "reply",
            commandName: this.config.name,
            author: event.senderID,
            messageID: info.messageID,
            dataGame: quizData,
            correctAnswer,
            nameUser: namePlayerReact,
            attempts: 0
          });
          setTimeout(() => {
            api.unsendMessage(info.messageID);
          }, timeout * 1000);
        },
        event.messageID,
      );
    } catch (error) {
      console.error("❌ | 𝐄𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐫𝐞𝐝:", error);
      api.sendMessage(error.message, event.threadID, event.messageID);
    }
  },

  onReply: async ({ event, api, Reply, usersData }) => {
const { correctAnswer, nameUser, author } = Reply;
    if (event.senderID !== author)
      return api.sendMessage(
        "𝐖𝐇𝐎 𝐀𝐑𝐄 𝐘𝐎𝐔 ?",
        event.threadID,
        event.messageID
      );
    const maxAttempts = 2;

    switch (Reply.type) {
      case "reply": {
        let userReply = event.body.toLowerCase();
        if (Reply.attempts >= maxAttempts) {
          await api.unsendMessage(Reply.messageID);
          const incorrectMsg = `🐸 | ${nameUser},𝐘𝐎𝐔 𝐇𝐀𝐕𝐄 𝐑𝐄𝐀𝐂𝐇𝐄𝐃 𝐓𝐇𝐄 𝐌𝐀𝐗𝐈𝐔𝐌 𝐍𝐔𝐌𝐁𝐄𝐑 𝐎𝐅 𝐀𝐓𝐓𝐄𝐌𝐏𝐓𝐒_(2).\n\n𝐓𝐇𝐄 𝐂𝐎𝐑𝐑𝐄𝐂𝐓 𝐀𝐍𝐒𝐖𝐄𝐑 𝐈𝐒: ${correctAnswer}`;
          return api.sendMessage(incorrectMsg, event.threadID, event.messageID);
        }
        if (userReply === correctAnswer.toLowerCase()) {
          api.unsendMessage(Reply.messageID)
          .catch(console.error);
          let rewardCoins = 300;
          let rewardExp = 100;
          let userData = await usersData.get(author);
          await usersData.set(author, {
          money: userData.money + rewardCoins,
            exp: userData.exp + rewardExp,
            data: userData.data,
          });
          let correctMsg = `𝐂𝐎𝐍𝐆𝐑𝐀𝐓𝐔𝐋𝐀𝐓𝐈𝐎𝐍𝐒, ${nameUser}! 🌟🎉\n\n 𝐘𝐨𝐮𝐫'𝐫𝐞 𝐀 𝐐𝐮𝐢𝐳 𝐂𝐡𝐚𝐦𝐩𝐢𝐨𝐧! 🏆\n\n𝐘𝐨𝐮'𝐯𝐞 𝐄𝐚𝐫𝐧𝐞𝐝${rewardCoins} 𝐂𝐨𝐢𝐧𝐬 💰 𝐀𝐧𝐝 ${rewardExp} 𝐄𝐗𝐏 🌟\n\n𝐊𝐄𝐄𝐏 𝐔𝐏 𝐓𝐇𝐄 𝐆𝐑𝐄𝐀𝐓 𝐖𝐎𝐑𝐊_!🚀`;
          api.sendMessage(correctMsg, event.threadID, event.messageID);
        } else {
          Reply.attempts += 1;
global.GoatBot.onReply.set(Reply.messageID, Reply);
          api.sendMessage(
            `❌ | 𝐖𝐑𝐎𝐍𝐆 𝐀𝐍𝐒𝐖𝐄𝐑. 𝐘𝐎𝐘 𝐇𝐀𝐕𝐄 ${maxAttempts - Reply.attempts} 𝐀𝐭𝐭𝐞𝐦𝐭𝐬.\n✅ | 𝐓𝐑𝐘 𝐀𝐆𝐀𝐈𝐍_!`,
            event.threadID,
            event.messageID,
          );
        }
        break;
      }
      default:
        break;
    }
  },
};
