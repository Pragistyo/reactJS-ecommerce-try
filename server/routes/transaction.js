const express      = require('express');
const transaction  = require('../controllers/transaction');
const jwt          = require('../helper/jsonWebToken');
const router       = express.Router();

// router.get('/', jwt.isLogin,jwt.isAdmin,customer.allCustomer); //get allUser
// router.post('/', jwt.isLogin,jwt.isAdmin,customer.addCustomer);//post newUser
// router.get('/:id', jwt.isLogin,jwt.authUser,customer.singleCustomer);//get eachUser
// router.put('/:id', jwt.isLogin,jwt.authUser,customer.updateCustomer);//post newUser
// router.delete('/:id', jwt.isLogin,jwt.isAdmin,customer.removeCustomer);//post newUser
//
// router.post('/login',customer.login);
// router.post('/verify',customer.verify);

router.get('/',transaction.getTransaction);
router.get('/:id',transaction.singleTransactions);
router.post('/',jwt.isLogin,transaction.addTransaction);
router.delete('/:id',transaction.removeTrans);


console.log("wahahaha router transaction");

module.exports =router
