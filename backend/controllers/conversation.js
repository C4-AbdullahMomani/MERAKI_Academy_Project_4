const conversationModel = require("../database/models/conversationSchema");

//this function to create new conversation
const createNewConversation = (req, res) => {
  const newConversation = new conversationModel({
    members: [req.body.senderId, req.body.recieverId],
  });
  newConversation
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        conversationId: result._id,
        conversation: result,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//this function to get all conversation included user id by user id

const getConversationByUserId = (req, res) => {
  userId = req.params.id;
  conversationModel
    .find({ members: { $in: [userId] } })
    .then((conversation) => {
      res.status(200).json(conversation);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const getConversationByTowId = (req, res) => {
  conversationModel
    .findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    })
    .then((conversation) => {
      res.status(200).json(conversation);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  createNewConversation,
  getConversationByUserId,
  getConversationByTowId,
};
