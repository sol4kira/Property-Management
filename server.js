const port = process.env.PORT || 5000;
import express from 'express';

const fs = require('fs');
const path = require('path');

const TenatEmail = path.join(__dirname,'/Email/tenateEmail.json');
const propertyOwnerEmail = path.join(__dirname,'/Email/propertyOwnerEmail.json');

const propertyOwnerData = path.join(__dirname,'/Data/propertyOwner.json');
const propertyData = path.join(__dirname,'/Data/property.json');
const tenateData = path.join(__dirname,'/Data/tenate.json');

const SibApiV3Sdk = require('@getbrevo/brevo');
const brevo = new SibApiV3Sdk.TransactionalEmailsApi();
brevo.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//tenant
app.post('/tenant',(req,res)=>{
const tenant = req.body;
let tenants = []

try{
    tenants=JSON.parse(fs.readFileSync(tenateData,'utf-8'))
}catch(err){
    console.log("cant create read tenate file");
}

tenants.push(tenant);

try {
fs.writeFileSync(tenateData, JSON.stringify(tenants, null, 2));
res.status(201).send({ message: 'Tenant added!' });
} catch (err) {
res.status(500).send({ message: 'Failed to save tenant.' });
}
});

//property owner
app.post('/propertyOwner',(req,res)=>{
    const propertyOwner = req.body;
let propertyOwners = []

try{
    propertyOwners=JSON.parse(fs.readFileSync(propertyOwnerData,'utf-8'))
}catch(err){
    console.log("cant create read property Owner file");
}

propertyOwners.push(propertyOwner);

try {
fs.writeFileSync(propertyOwnerData, JSON.stringify(propertyOwners, null, 2));
res.status(201).send({ message: 'Property Owner added!' });
} catch (err) {
res.status(500).send({ message: 'Failed to save property owner.' });
}
});

//property
app.post('/property',(req,res)=>{

const property = req.body;
let properties = []

try{
    properties=JSON.parse(fs.readFileSync(propertyData,'utf-8'))
}catch(err){
    console.log("cant create read property file");
}

properties.push(property);

try {
fs.writeFileSync(propertyData, JSON.stringify(properties, null, 2));
res.status(201).send({ message: 'Property added!' });
} catch (err) {
res.status(500).send({ message: 'Failed to save property.' });
}

})