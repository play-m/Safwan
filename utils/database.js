import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log('Monog is already connected')
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB, {
           dbName: "share_promp",
           useNewUrlParser: true,
           useUnifiedTopology: true,
        })

        isConnected = true
        console.log("MongoDb is connected")
    } catch (error){
        console.log(error)
    }
}