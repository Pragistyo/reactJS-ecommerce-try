console.log('controllers PRODUCT')
const mongoose = require('mongoose');
const product  = require('../models/product');


function allProduct(req,res){
  product.find().then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send('ERRORRR'+err)
  })
}

function addProduct(req,res){
  product.create({
    // id: req.body.id,
    name: req.body.name,
    img: req.body.img,
    price: req.body.price,
    quantity: 0,
    qtyAvail: req.body.qtyAvail,
    category: req.body.category
  })
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send('ERRORRR'+err)
  })
}

function singleProduct(req,res){
  // console.log('blabla');
    product.findOne({id: req.params.id})
    .then(singleitem=>{
      res.send(singleitem)
    })
    .catch(err=>{
      res.send('ERROR-->'+err)
    })
  }

  function categoryProduct(req,res){
    // console.log('blabla');
      product.find({category: req.params.category})
      .then(singleitem=>{
        res.send(singleitem)
      })
      .catch(err=>{
        res.send('ERROR-->'+err)
      })
    }

function updateProduct(req,res){
  console.log(req.params.id)
  product.findOneAndUpdate(
    {id:req.params.id},
    {
      id: req.body.id,
      name: req.body.name,
      img: req.body.img,
      price: req.body.price,
      // quantity: req.body.quantity,
      qtyAvail: req.body.qtyAvail,
      category: req.body.category
    }
  ).then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send('Error?\n'+ err)
  })
}


function removeProduct(req,res){
// let removeProduct = (req,res)=>{
  product.remove({_id:req.params.id})
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

module.exports = {
  allProduct,
  addProduct,
  singleProduct,
  updateProduct,
  removeProduct,
  categoryProduct
}
