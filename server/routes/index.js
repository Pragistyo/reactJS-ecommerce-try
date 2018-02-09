const express   = require('express');
const product   = require('../controllers/product');
const auth      = require('../helper/jsonWebToken');
const router    = express.Router();

router.get('/', product.allProduct); //get allProduct
router.post('/', product.addProduct)//post newProduct
router.get('/:id', product.singleProduct)
router.get('/category/:category', product.categoryProduct)
router.put('/:id', product.updateProduct);
router.delete('/:id', product.removeProduct);
// router.post('/login',product.login);

console.log("ROUTER index/PRODUCT");

module.exports =router