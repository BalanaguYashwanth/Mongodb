import mongoose from 'mongoose'

const detailSchema = mongoose.Schema({
    name:String,
    contactNumber:Number,
    gender:String,
    age:Number,
    other:[
        {
            info:String,
            operation:String
        }
    ]
})

const detailModel = mongoose.model('Detail',detailSchema)
export default detailModel
