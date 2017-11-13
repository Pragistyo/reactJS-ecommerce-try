const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


var transactionSchema = new Schema({
  customerId:{
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  cart:[],
  totalPrice: Number
},
{ timestamps: { createdAt: 'created_at' } })

var transaction = mongoose.model('transaction', transactionSchema);

module.exports = transaction
