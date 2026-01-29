const openBtn = document.getElementById("Add");
const modal = document.getElementById("formModal");
const closeBtn = document.querySelector(".close");

openBtn.addEventListener("click", () => {
    modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});