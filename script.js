// Navigation// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    setupNavigation();
    setupAnimations();
    setupTypingEffect();
    setupCounters();
    loadGitHubProjects();
    setupContactForm();
    setupScrollEffects();
}

// Navigation Setup
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Typing Effect
function setupTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        "Hi, I'm a Developer",
        "I Build Amazing Things",
        "Welcome to My Portfolio"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    if (typingText) {
        typeEffect();
    }
}

// Counter Animation
function setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// GitHub Projects Loader
async function loadGitHubProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    // Sample projects data (replace with actual GitHub API call)
    const sampleProjects = [
        {
            name: "Modern Portfolio Website",
            description: "A responsive portfolio website built with HTML, CSS, and JavaScript featuring dark theme and animations.",
            language: "JavaScript",
            stars: 15,
            forks: 3,
            html_url: "#"
        },
        {
            name: "React Task Manager",
            description: "A full-stack task management application built with React, Node.js, and MongoDB.",
            language: "React",
            stars: 28,
            forks: 7,
            html_url: "#"
        },
        {
            name: "Python Data Analyzer",
            description: "Data analysis tool for processing and visualizing large datasets using Python and Pandas.",
            language: "Python",
            stars: 12,
            forks: 2,
            html_url: "#"
        },
        {
            name: "Mobile Weather App",
            description: "Cross-platform weather application built with React Native and OpenWeather API.",
            language: "React Native",
            stars: 22,
            forks: 5,
            html_url: "#"
        }
    ];
    
    // Clear loading card
    projectsGrid.innerHTML = '';
    
    // Create project cards
    sampleProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const languageColors = {
        'JavaScript': '#f7df1e',
        'React': '#61dafb',
        'Python': '#3776ab',
        'React Native': '#61dafb',
        'HTML': '#e34f26',
        'CSS': '#1572b6'
    };
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${project.name}</h3>
            <div class="project-links">
                <a href="${project.html_url}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i>
                </a>
                <a href="#" class="project-link">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
        <p class="project-description">${project.description}</p>
        <div class="project-footer">
            <div class="project-language">
                <span class="language-dot" style="background-color: ${languageColors[project.language] || '#666'}"></span>
                ${project.language}
            </div>
            <div class="project-stats">
                <span class="stat">
                    <i class="fas fa-star"></i>
                    ${project.stars}
                </span>
                <span class="stat">
                    <i class="fas fa-code-branch"></i>
                    ${project.forks}
                </span>
            </div>
        </div>
    `;
    
    return card;
}

// Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll Effects
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// Animation Setup
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.project-card, .skill-item, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Add CSS for animations
const animationStyles = `
    .project-card,
    .skill-item,
    .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }
    
    .project-title {
        color: #fff;
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
    }
    
    .project-links {
        display: flex;
        gap: 0.5rem;
    }
    
    .project-link {
        color: #a0a0a0;
        font-size: 1.1rem;
        transition: color 0.3s ease;
        text-decoration: none;
    }
    
    .project-link:hover {
        color: #6366f1;
    }
    
    .project-description {
        color: #c0c0c0;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
    
    .project-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .project-language {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #e0e0e0;
        font-size: 0.9rem;
    }
    
    .language-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }
    
    .project-stats {
        display: flex;
        gap: 1rem;
    }
    
    .stat {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #a0a0a0;
        font-size: 0.9rem;
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
