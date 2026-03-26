//imports 
const express=require("express")
const app=express()
const { MongoClient,ObjectId  } = require("mongodb");
const userRouter=require("./routes/user.routes")
const adminRouter=require("./routes/admin.routes")
require("dotenv").config()


port=process.env.PORT || 8000
//creating a mongodb obj
const mClient=new MongoClient(process.env.MONGO_URI)

app.set('view engine','ejs')
app.set('views','./views')
app.use(express.urlencoded({ extended: true }));

let collection;

async function main() {
    await mClient.connect();
    console.log("MongoDB connected");
    collection = mClient.db('ecommerce').collection('products');
    app.use('/user',userRouter(collection))
    app.use('/admin',adminRouter(collection))
}



app.listen(port,(err)=>{
    if (err) throw err
    main()
    console.log(`server running or port ${port}`)
})