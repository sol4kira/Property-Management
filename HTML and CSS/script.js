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
