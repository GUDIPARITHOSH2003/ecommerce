const express=require("express")
const { ObjectId  } = require("mongodb");
const {getData,getsingleData,addToCart}=require("../controller/apiController")

function userRouter(collection,db){
    const router=express.Router()
    router.get('/products',async (req,res)=>{
        let category=req.query.category
        let query={}
        let colName='products'
        if(category){
            query={category:category}
        }
        const data=await getData(db,colName,query)
        res.render('index',{title:'E-COMMERCE',data})
    })
    
    router.get('/products/:id',async (req,res)=>{
        let colName='products'
        let query={_id:new ObjectId(req.params.id)}
        let product=await getsingleData(db,colName,query)
        res.render('product',{product})
    })

    router.get('/filter',async(req,res)=>{
        let category=req.query.category
        let query={}
        let colName='products'
        let lcost=req.query.lcost
        let hcost=req.query.hcost
        if (lcost && hcost){
            query.price={
                $gt:Number(lcost),
                $lt:Number(hcost)
            }
        }
        if(category){
            query.category=category
        }
        const data=await getData(db,colName,query)
        res.render('index',{title:'E-COMMERCE',data})
    })

    router.post("/cart/:id",async (req,res)=>{
        const id=req.params.id
        let colName='cart'
        let query={_id:new ObjectId(id)}
        let product=await getsingleData(db,'products',query)
        await addToCart(db,colName,product)
        res.redirect('/user/products')
    })

    return router
}
module.exports=userRouter