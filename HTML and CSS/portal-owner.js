// --- DATA MODEL ---
const properties = [
    { id: "p1", address: "16800 Western Ave", units: [
        { id: "u1", name: "Unit A", tenant: "John Doe", status: "Occupied", rent: 1800 },
        { id: "u2", name: "Unit B", tenant: "Sarah Smith", status: "Occupied", rent: 1800 },
        { id: "u3", name: "Unit C", tenant: "None", status: "Vacant", rent: 0 }
    ]},
    { id: "p2", address: "1234 Emerald St", units: [
        { id: "u4", name: "Unit 101", tenant: "Mike Ross", status: "Occupied", rent: 1400 },
        { id: "u5", name: "Unit 102", tenant: "None", status: "Vacant", rent: 0 }
    ]}
];

// Load Maintenance from LocalStorage or use Default
let maintenanceRequests = JSON.parse(localStorage.getItem('owner_maint')) || [
    { id: 101, unit: "Unit A", title: "Leaky Faucet", cost: 120, status: "Pending" },
    { id: 102, unit: "Unit 101", title: "AC Repair", cost: 450, status: "Pending" },
    { id: 103, unit: "Unit B", title: "Door Lock", cost: 75, status: "Approved" }
];

// --- CORE LOGIC ---

function init() {
    calculateOverview();
    renderProperties();
    renderFinanceChart();
    renderMaintenance();
    renderNotifications();
}

function calculateOverview() {
    let totalRent = 0;
    let totalUnits = 0;
    let vacantUnits = 0;

    properties.forEach(p => {
        p.units.forEach(u => {
            totalUnits++;
            totalRent += u.rent;
            if (u.status === "Vacant") vacantUnits++;
        });
    });

    document.getElementById('totalProps').textContent = properties.length;
    document.getElementById('totalRent').textContent = `$${totalRent.toLocaleString()}`;
    const rate = ((vacantUnits / totalUnits) * 100).toFixed(0);
    document.getElementById('vacancyRate').textContent = `${rate}%`;
}

function renderProperties() {
    const container = document.getElementById('propertyList');
    container.innerHTML = properties.map(p => `
        <div class="card" style="margin-bottom: 20px;">
            <h3>${p.address}</h3>
            <table>
                <thead>
                    <tr><th>Unit</th><th>Tenant</th><th>Status</th><th>Rent Collected</th></tr>
                </thead>
                <tbody>
                    ${p.units.map(u => `
                        <tr>
                            <td>${u.name}</td>
                            <td>${u.tenant}</td>
                            <td style="color:${u.status === 'Vacant' ? 'var(--coral)' : 'var(--sage)'}">${u.status}</td>
                            <td>$${u.rent}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `).join('');
}

function renderMaintenance() {
    const body = document.getElementById('maintTableBody');
    body.innerHTML = maintenanceRequests.map(r => `
        <tr>
            <td>${r.unit}</td>
            <td>${r.title}</td>
            <td>$${r.cost}</td>
            <td style="color:${r.status === 'Approved' ? 'var(--sage)' : 'var(--amber)'}">${r.status}</td>
            <td>
                ${r.status === 'Pending' ? 
                    `<button class="btn btn-sage" onclick="approveMaint(${r.id})">Approve</button>` : 
                    `<i class="fa-solid fa-circle-check" style="color:var(--sage)"></i>`
                }
            </td>
        </tr>
    `).join('');
}

window.approveMaint = function(id) {
    maintenanceRequests = maintenanceRequests.map(r => 
        r.id === id ? { ...r, status: "Approved" } : r
    );
    localStorage.setItem('owner_maint', JSON.stringify(maintenanceRequests));
    renderMaintenance();
};

function renderFinanceChart() {
    const months = [
        {m: "Oct", val: 60}, {m: "Nov", val: 80}, {m: "Dec", val: 95}, {m: "Jan", val: 100}
    ];
    document.getElementById('financeChart').innerHTML = months.map(m => `
        <div style="text-align:center; flex:1">
            <div class="bar" style="height:${m.val}%; width:40px; margin: 0 auto;"></div>
            <span style="font-size:10px">${m.m}</span>
        </div>
    `).join('');
}

// --- CSV DOWNLOAD LOGIC ---
document.getElementById('downloadCSV').addEventListener('click', () => {
    let csv = "Property,Unit,Tenant,Rent\n";
    properties.forEach(p => {
        p.units.forEach(u => {
            csv += `${p.address},${u.name},${u.tenant},${u.rent}\n`;
        });
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Santorini_Report.csv`;
    link.click();
});

function renderNotifications() {
    const list = [
        "Rent collected for Unit A",
        "Vacancy Alert: Unit C is empty",
        "New Maintenance: AC Repair Pending"
    ];
    document.getElementById('ownerNotifs').innerHTML = list.map(n => `
        <div class="list-item unread" style="font-size:12px; padding:8px;">${n}</div>
    `).join('');
}

init();