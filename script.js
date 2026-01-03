// ===== Wedding Website - Black & White Theme =====

document.addEventListener('DOMContentLoaded', () => {
    initLoading();
    initNavbar();
    initBurgerMenu();
    initCountdown();
    initScrollReveal();
    initGalleryLightbox();
    initSmoothScroll();
    initPageTransition();
    initBackgroundMusic();
    initColorSwatches();
});

// ===== Loading Screen =====
function initLoading() {
    const loading = document.getElementById('loading');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1500);
    });

    setTimeout(() => {
        loading.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 3000);
}

// ===== Navbar Scroll Effect =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ===== Burger Menu =====
function initBurgerMenu() {
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// ===== Countdown Timer =====
function initCountdown() {
    const weddingDate = new Date('2026-01-24T16:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== Scroll Reveal Animation =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => observer.observe(reveal));
}

// ===== Gallery Lightbox =====
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Page Transition =====
function initPageTransition() {
    const galleryLink = document.getElementById('galleryLink');
    const pageTransition = document.getElementById('pageTransition');

    if (galleryLink && pageTransition) {
        galleryLink.addEventListener('click', (e) => {
            e.preventDefault();
            const href = galleryLink.getAttribute('href');

            // Show transition overlay
            pageTransition.classList.add('active');

            // Add body leaving animation
            document.body.classList.add('page-leaving');

            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, 800);
        });
    }
}

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg img');
    const scrolled = window.pageYOffset;

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
    }
});

// ===== Background Music =====
function initBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');

    if (!bgMusic || !musicToggle) return;

    // Check saved music state
    const musicPlaying = localStorage.getItem('musicPlaying');
    const musicTime = localStorage.getItem('musicTime');

    if (musicTime) {
        bgMusic.currentTime = parseFloat(musicTime);
    }

    // Auto play by default (if null or true)
    if (musicPlaying === 'true' || musicPlaying === null) {
        bgMusic.play().then(() => {
            musicToggle.classList.add('playing');
            localStorage.setItem('musicPlaying', 'true');
        }).catch(() => {
            // Autoplay blocked, wait for user interaction
        });
    }

    // Toggle music on click
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.add('playing');
            localStorage.setItem('musicPlaying', 'true');
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            localStorage.setItem('musicPlaying', 'false');
        }
    });

    // Save music position periodically
    setInterval(() => {
        if (!bgMusic.paused) {
            localStorage.setItem('musicTime', bgMusic.currentTime);
        }
    }, 1000);

    // Start music on first interaction (fallback)
    function startMusicOnInteraction() {
        if (bgMusic.paused && localStorage.getItem('musicPlaying') !== 'false') {
            bgMusic.play().then(() => {
                musicToggle.classList.add('playing');
                localStorage.setItem('musicPlaying', 'true');
            }).catch(() => { });
        }
        // Remove listeners once tried
        ['click', 'touchstart', 'scroll'].forEach(event => {
            document.removeEventListener(event, startMusicOnInteraction);
        });
    }

    ['click', 'touchstart', 'scroll'].forEach(event => {
        document.addEventListener(event, startMusicOnInteraction, { once: true });
    });
}

// ===== Color Swatches Click Toggle =====
function initColorSwatches() {
    const colorSwatches = document.querySelectorAll('.color-swatch');

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            // Toggle active class on this swatch
            swatch.classList.toggle('active');
        });
    });
}
