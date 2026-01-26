const SibApiV3Sdk = require('@getbrevo/brevo');
const brevo = new SibApiV3Sdk.TransactionalEmailsApi();
brevo.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

function propertyOwnerTenantApprovedEmail(application){
    const {propertyOwnerEmail,
        propertyOwner,
        tenantName,
        tenantEmail,
        tenantPhoneNumber,
        propertyAddress} = application;

    const emailContent=`
    <h2>New tenant application approved</h2>
    <p>Dear ${propertyOwner},</p>
    <p>We have approved a new tenant's application for the property located at ${propertyAddress}</p>
    <p>We carefully looked to all applicants and we are pleased to inform you that we found ${tenantName} suitable for your property based on the information details he provided.</p>
    <p> Here is the tenant's information:</p>
    <ul>
    <li><strong>Name:</strong>${tenantName}</li>
    <li><strong>Email:</strong>${tenantEmail}</li>
    <li><strong>Phone Number:</strong>${tenantPhoneNumber}</li>
    </ul>
    <p>Our goal is to ensure that you get the best deal out of you and your property.
    We believe that ${tenantName} will be great for your property.</p>

    <p> The tenant will pay the 3 month rate and security deposit in the coming days, We will process the payment and you would receive the payment.</p>
    <p> You would get the lease agreement to sign in the next couple of days.</p>
    <br>
    <p>Fill free to contact us if there is any concerns.</p>
    <p> Thank you for choosing BBk Properties Management.</p>
    <br>
    `;

    return brevo.sendTransacEmail({
        sender: {
            email: process.env.FROM_EMAIL,
            name: 'BBK Property Management'
        },
        to: [
            { email: propertyOwnerEmail, name: propertyOwner }
        ],
        subject: 'Tenant Application Approved',
        htmlContent: emailContent
    });
}

module.export = {propertyOwnerTenantApprovedEmail};