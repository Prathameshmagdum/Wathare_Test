const express = require('express')
const cors = require('cors')
const { application } = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json() )

const PORT = process.env.PORT || 8080

//schema
const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : String,
},{
    timestamps : true
})

const usermodel = mongoose.model("user",schemaData)

//Read purpose
app.get("/",async(req,res)=>{
    const data = await usermodel.find({})

    res.json({success : true, data:data})
})

//Create Data or Save data into MongoDB
app.post("/create", async(req,res)=>{
    console.log(req.body)
    const data = new usermodel(req.body)
    await data.save()
    res.send({success : true, message : "Data Saves Successfully", data  : data})
})

//update API
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {id,...rest} = req.body

    console.log(rest)
    const data = await usermodel.updateOne({_id:id},rest)
    res.send({success : true, message : "Data update Successfully", data  : data})
})

//Delete API
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await usermodel.deleteOne({_id : id})
    res.send({success : true, meassage : "Data deleted successfully", data : data})
})


mongoose.connect("mongodb://127.0.0.1:27017/mern_test")
.then(()=>{
    console.log("Connect to DB")
    app.listen (PORT,()=>console.log("Server is running"))
})
.catch((err)=>console.log(err))

