
        const loginForm = document.querySelector('form');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get the values the user typed in
            const username = e.target.querySelector('input[type="text"]').value;
            const password = e.target.querySelector('input[type="password"]').value;

            // 1. DATA: Our "Database" of users (String Comparison)
            const users = {
                "admin_santorini": { pass: "admin123", role: "admin", name: "System Admin" },
                "owner_eli": { pass: "owner123", role: "owner", name: "Eli Patronas" },
                "tenant_john": { pass: "tenant123", role: "tenant", name: "John Doe" },
                "admin_kirubel": { pass: "kira123", role: "admin", name: "System Admin" },
                "owner_kirubel": { pass: "owner123", role: "owner", name: "Kirubel Solomon" },
                "tenant_kirubel": { pass: "tenant123", role: "tenant", name: "Kirubel Solomon" },
                "admin_belail": { pass: "bel123", role: "admin", name: "System Admin" },
                "owner_belail": { pass: "belowner123", role: "owner", name: "Belail Abebe" },
                "tenant_belail": { pass: "beltenant123", role: "tenant", name: "Belail Abebe" },
                "admin_barkot": { pass: "barkot123", role: "admin", name: "System Admin" },
                "owner_barkot": { pass: "barkotowner123", role: "owner", name: "Barkot Solomon" },
                "tenant_barkot": { pass: "barkottenant123", role: "tenant", name: "Barkot Solomon" }

            };

            const user = users[username];

            // 2. AUTHENTICATION: Check if user exists and password matches
            if (user && user.pass === password) {
                // Save session so portals know who is logged in
                localStorage.setItem('currentUser', JSON.stringify({
                    username: username,
                    role: user.role,
                    name: user.name
                }));

                // 3. ROUTING: Send them to their specific portal
                if (user.role === 'admin') {
                    window.location.href = 'portal-admin.html';
                } else if (user.role === 'owner') {
                    window.location.href = 'portal-owner.html';
                } else if (user.role === 'tenant') {
                    window.location.href = 'portal-tenant.html';
                }
            } else {
                // Error handling
                alert("Access Denied: Invalid Username or Password.");
            }
        });