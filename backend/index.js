const express = require("express")

const app = express()
app.use(express.json())
const mongoDB = require("./db")
mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        'Origin,X-Requested-With,Content-Type,Accept'
    );
    next()
})

app.use('/api',require('./Router/CreateUser'))
app.use('/api',require('./Router/DisplayData'))
app.use('/api',require('./Router/OrderData'))

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.listen("8000",(req,res)=>{
    console.log("App is running at port 8000")
})