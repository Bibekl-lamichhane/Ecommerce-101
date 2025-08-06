const Product = require("../models/product")

const addProduct =async (req, res) => {
      try {
    await  Product.create(req.body)
    res.json({msg:"Product added sucessfully"})
  } catch (err) {
    res.status(500).json({ error: "Failed to add product" });
  }
};

const showProduct = async (req, res) => {
  try {
    const productsGrouped = await Product.aggregate([
      {
        $sort: { _id: 1 } // Optional: sort before grouping (e.g., by _id or createdAt)
      },
      {
        $group: {
          _id: "$main_category",
          products: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          main_category: "$_id",
          products: { $slice: ["$products", 8] } // Take first 10
        }
      }
    ]);

    res.json({
      msg: "Fetched 8 products from each main category",
      categories: productsGrouped
    });
  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};


const addCategory=async(req, res) => {
  const mainCategory=await Product.distinct('main_category')
  const subCategory=await Product.distinct('sub_category')

  if(mainCategory.includes(req.body.addedMainCategory)){
    return res.json({msg:"This MainCategory is already present in List"})
  }
  else if(subCategory.includes(req.body.addedSubCategory)){
    return res.json({msg:"This SubCategory is already present in List"})
  }
  else{
    mainCategory.push(req.body.addedMainCategory)
    subCategory.push(req.body.addedSubCategory)
    res.json({msg:"Category Sucessfully added"},{mainCategory,subCategory})
  }
 
}
const showCategoryList=async(req,res)=>{
const mainCategory=await Product.distinct('main_category')
const subCategory=await Product.distinct('sub_category')
res.json({mainCategory,subCategory})
}
module.exports={ addProduct, showProduct,addCategory,showCategoryList}