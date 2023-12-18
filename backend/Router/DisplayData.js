const express = require("express")
const { route } = require("./CreateUser")
const router = express.Router()


router.post('/fooddata',(req,res)=>{
    try {
        res.send([global.food_item,global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send('Server Error')
    }
})

module.exports = router;