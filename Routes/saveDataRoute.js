const express = require('express');
const saveData = express.Router();

const fs = require('fs');
const path = require('path');


// paths
const tenantData = path.join(__dirname, '../Data/tenant.json');
const propertyData = path.join(__dirname, '../Data/property.json');
const propertyOwnerData = path.join(__dirname, '../Data/propertyOwner.json');
const applicationData = path.join(__dirname, '../Data/application.json');
const maintenanceData = path.join(__dirname, '../Data/maintenance.json');

//tenant
saveData.post('/tenant',(req,res)=>{
const tenant = req.body;
let tenants = []

try{
    tenants=JSON.parse(fs.readFileSync(tenantData,'utf-8'))
}catch(err){
    console.log("cant create read tenant file");
}

tenants.push(tenant);

try {
fs.writeFileSync(tenantData, JSON.stringify(tenants, null, 2));
res.status(201).send({ message: 'Tenant added!' });
} catch (err) {
res.status(500).send({ message: 'Failed to save tenant.' });
}
});

//property owner
saveData.post('/propertyOwner',(req,res)=>{
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
saveData.post('/property',(req,res)=>{

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

//maintenance request
saveData.post('/maintenanceRequest',(req,res)=>{

const maintenanceRequest = req.body;
let maintenanceRequests = []

try{
    maintenanceRequests=JSON.parse(fs.readFileSync(maintenanceData,'utf-8'))
}catch(err){
    console.log("cant create read maintenance file");
}

maintenanceRequests.push(maintenanceRequest);

try {
fs.writeFileSync(maintenanceData, JSON.stringify(maintenanceRequests, null, 2));
res.status(201).send({ message: 'Maintenance request added!' });
} catch (err) {
res.status(500).send({ message: 'Failed to save maintenance request.' });
}

})

//Application
saveData.post('/application',(req,res)=>{

const application = req.body;
let applications = []

try{
    applications=JSON.parse(fs.readFileSync(applicationData,'utf-8'))
}catch(err){
    console.log("cant create read property file");
}

applications.push(application);

try {
fs.writeFileSync(applicationData, JSON.stringify(applications, null, 2));
res.status(201).send({ message: 'Application added!' });
} catch (err) {
res.status(500).send({ message: 'Failed to save property.' });
}

})