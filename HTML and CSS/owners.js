const items = [
    {
        id: 1,
        img: "/Owner-Images/Owner-1.webp",
        alt: "Owner-img-1",
        description: "Maintenance Form"
    },
    {
        id: 2,
        img: "/Owner-Images/Owner-2.webp",
        alt: "Owner-img-2",
        description: "Tenant Screening"
    },
    {
        id: 3,
        img: "/Owner-Images/Owner-3.webp",
        alt: "Owner-img-3",
        description: "Rent Collection"
    },
    {
        id: 4,
        img: "/Owner-Images/Owner-4.webp",
        alt: "Owner-img-4",
        description: "Maintenance"
    },
    {
        id: 5,
        img: "/Owner-Images/Owner-5.webp",
        alt: "Owner-img-5",
        description: "Financial Reporting"
    },
    {
        id: 6,
        img: "/Owner-Images/Owner-6.webp",
        alt: "Owner-img-6",
        description: "Eviction Protection"
    },
    {
        id: 7,
        img: "/Owner-Images/Owner-7.webp",
        alt: "Owner-img-7",
        description: "24/7 Maintenance"
    },
    {
        id: 8,
        img: "/Owner-Images/Owner-8.webp",
        alt: "Owner-img-8",
        description: "Leasing"
    },
    {
        id: 9,
        img: "/Owner-Images/Owner-9.webp",
        alt: "Owner-img-9",
        description: "Inspections"
    },
    {
        id: 10,
        img: "/Owner-Images/Owner-10.webp",
        alt: "Owner-img-10",
        description: "Accounting"
    }      
]; 

const menuItemEL = document.querySelector(".menu-items");

window.addEventListener("DOMContentLoaded", function() {
    displayMenuItems(items);
})

function displayMenuItems(menuItems){
    let displayMenu = menuItems.map(function(items) {
        return `<article class="O-item">
                    <img src=${items.img} alt=${items.alt}>
                    <p>${items.description}</p>
                </article>`;
    });
    displayMenu = displayMenu.join("");
    menuItemEL.innerHTML = displayMenu;
}