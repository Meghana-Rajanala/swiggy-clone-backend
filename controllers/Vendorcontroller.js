const vendorModel = require('../models/Vendor')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv=require('dotenv')

dotenv.config()

const secretKey = process.env.mySecretkey


const vendorRegister = async (req,res)=>{
   const {username,email,password} = req.body
   // Debug logging to check received data
   console.log("Received data:", { username, email, password });
    try{
      const vendorMail = await vendorModel.findOne({email});
      if(vendorMail){
        return res.status(400).json({msg:"Vendor already exists with this email"})
      }
       const vendorPassword = await bcrypt.hash(password,10) 
       const vendor = new vendorModel({username,email,password:vendorPassword})

       await vendor.save()
       res.status(201).json({message:"vendor registered successfully"})
       console.log("Registered")
    }catch(error){
        res.status(400).json({error:"Internal server "})
        console.log(error.message)

    }
}


const vendorLogin = async (req,res)=>{
    const {email,password} = req.body
    try{
        const vendor = await vendorModel.findOne({email})
        if(!vendor || !(await bcrypt.compare(password,vendor.password)) ){
            return res.status(401).json({message:"invalid user name or password"})
        }
        const jwttoken = jwt.sign({vendorId: vendor._id},secretKey,{expiresIn:"1h"})
            res.status(200).json({message:"Login Successfully",jwttoken})
            console.log(email,"this is token:",jwttoken)
        

    }catch(error){
        res.status(400).json({error:"Internal server "})
        console.log(error.message)
    }
}

const allVendors = async (req,res)=>{
    try {
        const vendors = await vendorModel.find().populate('firm')
        res.json(vendors)   
    } catch (error) {
        res.status(400).json({error:"Internal server "})
        console.log(error.message)
    }
}

const singleVendor = async (req,res)=>{
    const vendorId = req.params.id;
    try {
        const vendor = await vendorModel.findById(vendorId).populate('firm');
        if(!vendor) {
            return res.status(404).json({error: "Vendor not found"})
        }
        res.status(200).json({vendor})
    }catch(error){
        res.status(400).json({error:"Internal server "})
        console.log(error.message)
    }
}

module.exports ={vendorRegister,vendorLogin,allVendors,singleVendor}