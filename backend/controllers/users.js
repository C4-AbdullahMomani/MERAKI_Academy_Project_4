const userModel=require("../database/models/userSchema")
const roleModel=require("../database/models/roleSchema")

const createNewUser= (req,res)=>{

  const {firsName,lastName,age,email,country,password,image,followers, following,role }=req.body;
  
const newUser=new userModel({firsName,lastName,age,email,country,password,image,followers, following,role});
newUser.save().then((result)=>{
    res.status(201).json(
        {
            success: true,
        message: `Success Author Added`,
        author: result,
        }
    )
})..catch((err) => {
    if (err.keyPattern) {
      return res.status(409).json({
        success: false,
        message: `The email already exists`,
      });
    }
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err,
    });
  });

}

module.exports = {createNewUser};
