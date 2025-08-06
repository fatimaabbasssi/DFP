import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnection from './config/db.js'
import authRoutes from "./routes/authRoutes.js"
import userRoutes from './routes/userRoutes.js'

let app = express()

//connections
dotenv.config()
dbConnection()


//middlewares
app.use(express.json())  //for postman
app.use(cors())




app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.get('/', (req , res)=>{
    res.send('hello world!')
})


app.listen(process.env.PORT ,()=> console.log('server running on port' , process.env.PORT))
