const vendorController = require("../controllers/Vendorcontroller")
const express = require('express')
const router = express.Router()

router.post("/register",vendorController.vendorRegister)

router.post('/login',vendorController.vendorLogin)

router.get('/all-vendors',vendorController.allVendors)

router.get('/single-vendor/:id',vendorController.singleVendor)

module.exports=router;