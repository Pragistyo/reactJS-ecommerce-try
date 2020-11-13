const jwt = require('jsonwebtoken');
require('dotenv').config()

// module.exports = {

  function isLogin(req,res,next){
    console.log('ISLOGIN ==============')
  // let isLogin = (req,res,next)=>{
    jwt.verify(req.headers.token, process.env.SECRET_KEY,(err,decoded)=>{
      if(!err){
        req.role = decoded.role
        next()
      }
      else{
        res.status(401).send(err)
      }
    })
  }

  function isAdmin(req,res,next){
    console.log('ISADMIN ==============')
    if(req.role === 'admin'){
      next()
    }
    else{
      res.status(401).send('Please login as Admin')
    }
  }

  let authUser = (req,res,next) =>{
    console.log('AUTHUSER')
    if(req.role ==='customer' || req.role === 'admin'){
      next()
    }else{
      res.status(401).send('invalid authority')
    }
  }
// }

module.exports = {
  isLogin,
  isAdmin,
  authUser
}
