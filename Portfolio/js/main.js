// Enhanced Modern Portfolio JavaScript

// Loading Animation Control
const loadingAnimation = () => {
    const loader = document.querySelector('.loading-animation');
    if (loader) {
        // Simulate loading (replace with actual window.onload in production)
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }
};

// Typewriter Effect with Multiple Roles
const typewriter = () => {
    const texts = ["Full Stack Developer", "UI/UX Designer", "Mobile Developer", "Problem Solver", "Tech Enthusiast"];
    const element = document.getElementById("typing-text");
    const cursor = document.querySelector(".cursor");
    
    if (!element || !cursor) return;
    
    let count = 0;
    let index = 0;
    let current = "";
    let isDeleting = false;
    let speed = 150;
    let cursorVisible = true;

    // Cursor blink animation
    const cursorInterval = setInterval(() => {
        cursorVisible = !cursorVisible;
        cursor.style.opacity = cursorVisible ? '1' : '0';
    }, 500);

    const type = () => {
        current = texts[count];
        
        if (isDeleting) {
            element.textContent = current.substring(0, index--);
            speed = 50; // Faster when deleting
        } else {
            element.textContent = current.substring(0, index++);
            speed = 150 + Math.random() * 50; // Random speed for natural feel
        }

        if (index === current.length) {
            isDeleting = true;
            speed = 1500; // Pause at end
        }

        if (index === 0 && isDeleting) {
            isDeleting = false;
            count = (count + 1) % texts.length;
            speed = 500; // Pause before typing next
        }

        setTimeout(type, speed);
    };
    
    type();
    
    // Cleanup interval when component unmounts
    return () => clearInterval(cursorInterval);
};

// Floating Particles Background with Responsive Count
const createParticles = () => {
    const bg = document.querySelector('.animated-bg');
    if (!bg) return;
    
    // Clear existing particles
    bg.innerHTML = '';
    
    // Adjust particle count based on screen size
    const particleCount = window.innerWidth < 768 ? 40 : 
                        window.innerWidth < 1024 ? 70 : 100;
    
    const colors = [
        'rgba(67, 97, 238, 0.7)', 
        'rgba(63, 55, 201, 0.7)', 
        'rgba(72, 149, 239, 0.7)',
        'rgba(255, 255, 255, 0.5)'
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 20 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * -30;
        const animationName = Math.random() > 0.5 ? 'float' : 'floatReverse';
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animation = `${animationName} ${duration}s linear ${delay}s infinite`;
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        bg.appendChild(particle);
    }
};

// 3D Tilt Effect with Performance Optimization
const addTiltEffect = () => {
    const elements = document.querySelectorAll('.profile-photo-container, .project-card, .skill-card, .certification-card');
    
    // Request animation frame for smoother performance
    let requestId = null;
    
    elements.forEach(element => {
        const updateTransform = (x, y) => {
            if (requestId) {
                cancelAnimationFrame(requestId);
            }
            
            requestId = requestAnimationFrame(() => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                element.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
                
                if (element.classList.contains('project-card') || element.classList.contains('certification-card')) {
                    const intensity = Math.min(Math.abs(angleX) + Math.abs(angleY), 10);
                    element.style.boxShadow = `${angleY * 3}px ${angleX * 3}px 30px rgba(0, 0, 0, ${0.1 + intensity * 0.02})`;
                }
            });
        };
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            updateTransform(x, y);
        });
        
        element.addEventListener('mouseleave', () => {
            if (requestId) {
                cancelAnimationFrame(requestId);
            }
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            element.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
};

// Ripple Effect with Dynamic Color Based on Element
const addRippleEffect = () => {
    const buttons = document.querySelectorAll('.cta-button, .nav-link, .project-link, .social-icons a');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent multiple ripples
            if (this.querySelector('.ripple')) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Set ripple color based on button type
            if (this.classList.contains('primary')) {
                ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            } else if (this.classList.contains('secondary') || this.classList.contains('nav-link')) {
                ripple.style.background = 'rgba(67, 97, 238, 0.3)';
            } else {
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            }
            
            this.appendChild(ripple);
            
            // Remove ripple after animation completes
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
};

// Scroll Indicator Animation with Intersection Observer
const scrollIndicator = () => {
    const indicator = document.querySelector('.scroll-down');
    if (!indicator) return;
    
    // Hide when user scrolls down
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                indicator.style.opacity = '1';
            } else {
                indicator.style.opacity = '0';
            }
        });
    }, { threshold: 0.8 });
    
    observer.observe(document.querySelector('#home'));
    
    // Bounce animation
    let start = null;
    const duration = 2000;
    
    const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const bounce = Math.sin(progress / duration * Math.PI * 2) * 15;
        
        indicator.style.transform = `translateY(${bounce}px) translateX(-50%)`;
        
        if (progress < duration * 2) {
            window.requestAnimationFrame(animate);
        } else {
            start = null;
            window.requestAnimationFrame(animate);
        }
    };
    
    window.requestAnimationFrame(animate);
};

