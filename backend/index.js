const express = require("express")

const app = express()
app.use(express.json())
const mongoDB = require("./db")
mongoDB();


app.use('/api',require('./Router/CreateUser'))

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.listen("8000",(req,res)=>{
    console.log("App is running at port 8000")
})