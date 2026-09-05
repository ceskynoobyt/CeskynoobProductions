// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cookieBanner = document.getElementById('cookie-banner');
const acceptAllBtn = document.getElementById('accept-all');
const rejectNonEssentialBtn = document.getElementById('reject-non-essential');
const cookieSettingsBtn = document.getElementById('cookie-settings');
const cookieModal = document.getElementById('cookie-modal');
const savePreferencesBtn = document.getElementById('save-preferences');

// Team Members Data
const teamMembers = [
  'Team Member 01', 'Team Member 02', 'Team Member 03', 'Team Member 04',
  'Team Member 05', 'Team Member 06', 'Team Member 07', 'Team Member 08',
  'Team Member 09', 'Team Member 10', 'Team Member 11', 'Team Member 12',
  'Team Member 13', 'Team Member 14', 'Team Member 15'
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Check for cookie consent
  checkCookieConsent();
  
  // Mobile Navigation
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
  
  // Cookie Consent Events
  acceptAllBtn.addEventListener('click', () => {
    setCookieConsent('all');
    hideCookieBanner();
  });
  
  rejectNonEssentialBtn.addEventListener('click', () => {
    setCookieConsent('essential');
    hideCookieBanner();
  });
  
  cookieSettingsBtn.addEventListener('click', () => {
    cookieModal.classList.add('active');
  });
  
  savePreferencesBtn.addEventListener('click', () => {
    const analytics = document.getElementById('analytics').checked;
    const functional = document.getElementById('functional').checked;
    
    setCookieConsent(analytics ? 'analytics' : 'essential');
    cookieModal.classList.remove('active');
    hideCookieBanner();
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === cookieModal) {
      cookieModal.classList.remove('active');
    }
  });
  
  // Team Section
  populateTeam();
  
  // Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Form submitted successfully. This is a frontend demo - no email was sent.');
      this.reset();
    });
  }
  
  // Scroll animations
  initScrollAnimations();
});

// Check cookie consent status
function checkCookieConsent() {
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) {
    cookieBanner.classList.add('active');
  }
}

// Set cookie consent in localStorage
function setCookieConsent(type) {
  localStorage.setItem('cookieConsent', type);
}

// Hide cookie banner
function hideCookieBanner() {
  cookieBanner.classList.remove('active');
}

// Populate team members
function populateTeam() {
  const teamGrid = document.querySelector('.team-grid');
  if (teamGrid) {
    teamMembers.forEach(member => {
      const memberElement = document.createElement('div');
      memberElement.className = 'team-member';
      memberElement.innerHTML = `
        <div class="avatar">${member.charAt(0)}</div>
        <h3>${member}</h3>
      `;
      teamGrid.appendChild(memberElement);
    });
  }
}

// Scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize scroll animations
function initScrollAnimations() {
  // This would be enhanced with IntersectionObserver in a full implementation
  // For now, we'll just add basic functionality
  window.addEventListener('scroll', () => {
    // Update navigation on scroll
    updateNavigationOnScroll();
  });
  
  // Trigger initial check
  updateNavigationOnScroll();
}

// Update navigation based on scroll position
function updateNavigationOnScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= (sectionTop - 100)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    }
  });
});

// Add scroll progress indicator
function addScrollProgress() {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--blue), var(--green));
    z-index: 1001;
    width: 0%;
    transition: width 0.2s ease;
  `;
  
  document.body.appendChild(progress);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    
    progress.style.width = scrollPercent + '%';
  });
}

// Initialize scroll progress
addScrollProgress();
