console.log('MODEL PRODUCT \n')
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

var productSchema = new Schema({
  id: Number,
  name: String,
  img: String,
  price: Number,
  quantity: Number,
  qtyAvail: Number,
  category: String //make category
})

var product = mongoose.model('product', productSchema);

module.exports = product
