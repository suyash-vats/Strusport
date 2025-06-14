// Enhanced JavaScript with advanced animations and interactions

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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stats-section')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.stats-section, .featured-item, .newsletter-section');
    animatedElements.forEach(el => observer.observe(el));
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-particles');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

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

// Smooth scrolling for scroll indicator
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const imageLayout = document.querySelector('.image-layout');
            imageLayout.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});

// Newsletter form handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.email-input');
    const subscribeBtn = document.querySelector('.subscribe-btn');
    
    if (newsletterForm) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Animate button
                subscribeBtn.style.transform = 'scale(0.95)';
                subscribeBtn.textContent = 'Subscribed!';
                subscribeBtn.style.background = '#28a745';
                
                setTimeout(() => {
                    subscribeBtn.style.transform = 'scale(1)';
                    subscribeBtn.textContent = 'Subscribe';
                    subscribeBtn.style.background = '';
                    emailInput.value = '';
                }, 2000);
                
                // Show success message
                showNotification('Thank you for subscribing!', 'success');
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
        
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Enhanced image hover effects
document.addEventListener('DOMContentLoaded', function() {
    const imageContainers = document.querySelectorAll('.image-container');
    
    imageContainers.forEach(container => {
        const img = container.querySelector('img');
        
        container.addEventListener('mouseenter', function() {
            img.style.filter = 'brightness(1.1) contrast(1.1) saturate(1.2)';
        });
        
        container.addEventListener('mouseleave', function() {
            img.style.filter = 'brightness(1) contrast(1) saturate(1)';
        });
    });
});

// Featured items stagger animation
document.addEventListener('DOMContentLoaded', function() {
    const featuredItems = document.querySelectorAll('.featured-item');
    
    const featuredObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    featuredItems.forEach(item => {
        featuredObserver.observe(item);
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

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        const overlays = document.querySelectorAll('.overlay');
        overlays.forEach(overlay => {
            overlay.style.opacity = '0';
        });
    }
});

// Performance optimization - Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-duration', '0.5s');
}

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Remove cursor follower on touch devices
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        cursor.style.display = 'none';
    }
}