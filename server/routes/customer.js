const express   = require('express');
const customer  = require('../controllers/customer');
const jwt       = require('../helper/jsonWebToken');
const router    = express.Router();

router.get('/', customer.allCustomer); //get allUser
router.post('/', customer.addCustomer);//post newUser
router.get('/:id', jwt.isLogin,jwt.authUser,customer.singleCustomer);//get eachUser
router.put('/:id', jwt.isLogin,jwt.authUser,customer.updateCustomer);//post newUser
router.delete('/:id', jwt.isLogin,jwt.isAdmin,customer.removeCustomer);//post newUser

router.post('/login',customer.login);
router.post('/verify',customer.verify);

console.log("wahahaha router customer");

module.exports = router