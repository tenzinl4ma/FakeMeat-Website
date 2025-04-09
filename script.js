document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initParallaxEffect();
    initTestimonialSlider();
    initStatCounters();
    initProductCards();
    initScrollAnimation();
    initContactForm();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links ul li a');

    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Parallax scrolling effect
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        document.querySelectorAll('.hero, .sustainability').forEach(element => {
            let distance = window.pageYOffset - element.offsetTop;
            if (distance < window.innerHeight && distance > -window.innerHeight) {
                element.style.backgroundPositionY = `${-distance * 0.5}px`;
            }
        });
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));
        slides[n].style.display = 'block';
        dots[n].classList.add('active');
    }

    showSlide(currentSlide);
    
    nextBtn.addEventListener('click', () => showSlide((currentSlide = (currentSlide + 1) % slides.length)));
    prevBtn.addEventListener('click', () => showSlide((currentSlide = (currentSlide - 1 + slides.length) % slides.length)));
    dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(currentSlide = index)));
    setInterval(() => showSlide((currentSlide = (currentSlide + 1) % slides.length)), 5000);
}

// Stat counters animation
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const section = document.querySelector('.sustainability');
    let counted = false;

    if (!section) {
        console.warn("'.sustainability' section not found!");
        return;
    }

    function startCounting() {
        if (counted) return;
        console.log("✅ Stat counter triggered!");
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let count = 0;
            const increment = Math.ceil(target / 100);
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = count;
                }
            }, 20);
        });
        counted = true;
    }

    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    window.addEventListener('scroll', function () {
        if (isInViewport(section)) {
            startCounting();
        }
    });

    // Edge case: already in view
    if (isInViewport(section)) {
        startCounting();
    }
}

// Product card modal
function initProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.querySelector('.product-btn').addEventListener('click', function() {
            createProductModal(
                card.querySelector('h3').textContent,
                card.querySelector('p').textContent,
                card.querySelector('.product-nutrition').textContent,
                card.querySelector('.product-price').textContent,
                card.querySelector('img').src
            );
        });
    });
}

function createProductModal(name, desc, nutrition, price, image) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-image"><img src="${image}" alt="${name}"></div>
            <div class="modal-info">
                <h2>${name}</h2>
                <p>${desc}</p>
                <div class="modal-details">
                    <div class="modal-nutrition"><h3>Nutrition</h3><p>${nutrition}</p></div>
                    <div class="modal-price"><h3>Price</h3><p>${price}</p></div>
                </div>
                <button class="btn primary-btn">Add to Cart</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => e.target === modal && modal.remove());
}

// Scroll animations
function initScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    function checkScroll() {
        elements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight * 0.8) {
                element.classList.add('animate');
            }
        });
    }
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
}

// Contact form validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            showFormMessage('Please fill in all required fields', 'error');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFormMessage('Invalid email address', 'error');
            return;
        }
        
        contactForm.querySelector('button[type="submit"]').textContent = 'Sending...';
        setTimeout(() => {
            contactForm.reset();
            contactForm.querySelector('button[type="submit"]').textContent = 'Send Message';
            showFormMessage('Your message has been sent successfully!', 'success');
        }, 1500);
    });
}

function showFormMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    document.getElementById('contactForm').appendChild(messageElement);
    setTimeout(() => messageElement.remove(), 5000);
}
// Parallax Effect for the Team Section Background
document.addEventListener('scroll', function () {
    const teamSection = document.querySelector('.team-section');
    const rect = teamSection.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrollY = window.scrollY || window.pageYOffset;
        teamSection.style.backgroundPositionY = `${-scrollY * 0.5}px`;
    }
});