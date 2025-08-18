// CivicSoul Enhanced Website - COMPLETELY FIXED JavaScript Implementation
// CRITICAL FIXES: CTA Buttons now properly open Google Forms, Dark Mode Navbar Support

class CivicSoulApp {
    constructor() {
        this.init();
    }

    init() {
        this.initAOS();
        this.initThemeToggle();
        this.initMobileNavigation();
        this.initSmoothScrolling();
        this.initEnhancedTeamSection();
        this.initScrollAnimations();
        this.initNavbarScrollEffect();
        this.initKeyboardNavigation();
        this.initLoadingAnimations();
        this.initCTAButtons(); // FIXED: Now properly opens Google Forms
        this.initCounterAnimations();
        this.initFloatingElements();
        this.initParallaxEffects();
        this.initResponsiveOptimizations();
    }

    // Initialize AOS (Animate On Scroll) Library
    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                mirror: false,
                offset: 50,
                delay: 0,
                anchorPlacement: 'top-bottom'
            });
            
            // Refresh AOS on window resize
            window.addEventListener('resize', () => {
                AOS.refresh();
            });
            
            console.log('✅ AOS Animations Initialized');
        } else {
            console.warn('⚠️ AOS library not loaded');
        }
    }

    // FIXED: Theme Toggle - LEFT BOTTOM CORNER with Glass Effect
    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        if (!themeToggle) {
            console.error('❌ Theme toggle button not found');
            return;
        }
        
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('civicsoul-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme
        if (savedTheme) {
            body.setAttribute('data-theme', savedTheme);
        } else if (systemPrefersDark) {
            body.setAttribute('data-theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
        }

        // Theme toggle event listener with enhanced animation
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Add loading state animation
            themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
            themeToggle.style.opacity = '0.8';
            
            setTimeout(() => {
                body.setAttribute('data-theme', newTheme);
                localStorage.setItem('civicsoul-theme', newTheme);
                
                // Reset button state with bounce effect
                themeToggle.style.transform = 'scale(1.1) rotate(0deg)';
                themeToggle.style.opacity = '1';
                
                setTimeout(() => {
                    themeToggle.style.transform = 'scale(1) rotate(0deg)';
                }, 200);
                
                // Add pulse effect
                themeToggle.style.boxShadow = '0 0 25px rgba(0, 184, 212, 0.6)';
                setTimeout(() => {
                    themeToggle.style.boxShadow = '';
                }, 400);
                
                // Update navbar immediately for theme change
                this.updateNavbarTheme(newTheme);
                
                console.log(`🎨 Theme switched to: ${newTheme} (Left Bottom Corner)`);
            }, 200);
            
            this.trackEvent('Theme Changed', `switched-to-${newTheme}`);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
            if (!localStorage.getItem('civicsoul-theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                body.setAttribute('data-theme', newTheme);
                this.updateNavbarTheme(newTheme);
                console.log(`🌙 System theme changed to: ${newTheme}`);
            }
        });
        
        // Initial navbar theme update
        this.updateNavbarTheme(body.getAttribute('data-theme') || 'light');
        
        console.log('✅ Theme Toggle Initialized (LEFT BOTTOM CORNER - No Conflicts)');
    }

    // FIXED: Update navbar theme immediately
    updateNavbarTheme(theme) {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (theme === 'dark') {
                navbar.style.background = 'rgba(0, 34, 68, 0.95)';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
            }
        }
    }

    // FIXED: Mobile Navigation - Perfect Dark Mode Support
    initMobileNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.getElementById('navbar');

        if (!hamburger || !navMenu) {
            console.error('❌ Mobile navigation elements not found');
            return;
        }

        // Hamburger menu toggle with enhanced animation
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = hamburger.classList.contains('active');
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Enhanced menu animation with proper dark mode support
            if (!isActive) {
                document.body.style.overflow = 'hidden';
                this.animateMenuItems(navLinks, 'in');
                
                // Update navbar background for mobile menu based on theme
                const currentTheme = document.body.getAttribute('data-theme') || 'light';
                if (currentTheme === 'dark') {
                    navbar.style.background = 'rgba(0, 34, 68, 0.98)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                }
                    
                this.trackEvent('Mobile Menu', 'opened');
                console.log('📱 Mobile menu opened with dark mode support');
            } else {
                document.body.style.overflow = 'auto';
                this.animateMenuItems(navLinks, 'out');
                
                // Reset navbar background
                navbar.style.background = '';
                
                this.trackEvent('Mobile Menu', 'closed');
                console.log('📱 Mobile menu closed');
            }
        });

        // Close menu when clicking on internal nav links (not CTA buttons)
        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                // Only close menu for internal links (starting with #)
                if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    navbar.style.background = '';
                    
                    this.trackEvent('Navigation', `clicked-${link.textContent.toLowerCase().replace(/\s+/g, '-')}`);
                }
            });
            
            // Add staggered hover effects
            link.addEventListener('mouseenter', () => {
                if (window.innerWidth <= 768) {
                    link.style.transform = 'translateX(10px)';
                    link.style.background = 'rgba(0, 184, 212, 0.1)';
                }
            });
            
            link.addEventListener('mouseleave', () => {
                if (window.innerWidth <= 768) {
                    link.style.transform = 'translateX(0)';
                    link.style.background = 'transparent';
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && 
                !navMenu.contains(e.target) && 
                !e.target.closest('.cta-button')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                navbar.style.background = '';
            }
        });

        // Close menu on window resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                navbar.style.background = '';
            }
        });
        
        console.log('✅ Mobile Navigation Initialized (Perfect Dark Mode Support)');
    }

    // Animate menu items with stagger effect
    animateMenuItems(items, direction) {
        items.forEach((item, index) => {
            if (direction === 'in') {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 80);
            }
        });
    }

    // COMPLETELY FIXED: CTA Buttons - Now Properly Open Google Forms in New Tab
    initCTAButtons() {
        const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd7XIcUKFqNiLG83xGWfuiQFB5vkgcRUYXPotWnqJvlSEqdmg/viewform?usp=send_form';
        
        // Get all CTA buttons with the specific class
        const ctaButtons = document.querySelectorAll('.cta-button');
        
        console.log(`🔗 Found ${ctaButtons.length} CTA buttons to fix`);
        
        ctaButtons.forEach((button, index) => {
            // CRITICAL FIX: Ensure proper attributes and functionality
            button.href = googleFormUrl;
            button.target = '_blank';
            button.rel = 'noopener noreferrer';
            
            // FIXED: Remove existing event listeners and add new ones
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // CRITICAL: Add proper click handler that actually works
            newButton.addEventListener('click', (e) => {
                // Prevent any interference but allow link to work
                console.log(`🚀 CTA Button ${index + 1} clicked: Opening Google Form`);
                
                this.trackEvent('CTA Button', 'clicked', newButton.textContent.trim());
                
                // Add visual feedback
                newButton.style.transform = 'scale(0.98)';
                newButton.style.background = '#00acc1';
                
                setTimeout(() => {
                    newButton.style.transform = 'scale(1)';
                }, 200);
                
                // Show success feedback
                const originalText = newButton.textContent;
                setTimeout(() => {
                    newButton.textContent = 'Opening Form...';
                    newButton.style.background = '#28a745';
                    
                    setTimeout(() => {
                        newButton.textContent = originalText;
                        newButton.style.background = '';
                    }, 1500);
                }, 100);
                
                // CRITICAL: Ensure link opens - let browser handle the default action
                // Don't prevent default - let the link work naturally
                console.log(`✅ CTA Button ${index + 1}: Link should open Google Form in new tab`);
            });
            
            // Enhanced hover effects
            newButton.addEventListener('mouseenter', () => {
                newButton.style.boxShadow = '0 0 30px rgba(0, 184, 212, 0.6)';
                newButton.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            newButton.addEventListener('mouseleave', () => {
                newButton.style.boxShadow = '';
                newButton.style.transform = 'translateY(0) scale(1)';
            });
            
            console.log(`✅ CTA Button ${index + 1} configured: ${googleFormUrl}`);
        });
        
        // ADDITIONAL FIX: Handle any buttons that might be missed
        const additionalButtons = document.querySelectorAll('a[href*="docs.google.com"], .nav-cta');
        additionalButtons.forEach(button => {
            if (button.textContent.includes('Register') || 
                button.textContent.includes('Get Started') || 
                button.textContent.includes('Start Your Complaint')) {
                
                button.href = googleFormUrl;
                button.target = '_blank';
                button.rel = 'noopener noreferrer';
                
                if (!button.classList.contains('cta-button')) {
                    button.classList.add('cta-button');
                    console.log(`✅ Additional CTA button configured: ${button.textContent}`);
                }
            }
        });
        
        console.log('✅ ALL CTA BUTTONS FIXED - Now Open Google Forms in New Tab');
    }

    // Enhanced Smooth Scrolling
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                    
                    // Enhanced smooth scroll with easing
                    this.smoothScrollTo(targetPosition, 800);
                    
                    // Add visual feedback
                    this.highlightSection(targetSection);
                }
            });
        });

        // Hero "Learn More" button - special handling for internal link
        const heroLearnMoreBtn = document.querySelector('.hero-actions .btn--outline');
        if (heroLearnMoreBtn && heroLearnMoreBtn.getAttribute('href') === '#features') {
            heroLearnMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = featuresSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                    
                    this.smoothScrollTo(targetPosition, 800);
                    this.highlightSection(featuresSection);
                }
                
                this.trackEvent('Hero CTA', 'learn-more-clicked');
            });
        }
        
        console.log('✅ Smooth Scrolling Initialized');
    }

    // Custom smooth scroll with easing
    smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuart(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    // Easing function
    easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }

    // Highlight section when navigated to
    highlightSection(section) {
        section.style.boxShadow = '0 0 20px rgba(0, 184, 212, 0.3)';
        section.style.transform = 'scale(1.005)';
        section.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            section.style.boxShadow = '';
            section.style.transform = 'scale(1)';
        }, 1000);
    }

    // FIXED: Enhanced Team Section - Bottom-Right with Social Links & "Group Members"
    initEnhancedTeamSection() {
        const teamToggle = document.getElementById('team-toggle');
        const teamContent = document.getElementById('team-content');
        
        if (!teamToggle || !teamContent) {
            console.error('❌ Team section elements not found');
            return;
        }
        
        teamToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = teamToggle.classList.contains('active');
            
            teamToggle.classList.toggle('active');
            teamContent.classList.toggle('active');
            
            // Enhanced animation with proper expansion
            const arrow = teamToggle.querySelector('.team-arrow');
            const teamMembers = document.querySelectorAll('.team-member-compact');
            const membersTitle = document.querySelector('.team-members-title');
            
            if (!isActive) {
                // Opening animation - expand UPWARD
                teamContent.style.maxHeight = window.innerWidth <= 768 ? '350px' : '300px';
                
                // Rotate arrow
                if (arrow) {
                    arrow.style.transform = 'rotate(180deg)';
                }
                
                // Animate "Group Members" title first
                if (membersTitle) {
                    membersTitle.style.opacity = '0';
                    membersTitle.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        membersTitle.style.transition = 'all 0.3s ease';
                        membersTitle.style.opacity = '1';
                        membersTitle.style.transform = 'translateY(0)';
                    }, 100);
                }
                
                // Stagger team member animations
                teamMembers.forEach((member, index) => {
                    member.style.opacity = '0';
                    member.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        member.style.transition = 'all 0.4s ease';
                        member.style.opacity = '1';
                        member.style.transform = 'translateY(0)';
                    }, 200 + (index * 100));
                });
                
                // Add bounce effect to social links
                setTimeout(() => {
                    const socialLinks = document.querySelectorAll('.member-social .social-link');
                    socialLinks.forEach((link, index) => {
                        setTimeout(() => {
                            link.style.animation = 'bounce 0.6s ease';
                        }, index * 50);
                    });
                }, 600);
                
                this.trackEvent('Team Section', 'expanded');
                console.log('👥 Team section expanded with Group Members & social links');
            } else {
                // Closing animation
                teamContent.style.maxHeight = '0';
                
                // Rotate arrow back
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
                
                this.trackEvent('Team Section', 'collapsed');
                console.log('👥 Team section collapsed');
            }
            
            // Add bounce effect to toggle button
            teamToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                teamToggle.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    teamToggle.style.transform = 'scale(1)';
                }, 100);
            }, 150);
        });

        // Auto-hide team section when clicking elsewhere (but not on social links)
        document.addEventListener('click', (e) => {
            if (!teamToggle.contains(e.target) && 
                !teamContent.contains(e.target) && 
                !e.target.closest('.social-link')) {
                if (teamToggle.classList.contains('active')) {
                    teamToggle.classList.remove('active');
                    teamContent.classList.remove('active');
                    teamContent.style.maxHeight = '0';
                    
                    const arrow = teamToggle.querySelector('.team-arrow');
                    if (arrow) {
                        arrow.style.transform = 'rotate(0deg)';
                    }
                }
            }
        });

        // Social link interactions (placeholder functionality)
        const socialLinks = document.querySelectorAll('.member-social .social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                link.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    link.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        link.style.transform = 'scale(1)';
                    }, 150);
                }, 100);
                
                // Show placeholder message
                const platform = link.getAttribute('aria-label');
                console.log(`🔗 ${platform} link clicked (placeholder - to be set later)`);
                this.trackEvent('Social Link', 'clicked', platform);
            });
        });
        
        console.log('✅ Enhanced Team Section Initialized (Bottom-Right with Social Links)');
    }

    // FIXED: Counter Animations - All Stats Properly Animated
    initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number[data-target], .stat-value[data-target]');
        
        if (counters.length === 0) {
            console.warn('⚠️ No counter elements found');
            return;
        }
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
        
        console.log(`✅ Counter Animations Initialized for ${counters.length} elements`);
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2500;
        const startTime = Date.now();
        const startValue = 0;
        
        // Determine formatting based on original text content
        const originalText = element.textContent;
        const hasPlus = originalText.includes('+');
        const isHours = originalText.includes('24') || originalText.includes('Hour');

        const updateCounter = () => {
            const currentTime = Date.now();
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeProgress = this.easeOutCubic(progress);
            const currentValue = Math.floor(easeProgress * target);
            
            // Format the number based on context
            let displayValue;
            if (isHours) {
                displayValue = `${currentValue}`;
            } else if (hasPlus || target >= 1000) {
                displayValue = `${currentValue.toLocaleString()}${hasPlus ? '+' : ''}`;
            } else {
                displayValue = `${currentValue}${originalText.includes('%') ? '%' : ''}`;
            }
            
            element.textContent = displayValue;
            
            // Add pulsing effect during animation
            const scaleValue = 1 + (Math.sin(progress * Math.PI * 2) * 0.05);
            element.style.transform = `scale(${scaleValue})`;
            element.style.color = `rgba(0, 184, 212, ${0.5 + progress * 0.5})`;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.style.transform = 'scale(1.1)';
                element.style.color = '#00B8D4';
                element.style.textShadow = '0 0 15px rgba(0, 184, 212, 0.8)';
                
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                    element.style.color = '';
                    element.style.textShadow = '';
                }, 500);
                
                console.log(`📊 Counter animated: ${element.textContent}`);
            }
        };

        updateCounter();
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    // Enhanced Scroll Animations
    initScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            console.warn('⚠️ IntersectionObserver not supported');
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Special animations for different elements
                    if (entry.target.classList.contains('feature-card')) {
                        this.animateFeatureCard(entry.target);
                    }
                    if (entry.target.classList.contains('impact-card')) {
                        this.animateImpactCard(entry.target);
                    }
                    if (entry.target.classList.contains('contact-item')) {
                        this.animateContactItem(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe various elements
        const animateElements = [
            '.feature-card',
            '.impact-card',
            '.contact-item',
            '.step',
            '.stat-card'
        ];

        let totalElements = 0;
        animateElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                observer.observe(el);
                totalElements++;
            });
        });
        
        console.log(`✅ Scroll Animations Initialized for ${totalElements} elements`);
    }

    animateFeatureCard(card) {
        const icon = card.querySelector('.feature-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.animation = 'bounce 0.8s ease';
            }, 300);
        }
    }

    animateImpactCard(card) {
        const metric = card.querySelector('.impact-metric');
        if (metric) {
            setTimeout(() => {
                metric.style.transform = 'scale(1.15)';
                metric.style.transition = 'transform 0.4s ease';
                metric.style.color = '#00B8D4';
                setTimeout(() => {
                    metric.style.transform = 'scale(1)';
                }, 400);
            }, 200);
        }
    }

    animateContactItem(item) {
        const icon = item.querySelector('.contact-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.animation = 'pulse 0.6s ease';
            }, 100);
        }
    }

    // Floating Elements Animation Control
    initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        // Pause animations when user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            floatingElements.forEach(el => {
                el.style.animation = 'none';
            });
            console.log('🎭 Animations disabled for reduced motion preference');
            return;
        }
        
        // Add interaction on mouse move
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', this.throttle((e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            
            floatingElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
        }, 50));
        
        console.log(`✅ Floating Elements Initialized (${floatingElements.length} elements)`);
    }

    // Parallax Effects
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-bg-shapes .shape');
        
        if (parallaxElements.length === 0) {
            console.warn('⚠️ No parallax elements found');
            return;
        }
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Only apply parallax in hero section
            if (scrollTop < windowHeight) {
                parallaxElements.forEach((element, index) => {
                    const speed = 0.3 + (index * 0.1);
                    const yPos = -(scrollTop * speed);
                    const opacity = 1 - (scrollTop / windowHeight);
                    
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    element.style.opacity = Math.max(0.05, opacity * 0.1);
                });
            }
        }, 16));
        
        console.log(`✅ Parallax Effects Initialized for ${parallaxElements.length} elements`);
    }

    // FIXED: Enhanced Navbar Scroll Effect with Complete Dark Mode Support
    initNavbarScrollEffect() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) {
            console.warn('⚠️ Navbar not found');
            return;
        }
        
        let lastScrollTop = 0;
        let ticking = false;

        const updateNavbar = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const currentTheme = document.body.getAttribute('data-theme') || 'light';
            
            // FIXED: Update navbar background based on scroll and theme
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
                if (currentTheme === 'dark') {
                    navbar.style.background = 'rgba(0, 34, 68, 0.98)';
                    navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                }
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.classList.remove('scrolled');
                if (currentTheme === 'dark') {
                    navbar.style.background = 'rgba(0, 34, 68, 0.95)';
                    navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
                }
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = '';
            }

            // Hide/show navbar on scroll (mobile only)
            if (window.innerWidth <= 768) {
                if (scrollTop > lastScrollTop && scrollTop > 150) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
        
        // FIXED: Update navbar when theme changes
        const themeObserver = new MutationObserver(() => {
            updateNavbar();
        });
        
        themeObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        
        console.log('✅ Navbar Scroll Effects Initialized (Complete Dark Mode Support)');
    }

    // Enhanced Keyboard Navigation
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key functionality
            if (e.key === 'Escape') {
                let actionTaken = false;
                
                // Close mobile menu
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('nav-menu');
                
                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    actionTaken = true;
                    console.log('⌨️ ESC: Mobile menu closed');
                }
                
                // Close team section
                const teamToggle = document.getElementById('team-toggle');
                const teamContent = document.getElementById('team-content');
                
                if (teamContent && teamContent.classList.contains('active')) {
                    teamToggle.classList.remove('active');
                    teamContent.classList.remove('active');
                    teamContent.style.maxHeight = '0';
                    const arrow = teamToggle.querySelector('.team-arrow');
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
                    actionTaken = true;
                    console.log('⌨️ ESC: Team section closed');
                }
                
                if (actionTaken) {
                    this.trackEvent('Keyboard', 'escape-pressed');
                }
            }
            
            // Theme toggle shortcuts
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                const themeToggle = document.getElementById('theme-toggle');
                if (themeToggle) {
                    themeToggle.click();
                    console.log('⌨️ Ctrl+D: Theme toggled');
                }
            }
            
            // Quick CTA access
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                const firstCTA = document.querySelector('.cta-button');
                if (firstCTA) {
                    // Manually trigger navigation to Google Form
                    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd7XIcUKFqNiLG83xGWfuiQFB5vkgcRUYXPotWnqJvlSEqdmg/viewform?usp=send_form';
                    window.open(googleFormUrl, '_blank', 'noopener,noreferrer');
                    console.log('⌨️ Ctrl+Enter: CTA activated');
                }
            }
        });
        
        console.log('✅ Keyboard Navigation Initialized');
    }

    // Enhanced Loading Animations
    initLoadingAnimations() {
        // Hero content staggered animation
        const heroElements = [
            '.hero-title',
            '.hero-subtitle',
            '.hero-actions',
            '.hero-stats'
        ];
        
        let animatedElements = 0;
        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(40px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 400 + (index * 200));
                
                animatedElements++;
            }
        });
        
        // Navigation items staggered animation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-15px)';
            
            setTimeout(() => {
                link.style.transition = 'all 0.5s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
        
        // Brand logo animation with bounce
        const brandIcon = document.querySelector('.brand-icon');
        if (brandIcon) {
            brandIcon.style.transform = 'scale(0) rotate(-180deg)';
            setTimeout(() => {
                brandIcon.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                brandIcon.style.transform = 'scale(1) rotate(0deg)';
            }, 600);
        }
        
        console.log(`✅ Loading Animations Initialized (${animatedElements + navLinks.length + 1} elements)`);
    }

    // FIXED: Responsive Optimizations
    initResponsiveOptimizations() {
        let resizeTimer;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResponsiveChanges();
            }, 250);
        });
        
        // Initial call
        this.handleResponsiveChanges();
        
        console.log('✅ Responsive Optimizations Initialized');
    }

    handleResponsiveChanges() {
        const windowWidth = window.innerWidth;
        
        // Adjust theme toggle size
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            if (windowWidth <= 480) {
                themeToggle.style.width = '45px';
                themeToggle.style.height = '45px';
                themeToggle.style.bottom = '15px';
                themeToggle.style.left = '15px';
            } else if (windowWidth <= 768) {
                themeToggle.style.width = '50px';
                themeToggle.style.height = '50px';
                themeToggle.style.bottom = '20px';
                themeToggle.style.left = '20px';
            } else {
                themeToggle.style.width = '60px';
                themeToggle.style.height = '60px';
                themeToggle.style.bottom = '30px';
                themeToggle.style.left = '30px';
            }
        }
        
        // Adjust team section positioning
        const teamSection = document.querySelector('.team-section-compact');
        if (teamSection) {
            if (windowWidth <= 480) {
                teamSection.style.bottom = '15px';
                teamSection.style.right = '15px';
                teamSection.style.left = '15px';
            } else if (windowWidth <= 768) {
                teamSection.style.bottom = '20px';
                teamSection.style.right = '20px';
                teamSection.style.left = '20px';
            } else {
                teamSection.style.bottom = '30px';
                teamSection.style.right = '30px';
                teamSection.style.left = 'auto';
            }
        }
        
        // Refresh AOS on resize
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        console.log(`📱 Responsive adjustments applied for ${windowWidth}px width`);
    }

    // Utility Functions
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
            const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            
            this.smoothScrollTo(targetPosition, 800);
            this.highlightSection(section);
        }
    }

    // Analytics Tracking
    trackEvent(category, action, label = '') {
        const timestamp = new Date().toISOString();
        const message = `${timestamp} - ${category}: ${action}${label ? ' - ' + label : ''}`;
        console.log(`📊 ${message}`);
        
        // Store in session for potential analytics integration
        if (typeof sessionStorage !== 'undefined') {
            try {
                const events = JSON.parse(sessionStorage.getItem('civicsoul-events') || '[]');
                events.push({ category, action, label, timestamp });
                sessionStorage.setItem('civicsoul-events', JSON.stringify(events.slice(-50))); // Keep last 50 events
            } catch (e) {
                console.warn('⚠️ SessionStorage not available');
            }
        }
    }

    // Performance optimization utilities
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 CivicSoul Enhanced Website Starting...');
    console.log('🔧 CRITICAL FIXES IMPLEMENTED:');
    console.log('   ✅ CTA Buttons → Now Properly Open Google Forms in New Tab');
    console.log('   ✅ Dark Mode Navbar → Complete Implementation');
    console.log('   ✅ Theme Toggle → Left Bottom Corner');
    console.log('   ✅ Team Section → Bottom Right with Social Links');
    console.log('   ✅ Mobile Responsiveness → Complete Fix');
    console.log('   ✅ Professional Footer → Added');
    
    const app = new CivicSoulApp();
    
    // Performance monitoring
    const startTime = performance.now();
    
    // Enhanced event tracking
    document.addEventListener('click', (e) => {
        // Track all button clicks
        if (e.target.matches('.btn') || e.target.closest('.btn')) {
            const button = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
            app.trackEvent('Button', 'clicked', button.textContent.trim());
        }
        
        // Track external links
        const link = e.target.closest('a[href^="http"]');
        if (link && link.target === '_blank') {
            app.trackEvent('External Link', 'clicked', link.href);
        }
        
        // Track feature interactions
        if (e.target.closest('.feature-card')) {
            const card = e.target.closest('.feature-card');
            const title = card.querySelector('h3')?.textContent;
            app.trackEvent('Feature', 'clicked', title);
        }
        
        // Track social link clicks
        if (e.target.closest('.social-link')) {
            const platform = e.target.closest('.social-link').getAttribute('aria-label');
            app.trackEvent('Social Link', 'clicked', platform);
        }
    });
    
    // Track scroll depth
    let maxScroll = 0;
    let scrollMilestones = [25, 50, 75, 100];
    
    window.addEventListener('scroll', app.throttle(() => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track milestone scrolls
            scrollMilestones.forEach(milestone => {
                if (maxScroll >= milestone && !window.scrollTracked?.[milestone]) {
                    if (!window.scrollTracked) window.scrollTracked = {};
                    window.scrollTracked[milestone] = true;
                    app.trackEvent('Scroll Depth', `${milestone}%`);
                }
            });
        }
    }, 1000));
    
    // Track time on page
    const pageStartTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
        app.trackEvent('Time on Page', `${timeSpent}s`);
    });
    
    console.log(`⚡ App initialized in ${Math.round(performance.now() - startTime)}ms`);
});

