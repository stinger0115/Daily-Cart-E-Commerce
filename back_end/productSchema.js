const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    brandName: {
        type: String,
        require: true,
    },
    productName: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    imgsrc: {
        type: String,
        require: true,
    },
    category:{
        type: String,
        require:true,
    }
});

const product = new mongoose.model("ProductDetails", productSchema);

module.exports = product;