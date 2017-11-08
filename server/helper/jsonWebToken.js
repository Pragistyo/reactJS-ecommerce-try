const jwt = require('jsonwebtoken');
require('dotenv').config()

// module.exports = {

  function isLogin(req,res,next){
  // let isLogin = (req,res,next)=>{
    jwt.verify(req.body.token, process.env.SECRET_KEY,(err,decoded)=>{
      if(!err){
        req.role = decoded.role
        next()
      }
      else{
        res.send(err)
      }
    })
  }

  function isAdmin(req,res,next){
    if(req.role === 'admin'){
      next()
    }
    else{
      res.send('Please login as Admin')
    }
  }

  let authUser = (req,res,next) =>{

    if(req.role ==='customer' || req.role === 'admin'){
      next()
    }else{
      res.send('invalid authority')
    }
  }
// }

module.exports = {
  isLogin,
  isAdmin,
  authUser
}
