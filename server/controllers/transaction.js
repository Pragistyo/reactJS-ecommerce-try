const mongoose     = require('mongoose');
const transaction  = require('../models/transaction');


function getTransaction(req,res){

  transaction.find({})
    .populate('customerId', 'username email role _id')
  // .populate({path:'customerId', select:'username'})
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send('data not found ' + err)
  })

}

function singleTransactions(req,res){
  // console.log('MASUK SINGLE TRANSACTION' + req.params.id)
  transaction.find({customerId:req.params.id})
  // .populate({path:'customerId', select:'username'})
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send('data not found '+ err)
  })

}

function addTransaction(req,res){
  // console.log(req.body)
  // console.log(req.headers);
  transaction.create({
    // username: req.body.username,
    customerId: req.body.customerId,
    cart : req.body.cart,
    totalPrice : req.body.totalPrice
  })
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send('error')
  })

}

function removeTrans(req,res){
  transaction.remove({_id:req.params.id})
  .then(result=>{
    // console.log(result+'===================');
    res.send({
      msg:'REMOVED --->\n',
      data:result
    })
  })
  .catch(err=>{
    res.send('ERRROOOORRR'+err)
  })
}

module.exports ={
addTransaction,
getTransaction,
removeTrans,
singleTransactions
}
