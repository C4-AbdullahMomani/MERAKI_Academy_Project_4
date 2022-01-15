const req = require("express/lib/request");
const res = require("express/lib/response");
const messageModel = require("../database/models/messageSchema");

const createNewMessage = (req, res) => {
  const { conversationId, sender, message } = req.body;
  const newMessage = new messageModel({ conversationId, sender, message });
  newMessage
    .save()
    .then((message) => {
      res.status(201).json(message);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//this function to get all messages by conversation id
const getAllMessages = (req, res) => {
  messageModel
    .find({ conversationId: req.params.conversationId })
    .then((messages) => {
      if (!messages) {
        res.status(200).json({
          success: false,
          message: `No Messages Yet`,
        });
      }
      res.status(200).json(messages);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  createNewMessage,
  getAllMessages,
};
