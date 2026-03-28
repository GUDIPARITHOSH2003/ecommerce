const express=require("express")
const app=express()
const { MongoClient,ObjectId  } = require("mongodb");
const userRouter=require("./routes/user.routes")
const adminRouter=require("./routes/admin.routes")
require("dotenv").config()

port=process.env.PORT || 8000

app.set('view engine','ejs')
app.set('views','./views')
app.use(express.urlencoded({ extended: true }));

let db;
let collection;



async function connectDB(){
    try{
        const client=new MongoClient(process.env.MONGO_URI)
        await client.connect();
        console.log('Connect to DB')
        db=client.db('ecommerce')
        collection=await db.collection('products')
        app.use('/user',userRouter(collection,db))
        app.use('/admin',adminRouter(collection))
        app.listen(port,()=>{
            console.log(`running on port ${port}`)
        })
    }catch(err){
        console.log("Error while connecting to MongoDB", err);
    }
}

connectDB()