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
    var carousel = document.querySelector('.screenshots-carousel');
    if (!carousel) return;

    var cards = [];
    var cardElements = carousel.querySelectorAll('.screenshot-card');
    for (var i = 0; i < cardElements.length; i++) {
        cards.push(cardElements[i]);
    }
    if (cards.length === 0) return;

    // Position classes
    var positions = ['pos-hidden-left', 'pos-left', 'pos-center', 'pos-right', 'pos-hidden-right', 'pos-hidden-right'];
    var allPositions = ['pos-hidden-left', 'pos-left', 'pos-center', 'pos-right', 'pos-hidden-right'];

    var currentIndex = 0;
    var isAnimating = false;

    function removeAllPositions(card) {
        for (var i = 0; i < allPositions.length; i++) {
            card.classList.remove(allPositions[i]);
        }
    }

    function rotateCarousel() {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = (currentIndex + 1) % cards.length;

        for (var i = 0; i < cards.length; i++) {
            var posIndex = (i - currentIndex + cards.length) % cards.length;
            var position = positions[posIndex] || 'pos-hidden-right';
            removeAllPositions(cards[i]);
            cards[i].classList.add(position);
        }

        setTimeout(function() {
            isAnimating = false;
        }, 850);
    }

    // Start auto-rotation after a short delay
    setTimeout(function() {
        setInterval(rotateCarousel, 3000);
    }, 1000);
})();
