const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const morgan      = require('morgan');
const cors        = require('cors');
const app         = express()

// mongoose.connect('mongodb://localhost/belanjaan',(err)=>{
mongoose.connect(process.env.MONGO_URI, (err) => {
  if(!err) {console.log('mongoose connected');}
  else {console.log('ERROR, NOT CONNECTED');}
})


app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const index = require('./routes/index')
const customer  = require('./routes/customer')
const transaction = require('./routes/transaction')

app.use('/transaction',transaction)
app.use('/customer',customer)
app.use('/',index)



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT || 3030,()=>{
  console.log('Port 3000, Ready !');
})


module.exports = app;
