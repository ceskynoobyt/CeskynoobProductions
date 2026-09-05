document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('navLinks');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }

    // --- Scroll Animation (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible to prevent re-triggering
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // --- Cookie Consent Logic ---
    const banner = document.getElementById('cookie-banner');
    const settingsPanel = document.getElementById('cookie-settings');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');
    const settingsBtn = document.getElementById('settings-btn');
    const saveSettingsBtn = document.getElementById('save-settings');
    const analyticsCheck = document.getElementById('analytics-check');

    // Check local storage on load
    if (!localStorage.getItem('cookieConsent')) {
        banner.classList.remove('hidden');
    } else {
        banner.classList.add('hidden');
    }

    // Accept All
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.classList.add('hidden');
    });

    // Reject Non-Essential (Essentially just hides the banner)
    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        banner.classList.add('hidden');
    });

    // Toggle Settings Panel
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing immediately
        if(settingsPanel.classList.contains('hidden')){
            settingsPanel.classList.remove('hidden');
        } else {
            settingsPanel.classList.add('hidden');
        }
    });

    // Save Settings
    saveSettingsBtn.addEventListener('click', () => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // If user hasn't accepted or rejected yet, saving implies acceptance of current state (or default)
            localStorage.setItem('cookieConsent', 'accepted'); 
        }
        settingsPanel.classList.add('hidden');
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            navLinks.classList.remove('nav-active');

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
