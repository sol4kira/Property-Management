// belail - Simulation logic for Santorini Tenant Portal
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { name: "John Doe", username: "tenant_john" };

document.getElementById('tenantName').textContent = currentUser.name;

// --- 1. NOTIFICATIONS SIMULATION ---
const notifications = [
    { text: "Rent due in 3 days", type: "urgent" },
    { text: "Maintenance scheduled tomorrow at 10 AM", type: "info" }
];

function renderNotifs() {
    const list = document.getElementById('notif-list');
    list.innerHTML = notifications.map(n => `<div class="list-item unread">${n.text}</div>`).join('');
}

// --- 2. RENT & INVOICE SYSTEM ---
const payForm = document.getElementById('paymentForm');
payForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = document.getElementById('payAmount').value;
    const history = JSON.parse(localStorage.getItem('tenant_payments')) || [];
    
    const payment = {
        date: new Date().toLocaleDateString(),
        amount: "$" + amount,
        id: "REF" + Math.floor(Math.random() * 100000)
    };

    history.unshift(payment); // Add to beginning
    localStorage.setItem('tenant_payments', JSON.stringify(history));
    alert("Payment successful!");
    renderPayments();
});

function renderPayments() {
    const history = JSON.parse(localStorage.getItem('tenant_payments')) || [];
    const body = document.getElementById('payHistoryBody');
    const receiptText = document.getElementById('receiptText');

    body.innerHTML = history.map(p => `<tr><td>${p.date}</td><td>${p.amount}</td><td>${p.id}</td></tr>`).join('');

    if(history.length > 0) {
        receiptText.innerHTML = `<strong>Last Payment:</strong> ${history[0].amount} on ${history[0].date}<br>ID: ${history[0].id}`;
    }
}

// DOWNLOAD INVOICE AS TEXT FILE
document.getElementById('downloadInvoice').addEventListener('click', () => {
    const history = JSON.parse(localStorage.getItem('tenant_payments')) || [];
    if(history.length === 0) return alert("No payments to download.");
    
    let content = "SANTORINI PROPERTY MANAGEMENT - INVOICE\n\n";
    content += `Tenant: ${currentUser.name}\nDate: ${new Date().toLocaleDateString()}\n\n`;
    content += history.map(p => `${p.date} | ${p.amount} | ${p.id}`).join("\n");

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${currentUser.name}.txt`;
    link.click();
});

// --- 3. MAINTENANCE SYSTEM ---
const maintForm = document.getElementById('maintForm');
maintForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const desc = document.getElementById('maintDesc').value;
    const requests = JSON.parse(localStorage.getItem('tenant_maint')) || [];
    
    requests.unshift({ desc, status: "Open", date: new Date().toLocaleDateString() });
    localStorage.setItem('tenant_maint', JSON.stringify(requests));
    renderMaint();
    maintForm.reset();
});

function renderMaint() {
    const requests = JSON.parse(localStorage.getItem('tenant_maint')) || [];
    document.getElementById('maintTableBody').innerHTML = requests.map(r => `
        <tr><td>${r.desc}</td><td style="color:var(--amber)">${r.status}</td><td>${r.date}</td></tr>
    `).join('');
}

// --- 4. LEASE RENEWAL SIMULATION ---
document.getElementById('renewBtn').addEventListener('click', () => {
    const status = document.getElementById('leaseStatus');
    status.textContent = "Renewal Requested";
    status.style.color = "var(--sage)";
    alert("Your renewal request has been sent to the property manager.");
});

// Initial Load
renderNotifs();
renderPayments();
renderMaint();