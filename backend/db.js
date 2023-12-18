const mongoose = require("mongoose")

const mongoURL = "mongodb+srv://bhaskerjoshi977:Global9210@cluster0.4vre39t.mongodb.net/Foodie'sHub?retryWrites=true&w=majority"

const mongoDB = async() =>{
    try {
        await mongoose.connect(mongoURL)
        console.log("connected")
        //food Item
        let fetchedData = mongoose.connection.db.collection("food_item")
        let collectionAllData = fetchedData.find({})
        let data = await collectionAllData.toArray();
        global.food_item = data
        // console.log(global.food_item)
        //food Category
        let fetchedCategoryData = mongoose.connection.db.collection("foodCategory")
        let categoryAllData = fetchedCategoryData.find({})
        let categoryData = await categoryAllData.toArray()
        global.foodCategory = categoryData
        // console.log(global.foodCategory)
    } catch (error) {
        console.log(error)
    }
}

module.exports = mongoDB
