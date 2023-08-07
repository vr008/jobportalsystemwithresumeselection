const mongoose = require("mongoose")


const MongoUrl = "mongodb://127.0.0.1:27017/blog"


const InitiateMongoServer = async ()=>{
    try{
        await mongoose.connect(MongoUrl,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        
        });
        console.log("connected to db")
    }
    catch(e){
        console.log(e)
        throw e
    }
}

module.exports = InitiateMongoServer