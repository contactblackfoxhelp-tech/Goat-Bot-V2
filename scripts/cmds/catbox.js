const axios = require("axios");
const fs = require("fs-extra");
const FormData = require("form-data");

module.exports = {
  config: {
    name: "catbox",
    version: "1.0",
    author: "nirob",
    description: "Uploads replied image or video to catbox.moe and returns link",
    category: "tools",
    usage: "Reply with image/video",
    cooldown: 5,
  },

  onStart: async function ({ message, event, api }) {
    const reply = event.messageReply;

    if (!reply || !reply.attachments || reply.attachments.length === 0) {
      return message.reply("Please reply to a photo or video.");
    }

    const attachment = reply.attachments[0];
    const url = attachment.url;
    const ext = attachment.type === "video" ? ".mp4" : attachment.type === "photo" ? ".jpg" : null;

    if (!ext) return message.reply("Only photo or video attachments are supported.");

    const path = __dirname + `/cache/file${ext}`;
    const res = await axios.get(url, { responseType: "arraybuffer" });
    fs.writeFileSync(path, res.data);

    const form = new FormData();
    form.append("fileToUpload", fs.createReadStream(path));
    form.append("reqtype", "fileupload");

    try {
      const upload = await axios.post("https://catbox.moe/user/api.php", form, {
        headers: form.getHeaders(),
      });

      fs.unlinkSync(path);
      message.reply(`Uploaded successfully:\n${upload.data}`);
    } catch (err) {
      fs.unlinkSync(path);
      message.reply("Upload failed. Try again later.");
    }
  }
};
