const express = require('express');
const cors = require('cors');

const approvedRoute = require('./Routes/approvedRoute');
const maintenanceRoute = require('./Routes/maintenanceRoute');
const saveDataRoute = require('./Routes/saveDataRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

// send all requests to route.js
app.use('/Routes/approved', approvedRoute);
app.use('/Routes/applications',approvedRoute);
app.use('/Routes/maintenance',maintenanceRoute)
app.use('/Routes/tenant',saveDataRoute);
app.use('/Routes/property',saveDataRoute);
app.use('/Routes/propertyOwner',saveDataRoute);
app.use('/Routes/application',saveDataRoute);
app.use('/Routes/maintenanceRequest',saveDataRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
