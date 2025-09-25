const mongoose = require('mongoose')
const Seller = require('../model/sellerModel')

const productSchema = mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
        
    }
})