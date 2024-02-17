const mongoose = require('mongoose');

const marioSchema = new mongoose.Schema({
    name:{type:String,require},
    weight:{type:Number,require}
})

const marioModel = mongoose.model('mariochar',marioSchema)
module.exports = marioModel;