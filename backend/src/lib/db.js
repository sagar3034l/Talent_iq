import mongoose from 'mongoose'
import {ENV} from './envfile.js'

export const connectDB = async () => {
    try {
        if(!ENV.DATABASE_URL){
            throw new Error("Database url is not defined")
        }
        const connect = await mongoose.connect(ENV.DATABASE_URL)
        console.log("Connect to mongoDB",connect.connection.host)
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}


