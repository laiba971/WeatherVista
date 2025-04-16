// Mobile Menu Toggle
const navLinks = document.getElementById('navLinks');
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');

if (openMenu && closeMenu && navLinks) {
    openMenu.addEventListener('click', () => {
        navLinks.classList.add('active');
    });
    
    closeMenu.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active section in navigation
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Set active link on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentHash = window.location.hash;
    if (currentHash) {
        const targetElement = document.querySelector(currentHash);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
    
    // Set home link as active if no hash
    if (!currentHash) {
        document.querySelector('.nav-links a[href="#"]').classList.add('active');
    }
});

// Common functions used across pages
document.addEventListener('DOMContentLoaded', function() {
    // Check auth status on all pages
    const user = JSON.parse(localStorage.getItem('weatherUser'));
    
    // Redirect to login if not authenticated on dashboard
    if (window.location.pathname.includes('dashboard.html') && (!user || !user.loggedIn)) {
        window.location.href = 'login.html';
    }
    
    // Redirect to dashboard if already logged in
    if ((window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html')) && user && user.loggedIn) {
        window.location.href = 'dashboard.html';
    }
});