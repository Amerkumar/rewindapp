// Rewind - JavaScript with Scroll Animations

// ================================
// INTERSECTION OBSERVER FOR FADE-IN
// ================================

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Observe all elements with data-animate attribute
document.querySelectorAll('[data-animate]').forEach(el => {
    fadeInObserver.observe(el);
});

// ================================
// MOBILE MENU TOGGLE
// ================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ================================
// FAQ ACCORDION
// ================================

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }

        // Update aria-expanded
        button.setAttribute('aria-expanded', !isActive);
    });
});

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ================================
// NAVBAR SCROLL EFFECT
// ================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Add/remove shadow based on scroll position
    if (currentScrollY > 50) {
        navbar.style.boxShadow = '0 1px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}, { passive: true });

// ================================
// SCREENSHOTS CAROUSEL
// ================================

(function initCarousel() {
    const carousel = document.querySelector('.screenshots-carousel');
    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll('.screenshot-card'));
    if (cards.length === 0) return;

    // Position order: hidden-left -> left -> center -> right -> hidden-right
    const positions = ['hidden-left', 'left', 'center', 'right', 'hidden-right', 'hidden-right'];

    let currentIndex = 0;
    let isAnimating = false;

    function rotateCarousel() {
        if (isAnimating) return;
        isAnimating = true;

        // Move to next index
        currentIndex = (currentIndex + 1) % cards.length;

        // Update each card's position
        cards.forEach(function(card, index) {
            const posIndex = (index - currentIndex + cards.length) % cards.length;
            const position = positions[posIndex] || 'hidden-right';
            card.setAttribute('data-position', position);
        });

        // Reset animation flag after transition completes
        setTimeout(function() {
            isAnimating = false;
        }, 850);
    }

    // Start auto-rotation after a short delay
    setTimeout(function() {
        setInterval(rotateCarousel, 3000);
    }, 1000);
})();
