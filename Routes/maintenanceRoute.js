const express = require('express')
const route = express.Router();

const {tenantMaintenanceRequestEmail} = require('../Email/tenateEmail.js')
const {propertyOwnerMaintenanceEmail} = require('../Email/propertyOwnerEmail.js')

route.post('/maintenance',async (req,res)=>{
    const maintenanceRequest = req.body;

    try{
        await tenantMaintenanceRequestEmail(maintenanceRequest);
        await propertyOwnerMaintenanceEmail(maintenanceRequest);
        res.status(200).send({message:'Maintenance request email sent successfully'});
    }
    catch(err){
        res.status(500).send({message:'Failed to send Maintenance request email'});
    }
})