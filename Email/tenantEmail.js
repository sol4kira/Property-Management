const SibApiV3Sdk = require('@getbrevo/brevo');
const brevo = new SibApiV3Sdk.TransactionalEmailsApi();
brevo.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

function tenantApplicationEmail(application){
    const {
        tenantName,
        tenantEmail,
        propertyAddress
        } = application;

        const emailContent=`
        <h2> Application Recieved</h2>
        <p>Dear ${tenantName},</p>

        <p> We have received the application you submitted for the property located at ${propertyAddress}.
        We will look at the application and get back to you as soon as possible.</p>

        <p> Thank you for choosing BBk Properties Management.</p>
        <br>
        `;

        return brevo.sendTransacEmail({
        sender: {
            email: process.env.FROM_EMAIL,
            name: 'BBK Property Management'
        },
        to: [
            { email: tenantEmail, name: tenantName }
        ],
        subject: 'Tenant Application Recieved',
        htmlContent: emailContent
    });

}

function tenantApprovedEmail(application){
    const {propertyOwnerEmail,
        propertyOwner,
        tenantName,
        tenantEmail,
        tenantPhoneNumber,
        propertyAddress
        } = application;

    const emailContent=`
    <h2>Application Approved</h2>
    <p>Dear ${tenantEmail},</p>
    <p>We have approved a your application for the property located at ${propertyAddress}</p>
    <p>We carefully looked through all the applicants and we found your application pleasing and approved your your application.</p>
    <p> Here is the your information:</p>
    <ul>
    <li><strong>Name:</strong>${tenantName}</li>
    <li><strong>Email:</strong>${tenantEmail}</li>
    <li><strong>Phone Number:</strong>${tenantPhoneNumber}</li>
    </ul>
    
    <p>Here is the information of the property you have been approved for:</p>
    <ul>
    <li><strong>Property Owner:</strong>${propertyOwner}</li>
    <li><strong>Property Owner Email:</strong>${propertyOwnerEmail}</li>
    <li><strong>Property Address:</strong>${propertyAddress}</li>
    </ul>

    <p>We congratulation for your new home.</p>

    <h2>Next Steps</h2>
    <p>Now that your application have been approved, you are required to do this in order to finalize the deal and seal the agreement.</p>
    <ul type="disc">
    <li> Pay the first three month rent and security deposit. You would receive an email with payment details in the coming days.</li>
    <li> Once the payment is proceed and confirmed you are then required to make a security deposit.</li>
    <li> You need to sign the lease agreement. You would sign the lease agreement digitally. You would receive the lease agreement in the next couple of days. After finishing the two payments.</li>
    </ul>

    <p>We are excited to have you as a tenant and we believe you will have a great experience with us.</p>
    <br>
    <p>Fill free to contact us if there is any concerns.</p>
    <a href="mailto:${propertyOwnerEmail}">Contact Property Owner</a>
    <br>
    <p> Thank you for choosing BBk Properties Management.</p>
    <br>
    `;

    return brevo.sendTransacEmail({
        sender: {
            email: process.env.FROM_EMAIL,
            name: 'BBK Property Management'
        },
        to: [
            { email: tenantEmail, name: tenantName }
        ],
        subject: 'Tenant Application Approved',
        htmlContent: emailContent
    });
}

function tenantMaintenanceRequestEmail(maintenanceRequest){
    const {
        tenantName,
        tenantEmail,
        propertyAddress,
        requestDetails,
    } = maintenanceRequest;

    const emailContent = `
    <h2>Maintenance Request Recevied</h2>
    <p>Dear ${tenantName},</p>

    <p>We have received your maintenance request for the property located at ${propertyAddress}.</p>
    <p>As per your request, provided below are the details of the maintenance issue:</p>
    <p><strong>Request Details:</strong> ${requestDetails}</p>

    <P> Our maintenance team will review your request and get back to you and schedule  a visit to address your issue as soon as possible.</p>

    <p>Thank you for bringing this to our attention. We are committed to ensuring your living experience is comfortable and enjoyable.</p>

    <p>Fill free to contact us if there is any concerns.</p>
    <a href="mailto:${process.env.FROM_EMAIL}">Contact us.</a>
    <br>
    <p> Thank you for choosing BBk Properties Management.</p>
    <br>
    `;

    return brevo.sendTransacEmail({
        sender: {
            email: process.env.FROM_EMAIL,
            name: 'BBK Property Management'
        },
        to: [
            { email: tenantEmail, name: tenantName }
        ],
        subject: 'Tenant Application Approved',
        htmlContent: emailContent
    });
}

module.exports = { tenantApplicationEmail, tenantApprovedEmail, tenantMaintenanceRequestEmail };