const express = require('express');
const {check, validationResult} = require('express-validator')
const router = express.Router();

const Shipment = require('../models/shipment');
const InventoryItem = require("../models/inventoryItem");

//@route GET api/shipment
//@description get all shipments
router.get('/',async (req,res)=>{
    const shipments = await Shipment.find().populate('items');
    if(!shipments){
        return res.status(400).send({msg: 'There are currently no shipments'});
    }
    return res.send(shipments);
});

//@router POST api/shipment
//@description route to add a shipment
router.post('/',[check('name', 'Name is required').not().isEmpty(), check('destination', 'Destination is required').not().isEmpty()], async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {name, destination, description} = req.body;

        const shipment = new Shipment({
            name,
            destination,
            description
        });

        await shipment.save();

        return res.status(200).json(shipment);
    }catch(err) {
        console.error(err.message);
        return res.status(500).json({msg: "Server Error."});
    }
});

//@route Delete /api/shipment/:shipmentId
//@description Delete an inventory item by it's id
router.delete('/:shipmentId',async (req,res)=>{
    try{
        let id = req.params.shipmentId;
        let shipment = await Shipment.findById(id);
        if(!shipment){
            return res.status(404).json({msg: 'Shipment not found, it may not exist.'});
        }
        await shipment.delete();

        res.status(200).json({msg: 'Shipment deleted.'})
    }catch(err){
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(404).json({msg:'Shipment not found, it may not exist.'});
        }
        res.status(500).json({msg: 'Server Error.'})
    }
});

//@route Post api/shipment/:shipmentId/:itemId
//@description add an item to a shipment by their IDs
router.post('/:shipmentId/:itemId', async (req, res)=>{
    try{
        const shipmentId = req.params.shipmentId;
        const itemId = req.params.itemId;
        const shipment = await Shipment.findById(shipmentId);
        const item = await InventoryItem.findById(itemId);
        if(!shipment){
            return res.status(404).json({msg: 'Shipment not found, it may not exist.'});
        }
        if(!item){
            return res.status(404).json({msg: 'Item not found, it may not exist.'});
        }
        shipment.update(
            {"$push": {"items": item}},
            {"new":true, "upsert": true},
            (err,shipment)=> {
                if (err) {
                    return res.status(400).json({msg: 'Error.'})
                }
            });
        res.status(200).json({msg:'Item added to shipment'});
    }catch(err){
        if(err.kind == 'ObjectId'){
            return res.status(404).json({msg: 'Item and or Shipment not found, it may not exist.'});
        }

        console.error(err.message);
        res.status(500).json({msg:'Server Error'});
    }

});

module.exports = router;