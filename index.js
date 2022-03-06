import mongoose from 'mongoose'
import express from 'express'
import router from './app/router.js'

mongoose.connect('mongodb://localhost:27017/express-mongoose',{useNewUrlParser:true})
mongoose.connection.on('open',()=>{console.log('connected')})

const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({'message':'connected express'})
})

app.use('/app',router)

app.listen(9000,()=>{
    console.log('yash server connected')
})
