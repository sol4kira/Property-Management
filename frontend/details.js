const items = [
    {
        id: 1,
        img: "property-Images/property-1.webp",
        alt: "property-img-1",
        Address: "16800 Western Ave",
        Address2: "Gardena, CA 90247",
        Bed: "2",
        Bath: "2",
        Price: "$1800",
        status: "Available"
    },
    {
        id: 2,
        img: "property-Images/property-2.webp",
        alt: "property-img-2",
        Address: "1234 Emerald St",
        Address2: "Gardena, CA 90248",
        Bed: "1",
        Bath: "1",
        Price: "$1400",
        status: "Available"
    },
    {
        id: 3,
        img: "property-Images/property-3.webp",
        alt: "property-img-3",
        Address: "12013 Rockefeller Lane Redondo",
        Address2: "Beach, CA 90277",
        Bed: "1 - 2",
        Bath: "1",
        Price: "$700",
        status: "FULLY RENTED"
    },
    {
        id: 4,
        img: "property-Images/property-4.webp",
        alt: "property-img-4",
        Address: "2501 Mathews Ave",
        Address2: "Beach, CA 90280",
        Bed: "2",
        Bath: "1",
        Price: "$900",
        status: "FULLY RENTED"
    },
    {
        id: 5,
        img: "property-Images/property-5.webp",
        alt: "property-img-5",
        Address: "14601 Firmona Ave",
        Address2: "Lawndale, CA 90260",
        Bed: "5",
        Bath: "3",
        Price: "$1700",
        status: "FULLY RENTED"
    },
    {
        id: 6,
        img: "property-Images/property-6.webp",
        alt: "property-img-6",
        Address: "14601 Firmona Ave",
        Address2: "Lawndale, CA 90260",
        Bed: "1",
        Bath: "1",
        Price: "$500",
        status: "FULLY RENTED"
    },
    {
        id: 7,
        img: "property-Images/property-7.webp",
        alt: "property-img-7",
        Address: "14601 Firmona Ave",
        Address2: "Lawndale, CA 90260",
        Bed: "2",
        Bath: "3",
        Price: "$900",
        status: "FULLY RENTED"
    },
    {
        id: 8,
        img: "property-Images/property-8.webp",
        alt: "property-img-8",
        Address: "14601 Firmona Ave",
        Address2: "Lawndale, CA 90260",
        Bed: "4",
        Bath: "2",
        Price: "$1300",
        status: "FULLY RENTED"
    },
    {
        id: 9,
        img: "property-Images/property-9.webp",
        alt: "property-img-9",
        Address: "14601 Firmona Ave",
        Address2: "Lawndale, CA 90260",
        Bed: "3",
        Bath: "2",
        Price: "$1000",
        status: "FULLY RENTED"
    }      
]; 

window.addEventListener("DOMContentLoaded", () => {
    // 2. Get the ID from the URL (?id=1)
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // 3. Find the property in our array that matches that ID
    const property = items.find(item => item.id == id);

    if (property) {
        // 4. Update the HTML with the real data
        document.getElementById('propImage').src = property.img;
        document.getElementById('propAddress').innerHTML = `${property.Address} <br> ${property.Address2}`;
        document.getElementById('propStatus').textContent = property.status;
        
        // Update the status color
        const statusEl = document.getElementById('propStatus');
        if (property.status === "Available") {
            statusEl.style.color = "#2e7d32"; // Green
        } else {
            statusEl.style.color = "#b40404"; // Red
        }
    } else {
        // If someone types a wrong ID in the URL
        document.getElementById('propAddress').textContent = "Property Not Found";
    }
});