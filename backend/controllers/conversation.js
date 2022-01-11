const conversationModel = require("../database/models/conversationSchema");

//this function to create new conversation
const createNewConversation = (req, res) => {
  const newConversation = new conversationModel({
    members: [req.body.senderId, req.body.recieverId],
  });
  newConversation
    .save()
    .then((result) => {
      res
        .status(201)
        .json({
          success: true,
          conversationId: result._id,
          conversation: result,
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  createNewConversation,
};
