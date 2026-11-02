/* ============================================================
   FOODIE RUN 2.0 — Official JavaScript
   Fakulti Pengajian Bahasa Utama (FPBU), USIM
   ============================================================ */

/**
 * CONFIGURATION & DIRECT REGISTRATION API ENDPOINT
 * All "Daftar Sekarang" CTAs are linked directly to this Google Form
 */
const FOODIE_RUN_CONFIG = {
    // Direct Google Form link for registration
    REGISTRATION_URL: "https://forms.gle/WTjtDWaDEmkFmA9m6",
    API_ENDPOINT: "https://forms.gle/WTjtDWaDEmkFmA9m6",
    
    // Key Event Milestones
    EVENT_DATE: "2026-12-12T07:30:00+08:00",
    REG_DEADLINE: "2026-11-30T23:59:59+08:00"
};

document.addEventListener('DOMContentLoaded', () => {
    // ---------- Preloader ----------
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) preloader.classList.add('loaded');
        }, 1000);
    });
    // Fallback safeguard
    setTimeout(() => {
        if (preloader) preloader.classList.add('loaded');
    }, 2200);

    // ---------- Floating Food Particles ----------
    const foodEmojis = ['🍩', '🍜', '🌮', '🍕', '🍞', '🍌', '🧋', '🍰', '🧁', '🍱', '🥪', '🍡', '🍦', '🥟'];
    const particleContainer = document.getElementById('food-particles');
    
    function createParticle() {
        if (!particleContainer) return;
        const particle = document.createElement('div');
        particle.className = 'food-particle';
        particle.textContent = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
        particle.style.left = (Math.random() * 96 + 2) + '%';
        particle.style.fontSize = (18 + Math.random() * 22) + 'px';
        particle.style.animationDuration = (14 + Math.random() * 18) + 's';
        particle.style.animationDelay = (Math.random() * 3) + 's';
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) particle.remove();
        }, 35000);
    }

    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 600);
    }
    setInterval(createParticle, 3500);

    // ---------- Navigation & Mobile Menu ----------
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // Active nav link highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.scrollY + 160;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // ---------- Countdown Timers ----------
    const eventDate = new Date(FOODIE_RUN_CONFIG.EVENT_DATE).getTime();
    const regDeadline = new Date(FOODIE_RUN_CONFIG.REG_DEADLINE).getTime();

    function updateCountdowns() {
        const now = new Date().getTime();
        
        // 1. Event Countdown (12/12/2026 - 7:30AM)
        const eventDiff = eventDate - now;
        if (eventDiff > 0) {
            const days = Math.floor(eventDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((eventDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((eventDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((eventDiff % (1000 * 60)) / 1000);

            setCountdownValue('days', days);
            setCountdownValue('hours', hours);
            setCountdownValue('minutes', minutes);
            setCountdownValue('seconds', seconds);
        } else {
            setCountdownValue('days', 0);
            setCountdownValue('hours', 0);
            setCountdownValue('minutes', 0);
            setCountdownValue('seconds', 0);
        }

        // 2. Registration Deadline Countdown (30/11/2026 - 11:59PM)
        const regDiff = regDeadline - now;
        if (regDiff > 0) {
            const rDays = Math.floor(regDiff / (1000 * 60 * 60 * 24));
            const rHours = Math.floor((regDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const rMinutes = Math.floor((regDiff % (1000 * 60 * 60)) / (1000 * 60));
            const rSeconds = Math.floor((regDiff % (1000 * 60)) / 1000);

            setElementText('regDays', formatZero(rDays));
            setElementText('regHours', formatZero(rHours));
            setElementText('regMinutes', formatZero(rMinutes));
            setElementText('regSeconds', formatZero(rSeconds));

            setElementText('regDays2', formatZero(rDays));
            setElementText('regHours2', formatZero(rHours));
            setElementText('regMinutes2', formatZero(rMinutes));
            setElementText('regSeconds2', formatZero(rSeconds));
        } else {
            ['regDays', 'regHours', 'regMinutes', 'regSeconds', 'regDays2', 'regHours2', 'regMinutes2', 'regSeconds2'].forEach(id => {
                setElementText(id, '00');
            });
        }
    }

    function formatZero(num) {
        return String(num).padStart(2, '0');
    }

    function setCountdownValue(id, value) {
        const el = document.getElementById(id);
        if (!el) return;
        const strVal = formatZero(value);
        if (el.textContent !== strVal) {
            el.textContent = strVal;
        }
    }

    function setElementText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    updateCountdowns();
    setInterval(updateCountdowns, 1000);

    // ---------- Direct Registration Link Handler ----------
    // Ensures all direct registration buttons open the configured Google Form link
    document.querySelectorAll('.direct-register-link').forEach(link => {
        link.addEventListener('click', () => {
            // Cheerful confetti burst on clicking registration
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 40,
                    spread: 60,
                    origin: { y: 0.8 }
                });
            }
        });
    });

    // ---------- Interactive 3D Solid Metal Medal Showcase ----------
    const medalCard3D = document.getElementById('medalCard3D');
    const btnMedalFront = document.getElementById('btnMedalFront');
    const btnMedalBack = document.getElementById('btnMedalBack');

    function showMedalFace(face) {
        if (!medalCard3D) return;
        if (face === 'back') {
            medalCard3D.classList.add('flipped');
            if (btnMedalBack) btnMedalBack.classList.add('active');
            if (btnMedalFront) btnMedalFront.classList.remove('active');
        } else {
            medalCard3D.classList.remove('flipped');
            if (btnMedalFront) btnMedalFront.classList.add('active');
            if (btnMedalBack) btnMedalBack.classList.remove('active');
        }
    }

    if (btnMedalFront) {
        btnMedalFront.addEventListener('click', () => showMedalFace('front'));
    }

    if (btnMedalBack) {
        btnMedalBack.addEventListener('click', () => showMedalFace('back'));
    }

    if (medalCard3D) {
        medalCard3D.addEventListener('click', () => {
            const isFlipped = medalCard3D.classList.contains('flipped');
            showMedalFace(isFlipped ? 'front' : 'back');
        });
    }

    // ---------- Modals Management (Size Chart, Route Map & Full Poster) ----------
    const sizeChartModal = document.getElementById('sizeChartModal');
    const routeMapLightboxModal = document.getElementById('routeMapLightboxModal');
    const posterLightboxModal = document.getElementById('posterLightboxModal');

    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        if (!document.querySelector('.modal-overlay.active')) {
            document.body.style.overflow = '';
        }
    }

    // Size chart triggers
    document.querySelectorAll('.trigger-sizechart-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(sizeChartModal);
        });
    });

    // Route map lightbox triggers
    const viewMapFullBtn = document.getElementById('viewMapFullBtn');
    if (viewMapFullBtn) {
        viewMapFullBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(routeMapLightboxModal);
        });
    }

    const routeMapImg = document.querySelector('.route-map-img');
    if (routeMapImg) {
        routeMapImg.style.cursor = 'pointer';
        routeMapImg.addEventListener('click', () => openModal(routeMapLightboxModal));
    }

    const closeRouteMapLightbox = document.getElementById('closeRouteMapLightbox');
    if (closeRouteMapLightbox) {
        closeRouteMapLightbox.addEventListener('click', () => closeModal(routeMapLightboxModal));
    }

    // Poster lightbox trigger
    const viewPosterFullBtn = document.getElementById('viewPosterFullBtn');
    if (viewPosterFullBtn) {
        viewPosterFullBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(posterLightboxModal);
        });
    }

    // Close buttons inside modals
    const closeSizeModal = document.getElementById('closeSizeModal');
    if (closeSizeModal) closeSizeModal.addEventListener('click', () => closeModal(sizeChartModal));

    const closePosterLightbox = document.getElementById('closePosterLightbox');
    if (closePosterLightbox) closePosterLightbox.addEventListener('click', () => closeModal(posterLightboxModal));

    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => closeModal(modal));
        }
    });

    // ---------- Stat Counters Animation ----------
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        const ticker = document.querySelector('.stats-ticker');
        if (!ticker) return;
        
        const rect = ticker.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
                const duration = 1800;
                const start = performance.now();
                
                function step(timestamp) {
                    const elapsed = timestamp - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);
                    stat.textContent = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    }
                }
                requestAnimationFrame(step);
            });
        }
    }
    window.addEventListener('scroll', animateStats);

    // ---------- Intersection Observer for Scroll Animations ----------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // ---------- FAQ Accordion ----------
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn) return;
        questionBtn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    // ---------- Back to Top Button ----------
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 450) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- Smooth Anchor Scroll ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
