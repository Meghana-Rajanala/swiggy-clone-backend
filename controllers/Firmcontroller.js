
const Firm = require('../models/Firm');
const firmMiddleware = require('../middlewares/verifytoken');
const Vendor = require('../models/Vendor')
const multer = require('multer')
const path = require('path')

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => 
            {
                 cb(null, 'uploads/'); // Directory to save the files
             },
    filename: (req, file, cb) => {
                cb(null, Date.now() +path.extname(file.originalname)); // Filename
            }
});

// Initialize upload
const upload = multer({ storage: storage });

const addFirm = async (req,res)=>{
    try {
        const {firmName,area,category,region,offer} = req.body;

    const image = req.file ? req.file.filename : undefined;
    
    const vendor = await Vendor.findById(req.vendorId)
    if(!vendor){
        return res.status(403).json({message:"Vendor not found"})
    }
    const firm = new Firm({
        firmName,area,category,region,offer,image,vendor: vendor._id
    })
   const savedFirm = await firm.save();
   vendor.firm.push(savedFirm)

    await vendor.save();


    res.status(200).json({message:"Firm added successfully"})
    } catch (error) {
        console.log(error)
        res.status(404).json({error:"Internal Server error"})
    }
}


const deleteFirmById = async (req,res)=>{
    try {
        const firmId = req.params.firmId;
        const deletedFirm = Firm.findByIdAndDelete(firmId);
        if(!deletedFirm){
            res.status(404).json({error:"No firm  found"})
        }


    }catch(error){
        console.log(error)
        res.status(404).json({error:"Internal Server error"})
    }
}


module.exports = {addFirm:[upload.single('image'),addFirm],deleteFirmById}