// Theme Management with Local Storage
const themeToggle = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    // Apply new theme
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Update icon
    const icon = document.querySelector("#theme-toggle i");
    if (icon) {
        icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
    
    // Dispatch custom event for other components to react
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
};

// Initialize theme from localStorage or system preference
const initializeTheme = () => {
    const savedTheme = localStorage.getItem("theme") || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    // Set correct icon on load
    const icon = document.querySelector("#theme-toggle i");
    if (icon) {
        icon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem("theme")) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute("data-theme", newTheme);
            if (icon) {
                icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
            }
        }
    });
};

// Mobile Menu with Accessibility Improvements
const mobileMenu = () => {
    const toggleBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.glass-nav ul');
    const html = document.documentElement;
    
    if (!toggleBtn || !nav) return;
    
    const closeMenu = () => {
        nav.classList.remove('active');
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.setAttribute('aria-expanded', 'false');
        html.removeEventListener('click', closeMenuOnClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
    };
    
    const closeMenuOnClickOutside = (e) => {
        if (!nav.contains(e.target) && e.target !== toggleBtn) {
            closeMenu();
        }
    };
    
    const handleEscapeKey = (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    };
    
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = nav.classList.toggle('active');
        toggleBtn.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        toggleBtn.setAttribute('aria-expanded', isExpanded.toString());
        
        if (isExpanded) {
            html.addEventListener('click', closeMenuOnClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
            // Focus first menu item when opened
            const firstNavItem = nav.querySelector('a');
            if (firstNavItem) firstNavItem.focus();
        } else {
            html.removeEventListener('click', closeMenuOnClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        }
    });
};

// Animate on Scroll with Intersection Observer
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add specific animations based on element
                if (entry.target.classList.contains('skill-card')) {
                    entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
                } else if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = `fadeIn 0.6s ease-out forwards`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
};

// Form Validation with Fetch API (simulated)
const formValidation = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const subjectInput = form.querySelector('input[name="subject"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('formStatus');
    
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    const showError = (input, message) => {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
    };
    
    const clearError = (input) => {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    };
    
    // Validate on blur
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                showError(input, 'This field is required');
            } else if (input === emailInput && !validateEmail(input.value)) {
                showError(input, 'Please enter a valid email');
            } else {
                clearError(input);
            }
        });
    });
    
    // Validate on input change
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                clearError(input);
            }
        });
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        }
        
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        }
        
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required');
            isValid = false;
        }
        
        if (!isValid) return;
        
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            formStatus.textContent = 'Message sent successfully!';
            formStatus.className = 'form-status success';
            formStatus.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        } catch (error) {
            formStatus.textContent = 'Failed to send message. Please try again.';
            formStatus.className = 'form-status error';
            formStatus.style.display = 'block';
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
};

// Smooth Scrolling with Offset for Fixed Header
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Calculate scroll position with offset for fixed header
                const headerHeight = document.querySelector('.glass-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
                
                // Close mobile menu if open
                const mobileNav = document.querySelector('.glass-nav ul');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    document.querySelector('.mobile-menu-btn').innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
};

