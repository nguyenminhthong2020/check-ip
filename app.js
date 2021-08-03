const express = require("express")
const cors = require('cors');
const requestIp = require('request-ip');
const morgan = require('morgan');
require('express-async-errors');

const port = process.env.PORT || 5000;


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Index - Home
app.get('/', (req, res) => { 
    let clientIp = requestIp.getClientIp(req);            
    res.json(`IP của bạn là ${clientIp}`);
})



app.use((req, res, next) => {              // default route
    res.status(404).send('ROUTE NOT FOUND');
  })
  
app.use(function (err, req, res, next) {        // default error-handler
    if (typeof err.status === 'undefined' || err.status === 500) {
        console.error(err.stack);
        res.status(500).send('View error log on console.');
      } else {
        res.status(err.status).send(err);
      }
})

app.listen(port,()=>{
    console.log(`API is running at http://localhost:${port}`)
})