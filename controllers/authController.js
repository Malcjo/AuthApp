const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailSender = require('../config/mailSender');

const registerUser = async(req, res) =>{
    const {user, email, password} = req.body;

    const userExist = await User.findOne({email});
    
    if(userExist){
        return res.status(200).send({success:false, msg:"User already registered with this email"})
    }
    else{
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newEntry = await User.create({
                user:user,
                email:email,
                password:hashedPassword
            });
            //const newEntry = new User(req.body);
            //newEntry.save();
            //console.log(newEntry);
            await mailSender(newEntry, 'verify-mail');
            return res.status(200).send({success:true,msg:  "registration sucessful"});
        } catch (error) {
            return res.status(400).send({success:false, msg:error});
        }
    }
}

const loginUser = async (req, res) =>{
    const {email, password} = req.body // get the email and password from the request
    //check whether email and password are apart of the one document
    try {
        const user = await User.findOne({email});
        if(user){

            if(user && (await bcrypt.compare(password, user.password))){
                const tokenData = {
                    _id: user._id,
                    user: user.user,
                    email: user.email,

                }
                const token = jwt.sign(tokenData, "SecretKey123", {expiresIn:'30d'});

                return res.status(200).send({success:true, msg:"Login successful", token:token});

            }else{
                return res.send({success:false, msg:"Invalid credentials"});
            }
            
        }
        else{
            return res.send({success:false, msg:"Invalid credentials"});
        }
    } catch (error) {
        return res.send(error);
    }
}

const userData = async (req, res) =>{
    try {
        res.status(200).send({success: true, data:req.body.user});
    } catch (error) {
        res.status(400).send(error);
    }
}


const updateUser = async (req, res) => {
    const { updateUser } = req.body;
    const email = updateUser.email;
    
    try {
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(updateUser.cupassword, user.password))) {
        const salt = await bcrypt.genSalt(15); // generate the salt for bcrypting password
        const hashedPassword = await bcrypt.hash(updateUser.password, salt); // hash the new password
        
        // Use async/await instead of callback
        await User.findByIdAndUpdate(user._id, {
          name: updateUser.name,
          email: updateUser.email,
          password: hashedPassword
        }, { new: true }); // { new: true } returns the updated document
        
        return res.status(200).send({ success: true, msg: "Update user successful" });
      } else {
        return res.status(400).send({ msg: "No user found or incorrect current password" });
      }
    } catch (err) {
      return res.status(500).send({ msg: "Something went wrong", error: err.message });
    }
  };
  

module.exports = {
    registerUser,
    loginUser,
    userData,
    updateUser
}