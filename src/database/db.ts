import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        // Create Connection
        const connection = await mongoose.connect(`${process.env.MONGO_URL}`, {dbName: 'Capital_Gym'})

        // Console Database connected Successfully
        console.log("*** Database connected Successfully ***");
    } catch (error) {
        console.log(error);
        // Console Error 
        console.log("### Database Connection Failed ###");
    }
}