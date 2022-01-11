
const postsSchema=require("../database/models/postSchema")
const createNewPost=(req,res)=>{
const {author,description,image,video,comments}=req.body
const newPost=new postsSchema({author,description,image,video,comments})
newPost.save().then((post)=>{
    res.status(201).json({
        success: true,
        message: `Post Created successfully`,
        post: post,
    })
}).catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
    });
  });

}

module.exports = {createNewPost};
