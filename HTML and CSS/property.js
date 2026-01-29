const items = [
    {
        id: 1,
        img: "property-Images/property-1.webp",
        alt: "property-img-1",
        Address: "14601 Firmona Ave",
        Address2: "Lawndale, CA 90260",
        Bed: "3",
        Bath: "2",
        Price: "$1300"
    },
    {
        id: 2,
        img: "property-Images/property-2.webp",
        alt: "property-img-2",
        Address: "14517 Larch Lawndale,",
        Address2: "CA 90260",
        Bed: "2 - 3",
        Bath: "1 - 2",
        Price: "$700"
    },
    {
        id: 3,
        img: "property-Images/property-3.webp",
        alt: "property-img-3",
        Address: "12013 Rockefeller Lane Redondo",
        Address2: "Beach, CA 90277",
        Bed: "1 - 2",
        Bath: "1",
        Price: "$700"
    },
    {
        id: 4,
        img: "property-Images/property-4.webp",
        alt: "property-img-4",
        Address: "2501 Mathews Ave",
        Address2: "Beach, CA 90280",
        Bed: "2",
        Bath: "1",
        Price: "$900"
    },
    {
        id: 5,
        img: "property-Images/property-5.webp",
        alt: "property-img-5",
        Address: "14601 Firmona Ave",
        Address2: "Lawndale, CA 90260",
        Bed: "5",
        Bath: "3",
        Price: "$1700"
    },
    {
        id: 6,
        img: "property-Images/property-6.webp",
        alt: "property-img-6",
        Address: "14601 Firmona Ave",
        Address2: "Lawndale, CA 90260",
        Bed: "1",
        Bath: "1",
        Price: "$500"
    },
    {
        id: 7,
        img: "property-Images/property-7.webp",
        alt: "property-img-7",
        Address: "14601 Firmona Ave",
        Address2: "Lawndale, CA 90260",
        Bed: "2",
        Bath: "3",
        Price: "$900"
    },
    {
        id: 8,
        img: "property-Images/property-8.webp",
        alt: "property-img-8",
        Address: "14601 Firmona Ave",
        Address2: "Lawndale, CA 90260",
        Bed: "4",
        Bath: "2",
        Price: "$1300"
    },
    {
        id: 9,
        img: "property-Images/property-9.webp",
        alt: "property-img-9",
        Address: "14601 Firmona Ave",
        Address2: "Lawndale, CA 90260",
        Bed: "3",
        Bath: "2",
        Price: "$1000"
    }      
]; 

const housesEL = document.querySelector(".houses");

window.addEventListener("DOMContentLoaded", function() {
    displayMenuItems(items);
})

function displayMenuItems(menuItems){
    let displayMenu = menuItems.map(function(items) {
        return `<a href="InsideProp.html">
                    <article class="item">
                        <img src=${items.img} alt=${items.alt} class="photo">
                        <div class="info">
                            <p>${items.Address}<br>${items.Address2}</p>
                            <p>${items.Bed} Beds / ${items.Bath} Baths</p>
                            <p>${items.Price} / Month</p>
                            <p>FULLY RENTED</p>
                        </div>
                    </article>
                </a>`;
    });
    displayMenu = displayMenu.join("");
    housesEL.innerHTML = displayMenu;
}


