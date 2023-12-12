const express = require("express")

const app = express()


app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.listen("8000",(req,res)=>{
    console.log("App is running at port 8000")
})