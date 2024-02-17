const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/mario',async (req,res)=>{
  const marios = await marioModel.find()
  res.json(marios)
})

app.get('/mario/:id', async (req,res)=>{
    let marioId = req.params.id

    try{
        let marioChar = await marioModel.findOne({_id:marioId})
        res.status(200)
        res.json(marioChar)
    }
    catch(err){
        res.status(400)
        res.json({message:err.message})
    }
})

app.post('/mario', async(req,res)=>{
    let name = req.body.name
    let weight = req.body.weight

    if(name===undefined||weight===undefined){
        res.status(400)
        res.json({message:"Either name or weight is missing"})
        return
    }

    try{
        let marioChar = await marioModel.create({name:name,weight:weight})
        res.status(201)
        res.json(marioChar)
    }
    catch(err){
        res.status(400)
        res.json({message:err.message})
    }
})

app.patch('/mario/:id', async(req,res)=>{
    let name = req.body.name
    let weight = req.body.weight
    let marioId = req.params.id

    try{
        await marioModel.updateOne({_id:marioId},{name:name,weight:weight})
        let marioChar = await marioModel.find({_id:marioId})
        res.json(marioChar)
    }

    catch(err){
        res.status(400)
        res.json({message:err.message})
    }
})

app.delete('/mario/:id', async(req,res)=>{
    let marioId = req.params.id

    try{
        await marioModel.deleteOne({_id:marioId})
        res.status(200)
        res.json({message:"character deleted"})
    }

    catch(err){
        res.status(400)
        res.json({message:err.message})
    }
})

module.exports = app;