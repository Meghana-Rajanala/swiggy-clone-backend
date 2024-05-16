
const firmController = require('../controllers/Firmcontroller')
const express = require('express')
const verifyToken = require('../middlewares/verifytoken')
const firmRouter = express.Router()


firmRouter.post('/add-firm',verifyToken,firmController.addFirm)

firmRouter.get('/uploads/:imageName',(req,res)=>{
    const imageName= req.params.imageName;
    res.headersSent('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
});

firmRouter.delete('/:firmId',firmController.deleteFirmById)

module.exports = firmRouter