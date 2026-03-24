//imports 
const express=require("express")
const app=express()
const { MongoClient } = require("mongodb");
require("dotenv").config()


port=process.env.PORT || 8000
//creating a mongodb obj
const mClient=new MongoClient(process.env.MONGO_URI)

app.set('view engine','ejs')
app.set('views','./views')

let collection;

async function main() {
    await mClient.connect();
    console.log("MongoDB connected");

    collection = mClient.db('ecommerce').collection('products');
}

app.get('/products',async (req,res)=>{
    // res.render('index')
    const data=await collection.find().toArray()
    res.render('index',{title:'E-COMMERCE',data})
})

app.listen(port,(err)=>{
    if (err) throw err
    main()
    console.log(`server running or port ${port}`)
})