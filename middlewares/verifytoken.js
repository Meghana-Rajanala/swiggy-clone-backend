const Vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
const verifyToken =async (req,res,next)=>{
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({message:"Token is not provided" })
    }
    try {
        const decoded = jwt.verify(token,process.env.mySecretkey)
        const vendor = await Vendor.findById(decoded.vendorId)
        if(!vendor){
            return res.status(401).json({message:"vendor not found" })
        }
        req.vendorId = vendor._id
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({error:"Invalid token"})
    }
}

module.exports = verifyToken;