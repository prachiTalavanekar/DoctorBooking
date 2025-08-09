import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.connection.on('connected ', () => console.log("mongoDB connected successfully..."))

    await mongoose.connect(`${process.env.MONGODB_UR}/medisyncai`)
}

export default connectDB