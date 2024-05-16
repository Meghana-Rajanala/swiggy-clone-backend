
const mongoose = require('mongoose')


const firmSchema = new mongoose.Schema({
    firmName:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
   category:{
    type:[
        {
            type:String,
            enum:['veg','non-veg']
        }
    ],
    
   },
   region:{
    type:[
        {
            type:String,
            enum:['South Indian','North Indian','chinese','bakery']
        }
    ]
   },
   offer:{
    type:String
   },
   image:{
    type:String
   },
   vendor:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vendor'
    }
   ],
   product:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }
   ]
}) 


module.exports = mongoose.model('firm',firmSchema)