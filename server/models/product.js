const mongoose = require("mongoose");

const { Schema } = mongoose;
const productSchema = new Schema({
  // String is shorthand for {type: String}
  name: { type: String, required: true },
  discount_price: Number,
  actual_price: { type: Number, required: true },
  ratings: { type: Number, default: 0 },
  no_of_ratings: { type: Number, default: 0 },
  image: { type: String, required: true },
  main_category: { type: String, required: true },
  sub_category: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  description: { type: String, default: "" }
});

const Product = mongoose.model('Product', productSchema);
module.exports=Product

