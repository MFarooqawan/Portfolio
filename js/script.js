/**
 * ==========================================================================
 * script.js - Professional, Production-Ready Modular Script
 * Author: Senior Front-End Engineer
 * ==========================================================================
 */

'use strict';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

/**
 * Main Application Module
 */
const App = {
    init() {
        // Core Performance Initializations
        this.initPreloader();
        this.initTheme();
        this.initScrollProgressBar();
        this.initFloatingBackground();

        // Navigation & Interactive UI
        this.initStickyNavbar();
        this.initMobileNavigation();
        this.initActiveNavigationOnScroll();
        this.initSmoothScrolling();
        this.initBackToTop();
        
        // Visual & Micro-interactions
        this.initTypingEffect();
        this.initMouseGlow();
        this.initButtonRipple();
        this.initProjectHoverGlow();
        
        // Performance-critical Scroll Animations
        this.initScrollReveal();
        this.initLazyLoading();
        
        // Dynamic Features
        this.initAnimatedCounters();
        this.initSkillsAnimation();
        this.initContactFormValidation();
    },

    /**
     * 1. Preloader Handler
     */
    initPreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = '<div class="preloader__spinner"></div>';
        
        // Inject structural CSS directly for the preloader to render instantly
        const style = document.createElement('style');
        style.textContent = `
            .preloader {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background-color: #020617; z-index: 99999;
                display: flex; align-items: center; justify-content: center;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            }
            .preloader--hidden { opacity: 0; visibility: hidden; pointer-events: none; }
            .preloader__spinner {
                width: 50px; height: 50px; border: 3px solid rgba(96, 165, 250, 0.2);
                border-top-color: #2563EB; border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin { to { transform: rotate(360deg); } }
        `;
        document.head.appendChild(style);
        document.body.appendChild(preloader);

        window.addEventListener('load', () => {
            preloader.classList.add('preloader--hidden');
            setTimeout(() => preloader.remove(), 500);
        });
    },

    /**
     * 2. Dark / Light Theme Controller
     */
    initTheme() {
        // Toggle setup
        const themeBtn = document.createElement('button');
        themeBtn.className = 'theme-toggle';
        themeBtn.setAttribute('aria-label', 'Toggle theme scheme');
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        
        const style = document.createElement('style');
        style.textContent = `
            .theme-toggle {
                position: fixed; bottom: 30px; left: 30px; z-index: 999;
                width: 48px; height: 48px; border-radius: 50%;
                background: rgba(17, 24, 39, 0.8); border: 1px solid rgba(255, 255, 255, 0.08);
                color: #FFFFFF; cursor: pointer; display: flex; align-items: center;
                justify-content: center; font-size: 1.25rem; backdrop-filter: blur(8px);
                transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            }
            .theme-toggle:hover { transform: scale(1.1); border-color: #2563EB; }
            body.light-theme {
                --background: #f8fafc; --cards: #ffffff; --text: #0f172a; --muted: #475569;
                --glass-bg: rgba(255, 255, 255, 0.8); --glass-border: rgba(0, 0, 0, 0.08);
                --glow-color: rgba(37, 99, 235, 0.05);
            }
            body.light-theme .theme-toggle { background: rgba(255, 255, 255, 0.9); color: #0f172a; border-color: rgba(0,0,0,0.1); }
        `;
        document.head.appendChild(style);
        document.body.appendChild(themeBtn);

        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }

        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            themeBtn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    },

    /**
     * 3. Sticky Navbar on Scroll (Throttled for Performance)
     */
    initStickyNavbar() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('header--sticky');
                // Subtle shadow elevation injection
                header.style.boxShadow = '0 10px 30px -10px rgba(2, 6, 23, 0.8)';
            } else {
                header.classList.remove('header--sticky');
                header.style.boxShadow = 'none';
            }
            lastScrollY = window.scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                });
                ticking = true;
            }
        });
    },

    /**
     * 4. Mobile Navigation & Hamburger Mechanics
     */
    initMobileNavigation() {
        const toggleBtn = document.querySelector('.header__toggle');
        const navMenu = document.querySelector('.header__nav');
        const navLinks = document.querySelectorAll('.header__link');

        if (!toggleBtn || !navMenu) return;

        const toggleMenu = () => {
            const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !isOpen);
            navMenu.style.display = isOpen ? 'none' : 'block';
            
            // Native Hamburger Animate State classes
            toggleBtn.classList.toggle('header__toggle--active');
        };

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close after clicking navigation structural links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    toggleBtn.classList.remove('header__toggle--active');
                    navMenu.style.display = 'none';
                }
            });
        });

        // Click outside handler
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                toggleBtn.setAttribute('aria-expanded', 'false');
                toggleBtn.classList.remove('header__toggle--active');
                navMenu.style.display = 'none';
            }
        });
    },

    /**
     * 5. Active Navigation Link Highlights Scrolling Observer
     */
    initActiveNavigationOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.header__link');

        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -60% 0px', // Target viewport scope
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('header__link--active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('header__link--active');
                        }
                    });
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => observer.observe(section));
    },

    /**
     * 6. Smooth Scrolling Engine
     */
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Offset for structural sticky headers
                    const headerHeight = document.querySelector('.header').offsetHeight || 80;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    /**
     * 7. Scroll Progress Bar Generator
     */
    initScrollProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress';
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress__bar';
        progressContainer.appendChild(progressBar);
        
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress { position: fixed; top: 0; left: 0; width: 100%; height: 3px; z-index: 1001; pointer-events: none; }
            .scroll-progress__bar { width: 0%; height: 100%; background: linear-gradient(90deg, #2563EB, #60A5FA); transition: width 0.1s ease; }
        `;
        document.head.appendChild(style);
        document.body.prepend(progressContainer);

        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    },

    /**
     * 8. Mouse Glow Grid Cursor Hover Effects
     */
    initMouseGlow() {
        // Generates dynamic glowing spotlight for all high priority cards
        const cards = document.querySelectorAll('.service-card, .project-card, .skills__category');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // Structural style injection
        const style = document.createElement('style');
        style.textContent = `
            .service-card, .project-card, .skills__category {
                position: relative;
            }
            .service-card::before, .project-card::before, .skills__category::before {
                content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
                border-radius: inherit; padding: 1px; pointer-events: none;
                background: radial-gradient(350px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(96, 165, 250, 0.25), transparent 80%);
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor; mask-composite: exclude; z-index: 2;
            }
        `;
        document.head.appendChild(style);
    },

    /**
     * 9. Typing Animation Engine (Hero Section)
     */
    initTypingEffect() {
        const target = document.querySelector('.hero__title--highlight');
        if (!target) return;

        const phrases = ['accessible', 'performant', 'beautiful', 'optimized'];
        let loopNum = 0;
        let isDeleting = false;
        let txt = '';
        
        const tick = () => {
            const current = loopNum % phrases.length;
            const fullTxt = phrases[current];

            if (isDeleting) {
                txt = fullTxt.substring(0, txt.length - 1);
            } else {
                txt = fullTxt.substring(0, txt.length + 1);
            }

            target.textContent = txt;

            let delta = 200 - Math.random() * 100;
            if (isDeleting) delta /= 2;

            if (!isDeleting && txt === fullTxt) {
                delta = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && txt === '') {
                isDeleting = false;
                loopNum++;
                delta = 500;
            }

            setTimeout(tick, delta);
        };

        setTimeout(tick, 1000);
    },

    /**
     * 10. Button Ripple Mechanics (Instantiates local custom dynamic ripple nodes)
     */
    initButtonRipple() {
        const buttons = document.querySelectorAll('.button');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });

        const style = document.createElement('style');
        style.textContent = `
            .button { position: relative; overflow: hidden; }
            .ripple-effect {
                position: absolute; width: 100px; height: 100px;
                background: rgba(255, 255, 255, 0.3); border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: ripple-animation 0.6s ease-out; pointer-events: none;
            }
            @keyframes ripple-animation { to { transform: translate(-50%, -50%) scale(4); opacity: 0; } }
        `;
        document.head.appendChild(style);
    },

    /**
     * 11. Custom Interactive Project Hover Transform Adjustments
     */
    initProjectHoverGlow() {
        const projects = document.querySelectorAll('.project-card');
        projects.forEach(p => {
            p.addEventListener('mouseenter', () => {
                p.style.boxShadow = '0 15px 45px -10px rgba(37, 99, 235, 0.25)';
            });
            p.addEventListener('mouseleave', () => {
                p.style.boxShadow = 'var(--shadow-md)';
            });
        });
    },

    /**
     * 12. Floating Graphic Background Micro-Interactions
     */
    initFloatingBackground() {
        document.addEventListener('mousemove', (e) => {
            const amountX = (window.innerWidth / 2 - e.clientX) * 0.02;
            const amountY = (window.innerHeight / 2 - e.clientY) * 0.02;
            const heroImg = document.querySelector('.hero__img');
            if (heroImg) {
                heroImg.style.transform = `translate(${amountX}px, ${amountY}px) rotate(1deg)`;
            }
        });
    },

    /**
     * 13. Back To Top Mechanics
     */
    initBackToTop() {
        const topBtn = document.createElement('button');
        topBtn.className = 'back-to-top';
        topBtn.setAttribute('aria-label', 'Return to topmost view');
        topBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        
        const style = document.createElement('style');
        style.textContent = `
            .back-to-top {
                position: fixed; bottom: 30px; right: -80px; z-index: 999;
                width: 48px; height: 48px; border-radius: 50%;
                background: #2563EB; color: #FFFFFF; border: none; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .back-to-top--visible { right: 30px; }
            .back-to-top:hover { background: #1E40AF; transform: translateY(-4px); }
        `;
        document.head.appendChild(style);
        document.body.appendChild(topBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                topBtn.classList.add('back-to-top--visible');
            } else {
                topBtn.classList.remove('back-to-top--visible');
            }
        });

        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    /**
     * 14. Scroll Reveal (Via High Performance IntersectionObserver)
     */
    initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.about__media, .about__content, .skills__category, .service-card, .project-card, .timeline__item, .certificate-card, .contact__info, .contact__form-wrapper'
        );

        // Inject initial hidden states into modern stylesheet injection space
        const style = document.createElement('style');
        style.textContent = `
            .reveal-hidden { opacity: 0; transform: translateY(40px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
            .reveal-visible { opacity: 1; transform: translateY(0); }
        `;
        document.head.appendChild(style);

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => {
            el.classList.add('reveal-hidden');
            revealObserver.observe(el);
        });
    },

    /**
     * 15. Standard Compliance Lazy Load Protocol
     */
    initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        if (image.dataset.src) {
                            image.src = image.dataset.src;
                        }
                        imageObserver.unobserve(image);
                    }
                });
            });
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for primitive user-agents
            images.forEach(img => {
                if (img.dataset.src) img.src = img.dataset.src;
            });
        }
    },

    /**
     * 16. Dynamic Mathematical Numeric Counter Animation
     */
    initAnimatedCounters() {
        const counters = document.querySelectorAll('.about__stat-num');
        
        const runCounter = (el) => {
            const targetVal = parseInt(el.textContent, 10);
            if (isNaN(targetVal)) return;

            const hasPlus = el.textContent.includes('+');
            const hasPercent = el.textContent.includes('%');
            
            let count = 0;
            const duration = 2000; // 2 seconds animation span
            const stepTime = Math.max(Math.floor(duration / targetVal), 15);
            
            const timer = setInterval(() => {
                count++;
                el.textContent = count + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
                if (count >= targetVal) {
                    el.textContent = targetVal + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
                    clearInterval(timer);
                }
            }, stepTime);
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.8 });

        counters.forEach(counter => observer.observe(counter));
    },

    /**
     * 17. Skills Layout Animating Event Dispatch
     */
    initSkillsAnimation() {
        const skills = document.querySelectorAll('.skills__item');
        skills.forEach((skill, i) => {
            skill.style.transitionDelay = `${i * 50}ms`;
            skill.style.opacity = '0';
            skill.style.transform = 'translateX(-15px)';
            skill.style.transitionProperty = 'all';
            skill.style.transitionDuration = '0.5s';
        });

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.skills__item');
                    items.forEach(it => {
                        it.style.opacity = '1';
                        it.style.transform = 'translateX(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        const skillCats = document.querySelectorAll('.skills__category');
        skillCats.forEach(cat => observer.observe(cat));
    },

    /**
     * 18. Secure Front-End Contact Form Sanitization and Validation
     */
    initContactFormValidation() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.setAttribute('novalidate', true); // Override default visual browser native alerts

        const validateEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };

        const showError = (input, message) => {
            const parent = input.parentElement;
            let errorSpan = parent.querySelector('.form-error-msg');
            
            if (!errorSpan) {
                errorSpan = document.createElement('span');
                errorSpan.className = 'form-error-msg';
                parent.appendChild(errorSpan);
            }
            
            input.classList.add('form-input--error');
            errorSpan.textContent = message;
            
            // Append styling structures dynamically safely
            if (!document.getElementById('form-err-styles')) {
                const style = document.createElement('style');
                style.id = 'form-err-styles';
                style.textContent = `
                    .form-input--error { border-color: #ef4444 !important; }
                    .form-error-msg { font-size: 0.8rem; color: #ef4444; margin-top: 0.25rem; display: block; }
                    .form-success-alert { padding: 1.5rem; background-color: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 8px; color: #10b981; margin-top: 1rem; }
                `;
                document.head.appendChild(style);
            }
        };

        const clearError = (input) => {
            const parent = input.parentElement;
            const errorSpan = parent.querySelector('.form-error-msg');
            if (errorSpan) {
                errorSpan.remove();
            }
            input.classList.remove('form-input--error');
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('contact-name');
            const email = document.getElementById('contact-email');
            const message = document.getElementById('contact-message');

            // Name sanity check
            if (name.value.trim().length < 2) {
                showError(name, 'Please enter your full name (minimum 2 characters)');
                isValid = false;
            } else {
                clearError(name);
            }

            // Email check
            if (!validateEmail(email.value)) {
                showError(email, 'Please provide a valid active email address');
                isValid = false;
            } else {
                clearError(email);
            }

            // Text message payload check
            if (message.value.trim().length < 10) {
                showError(message, 'Please provide a detailed inquiry (minimum 10 characters)');
                isValid = false;
            } else {
                clearError(message);
            }

            if (isValid) {
                // Emulate secure API dispatch payload
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Transmitting Message...';

                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent Successfully!';
                    submitBtn.style.backgroundColor = '#10b981';
                    
                    const successAlert = document.createElement('div');
                    successAlert.className = 'form-success-alert';
                    successAlert.textContent = "Thank you! Your inquiry has been dispatched successfully. I'll connect with you within 24 hours.";
                    form.appendChild(successAlert);
                    
                    form.reset();

                    setTimeout(() => {
                        successAlert.remove();
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        submitBtn.style.backgroundColor = '';
                    }, 5000);
                }, 1500);
            }
        });
    }
};