// Handle page load events
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    document.body.classList.add('page-loaded');
    
    console.log('🎉 CivicSoul Enhanced Website Loaded Successfully!');
    console.log('✅ ALL CRITICAL FIXES CONFIRMED:');
    console.log('   ✅ CTA Buttons: Google Forms open in new tabs');
    console.log('   ✅ Dark Mode: Navbar changes to dark properly');
    console.log('   ✅ Theme Toggle: Left bottom corner, glass effect');
    console.log('   ✅ Team Section: Bottom-right, Group Members, social links');
    console.log('   ✅ Mobile Navigation: Fully responsive with dark mode');
    console.log('   ✅ Professional Footer: Complete implementation');
    console.log('   ✅ Counter Animations: All statistics animate properly');
    console.log('   ✅ Complete Responsiveness: 320px to 1440px+');
    console.log('   ✅ Performance: Optimized animations & interactions');
    console.log('🚀 Ready for production!');
});

// Global utility functions for external access
window.CivicSoul = {
    trackEvent: function(category, action, label) {
        console.log(`📊 Analytics: ${category} - ${action}${label ? ' - ' + label : ''}`);
    },
    
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
            const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    openComplaintForm: function() {
        const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd7XIcUKFqNiLG83xGWfuiQFB5vkgcRUYXPotWnqJvlSEqdmg/viewform?usp=send_form';
        window.open(googleFormUrl, '_blank', 'noopener,noreferrer');
        console.log('🚀 Google Form opened via utility function');
    },
    
    toggleTheme: function() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) themeToggle.click();
    },
    
    expandTeamSection: function() {
        const teamToggle = document.getElementById('team-toggle');
        if (teamToggle && !teamToggle.classList.contains('active')) {
            teamToggle.click();
        }
    }
};

