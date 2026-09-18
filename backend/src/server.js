import express from 'express'
import  {ENV} from './lib/envfile.js'
import { connectDB } from './lib/db.js';
import {serve} from 'inngest/express'
import cors from 'cors'
import path from "path"
import { inngest,functions }  from './lib/iingest.js';
import {clerkMiddleware} from '@clerk/express';
import chatRoutes from './routes/chatRoutes.js'
import sessionRoute from './routes/sessionRoute.js'
import codeRouter from './routes/CodeRouter.js'

const app = express();

const PORT = ENV.PORT
app.use(express.json())

const allowedOrigin = [
   ENV.CLIENT_URL,
   "http://localhost:5173"
]

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}))
   
app.use(clerkMiddleware());
app.use("/api/inngest",serve({client:inngest,functions}));

app.use('/api/chat',chatRoutes);
app.use('/api/sessions',sessionRoute);
app.use('/api/code',codeRouter)

const __dirname = path.resolve();
    
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

