import express from 'express'
import  {ENV} from './lib/envfile.js'
import { connectDB } from './lib/db.js';
import {serve} from 'inngest/express'
import cors from 'cors'
import path from "path"
import { inngest,functions }  from './lib/iingest.js';
const app = express();

const PORT = ENV.PORT
app.use(express.json())

app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
}))

app.use("/api/inngest",serve({client:inngest,functions}))


const __dirname = path.resolve()

if(ENV.NODE_ENV === "production"){
   app.use(express.static(path.join(__dirname,"../frontend/dist")))
   app.get('/{*any}',(req,res)=>{
      res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
   })
}

const startServer = async ()=>{
   try {
      await connectDB();
      app.listen(PORT,()=>{
         console.log("Server is running on port",PORT);
      }) 
   } catch (error) {
      console.log("There is an error",error)
   }
}



startServer();

