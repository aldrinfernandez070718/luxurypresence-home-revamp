// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================

const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Optionally unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements and section titles
document.querySelectorAll('.fade-in, .section-title').forEach(el => {
    observer.observe(el);
});

// ===================================
// COUNTER ANIMATION
// ===================================

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2500;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            if (target % 1 === 0) {
                element.textContent = Math.floor(current);
            } else {
                element.textContent = current.toFixed(1);
            }
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target % 1 === 0 ? target : target.toFixed(1);
        }
    };

    updateCounter();
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
            // Unobserve after animation
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// LIGHTBOX GALLERY
// ===================================

const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

if (galleryItems.length > 0 && lightbox && lightboxImg && closeBtn) {
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ===================================
// CONTACT FORM SUBMISSION
// ===================================

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm && successMessage) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide form and show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    });
}

// ===================================
// SEARCH FORM WITH VALIDATION
// ===================================

const searchForm = document.getElementById('searchForm');
const searchResults = document.getElementById('searchResults');
const loadingSpinner = document.getElementById('loadingSpinner');
const newSearchBtn = document.getElementById('newSearchBtn');
const searchFormWrapper = document.getElementById('searchForm-wrapper');

if (searchForm && searchResults) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const locationField = this.querySelector('[name="location"]');
        let isValid = true;

        // Validate location field
        if (!locationField.value.trim()) {
            locationField.classList.add('error');
            const errorMsg = locationField.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.style.display = 'block';
            }
            isValid = false;
        } else {
            locationField.classList.remove('error');
            const errorMsg = locationField.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.style.display = 'none';
            }
        }

        if (!isValid) return;

        // Show loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'block';
        }
        searchFormWrapper.querySelector('.search-form-inner').style.display = 'none';

        // Simulate API call
        setTimeout(() => {
            if (loadingSpinner) {
                loadingSpinner.style.display = 'none';
            }

            // Generate random result count
            const fakeCount = Math.floor(Math.random() * 60) + 15;
            const resultCountEl = document.getElementById('resultCount');
            if (resultCountEl) {
                resultCountEl.textContent = fakeCount;
            }

            // Show results
            searchResults.style.display = 'block';
            searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 2000);
    });

    if (newSearchBtn) {
        newSearchBtn.addEventListener('click', function() {
            searchFormWrapper.querySelector('.search-form-inner').style.display = 'block';
            searchResults.style.display = 'none';
            searchFormWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}

// Clear error on input
const formInputs = document.querySelectorAll('.form-group input, .form-group select');
formInputs.forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('error');
        const errorMsg = this.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.style.display = 'none';
        }
    });
});

// ===================================
// PAGE LOAD ANIMATION
// ===================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// LAZY LOADING IMAGES (Optional Enhancement)
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// FORM FIELD FOCUS EFFECTS
// ===================================

const inputFields = document.querySelectorAll('input, textarea, select');
inputFields.forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ===================================
// PREVENT CONSOLE ERRORS
// ===================================

// Gracefully handle missing elements
const optionalElements = [
    'hamburger',
    'navLinks',
    'contactForm',
    'searchForm',
    'lightbox'
];

optionalElements.forEach(elementId => {
    const el = document.getElementById(elementId);
    if (!el && !document.querySelector(`.${elementId}`)) {
        console.log(`Optional element ${elementId} not found - this is okay.`);
    }
});

console.log('Marci Metzger Real Estate - Website Loaded Successfully!');

// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Lightbox detail elements
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxPrice = document.getElementById('lightbox-price');
    const lightboxAddress = document.getElementById('lightbox-address');
    const lightboxBeds = document.getElementById('lightbox-beds');
    const lightboxBaths = document.getElementById('lightbox-baths');
    const lightboxSqft = document.getElementById('lightbox-sqft');
    
    // Open lightbox on gallery item click
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.getAttribute('data-title');
            const price = this.getAttribute('data-price');
            const address = this.getAttribute('data-address');
            const city = this.getAttribute('data-city');
            const beds = this.getAttribute('data-beds');
            const baths = this.getAttribute('data-baths');
            const sqft = this.getAttribute('data-sqft');
            
            // Set image
            lightboxImg.src = imgSrc;
            
            // Set property details
            lightboxTitle.textContent = title;
            lightboxPrice.textContent = price;
            lightboxAddress.textContent = `${address}, ${city}`;
            lightboxBeds.textContent = `${beds} Beds`;
            lightboxBaths.textContent = `${baths} Baths`;
            lightboxSqft.textContent = `${sqft} sqft`;
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});


// Hide scroll indicator after leaving the hero section
document.addEventListener('DOMContentLoaded', function () {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return; // safety check

    const heroSection = document.querySelector('#home');
    if (!heroSection) return;

    // Function to check scroll position
    function checkScroll() {
        // Get the bottom position of the hero section
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        
        // If user has scrolled past the hero (hero is no longer visible at bottom)
        if (heroBottom < window.innerHeight - 50) { // -50 for a little buffer
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none'; // prevents clicking when hidden
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }

    // Run once on load
    checkScroll();

    // Run on scroll
    window.addEventListener('scroll', checkScroll);
});