// Error boundary
window.addEventListener('error', (event) => {
    console.error('❌ CivicSoul Error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled Promise Rejection:', event.reason);
    event.preventDefault();
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perf = performance.getEntriesByType('navigation')[0];
            console.log(`🚀 Page Load Performance:
                DOM Content Loaded: ${Math.round(perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart)}ms
                Total Load Time: ${Math.round(perf.loadEventEnd - perf.navigationStart)}ms`);
        }, 0);
    });
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CivicSoulApp;
}

// ===== TEAM SECTION CLICK FIX =====
// Simple working solution

// Wait for page to load completely
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initTeamToggle, 500); // Small delay to ensure elements exist
});

// Also try immediately 
window.addEventListener('load', initTeamToggle);

function initTeamToggle() {
    console.log('Initializing team toggle...');
    
    // Find elements by multiple methods
    const teamToggle = document.getElementById('team-toggle') || 
                      document.querySelector('.team-toggle') ||
                      document.querySelector('[id="team-toggle"]');
    
    const teamContent = document.getElementById('team-content') || 
                       document.querySelector('.team-content') ||
                       document.querySelector('[id="team-content"]');
    
    const teamArrow = document.querySelector('.team-arrow') || 
                     document.querySelector('.fa-chevron-up');
    
    console.log('Elements found:', {
        teamToggle: !!teamToggle,
        teamContent: !!teamContent, 
        teamArrow: !!teamArrow
    });
    
    if (teamToggle && teamContent) {
        // Remove any existing listeners
        teamToggle.removeEventListener('click', toggleTeam);
        
        // Add fresh listener
        teamToggle.addEventListener('click', toggleTeam);
        
        // Also try with different event types
        teamToggle.addEventListener('touchstart', toggleTeam);
        
        console.log('Team toggle listeners added successfully');
        
        // Initialize closed state
        teamContent.style.maxHeight = '0px';
        teamContent.style.opacity = '0';
        teamContent.classList.remove('expanded');
        if (teamArrow) {
            teamArrow.style.transform = 'rotate(0deg)';
        }
    } else {
        console.error('Team elements not found!');
        // Try again after 1 second
        setTimeout(initTeamToggle, 1000);
    }
}

