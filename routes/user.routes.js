const express=require("express")
const { ObjectId  } = require("mongodb");

function userRouter(collection){
    const router=express.Router()
    router.get('/products',async (req,res)=>{
        // res.render('index')
        const data=await collection.find().toArray()
        res.render('index',{title:'E-COMMERCE',data})
    })
    
    router.get('/products/:id',async (req,res)=>{
        let product = await collection.findOne({_id:new ObjectId(req.params.id)})
        res.render('product',{product})
    })
    return router
}
module.exports=userRouter