import express from 'express'
import * as envfile from '../envfile.js'
const app = express();

const PORT = envfile.PORT
app.use(express.json())

app.listen(PORT,()=>{
   console.log("App is running in port 3000")
})


