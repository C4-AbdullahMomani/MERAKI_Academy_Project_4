const messageModel = require("../database/models/messageSchema");

const createNewMessage = (req, res) => {
  const { conversationId, sender, message } = req.body;
  const newMessage = new messageModel({ conversationId, sender, message });
  newMessage
    .save()
    .then((message) => {
      res.status(201).json({
        success: true,
        message: message,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  createNewMessage,
};
