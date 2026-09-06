// Global variables
let isMobile = false;
let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let cookieConsentGiven = false;
let currentSection = 'home';
let mouseX = 0;
let mouseY = 0;
let scrollProgress = 0;

// DOM Elements
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const heroSection = document.getElementById('hero');
const serviceCards = document.querySelectorAll('.service-card');
const projectCards = document.querySelectorAll('.project-card');
const teamMembers = document.querySelectorAll('.team-member');
const privacySections = document.querySelectorAll('.privacy-section');
const contactForm = document.getElementById('contact-form');
const copyEmailBtn = document.getElementById('copy-email-btn');
const cookieBanner = document.getElementById('cookie-banner');
const acceptAllBtn = document.getElementById('accept-all-btn');
const rejectNonEssentialBtn = document.getElementById('reject-non-essential-btn');
const cookieSettingsBtn = document.getElementById('cookie-settings-btn');
const cookieSettingsPanel = document.getElementById('cookie-settings-panel');
const closeCookieSettingsBtn = document.getElementById('close-cookie-settings');
const cookieConsentCloseBtn = document.getElementById('cookie-consent-close');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkMobile();
    initCookieConsent();
    initHeroEffects();
    initNavigation();
    initScrollAnimations();
    initServiceCards();
    initProjectCards();
    initTeamMembers();
    initPrivacySections();
    initContactForm();
    initCopyEmail();
    initCursorEffects();
    setupEventListeners();
});

// Check if mobile device
function checkMobile() {
    isMobile = window.innerWidth <= 768;
}

// Initialize cookie consent system
function initCookieConsent() {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
        cookieConsentGiven = true;
        cookieBanner.style.display = 'none';
        applyCookiePreferences(consent);
    } else {
        cookieBanner.style.display = 'flex';
    }

    acceptAllBtn.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'all');
        cookieConsentGiven = true;
        cookieBanner.style.display = 'none';
        applyCookiePreferences('all');
    });

    rejectNonEssentialBtn.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'essential');
        cookieConsentGiven = true;
        cookieBanner.style.display = 'none';
        applyCookiePreferences('essential');
    });

    cookieSettingsBtn.addEventListener('click', () => {
        cookieSettingsPanel.style.display = 'block';
    });

    closeCookieSettingsBtn.addEventListener('click', () => {
        cookieSettingsPanel.style.display = 'none';
    });

    cookieConsentCloseBtn.addEventListener('click', () => {
        cookieBanner.style.display = 'none';
    });
}

// Apply cookie preferences
function applyCookiePreferences(consent) {
    // In a real implementation, this would enable/disable cookies based on consent
    console.log('Cookie preferences applied:', consent);
}

// Initialize hero effects
function initHeroEffects() {
    if (prefersReducedMotion) return;
    
    // Create animated background elements
    createAnimatedBackground();
    
    // Mouse move effect
    heroSection.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        
        if (!isMobile) {
            updateHeroMouseEffects();
        }
    });
    
    // Magnetic buttons
    const heroButtons = document.querySelectorAll('.hero-button');
    heroButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            if (isMobile) return;
            
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
    
    // Animated statistics
    animateStatistics();
}

// Create animated background elements
function createAnimatedBackground() {
    const bgContainer = document.createElement('div');
    bgContainer.className = 'hero-bg-container';
    heroSection.appendChild(bgContainer);
    
    // Create grid pattern
    const gridPattern = document.createElement('div');
    gridPattern.className = 'grid-pattern';
    bgContainer.appendChild(gridPattern);
    
    // Create floating particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 10 + 2}px`;
        particle.style.height = particle.style.width;
        bgContainer.appendChild(particle);
    }
    
    // Animate background
    if (!prefersReducedMotion) {
        animateBackground();
    }
}

