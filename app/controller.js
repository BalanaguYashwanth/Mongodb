import mongoose from 'mongoose'
import Detail from './schema.js'

const all=async(req,res)=>{
    const details = await Detail.find({})
    res.json(details)
}

const allid=async(req,res)=>{
    const details = await Detail.findById(req.params.id)
    res.json(details)
}


const specificdetail=async(req,res)=>{
    const details = await Detail.find(req.body)
    res.json(details)
}

const create = async(req,res)=>{
    const {name,contactNumber,info} = await req.body
    const detail = new Detail({
        name,
        contactNumber,
        other:[{info:info}]
    })
    try{
        const saveddetail = await detail.save()
        res.send({saveddetail})
    }catch(err){
        res.send(err)
    }    
}

const update = async(req,res)=>{
    const {_id,name,age,info} = req.body
    const detail = await Detail.findById({_id})
    console.log(req.body.operation)
    try{
        detail.name = req.body.name || detail.name
        detail.age = req.body.age || detail.age
        //detail.other[0].info = req.body.info || detail.other.info //override existing item in array
        detail.other.push({info:req.body.info,operation:req.body.operation}) // push new item in the array
        const all = await detail.save()
        res.send(all)
    }catch(err){
        res.send({'message':err})
    }
}

const updatebyobject = async(req,res)=>{
    const {_id,info,operation} = req.body
    const detail = await Detail.findById(req.params.id)
    try{
        for(let x in detail.other)
        {
            if(detail.other[x]._id == _id )
            {
                detail.other[x].info = info || detail.other.info
                detail.other[x].operation = operation || detail.other.operation  //if operation mention will update if not will delete
            }  
        }
        
        const all = await detail.save()
        res.send('done')
    }catch(err){
        res.send(err)
    }
}


const deletedetail = async(req,res)=>{
    const {_id} = await req.body
    const detail = await Detail({_id})
    try{
        await detail.remove()
        res.json({'message':'deleted'})
    }catch(err){
        res.json({'error':err})
    }
}

const deletedetailarr = async(req,res)=>{
    const {_id} = await req.body
    const detail = await Detail.findById(req.params.id)
    try{
        await detail.other.pull({_id:_id})
        detail.save()
        res.json(detail)
    }catch(err){
        res.json({'error':err})
    }
}

const deletedetailarrbyobject = async(req,res)=>{
    //const {_id} = await req.body
    const detail = await Detail.findById(req.params.id)
    try{
        await detail.updateOne({$pull:{other:{"info":req.body.info}}})
        res.json(detail)
    }catch(err){
        res.json({'error':err})
    }
}

const deletedetailall = async(req,res)=>{ //delete all items
    const detail = await Detail().remove({})
    try{
        await detail
        res.json({'message':'deleted all items'})
    }catch(err){
        res.json({'error':err})
    }
}



export {all,create,deletedetail,deletedetailall,update,specificdetail,allid,deletedetailarr,updatebyobject,deletedetailarrbyobject}