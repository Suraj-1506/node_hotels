const express = require("express");
const app = express();
const db = require("./db")
const bodyParser = require("body-parser");
require("dotenv").config
app.use(bodyParser.json())
const PORT = process.env.PORT||3000;

app.get("/",function(req,res){
    res.send("Welcome to my hotel...  How can i help you?, we have list of menues")
})

  const personRoutes = require('./routes/personRoutes');
  const menuItemsRoutes = require('./routes/menuItemsRoutes');
  app.use("/person",personRoutes)
  app.use("/menu",menuItemsRoutes)

app.listen(PORT,()=>{
    console.log("listen to port number 3000");
})