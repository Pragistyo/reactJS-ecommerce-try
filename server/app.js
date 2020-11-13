const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const morgan      = require('morgan');
const cors        = require('cors');
const app         = express()
const to          = require('./helper/to')


require('dotenv').config()

const connect_mongo = async () =>{
  try {
    console.log(`+++++++++++++++++++++++++++++++++++`);
    console.log(`====================================`);
    let [mongoConnectErr, mongoConnect] = await to( mongoose.connect(
      process.env.MONGO_URI, { useNewUrlParser: true })
       )
    if (mongoConnectErr) console.log(`Error: ${mongoConnectErr}`);
    if(mongoConnect) console.log('mongoose connected');
  } catch (error) {
    console.log(`ERROR, NOT CONNECTED: ${error.toString()}`);
  }
}

connect_mongo()

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
