// Main Application Logic

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');

    initializeApp();
});

function initializeApp() {
    // Initialize menu toggle
    setupMobileMenu();

    // Initialize smooth scrolling
    setupSmoothScrolling();

    // Initialize CTA buttons
    setupCTAButtons();

    // Initialize haptic feedback on buttons
    setupHapticFeedback();

    // Initialize binary background animation
    setupBinaryBackground();

    console.log('App initialized');
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Haptic feedback
            if (window.TelegramWebApp) {
                window.TelegramWebApp.hapticFeedback('light');
            }
        });

        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Haptic feedback
                if (window.TelegramWebApp) {
                    window.TelegramWebApp.hapticFeedback('light');
                }
            }
        });
    });
}

// CTA Buttons
function setupCTAButtons() {
    const ctaButton = document.getElementById('ctaButton');
    const contactButton = document.getElementById('contactButton');

    if (ctaButton) {
        ctaButton.addEventListener('click', handleCTAClick);
    }

    if (contactButton) {
        contactButton.addEventListener('click', handleContactClick);
    }
}

function handleCTAClick() {
    console.log('CTA button clicked');

    // Haptic feedback
    if (window.TelegramWebApp) {
        window.TelegramWebApp.hapticFeedback('medium');

        // Show popup or send data to bot
        window.TelegramWebApp.showPopup({
            title: 'Узнать больше',
            message: 'Хотите узнать подробнее о наших услугах?',
            buttons: [
                {
                    id: 'contact',
                    type: 'default',
                    text: 'Связаться'
                },
                {
                    id: 'services',
                    type: 'default',
                    text: 'Услуги'
                },
                {
                    id: 'cancel',
                    type: 'cancel'
                }
            ]
        }, (buttonId) => {
            if (buttonId === 'contact') {
                handleContactClick();
            } else if (buttonId === 'services') {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    } else {
        // Fallback for testing outside Telegram
        alert('Узнать больше о наших услугах');
    }
}

function handleContactClick() {
    console.log('Contact button clicked');

    // Haptic feedback
    if (window.TelegramWebApp) {
        window.TelegramWebApp.hapticFeedback('medium');

        // Send data back to bot
        window.TelegramWebApp.sendDataToBot({
            action: 'contact_request',
            timestamp: new Date().toISOString(),
            user: window.TelegramWebApp.user
        });

        // Show confirmation
        window.TelegramWebApp.showAlert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    } else {
        // Fallback for testing outside Telegram
        alert('Спасибо за интерес! Мы свяжемся с вами.');
    }
}

// Haptic Feedback on all buttons
function setupHapticFeedback() {
    const buttons = document.querySelectorAll('button, .btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (window.TelegramWebApp) {
                window.TelegramWebApp.hapticFeedback('light');
            }
        });
    });
}

// Binary Background Animation
function setupBinaryBackground() {
    const background = document.getElementById('binaryBackground');

    if (!background) return;

    const numbers = background.querySelectorAll('.hero__bg-number');

    // Function to randomly flip a number
    function flipRandomNumber() {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const number = numbers[randomIndex];
        const currentValue = number.textContent;

        // Toggle between 0 and 1
        number.textContent = currentValue === '1' ? '0' : '1';
    }

    // Flip numbers at random intervals
    setInterval(() => {
        // Flip 1-3 random numbers each time
        const flipsCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < flipsCount; i++) {
            flipRandomNumber();
        }
    }, 800); // Every 800ms
}

// Track user interactions (for analytics)
function trackEvent(eventName, eventData = {}) {
    console.log('Event:', eventName, eventData);

    // Send analytics to bot if needed
    if (window.TelegramWebApp) {
        window.TelegramWebApp.sendDataToBot({
            type: 'analytics',
            event: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        });
    }
}

// Export functions for external use
window.App = {
    trackEvent
};