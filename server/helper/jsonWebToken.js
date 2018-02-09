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
        res.send(err)
      }
    })
  }

  function isAdmin(req,res,next){
    console.log('ISADMIN ==============')
    if(req.role === 'admin'){
      next()
    }
    else{
      res.send('Please login as Admin')
    }
  }

  let authUser = (req,res,next) =>{
    console.log('AUTUSER')
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
