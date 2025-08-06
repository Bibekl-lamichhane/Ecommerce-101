const User = require('../models/user');
//for password hasing
const bcrypt = require('bcrypt');
const saltRounds = 10;
//for jwt token generation
const jwt = require('jsonwebtoken');

// To register User
 const registerUser =async (req, res) => {
  const phoneNumberExist= await User.exists({phoneNumber: req.body.phoneNumber})
  const emailExist= await User.exists({email: req.body.email})
  const hashedPassword= await bcrypt.hash(req.body.password,saltRounds)
  req.body.password=hashedPassword
  if(phoneNumberExist){
   return res.status(409).json({ msg:'Phone number already taken'})
  }
  if(emailExist){
   return res.status(409).json({ msg:'Email already taken'})
  }
  else{
  User.create(req.body)
  return res.json({msg:"Regsitered sucessfully"})}

}

//loginUserConrtoller for login of user
 const loginUser=async (req, res) => {
   const emailExist= await User.exists({email: req.body.email})
  if(emailExist){
    const user= await User.findOne({ email: req.body.email })
    const match = await bcrypt.compare(req.body.password, user.password)
    if(match){   
       const token = jwt.sign({ email:req.body.email},process.env.SECRECT_KEY);
       return res.json({ msg:'Login sucessfull',token,user})
 }
return  res.status(401).json({ msg:'Incorrect Password'})
  }

  return res.status(401).json({ msg:'Email not registered'})
}

//deleteUserBy Id
const deleteUserById=async (req, res) => {
  try{
     const deletedUser= await User.findByIdAndDelete(req.params.id)
     if(deletedUser){
      res.json({msg:'User have been deleted',deletedUser}); 
     }
     else{
       res.status(401).json({msg:'Could not find the user'}); 
     }   
  }
  catch(err){
    console.log(err)
  res.status(401).json({msg:'Server Error'}); 
  }
}

//getAllUserLists
const getAllUserLists= async (req, res) => {
  const data= await User.find()
  res.json(data); 
}

module.exports = {
  registerUser,loginUser,deleteUserById,getAllUserLists
};
