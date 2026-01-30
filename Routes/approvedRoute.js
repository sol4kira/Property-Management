const express = require('express');
const route = express.Router();

const {tenantApprovedEmail,tenantApplicationEmail}= require('../Email/tenantEmail.js');
const {propertyOwnerTenantApprovedEmail}= require ('../Email/propertyOwnerEmail.js');

//application email route
route.post('/application',async (req,res)=>{
    console.log(req.body);
    const application = req.body;
        try{
        await tenantApplicationEmail(application);
        console.log("Application received:", application);
        res.status(200).send({message:'Application email sent successfully'});
    }
    catch(err){
        res.status(500).send({message:'Failed to send application email'});
    }

})

route.post('/approved',async(req,res)=>{
    const approved = req.body;
    
    try{

        await tenantApprovedEmail(approved);
        await propertyOwnerTenantApprovedEmail(approved);
        res.status(200).send({message:'Approved email sent successfully'});
    }catch(err){
        res.status(500).send({message:'Failed to send approved email'});
    }
})

module.exports = route;
