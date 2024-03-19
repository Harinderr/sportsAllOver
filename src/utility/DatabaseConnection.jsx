import mongoose from "mongoose";
export async function connectToDB() {
    try {
        mongoose.connect(process.env.MONGO_PASS)
        console.log('connected')
    }
    catch(err) {
        console.log('not connected');
    }
}