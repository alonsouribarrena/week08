const express = require('express');
const route = require('./config/routes')
const app = express();
require('./config/mongoose')
var cookieParser = require('cookie-parser')
app.use(cookieParser())



app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(route)
app.listen(3000, ()=> {
  console.log("timeline app running in 3000");
})