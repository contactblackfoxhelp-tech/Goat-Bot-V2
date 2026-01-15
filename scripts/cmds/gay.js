module.exports.config = {
  name: "gay",
  version: 0.0,
  author: " dikto bai",
  countdown: 5,
  role: 0,
};
module.exports.onStart = ({}) => {};
module.exports.onChat = ({ api, event }) => {
  try {
    const gayMessage = event.body;
    if (gayMessage.startsWith("romim")) {
      api.sendMessage("romim.gay", event.threadID.event.messageID);
    }
  } catch (error) {
    api.sendMessage(error, event.threadID, event.messageID);
  }
};