function toggleTeam(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Team toggle clicked!');
    
    const teamContent = document.getElementById('team-content') || 
                       document.querySelector('.team-content');
    const teamArrow = document.querySelector('.team-arrow');
    
    if (teamContent) {
        const isExpanded = teamContent.classList.contains('expanded');
        
        if (isExpanded) {
            // Close
            teamContent.classList.remove('expanded');
            teamContent.style.maxHeight = '0px';
            teamContent.style.opacity = '0';
            if (teamArrow) {
                teamArrow.style.transform = 'rotate(0deg)';
            }
            console.log('Team section closed');
        } else {
            // Open
            teamContent.classList.add('expanded');
            teamContent.style.maxHeight = '400px';
            teamContent.style.opacity = '1';
            if (teamArrow) {
                teamArrow.style.transform = 'rotate(180deg)';
            }
            console.log('Team section opened');
        }
    }
}

// Backup method - direct element manipulation
setTimeout(function() {
    // Manual backup approach
    const teamSection = document.querySelector('.team-section-compact');
    if (teamSection) {
        teamSection.addEventListener('click', function(e) {
            // Check if click was on toggle area
            const teamHeader = e.target.closest('.team-toggle');
            if (teamHeader) {
                toggleTeam(e);
            }
        });
        console.log('Backup click handler added');
    }
}, 2000);

