const customer  = require('../models/customer');
const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');
const mongoose  = require('mongoose');
const bangAchim = require('achim-salt');
const salt      = bcrypt.genSaltSync(10);
require('dotenv').config()

// console.log(salt+'===============');
function allCustomer (req,res){
  customer.find().then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.send('ERRORRRR',err)
  })
}

function addCustomer(req,res){
  var hash = bcrypt.hashSync(req.body.password, salt)
  customer.create({
    username:req.body.username,
    password:hash,
    email:req.body.email,
    role:req.body.role
  }).then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.send('ERROOOOORRR',err)
  })
}

function removeCustomer(req,res){
  customer.remove({_id:req.params.id}).then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.send('ERRROOOR'+err)
  })
}

function singleCustomer(req,res){
  customer.findOne({_id:req.params.id})
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send(err)
  })
}

function updateCustomer(req,res){
  console.log('===============++++++++++++');
  if(req.body.password)
  {var hash = bcrypt.hashSync(req.body.password, salt)}
  customer.findOneAndUpdate(
    {_id:req.params.id},
    {
      username:req.body.username,
      password:hash,
      email:req.body.email,
      role:req.body.role
    })
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send('ERROR'+err)
  })
}

function login(req,res){
  console.log('================='+req.body.role+'blabla'+req.body.username)
  customer.findOne({username:req.body.username})
  .then(data=>{
    if (bcrypt.compareSync(req.body.password, data.password)) {
      console.log(data);
      var token = jwt.sign({
        id       : data._id,
        username : data.username,
        email    : data.email,
        role     : data.role
      }, process.env.SECRET_KEY)
      res.send({token:token,msg:'berhasil'})
    }else{
      res.status(401).send({
        status:401,
        err:{
          msg:'Password Salah'
        }
      })
    }
  })
  .catch(err=>{
    res.status(404).send({status:401,err:{msg:'username does not exist'}})
  })
}


function verify(req,res){
  // console.log(req.headers.token);
  jwt.verify(req.body.token, process.env.SECRET_KEY,(err,decoded)=>{
    if(!err){
      res.send(decoded)
    }
    else{
      console.log(err)
    }
  })
}

// router.get('/', user.allUser); //get allUser
// router.get('/', user.singleUser);//get eachUser
// router.post('/', user.addUser);//post newUser
// router.post('/login',user.login);

module.exports = {
  allCustomer,
  addCustomer,
  singleCustomer,
  updateCustomer,
  removeCustomer,
  login,
  verify
}
