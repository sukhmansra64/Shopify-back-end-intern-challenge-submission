const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = InventoryItem = mongoose.model('inventoryItem',inventoryItemSchema);