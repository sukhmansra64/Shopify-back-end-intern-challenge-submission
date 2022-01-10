const express = require('express');
const {validationResult, check} = require("express-validator");
const router = express.Router();

const InventoryItem = require('../models/inventoryItem');

//@route GET api/inventory
//@description route to get all items and their information from the inventory

router.get('/', async (req, res)=>{
   try{
      const items = await InventoryItem.find();
      if(!items){
         return res.status(400).send({msg: 'There are currently no items'});
      }
      return res.status(200).json(items);
   }catch(err){
      console.error(err.message);
      res.status(500).json({msg: 'Server Error.'});
   }
});

//@route Post api/inventory
//@description create an inventory item
router.post('/',[check('name', 'Name is required.').not().isEmpty(),
],async (req,res)=>{
   try{
      const errors = validationResult(req)
      if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
      }

      const {name, description} = req.body;

      const inventoryItem = new InventoryItem({
         name,
         description
      });

      await inventoryItem.save();

      return res.status(200).json(inventoryItem);
   }catch(err){
      console.error(err.message);
      return res.status(500).json({msg: "Server Error."});
   }
});

//@route POST api/inventory/:id
//@description Update an inventory item by it's id
router.post('/:itemId',async (req,res)=>{
   try{
      let id = req.params.itemId;
      let item = await InventoryItem.findByIdAndUpdate(id,req.body,{new:true});
      if(!item){
         return res.status(404).json({msg: 'Item not found, it may not exist.'});
      }
      return res.status(200).json(item);
   }catch(err){
      console.error(err.message);
      if(err.kind == 'ObjectId'){
         return res.status(404).json({msg:'Item not found, it may not exist.'});
      }
      res.status(500).json({msg: 'Server Error.'})
   }
});

//@route Delete /api/inventory/:itemId
//@description Delete an inventory item by it's id
router.delete('/:itemId',async (req,res)=>{
   try{
      let id = req.params.itemId;
      let item = await InventoryItem.findById(id);
      if(!item){
         return res.status(404).json({msg: 'Item not found, it may not exist.'});
      }
      await item.delete();

      res.status(200).json({msg: 'Item deleted.'})
   }catch(err){
      console.error(err.message);
      if(err.kind == 'ObjectId'){
         return res.status(404).json({msg:'Item not found, it may not exist.'});
      }
      res.status(500).json({msg: 'Server Error.'})
   }
});

module.exports = router;