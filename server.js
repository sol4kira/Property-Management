const express = require('express');
const cors = require('cors');

const approvedRoute = require('./Routes/approvedRoute');
const maintenanceRoute = require('./Routes/maintenanceRoute');
const saveDataRoute = require('./Routes/saveDataRoute');

const app = express();

app.use(express.json());
app.use(cors());

// send all requests to route.js
app.use('/approved', approvedRoute);
app.use('/applications',approvedRoute);
app.use('maintenance',maintenanceRoute)
app.use('/tenant',saveDataRoute);
app.use('/property',saveDataRoute);
app.use('/propertyOwner',saveDataRoute);
app.use('/application',saveDataRoute);
app.use('/maintenanceRequest',saveDataRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
