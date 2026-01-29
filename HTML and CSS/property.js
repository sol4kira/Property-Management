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

// Select the div where we will inject the HTML
const housesEL = document.querySelector(".houses");
// Select the dropdown for sorting
const sortSelect = document.getElementById("sort");
// Select the city buttons on the side
const filterButtons = document.querySelectorAll(".inside-link");

// belail - keeping your comment
window.addEventListener("DOMContentLoaded", function() {
    // 1. Get the current URL parameters (e.g., ?filter=Gardena)
    const urlParams = new URLSearchParams(window.location.search);
    const filterValue = urlParams.get('filter');

    if (filterValue) {
        // If a filter exists (clicked from home), run the filtering logic
        runFilter(filterValue);
    } else {
        // Otherwise, show everything
        displayMenuItems(items);
    }
});

// --- THE WORKINGS: City Filtering ---
// Listen for clicks on the Redondo, Gardena, and Lawndale buttons
filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        // Use the ID of the button (Redondo, Gardena, or Lawndale)
        const category = e.currentTarget.id; 
        runFilter(category);
    });
});

function runFilter(cityName) {
    // We create a filtered list based on the city name
    const filteredHouses = items.filter(function(house) {
        return house.Address.toLowerCase().includes(cityName.toLowerCase()) || 
               house.Address2.toLowerCase().includes(cityName.toLowerCase());
    });
    
    // Display only matching items
    displayMenuItems(filteredHouses);
    
    // Update the "X properties match" count text
    const numberEl = document.getElementById("number");
    if(numberEl) numberEl.textContent = filteredHouses.length;
}

// --- THE WORKINGS: Price Sorting ---
sortSelect.addEventListener("change", (e) => {
    const sortType = e.target.value;
    
    // Create a copy so we don't break the original array
    let sortedItems = [...items]; 

    if (sortType === "highest") {
        // High to Low
        sortedItems.sort((a, b) => getPriceNumber(b.Price) - getPriceNumber(a.Price));
    } else if (sortType === "lowest") {
        // Low to High
        sortedItems.sort((a, b) => getPriceNumber(a.Price) - getPriceNumber(b.Price));
    } else {
        // Reset to original ID order
        sortedItems.sort((a, b) => a.id - b.id);
    }

    displayMenuItems(sortedItems);
});

// Helper: strips the "$" so JavaScript can do math to compare prices
function getPriceNumber(priceString) {
    return Number(priceString.replace(/[^0-9.-]+/g,""));
}

// --- THE WORKINGS: Generating HTML ---
function displayMenuItems(menuItems){
    let displayMenu = menuItems.map(function(item) {
        
        // Ternary operator: if status is Available, use green class; else red class.
        const statusColorClass = item.status === "Available" ? "status-available" : "status-rented";

        // OLD LINE: return `<a href="InsideProp.html">
// NEW LINE BELOW:
return `<a href="InsideProp.html?id=${item.id}">
            <article class="item">
                        <img src="${item.img}" alt="${item.alt}" class="photo">
                        <div class="info">
                            <p>${item.Address}<br>${item.Address2}</p>
                            <p>${item.Bed} Beds / ${item.Bath} Baths</p>
                            <p>${item.Price} / Month</p>
                            <p class="${statusColorClass}">${item.status}</p>
                        </div>
                    </article>
                </a>`;
    });
    
    housesEL.innerHTML = displayMenu.join("");
}