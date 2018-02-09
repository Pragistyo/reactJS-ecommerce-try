const express  = require('express');
const customer = require('../controllers/user.js');
const auth     = require('../helper/jsonWebToken');
const router   = express.Router();

router.get('/', customer.allUser); //get allUser
// router.get('/', user.singleUser);//get eachUser
router.post('/', customer.addUser);//post newUser
router.post('/login',customer.login);

console.log("VOID");

module.exports =router
