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
    const weddingDateStr = '2026-01-24';
    const countdownWrapper = document.getElementById('countdown');
    const countdownTitle = document.querySelector('.countdown-title');

    // กำหนดการทั้งหมด (events)
    const events = [
        { time: '06:30', titleTh: 'พิธีสงฆ์', titleEn: 'Religious Ceremony' },
        { time: '08:10', titleTh: 'แห่ขันหมาก', titleEn: 'Khan Maak Procession' },
        { time: '08:30', titleTh: 'พิธีหมั้น', titleEn: 'Engagement Ceremony' },
        { time: '09:00', titleTh: 'พิธีหลั่งน้ำสังข์', titleEn: 'Water Pouring Ceremony' },
        { time: '10:00', titleTh: 'รับประทานอาหาร', titleEn: 'Wedding Luncheon' },
        { time: '17:00', titleTh: 'งานเลี้ยงเฉลิมฉลอง', titleEn: 'Party' }
    ];

    function isToday(dateStr) {
        const today = new Date();
        const targetDate = new Date(dateStr);
        return targetDate.getDate() === today.getDate() &&
            targetDate.getMonth() === today.getMonth() &&
            targetDate.getFullYear() === today.getFullYear();
    }

    function getNextEvent(now) {
        for (let i = 0; i < events.length; i++) {
            const [hours, minutes] = events[i].time.split(':').map(Number);
            const eventTime = new Date(weddingDateStr);
            eventTime.setHours(hours, minutes, 0, 0);

            if (now < eventTime) {
                return { event: events[i], eventTime: eventTime, index: i };
            }
        }
        return null; // All events have passed
    }

    function updateCountdown() {
        const now = new Date();

        // Check if today is the wedding day
        if (isToday(weddingDateStr)) {
            const nextEventData = getNextEvent(now);

            if (nextEventData) {
                const { event, eventTime } = nextEventData;
                const distance = eventTime.getTime() - now.getTime();

                const hours = Math.floor(distance / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                if (countdownTitle) {
                    countdownTitle.textContent = 'Next Up';
                }

                if (countdownWrapper) {
                    countdownWrapper.innerHTML = `
                        <div class="event-countdown">
                            <div class="countdown-timer">
                                <div class="countdown-item">
                                    <span class="countdown-number">${String(hours).padStart(2, '0')}</span>
                                    <span class="countdown-label">Hours</span>
                                </div>
                                <div class="countdown-item">
                                    <span class="countdown-number">${String(minutes).padStart(2, '0')}</span>
                                    <span class="countdown-label">Minutes</span>
                                </div>
                                <div class="countdown-item">
                                    <span class="countdown-number">${String(seconds).padStart(2, '0')}</span>
                                    <span class="countdown-label">Seconds</span>
                                </div>
                            </div>
                            <div class="next-event-info">
                                <span class="next-event-time">${event.time}</span>
                                <span class="next-event-title">${event.titleTh}</span>
                                <span class="next-event-subtitle">${event.titleEn}</span>
                            </div>
                        </div>
                    `;
                }
            } else {
                // All events have passed - show last event
                const lastEvent = events[events.length - 1];
                if (countdownTitle) {
                    countdownTitle.textContent = 'Now';
                }
                if (countdownWrapper) {
                    countdownWrapper.innerHTML = `
                        <div class="event-countdown">
                            <div class="next-event-info">
                                <span class="next-event-time">${lastEvent.time}</span>
                                <span class="next-event-title">${lastEvent.titleTh}</span>
                                <span class="next-event-subtitle">${lastEvent.titleEn}</span>
                            </div>
                        </div>
                    `;
                }
            }
            return;
        }

        // Not wedding day - countdown to wedding date
        const weddingDate = new Date(weddingDateStr + 'T06:30:00');
        const distance = weddingDate.getTime() - now.getTime();

        if (distance < 0) {
            if (countdownWrapper) {
                countdownWrapper.innerHTML = '<div class="today-message">The Day Has Passed 💒</div>';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
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
            // Remove active class from all swatches first
            colorSwatches.forEach(s => s.classList.remove('active'));
            // Add active class to the clicked swatch
            swatch.classList.add('active');
        });
    });
}
