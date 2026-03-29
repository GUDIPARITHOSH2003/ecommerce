const express=require("express");
const { ObjectId  } = require("mongodb");
const {getData,deleteOneProduct}=require("../controller/apiController")
function adminRouter(collection,db){
    const router=express.Router();
    router.get('/',async (req,res)=>{
        const data=await getData(db,'products',{});
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
        colName='products'
        query={
            _id:new ObjectId(id)
        }
        deleteOneProduct(db,colName,query)
        res.redirect('/admin/')
    })
    return router
}
module.exports=adminRouter