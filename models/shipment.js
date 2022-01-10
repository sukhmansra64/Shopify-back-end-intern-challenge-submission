const mongoose = require('mongoose');
const shipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    destination:{
       type: String,
       required: true
    },
    description:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'inventoryItem'
    }]
});

module.exports = Shipment = mongoose.model('shipment',shipmentSchema)