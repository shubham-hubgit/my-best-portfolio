// Initialize Vanilla Tilt for project cards
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

// Navigation scroll effect with blur
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
    
    // Add blur effect to header when scrolling
    const blurAmount = Math.min(window.scrollY / 100, 20);
    header.style.backdropFilter = `blur(${blurAmount}px)`;
});

// Typing animation for hero section
const text = "I'm a passionate developer";
let index = 0;
const heroText = document.querySelector('.hero p');
const originalText = heroText.textContent;

function typeText() {
    heroText.textContent = originalText.slice(0, index);
    index++;
    if (index > originalText.length) {
        setTimeout(() => {
            index = 0;
        }, 2000);
    }
    setTimeout(typeText, 100);
}

typeText();

// Mobile menu functionality with smooth animations
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle navigation
    nav.classList.toggle('nav-active');
    
    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
});

// Smooth scroll for navigation links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Enhanced form submission with validation and animation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }
    
    // Simulate sending (replace with actual API call)
    try {
        const submitButton = contactForm.querySelector('.submit-btn');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        const submitButton = contactForm.querySelector('.submit-btn');
        submitButton.innerHTML = 'Send Message';
        submitButton.disabled = false;
    }
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Email validation helper
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Intersection Observer for skill bars animation
const skillBars = document.querySelectorAll('.progress');
const skillSection = document.querySelector('#about');

const animateSkills = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const value = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = value;
                }, 100);
            });
        }
    });
};

const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
});

skillsObserver.observe(skillSection);

// Parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    hero.style.transform = `perspective(1000px) rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 5}deg)`;
});
