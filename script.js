// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple form validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                showNotification('Please fill all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email', 'error');
                return;
            }
            
            // Simulate form submission
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! (Demo)', 'success');
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        });
    }

    // Notification function with enhanced styling
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background-color: ${type === 'success' ? '#00d4ff' : '#ff6b6b'};
            color: ${type === 'success' ? '#0a0e27' : 'white'};
            border-radius: 10px;
            z-index: 2000;
            animation: slideIn 0.3s cubic-bezier(0.23, 1, 0.320, 1);
            font-weight: 600;
            box-shadow: 0 10px 30px ${type === 'success' ? 'rgba(0, 212, 255, 0.4)' : 'rgba(255, 107, 107, 0.4)'};
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s cubic-bezier(0.23, 1, 0.320, 1)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add CSS animations and styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px) translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateX(0) translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px) translateY(-20px);
                opacity: 0;
            }
        }

        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, rgba(10, 14, 39, 0.99), rgba(26, 31, 58, 0.95));
            gap: 0;
            padding: 20px 0;
            border-bottom: 1px solid rgba(0, 102, 255, 0.2);
            backdrop-filter: blur(10px);
            animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .nav-menu.active li {
            width: 100%;
            text-align: center;
            padding: 15px 0;
            border-bottom: 1px solid rgba(0, 102, 255, 0.1);
            animation: fadeInUp 0.3s ease-out;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(10px, 10px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }

        .hamburger span {
            background: linear-gradient(135deg, #0066ff, #00d4ff);
            transition: all 0.3s ease;
        }

        .hamburger.active span {
            background: linear-gradient(135deg, #00d4ff, #0066ff);
        }
    `;
    document.head.appendChild(style);

    // Enhanced scroll animation for elements with stagger effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 50);
            }
        });
    }, observerOptions);

    // Observe skill cards, info items, and contact items
    document.querySelectorAll('.skill-card, .info-item, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.320, 1), transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)';
        observer.observe(el);
    });

    // Active navigation link on scroll with enhanced styling
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.style.color = 'var(--secondary-color)';
                link.style.textShadow = '0 0 10px rgba(0, 212, 255, 0.5)';
            } else {
                link.style.color = 'var(--text-primary)';
                link.style.textShadow = 'none';
            }
        });

        // Add parallax effect to hero section
        const hero = document.querySelector('.hero');
        if (hero && window.scrollY < hero.clientHeight) {
            hero.style.backgroundPosition = `0px ${window.scrollY * 0.5}px`;
        }
    });

    // Mouse move parallax effect
    document.addEventListener('mousemove', function(e) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const x = (e.clientX / window.innerWidth) * 10 - 5;
            const y = (e.clientY / window.innerHeight) * 10 - 5;
            heroContent.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
        }
    });

    // Reset parallax on mouse leave
    document.addEventListener('mouseleave', function() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }
    });

    // Add glow effect to buttons on hover
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            btn.style.setProperty('--mouse-x', x + 'px');
            btn.style.setProperty('--mouse-y', y + 'px');
        });
    });
});
