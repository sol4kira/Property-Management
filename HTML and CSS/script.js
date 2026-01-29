const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeSidebar');

if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
        sidebar.classList.add('active');
    });
}

if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}

if (sidebar) {
    sidebar.addEventListener('click', (e) => {
        if (e.target === sidebar) {
            sidebar.classList.remove('active');
        }
    });
    const links = sidebar.querySelectorAll('nav a');
    links.forEach(link => link.addEventListener('click', () => sidebar.classList.remove('active')));
}
// Belail --- IMAGE ZOOM ANIMATION (SCROLL REVEAL) using intersection observer ---

// 1. We create the "Observer" which watches for elements entering the screen
const observerOptions = {
    threshold: 0.2 // Trigger when 20% of the image is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the image is in the window, add the 'appear' class we made in CSS
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, observerOptions);

// 2. Tell the observer which images to watch
// We target the Middle Hero images and the Footer images
const imagesToAnimate = document.querySelectorAll('.display-place img, .img img');

imagesToAnimate.forEach(img => {
    observer.observe(img); // Start watching each image
});
// --- CONTACT FORM VALIDATION (SAFE VERSION) ---
const contactForm = document.querySelector('.contact-form');

// This 'if' check is crucial! It prevents the script from breaking on pages 
// that don't have a contact form (like InsideProp.html)
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isFormValid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            const errorMessage = input.nextElementSibling;
            if (input.value.trim() === "") {
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.style.display = 'block';
                }
                isFormValid = false;
            } else {
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.style.display = 'none';
                }
            }
        });

        if (isFormValid) {
            // Create a notification for the Admin
const adminNotifs = JSON.parse(localStorage.getItem('admin_notifications')) || [];
adminNotifs.unshift(`New Contact Message from ${inputs[0].value}`); // inputs[0] is First Name
localStorage.setItem('admin_notifications', JSON.stringify(adminNotifs));
            alert("Thank you! Your request has been sent.");
            contactForm.reset();
        }
    });
}