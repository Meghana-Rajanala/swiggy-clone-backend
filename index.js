const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ejs = require('ejs');
const cors = require('cors');

const bodyParser = require('body-parser');
const vendorRoutes = require('./routes/vendorroute');
const firmRoutes = require('./routes/firmroute');
const productRoutes = require('./routes/productroute');
const path = require('path');

//express 
const app = express();

//dotenv config 
dotenv.config();

//set ejs 
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//port number
const port = process.env.PORT || 4000;
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware
app.use(cors());
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));

//mangodb connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("MongoDB connected"); })
    .catch((err) => { console.log(err); });


//starting port
app.listen(port, () => {
    console.log(`Server running @${port}`);
});

//home 
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Backend</h1>");
});
