const { Router } = require('express');
const router= Router()
const { addProduct, showProduct,addCategory, showCategoryList } = require('../controller/productController');


router.post("/admin/addproduct",addProduct)
router.get("/products",showProduct)
router.get("/admin/addproduct",showCategoryList)


module.exports = router;