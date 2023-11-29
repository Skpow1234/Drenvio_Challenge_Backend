const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand", 
    },
    basePrice: Number,
    specialPrice: Number,
    inStock: Boolean,
    quantity: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
