
const productModel = require('../models/product')
const Firm = require('../models/Firm')
const multer = require('multer')


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


const addProduct = async (req,res)=>{
    try{
        const {productName,price,category,bestSeller,descrription} = req.body;
        const image = req.file? req.file.filename : undefined;
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(403).json({message:"firm not found"})  
        }
        const product = new productModel({
            productName,price,category,bestSeller,descrription,image,firm:firm._id
        })
        const savedProduct = await product.save();
        firm.product.push(savedProduct);
        await firm.save();
        res.status(200).json({message:"Products added successfully"})
        console.log(savedProduct)
    }catch(error){
        console.log(error)
        res.status(404).json({error:"Internal Server error"})
    }
}

const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ message: "Firm not found" });
        }
        const restaurant = firm.firmName
        const products = await productModel.find({ firm: firmId });
        res.json({restaurant,products});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server error" });
    }
};

const deleteProductById = async (req,res)=>{

    try {
        const productId = req.params.productId;
        const deletedProduct = await productModel.findByIdAndDelete(productId);
        if(!deletedProduct){
            res.status(404).json({error:"No product  found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server error" });
    }
}


module.exports = {addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById}