const mongoose= require('mongoose');

const collectionname= mongoose.Schema({
        name: String,
        price: Number,
        brand: String,
        category: String
})
const Item= mongoose.model('Item',collectionname)
module.exports=Item;
