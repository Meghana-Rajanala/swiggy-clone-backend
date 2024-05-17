const mongoose = require('mongoose')


const createProduct = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true

    },
    category:[
        {
            type:String,
            enum:['veg','non-veg']
        }
    ],
   
    image:{
        type:String
    },
    bestSeller :{
      type:Boolean
    },
    description:{
        type:String,
       
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'firm'
    }]
       
    
})

module.exports = mongoose.model('product',createProduct)