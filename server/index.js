const express = require("express");
const dbConnect = require("./db/connection");
require("dotenv").config();

const app = express();
const cors = require('cors');
app.use(cors()); // Allows all origins by default
//to parse everything in Json format foe expressjs
app.use(express.json());
const port = process.env.PORT || 5000;

//connection with database
dbConnect();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

//To create scheme
const { Schema } = mongoose;
const userSchema = new Schema({
  // String is shorthand for {type: String}
  phoneNumber: String,
  fullName: String,
  password: String,
  email: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

//to create modal from schema
const User = mongoose.model("User", userSchema);
const jwt = require('jsonwebtoken');

app.post("/register", async (req, res) => {
  console.log(req.body)

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

});

app.post("/login", async (req, res) => {
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
});


app.get("/users", async (req, res) => {
  const data= await User.find()
  res.json(data); 
});











//query params example
//http://localhost:8000/product?startsfrom=a
// app.get('/product',(req,res)=>{
// const products=['apple','ball','cat','dog']
// const keyword=req.query.startsfrom
// const selectedProduct=products.filter(item=>item.startsWith(keyword))
// res.send(selectedProduct)
// })


//path params example
//http://localhost:8000/product/a
// app.get('/product/:startsfrom', (req, res) => {
// const products=['apple','ball','cat','dog']
// const keyword=req.params.startsfrom
// const selectedProduct=products.filter(item=>item.startsWith(keyword))
// res.send(selectedProduct)
// })
// path params from database
// app.get("/register/:role", async (req, res) => {
//   const data= await User.find()
//   const keyword = req.params.role;
//   const selectedProduct = data.filter((item) => item.role==keyword)
//   res.send(selectedProduct);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
