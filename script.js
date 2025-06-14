// Enhanced JavaScript with advanced scroll-triggered animations

// Cursor follower
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .image-container, .featured-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'rgba(212, 175, 55, 0.8)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(255, 255, 255, 0.8)';
        });
    });
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Enhanced Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Image layout animations
            if (entry.target.classList.contains('image-layout')) {
                animateImageLayout();
            }
            
            // Stats section animation
            if (entry.target.classList.contains('stats-section')) {
                const statItems = entry.target.querySelectorAll('.stat-item');
                statItems.forEach(item => item.classList.add('animate'));
                
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    setTimeout(() => {
                        animateCounter(counter, target);
                    }, 500);
                });
            }
            
            // Featured items animation
            if (entry.target.classList.contains('featured-section')) {
                const featuredItems = entry.target.querySelectorAll('.featured-item');
                featuredItems.forEach(item => item.classList.add('animate'));
            }
            
            // Newsletter section animation
            if (entry.target.classList.contains('newsletter-section')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Image layout animation function
function animateImageLayout() {
    const centerImage = document.querySelector('.center-image');
    const leftImages = document.querySelectorAll('.side-images.left .image-container');
    const rightImages = document.querySelectorAll('.side-images.right .image-container');
    
    // Animate center image first
    setTimeout(() => {
        centerImage.classList.add('animate');
    }, 200);
    
    // Then animate side images
    setTimeout(() => {
        leftImages.forEach(img => img.classList.add('animate'));
        rightImages.forEach(img => img.classList.add('animate'));
    }, 800);
}

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.image-layout, .stats-section, .featured-section, .newsletter-section'
    );
    animatedElements.forEach(el => observer.observe(el));
    
    // Set initial states
    const newsletterSection = document.querySelector('.newsletter-section');
    if (newsletterSection) {
        newsletterSection.style.opacity = '0';
        newsletterSection.style.transform = 'translateY(50px)';
        newsletterSection.style.transition = 'all 1s ease-out';
    }
});

// Enhanced parallax effect
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax for particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.2 + (index * 0.1);
        particle.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
    
    // Parallax for floating particles container
    const floatingParticles = document.querySelector('.floating-particles');
    if (floatingParticles) {
        floatingParticles.style.transform = `translateY(${rate}px)`;
    }
    
    // Header background opacity based on scroll
    const header = document.querySelector('header');
    const opacity = Math.min(scrolled / 100, 0.95);
    header.style.background = `rgba(0, 0, 0, ${opacity})`;
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Enhanced theme toggle
document.addEventListener('DOMContentLoaded', function() {
    const switchInput = document.querySelector('.switch input');
    const pageTransition = document.querySelector('.page-transition');
    const logoText = document.querySelector('.logo-text');
    const starIcon = document.querySelector('.star-icon');
    const navIcons = document.querySelectorAll('.nav-icons a');
    const particles = document.querySelectorAll('.particle');

    switchInput.addEventListener('change', function() {
        const isChecked = this.checked;
        
        // Add smooth transition class
        document.body.style.transition = 'all 0.5s ease';
        
        if (isChecked) {
            // White theme
            pageTransition.classList.add('white');
            logoText.classList.add('white');
            starIcon.classList.add('white');
            navIcons.forEach(icon => icon.classList.add('white'));
            
            // Change particles color for white theme
            particles.forEach(particle => {
                particle.style.background = 'rgba(0, 0, 0, 0.3)';
            });
            
            // Update CSS variables
            document.documentElement.style.setProperty('--text-color', '#000000');
            document.documentElement.style.setProperty('--bg-color', '#ffffff');
            document.documentElement.style.setProperty('--bg-secondary', '#f8f9fa');
            
        } else {
            // Dark theme
            pageTransition.classList.remove('white');
            logoText.classList.remove('white');
            starIcon.classList.remove('white');
            navIcons.forEach(icon => icon.classList.remove('white'));
            
            // Reset particles color
            particles.forEach(particle => {
                particle.style.background = 'rgba(255, 255, 255, 0.3)';
            });
            
            // Reset CSS variables
            document.documentElement.style.setProperty('--text-color', '#ffffff');
            document.documentElement.style.setProperty('--bg-color', '#000000');
            document.documentElement.style.setProperty('--bg-secondary', '#1a1a1a');
        }
    });
});

