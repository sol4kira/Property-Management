// --- INITIAL DATA SETUP ---
let applications = JSON.parse(localStorage.getItem('admin_apps')) || [
    { id: "app1", name: "Alice Green", email: "alice@test.com", unit: "Unit C", status: "pending" },
    { id: "app2", name: "Bob Vance", email: "bob@refrigeration.com", unit: "Unit 102", status: "pending" }
];

let adminProperties = JSON.parse(localStorage.getItem('admin_props')) || [
    { id: "p1", address: "16800 Western Ave", owner: "Eli Patronas" },
    { id: "p2", address: "1234 Emerald St", owner: "Eli Patronas" }
];

let allMaintenance = JSON.parse(localStorage.getItem('tenant_maint')) || [
    { id: "m1", desc: "Broken Pipe", contractor: "Unassigned", status: "Open" }
];

let auditLogs = JSON.parse(localStorage.getItem('admin_logs')) || [];

// --- CORE FUNCTIONS ---

function init() {
    updateDashboard();
    renderApps();
    renderProps();
    renderMaint();
    renderLogs();
    renderChart();
}

// 1. DASHBOARD & LOGS
function updateDashboard() {
    document.getElementById('countApps').textContent = applications.filter(a => a.status === 'pending').length;
    document.getElementById('countProps').textContent = adminProperties.length;
    document.getElementById('countMaint').textContent = allMaintenance.filter(m => m.status === 'Open').length;
    document.getElementById('countTenants').textContent = "45"; // Mock total
}

function addLog(action) {
    const entry = { timestamp: new Date().toLocaleString(), action };
    auditLogs.unshift(entry);
    localStorage.setItem('admin_logs', JSON.stringify(auditLogs));
    renderLogs();
}

function renderLogs() {
    document.getElementById('auditLogBody').innerHTML = auditLogs.map(l => `
        <tr><td>${l.timestamp}</td><td>${l.action}</td></tr>
    `).join('');
}

// 2. APPLICATION QUEUE
function renderApps() {
    const body = document.getElementById('appTableBody');
    body.innerHTML = applications.map(app => `
        <tr>
            <td>${app.name}</td>
            <td>${app.unit}</td>
            <td>${app.email}</td>
            <td style="color:var(--amber)">${app.status}</td>
            <td>
                ${app.status === 'pending' ? `
                    <button class="btn btn-sage" onclick="processApp('${app.id}', 'Approved')">Approve</button>
                    <button class="btn btn-coral" onclick="processApp('${app.id}', 'Rejected')">Reject</button>
                ` : 'Processed'}
            </td>
        </tr>
    `).join('');
}

window.processApp = function(id, status) {
    const app = applications.find(a => a.id === id);
    app.status = status;
    localStorage.setItem('admin_apps', JSON.stringify(applications));
    addLog(`${status} application for ${app.name}`);
    
    if(status === 'Approved') {
        alert(`New Tenant Account Created for ${app.name}`);
        /*fetch("http://localhost:5000/approved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(app)
});*/

    }
    
    renderApps();
    updateDashboard();
}

// 3. PROPERTY MANAGEMENT
document.getElementById('addPropForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const address = document.getElementById('newPropAddress').value;
    const owner = document.getElementById('ownerAssign').value;
    
    adminProperties.push({ id: Date.now(), address, owner });
    localStorage.setItem('admin_props', JSON.stringify(adminProperties));
    
    addLog(`Added new property: ${address}`);
    document.getElementById('addPropForm').reset();
    renderProps();
    updateDashboard();
});

function renderProps() {
    document.getElementById('adminPropBody').innerHTML = adminProperties.map(p => `
        <tr>
            <td>${p.address}</td>
            <td>${p.owner}</td>
            <td><button class="btn btn-coral" onclick="deleteProp(${p.id})">Remove</button></td>
        </tr>
    `).join('');
}

window.deleteProp = function(id) {
    adminProperties = adminProperties.filter(p => p.id !== id);
    localStorage.setItem('admin_props', JSON.stringify(adminProperties));
    addLog(`Removed property ID: ${id}`);
    renderProps();
    updateDashboard();
}

// 4. MAINTENANCE
function renderMaint() {
    document.getElementById('adminMaintBody').innerHTML = allMaintenance.map(m => `
        <tr>
            <td>${m.id}</td>
            <td>${m.desc}</td>
            <td>
                <select onchange="addLog('Assigned contractor to ${m.id}')">
                    <option>Unassigned</option>
                    <option>South Bay Plumbing</option>
                    <option>Electric Pros</option>
                </select>
            </td>
            <td style="color:var(--amber)">${m.status}</td>
            <td><button class="btn btn-sage" onclick="addLog('Resolved Maint ${m.id}')">Resolve</button></td>
        </tr>
    `).join('');
}

function renderChart() {
    const data = [40, 70, 20, 90];
    document.getElementById('adminChart').innerHTML = data.map(val => `
        <div class="bar" style="height:${val}%; width:50px"></div>
    `).join('');
}

init();