// Animate hero background elements
function animateBackground() {
    const particles = document.querySelectorAll('.particle');
    const gridPattern = document.querySelector('.grid-pattern');
    
    function animate() {
        particles.forEach(particle => {
            const x = (Math.sin(Date.now() / 5000 + parseFloat(particle.style.left)) * 20) + 'px';
            const y = (Math.cos(Date.now() / 4000 + parseFloat(particle.style.top)) * 15) + 'px';
            
            particle.style.transform = `translate(${x}, ${y})`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Update hero mouse effects
function updateHeroMouseEffects() {
    const heroBg = document.querySelector('.hero-bg-container');
    if (!heroBg) return;
    
    // Move background elements based on mouse position
    const moveX = mouseX * 20;
    const moveY = mouseY * 20;
    
    heroBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

// Animate statistics
function animateStatistics() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        
        if (prefersReducedMotion) {
            counter.textContent = target;
            return;
        }
        
        const updateCounter = () => {
            count += Math.ceil(target / 50);
            if (count >= target) {
                count = target;
            }
            counter.textContent = count;
            
            if (count < target) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        // Start animation when counter comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize navigation
function initNavigation() {
    // Add smooth scrolling to all links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active section
                updateActiveSection();
            }
        });
    });
    
    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// Update active navigation section
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    if (prefersReducedMotion) return;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    if (current !== currentSection) {
        currentSection = current;
        
        // Update active nav link
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    // Create intersection observers for scroll reveal
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });
    
    // Initialize scroll progress indicator
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress);
}

// Update scroll progress
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    scrollProgress = (scrollTop / docHeight) * 100;
    
    // Update progress bar
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = `${scrollProgress}%`;
    }
}

// Setup event listeners
function setupEventListeners() {
    window.addEventListener('resize', () => {
        checkMobile();
        updateActiveSection();
    });
    
    // Handle touch events for mobile
    document.addEventListener('touchmove', (e) => {
        if (!isMobile) return;
        
        // For mobile, we can handle parallax effects here
        const touch = e.touches[0];
        mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
        mouseY = (touch.clientY / window.innerHeight) * 2 - 1;
    });
}

// Initialize service cards
function initServiceCards() {
    serviceCards.forEach(card => {
        // Add 3D hover effect
        card.addEventListener('mousemove', (e) => {
            if (isMobile || prefersReducedMotion) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            if (prefersReducedMotion) return;
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
        
        // Add click/tap to expand details
        card.addEventListener('click', function(e) {
            if (isMobile) {
                this.classList.toggle('expanded');
            }
        });
    });
}

// Initialize project cards
function initProjectCards() {
    projectCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mousemove', (e) => {
            if (isMobile || prefersReducedMotion) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const moveX = (x - rect.width / 2) / 20;
            const moveY = (y - rect.height / 2) / 20;
            
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            if (prefersReducedMotion) return;
            card.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize team members
function initTeamMembers() {
    teamMembers.forEach(member => {
        // Add hover effects
        member.addEventListener('mousemove', (e) => {
            if (isMobile || prefersReducedMotion) return;
            
            const rect = member.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const moveX = (x - rect.width / 2) / 30;
            const moveY = (y - rect.height / 2) / 30;
            
            member.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        member.addEventListener('mouseleave', () => {
            if (prefersReducedMotion) return;
            member.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize privacy sections
function initPrivacySections() {
    privacySections.forEach(section => {
        const header = section.querySelector('.privacy-header');
        if (!header) return;
        
        header.addEventListener('click', () => {
            section.classList.toggle('expanded');
        });
    });
}

// Initialize contact form
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Create mailto link with encoded data
        const subject = encodeURIComponent('Contact from CeskynoobProductions');
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
        const mailtoLink = `mailto:ceskynoobpr@proton.me?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
    });
}

// Initialize copy email functionality
function initCopyEmail() {
    if (!copyEmailBtn) return;
    
    copyEmailBtn.addEventListener('click', async () => {
        const email = 'ceskynoobpr@proton.me';
        
        try {
            await navigator.clipboard.writeText(email);
            const originalText = copyEmailBtn.textContent;
            copyEmailBtn.textContent = 'Copied!';
            
            setTimeout(() => {
                copyEmailBtn.textContent = originalText;
            }, 2000);
        } catch (err) {
            // Fallback for browsers that don't support clipboard API
            const textarea = document.createElement('textarea');
            textarea.value = email;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            const originalText = copyEmailBtn.textContent;
            copyEmailBtn.textContent = 'Copied!';
            
            setTimeout(() => {
                copyEmailBtn.textContent = originalText;
            }, 2000);
        }
    });
}

// Initialize cursor effects
function initCursorEffects() {
    if (isMobile || prefersReducedMotion) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .service-card, .project-card, .team-member'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}
