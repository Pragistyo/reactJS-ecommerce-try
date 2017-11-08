const customer  = require('../models/customer');
const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');
const mongoose  = require('mongoose');
const bangAchim = require('achim-salt');
const salt      = bangAchim()
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

function login(req,res){
  customer.findOne({username:req.body.username}).then(data=>{

    if (bcrypt.compareSync(req.body.password, data.password)) {
      var token = jwt.sign({
        username : data.username,
        email    : data.email,
        role     : data.role
      }, process.env.SECRET_KEY)
      res.send(token)
    }else{
      res.send('Password Salah')
    }
  })
  .catch(err=>{
    res.send('ERRORR GA ADA USER',  err)
  })
}


// router.get('/', user.allUser); //get allUser
// router.get('/', user.singleUser);//get eachUser
// router.post('/', user.addUser);//post newUser
// router.post('/login',user.login);

module.exports = {
  allCustomer,
  addCustomer,
  login
}
