async function getData(db,colName,query){
    try{
        let data;
        if(colName && query){
            data=await db.collection(colName).find(query).toArray()
            return data
        }else{
            return 'Data missing'
        }
    }catch(err){
        console.log(err)
    }
}

async function getsingleData(db,colName,query){
    try{
        let data;
        if(colName && query){
            data=await db.collection(colName).findOne(query)
            return data
        }else{
            return 'Data missing'
        }
    }catch(err){
        console.log(err)
    }
}

async function addToCart(db,colName,data){
    try{
        delete data._id
        await db.collection(colName).insertOne(data)
    }catch(err){
        console.log(err)
    }
}

async function deleteOneProduct(db,colName,query){
    try{
        await db.collection(colName).deleteOne(query)
    }catch(err){
        console.log(err)
    }
}

async function getCartData(db,colName){
    try{
        const data=await db.collection(colName).find().toArray()
        return data
    }catch(err){
        console.log(err)
    }
}

module.exports={
    getData,
    getsingleData,
    addToCart,
    deleteOneProduct,
    getCartData
}