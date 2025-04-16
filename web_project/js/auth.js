// auth.js
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const forgotForm = document.getElementById('forgot-form');
const authModal = document.getElementById('auth-modal');
const loginSignupBtn = document.getElementById('login-signup-btn');

let currentForm = 'login'; // Default form

// Open the authentication modal
function openAuthModal() {
    authModal.style.display = 'block';
    if (currentForm === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        forgotForm.style.display = 'none';
    } else if (currentForm === 'signup') {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
        forgotForm.style.display = 'none';
    } else {
        forgotForm.style.display = 'block';
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
    }
}

// Close the modal
function closeAuthModal() {
    authModal.style.display = 'none';
}

// Initialize auth functionality
function init() {
    loginSignupBtn.addEventListener('click', () => {
        openAuthModal();
    });

    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('#email').value;
        const password = loginForm.querySelector('#password').value;
        
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Simple validation for demo purposes
        localStorage.setItem('weatherUser', JSON.stringify({ email }));
        alert('Login successful! Redirecting...');
        setTimeout(() => {
            window.location.href = 'dashboard.html'; // Redirect to weather dashboard
        }, 1500);
    });

    // Handle signup
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = signupForm.querySelector('#signup-email').value;
        const password = signupForm.querySelector('#signup-password').value;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        localStorage.setItem('weatherUser', JSON.stringify({ email }));
        alert('Signup successful! Redirecting...');
        setTimeout(() => {
            window.location.href = 'dashboard.html'; // Redirect to weather dashboard
        }, 1500);
    });

    // Switch between forms (Login / Signup / Forgot Password)
    document.getElementById('signup-btn').addEventListener('click', () => {
        currentForm = 'signup';
        openAuthModal();
    });

    document.getElementById('forgot-btn').addEventListener('click', () => {
        currentForm = 'forgot';
        openAuthModal();
    });

    document.getElementById('reset-password').addEventListener('click', () => {
        alert('Password reset link sent!');
        closeAuthModal();
    });

    // Close modal on click outside
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            closeAuthModal();
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
// Handle form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simple validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Store in localStorage (simulating login)
            localStorage.setItem('weatherUser', JSON.stringify({
                email: email,
                loggedIn: true
            }));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirm = document.getElementById('signupConfirm').value;
            
            // Validation
            if (!name || !email || !password || !confirm) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirm) {
                alert('Passwords do not match');
                return;
            }
            
            // Store in localStorage (simulating user creation)
            localStorage.setItem('weatherUser', JSON.stringify({
                name: name,
                email: email,
                loggedIn: true
            }));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('weatherUser'));
    if (user && user.loggedIn && (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html'))) {
        window.location.href = 'dashboard.html';
    }
});

// Auth functionality using localStorage (no backend)
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    checkAuthStatus();
    
    // Setup login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Setup signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup();
        });
    }
});

// Check authentication status
function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('weatherUser'));
    
    // Redirect to dashboard if already logged in
    if (user && user.loggedIn) {
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('signup.html')) {
            window.location.href = 'dashboard.html';
        }
    }
    // Redirect to login if not authenticated on dashboard
    else if (window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'login.html';
    }
}

// Handle login
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (!email || !password) {
        showAlert('Please fill in all fields', 'error');
        return;
    }
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('weatherUsers')) || [];
    const user = users.find(u => u.email === email);
    
    // Check if user exists and password matches (in real app, password would be hashed)
    if (user && user.password === password) {
        // Create session
        localStorage.setItem('weatherUser', JSON.stringify({
            name: user.name,
            email: user.email,
            loggedIn: true
        }));
        
        showAlert('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        showAlert('Invalid email or password', 'error');
    }
}

// Handle signup
function handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validation
    if (!name || !email || !password || !confirm) {
        showAlert('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirm) {
        showAlert('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 8) {
        showAlert('Password must be at least 8 characters', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showAlert('You must agree to the terms and conditions', 'error');
        return;
    }
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('weatherUsers')) || [];
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        showAlert('Email already registered', 'error');
        return;
    }
    
    // Add new user (in real app, password would be hashed)
    users.push({
        name: name,
        email: email,
        password: password
    });
    
    // Save users
    localStorage.setItem('weatherUsers', JSON.stringify(users));
    
    // Create session
    localStorage.setItem('weatherUser', JSON.stringify({
        name: name,
        email: email,
        loggedIn: true
    }));
    
    showAlert('Account created successfully! Redirecting...', 'success');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Show alert message
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Insert alert
    const form = document.querySelector('.auth-form');
    if (form) {
        form.insertBefore(alert, form.firstChild);
        
        // Remove alert after 3 seconds
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
}

// Add alert styles dynamically
const style = document.createElement('style');
style.textContent = `
    .alert {
        padding: 0.8rem 1rem;
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
        font-size: 0.9rem;
        animation: slideDown 0.3s ease;
    }
    
    .alert-error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .alert-success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);