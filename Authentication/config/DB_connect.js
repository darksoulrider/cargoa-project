
import mongoose from "mongoose";

const url = process.env.MONGO_URL

// databse connection ...

const DB_Connect = async (req, res, next) => {

    try {
        const con = await mongoose.connect(url, {});
        console.log(`Connected to database...`);
    } catch (error) {
        console.log(`Error: ${error}`)
    }

}


export default DB_Connect;

