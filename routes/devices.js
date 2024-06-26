const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

/** ********************************************
 * POST Endpoint to register a new Device
 ******************************************** */
router.post('/', async(req, res)=>{
    try{
        const newDevice = new Device(req.body);
        await newDevice.save();
        res.status(201).json(newDevice);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

/** ********************************************
 * GET Endpoint to get all devices
 ******************************************** */
router.get('/', async(req, res)=>{
    try{
        const devices = await Device.find();
        res.json(devices);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

/** ********************************************
 * GET Endpoint to get specific device by ID
 ******************************************** */
router.get('/:deviceId', async(req, res)=>{
    try{
        const device = await Device.findById(req.params.deviceId);
        res.json(device);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

/** ********************************************
 * PATCH Endpoint to update specific device by ID
 ******************************************** */
router.patch('/:deviceId', async(req, res)=>{
    try{
        const updateDevice = await Device.findByIdAndUpdate(req.params.deviceId, { $set: req.body });
        res.json(updateDevice);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

/** ********************************************
 * DELETE Endpoint to remove a specific device by ID
 ******************************************** */
router.delete('/:deviceId', async(req, res)=>{
    try{
        const device = await Device.findOneAndDelete( { deviceId: req.params.deviceId });
        if(!device){
            return res.status(404).json({ message: 'Device not found!'});
        }
        res.status(200).json({ message: 'Device deleted successfully!' });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;