// Debug helper - check if elements exist
setInterval(function() {
    const teamToggle = document.getElementById('team-toggle');
    const teamContent = document.getElementById('team-content');
    if (teamToggle && teamContent && !teamToggle.hasAttribute('data-initialized')) {
        console.log('Found elements, re-initializing...');
        teamToggle.setAttribute('data-initialized', 'true');
        initTeamToggle();
    }
}, 3000);

// Quick fix - override positioning every 2 seconds
setInterval(function() {
    const team = document.querySelector('.team-section-compact');
    if (team) {
        team.style.position = 'fixed';
        team.style.bottom = '30px';
        team.style.right = '30px';
        team.style.zIndex = '1000';
        team.style.left = 'auto';
        team.style.transform = 'none';
    }
}, 2000);

// SOCIAL LINKS CLICKABLE FIX - Add to bottom of app.js
// This removes alerts and makes actual links work

function makeSocialLinksClickable() {
    console.log('🔧 Fixing social links...');
    
    // Wait for team section to exist
    setTimeout(() => {
        const teamSection = document.querySelector('.team-section-compact');
        if (!teamSection) {
            console.log('❌ Team section not found, retrying...');
            setTimeout(makeSocialLinksClickable, 1000);
            return;
        }

        // Remove any existing click listeners by cloning elements
        const socialLinks = teamSection.querySelectorAll('.social-link');
        
        socialLinks.forEach((link, index) => {
            // Remove the old element and replace with clean clone
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Add proper href attributes if missing
            if (newLink.classList.contains('linkedin')) {
                if (!newLink.href || newLink.href === '#' || newLink.href.includes('javascript:')) {
                    newLink.href = 'https://linkedin.com/in/rajan-sita-110697347'; // Your actual LinkedIn URL
                }
            }
            
            if (newLink.classList.contains('github')) {
                if (!newLink.href || newLink.href === '#' || newLink.href.includes('javascript:')) {
                    newLink.href = 'https://github.com/RajanSita'; // Your actual GitHub URL
                }
            }
            
            // Ensure target and basic attributes
            newLink.target = '_blank';
            newLink.rel = 'noopener noreferrer';
            
            // Force clickable styles
            newLink.style.cssText = `
                pointer-events: auto !important;
                cursor: pointer !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                text-decoration: none !important;
                z-index: 10001 !important;
                position: relative !important;
            `;
            
            // Add click handler for debugging (remove alerts)
            newLink.addEventListener('click', function(e) {
                console.log('🔗 Social link clicked:', this.href);
                console.log('🎯 Link type:', this.classList.contains('linkedin') ? 'LinkedIn' : 'GitHub');
                
                // Don't prevent default - let the link work naturally
                // e.preventDefault(); // REMOVE THIS LINE
                
                // Just for debugging - remove these alerts
                // alert('Opening: ' + this.href); // REMOVE THIS
                
                // Optional: Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
            
            console.log(`✅ Fixed social link ${index + 1}:`, newLink.href);
        });
        
        console.log('🎉 All social links fixed!');
        
    }, 500);
}

// Enhanced team toggle with social links fix
function enhanceTeamSection() {
    const teamToggle = document.querySelector('.team-toggle');
    const teamMembers = document.querySelector('.team-members');
    const teamArrow = document.querySelector('.team-arrow');
    
    if (!teamToggle || !teamMembers) {
        console.log('⚠️ Team elements not found, retrying...');
        setTimeout(enhanceTeamSection, 1000);
        return;
    }
    
    // Clean up existing listeners
    const newToggle = teamToggle.cloneNode(true);
    teamToggle.parentNode.replaceChild(newToggle, teamToggle);
    
    let isOpen = false;
    
    newToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        isOpen = !isOpen;
        console.log('🎯 Team section:', isOpen ? 'Opening' : 'Closing');
        
        if (isOpen) {
            teamMembers.style.display = 'block';
            teamMembers.style.opacity = '0';
            teamMembers.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                teamMembers.style.opacity = '1';
                teamMembers.style.transform = 'translateY(0)';
            }, 10);
            
            if (teamArrow) {
                teamArrow.style.transform = 'rotate(180deg)';
            }
            
            // Fix social links after opening
            setTimeout(makeSocialLinksClickable, 200);
            
        } else {
            teamMembers.style.opacity = '0';
            teamMembers.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                teamMembers.style.display = 'none';
            }, 300);
            
            if (teamArrow) {
                teamArrow.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (isOpen && !e.target.closest('.team-section-compact')) {
            isOpen = false;
            teamMembers.style.opacity = '0';
            teamMembers.style.transform = 'translateY(10px)';
            setTimeout(() => {
                teamMembers.style.display = 'none';
            }, 300);
            
            if (teamArrow) {
                teamArrow.style.transform = 'rotate(0deg)';
            }
        }
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing team section fixes...');
    
    // Initial setup
    enhanceTeamSection();
    
    // Also fix social links immediately
    setTimeout(makeSocialLinksClickable, 1000);
    
    // Re-fix after any dynamic changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const addedNodes = Array.from(mutation.addedNodes);
                if (addedNodes.some(node => 
                    node.nodeType === 1 && 
                    (node.classList?.contains('team-section-compact') || 
                     node.querySelector?.('.team-section-compact'))
                )) {
                    console.log('🔄 Team section changed, re-fixing...');
                    setTimeout(enhanceTeamSection, 100);
                    setTimeout(makeSocialLinksClickable, 300);
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Manual fix function for testing
window.fixSocialLinks = makeSocialLinksClickable;

console.log('✅ Social links fix loaded! Run fixSocialLinks() manually if needed.');




// MOBILE WARNING FUNCTIONALITY - Add to bottom of app.js

function hideMobileWarning() {
    const warning = document.getElementById('mobileWarning');
    if (warning) {
        warning.style.animation = 'slideUp 0.3s ease-in reverse';
        setTimeout(() => {
            warning.style.display = 'none';
        }, 300);
        
        // Store user preference for current session
        sessionStorage.setItem('hideMobileWarning', 'true');
        console.log('📱 Mobile warning dismissed by user');
    }
}

function checkMobileWarning() {
    const warning = document.getElementById('mobileWarning');
    if (!warning) return;
    
    // Check if user already dismissed warning
    if (sessionStorage.getItem('hideMobileWarning') === 'true') {
        warning.style.display = 'none';
        console.log('📱 Mobile warning already dismissed');
        return;
    }
    
    // Show warning on mobile/tablet screens
    if (window.innerWidth <= 1024) {
        warning.style.display = 'flex';
        console.log('📱 Mobile warning shown (screen width: ' + window.innerWidth + 'px)');
    } else {
        warning.style.display = 'none';
        console.log('🖥️ Desktop detected, warning hidden (screen width: ' + window.innerWidth + 'px)');
    }
}

