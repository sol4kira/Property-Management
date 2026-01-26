const express = require('express');
const route = express.Router();

const {tenantApprovedEmail}= require('../Email/tenateEmail.js');
const {propertyOwnerTenantApprovedEmail}= require ('../Email/propertyOwnerEmail.js');

//application email route
route.post('/application',async (req,res)=>{
    const application = req.body;

    try{
        await  tenantApprovedEmail(application);
        await propertyOwnerTenantApprovedEmail(application);
        res.status(200).send({message:'Application email sent successfully'});
    }
    catch(err){
        res.status(500).send({message:'Failed to send application email'});
    }

})

