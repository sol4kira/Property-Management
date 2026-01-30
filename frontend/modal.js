window.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("Add");
    const modal = document.getElementById("formModal");
    const closeBtn = document.querySelector(".close");
    const appForm = document.querySelector(".modal-contact-form");

    // 1. Open/Close Logic
    if (openBtn && modal) {
        openBtn.addEventListener("click", () => modal.classList.add("active"));
    }
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    }

    // 2. SUBMISSION LOGIC
    if (appForm) {
        appForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Get property name from the page (from the <h2> we gave an ID earlier)
            const propertyRequested = document.getElementById("propAddress")?.innerText || "Unknown Property";

            // Create the application object
            const newApplication = {
                //id: "app" + Date.now(), 
                name: document.getElementById("firstName").value + " " + document.getElementById("lastName").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                message: document.getElementById("message").value,
                //date: new Date().toLocaleDateString()
            };
            console.log("New Application:", newApplication);
            const response = await fetch("https://property-management-9ilw.onrender.com/Routes/application/application", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newApplication)
            });

            if (!response.ok) {
            alert("Failed to submit application");
            return;
            }


            // GET existing apps from localStorage, PUSH new one, SAVE back
            const existingApps = JSON.parse(localStorage.getItem('admin_apps')) || [];
            existingApps.push(newApplication);
            localStorage.setItem('admin_apps', JSON.stringify(existingApps));

            // Success feedback
            alert("Application Submitted Successfully! The Admin will review it shortly.");
            
            appForm.reset();
            modal.classList.remove("active");
        });
    }
});