const express = require("express");
const app = express();

const dbConnect = require("./db/connection");
require("dotenv").config();
//connection with database
dbConnect();

const cors = require('cors');
app.use(cors()); // Allows all origins by default
//to parse everything in Json format foe expressjs
app.use(express.json());

const port = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/ProductRoutes");
app.use(userRoutes);  
app.use(productRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
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