// Back to Top Button with Progress Indicator
const initScrollToTop = () => {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'back-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Back to top');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    
    // Progress circle SVG
    const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    progressCircle.setAttribute('viewBox', '0 0 100 100');
    progressCircle.innerHTML = `
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="5"/>
        <circle class="progress-circle" cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="5" stroke-dasharray="283" stroke-dashoffset="283"/>
    `;
    scrollToTopBtn.appendChild(progressCircle);
    
    document.body.appendChild(scrollToTopBtn);
    
    const updateProgress = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.pageYOffset;
        const scrollProgress = (scrollPosition / scrollHeight) * 283;
        
        const progressCircle = scrollToTopBtn.querySelector('.progress-circle');
        if (progressCircle) {
            progressCircle.style.strokeDashoffset = 283 - scrollProgress;
        }
    };
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
            updateProgress();
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Skills Chart Visualization
const initSkillsChart = () => {
    const canvas = document.getElementById('skillsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;
    
    const skillsData = {
        labels: ['Frontend', 'Backend', 'Mobile', 'Database', 'DevOps', 'Design'],
        datasets: [{
            data: [90, 85, 75, 80, 70, 65],
            backgroundColor: [
                'rgba(67, 97, 238, 0.7)',
                'rgba(63, 55, 201, 0.7)',
                'rgba(72, 149, 239, 0.7)',
                'rgba(106, 76, 147, 0.7)',
                'rgba(239, 71, 111, 0.7)',
                'rgba(255, 209, 102, 0.7)'
            ],
            borderColor: [
                'rgba(67, 97, 238, 1)',
                'rgba(63, 55, 201, 1)',
                'rgba(72, 149, 239, 1)',
                'rgba(106, 76, 147, 1)',
                'rgba(239, 71, 111, 1)',
                'rgba(255, 209, 102, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    const chart = new Chart(ctx, {
        type: 'radar',
        data: skillsData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: 'var(--text-color)',
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: 'rgba(255, 255, 255, 0.1)',
                        stepSize: 20
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.1
                }
            }
        }
    });
    
    // Update chart on theme change
    document.addEventListener('themeChanged', (e) => {
        const isDark = e.detail === 'dark';
        chart.options.scales.r.pointLabels.color = isDark ? '#f8f9fa' : '#333';
        chart.update();
    });
};

// Testimonial Slider
const initTestimonialSlider = () => {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;
    
    let currentIndex = 0;
    const testimonials = slider.querySelectorAll('.testimonial-card');
    const totalTestimonials = testimonials.length;
    
    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    };
    
    const nextTestimonial = () => {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        showTestimonial(currentIndex);
    };
    
    // Auto-rotate testimonials every 5 seconds
    const interval = setInterval(nextTestimonial, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    slider.addEventListener('mouseleave', () => {
        interval = setInterval(nextTestimonial, 5000);
    });
    
    // Show first testimonial initially
    showTestimonial(0);
};

// View More Projects Button
const initViewMoreProjects = () => {
    const button = document.getElementById('load-more-projects');
    if (!button) return;
    
    const hiddenProjects = document.querySelectorAll('.project-card.hidden');
    let visibleCount = 3; // Initial visible projects
    
    button.addEventListener('click', () => {
        // Show next 3 hidden projects
        const projectsToShow = Array.from(hiddenProjects).slice(0, 3);
        projectsToShow.forEach(project => {
            project.classList.remove('hidden');
            project.style.display = 'block';
            project.classList.add('animate');
        });
        
        visibleCount += projectsToShow.length;
        
        // Hide button if no more projects
        if (visibleCount >= document.querySelectorAll('.project-card').length) {
            button.style.display = 'none';
        }
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadingAnimation();
    initializeTheme();
    typewriter();
    createParticles();
    mobileMenu();
    animateOnScroll();
    formValidation();
    addTiltEffect();
    addRippleEffect();
    scrollIndicator();
    smoothScroll();
    initScrollToTop();
    initSkillsChart();
    initTestimonialSlider();
    initViewMoreProjects();
    
    // Theme toggle event listener
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", themeToggle);
    }
    
    // Recreate particles on resize (with debounce)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            createParticles();
        }, 200);
    });
});

// Initialize when everything is fully loaded
window.addEventListener('load', () => {
    // Additional load-time optimizations can go here
});