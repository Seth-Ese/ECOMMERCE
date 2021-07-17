const express = require("express");
const app = express();
const productRoute = require("./controller/Product");
const userRoute = require("./controller/users")

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Routers
app.use('/products',productRoute)
app.use('/users',userRoute)


app.listen(7000,()=>{
    console.log("Ecommerce server is running at this port...");
})