// Enhanced smooth scrolling for scroll indicator
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const imageLayout = document.querySelector('.image-layout');
            
            // Add a smooth scroll with easing
            const targetPosition = imageLayout.offsetTop - 100;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1500;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function easeInOutQuart(t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t*t + b;
                t -= 2;
                return -c/2 * (t*t*t*t - 2) + b;
            }
            
            requestAnimationFrame(animation);
        });
    }
});

// Newsletter form handling with enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.email-input');
    const subscribeBtn = document.querySelector('.subscribe-btn');
    
    if (newsletterForm) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Enhanced button animation
                subscribeBtn.style.transform = 'scale(0.95)';
                subscribeBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                subscribeBtn.style.background = '#28a745';
                
                // Add success particle effect
                createSuccessParticles(subscribeBtn);
                
                setTimeout(() => {
                    subscribeBtn.style.transform = 'scale(1)';
                    subscribeBtn.innerHTML = 'Subscribe';
                    subscribeBtn.style.background = '';
                    emailInput.value = '';
                }, 3000);
                
                // Show enhanced success message
                showNotification('🎉 Thank you for subscribing to our newsletter!', 'success');
            } else {
                // Shake animation for invalid input
                emailInput.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    emailInput.style.animation = '';
                }, 500);
                
                showNotification('⚠️ Please enter a valid email address', 'error');
            }
        });
        
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
        
        // Add focus effects
        emailInput.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        emailInput.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// Create success particles effect
function createSuccessParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #28a745;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: ${centerX}px;
            top: ${centerY}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 100 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0, y = 0, opacity = 1;
        
        function animateParticle() {
            x += vx * 0.02;
            y += vy * 0.02 + 2; // gravity
            opacity -= 0.02;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                document.body.removeChild(particle);
            }
        }
        
        requestAnimationFrame(animateParticle);
    }
}

// Add shake animation to CSS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    
    const bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        z-index: 10000;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        font-weight: 500;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

// Enhanced image hover effects with 3D transforms
document.addEventListener('DOMContentLoaded', function() {
    const imageContainers = document.querySelectorAll('.image-container');
    
    imageContainers.forEach(container => {
        const img = container.querySelector('img');
        
        container.addEventListener('mouseenter', function() {
            img.style.filter = 'brightness(1.1) contrast(1.1) saturate(1.2)';
            img.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        container.addEventListener('mouseleave', function() {
            img.style.filter = 'brightness(1) contrast(1) saturate(1)';
        });
        
        // 3D tilt effect on mouse move
        container.addEventListener('mousemove', function(e) {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        container.addEventListener('mouseleave', function() {
            container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Start text animations after page load
    setTimeout(() => {
        const words = document.querySelectorAll('.word');
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.animationPlayState = 'running';
            }, index * 200);
        });
    }, 500);
});

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        const overlays = document.querySelectorAll('.overlay');
        overlays.forEach(overlay => {
            overlay.style.opacity = '0';
        });
    }
    
    // Smooth scroll with arrow keys
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy({ top: 100, behavior: 'smooth' });
    }
    
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy({ top: -100, behavior: 'smooth' });
    }
});

// Performance optimization - Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    
    // Disable some heavy animations
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.animation = 'none';
    });
}

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Remove cursor follower on touch devices
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        cursor.style.display = 'none';
    }
    
    // Add touch-specific interactions
    const touchElements = document.querySelectorAll('.image-container, .featured-item');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Intersection Observer for better performance
const lazyImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
            lazyImageObserver.unobserve(img);
        }
    });
});

// Observe all images for lazy loading effects
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'all 0.5s ease';
        lazyImageObserver.observe(img);
    });
});

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});