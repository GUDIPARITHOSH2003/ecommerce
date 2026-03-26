const express=require("express");
const { ObjectId  } = require("mongodb");
function adminRouter(collection){
    const router=express.Router();
    router.get('/',async (req,res)=>{
        const data=await collection.find().toArray();
        res.render('admin.ejs',{title:'Admin Page',data})
    })
    router.post('/add-product',async (req,res)=>{
        const {name,category,price,imageurl}=req.body;
        await collection.insertOne({
            name,
            category,
            price,
            imageurl
        })
        res.redirect('/admin/')
    })
    router.post('/delete-product/:id',async (req,res)=>{
        const id=req.params.id
        await collection.deleteOne({
            _id:new ObjectId(id)
        })
        res.redirect('/admin/')
    })
    return router
}
module.exports=adminRouter