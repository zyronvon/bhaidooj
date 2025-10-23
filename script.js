// ===== DIYA ANIMATION =====
function createDiyas() {
    const container = document.getElementById('diyaContainer');
    if (!container) return;
    
    const diyaCount = window.innerWidth < 768 ? 8 : 15;
    
    for (let i = 0; i < diyaCount; i++) {
        const diya = document.createElement('div');
        diya.className = 'diya';
        diya.style.left = Math.random() * 100 + '%';
        diya.style.top = Math.random() * 100 + '%';
        diya.style.animationDelay = Math.random() * 6 + 's';
        diya.style.animationDuration = (5 + Math.random() * 3) + 's';
        container.appendChild(diya);
    }
}

// ===== SPARKLES ANIMATION =====
function createSparkles() {
    const container = document.getElementById('sparkles');
    if (!container) return;
    
    const sparkleCount = window.innerWidth < 768 ? 30 : 60;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 8 + 's';
        sparkle.style.animationDuration = (6 + Math.random() * 4) + 's';
        container.appendChild(sparkle);
    }
}

// ===== FLOATING DIYAS FOR MESSAGE PAGE =====
function createFloatingDiyas() {
    const container = document.getElementById('floatingDiyas');
    if (!container) return;
    
    const diyaEmojis = ['🪔', '✨', '💫', '⭐'];
    const count = window.innerWidth < 768 ? 8 : 12;
    
    for (let i = 0; i < count; i++) {
        const diya = document.createElement('div');
        diya.className = 'floating-diya';
        diya.textContent = diyaEmojis[Math.floor(Math.random() * diyaEmojis.length)];
        diya.style.left = Math.random() * 100 + '%';
        diya.style.animationDelay = Math.random() * 15 + 's';
        diya.style.animationDuration = (12 + Math.random() * 6) + 's';
        container.appendChild(diya);
    }
}

// ===== BOND CARD INTERACTIONS =====
function initBondCards() {
    const cards = document.querySelectorAll('.bond-card');
    const popup = document.getElementById('quotePopup');
    const quoteText = document.getElementById('quoteText');
    
    if (!cards.length || !popup) return;
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const quote = this.getAttribute('data-quote');
            quoteText.textContent = `"${quote}"`;
            popup.classList.add('show');
            
            // Create confetti effect
            createConfetti(this);
            
            // Hide popup after 3 seconds
            setTimeout(() => {
                popup.classList.remove('show');
            }, 3000);
        });
    });
}

// ===== CONFETTI EFFECT =====
function createConfetti(element) {
    const colors = ['#D4AF37', '#F4E4B0', '#FFD700', '#FFF8E7'];
    const confettiCount = 20;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        const rect = element.getBoundingClientRect();
        confetti.style.left = rect.left + rect.width / 2 + 'px';
        confetti.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0, y = 0;
        let opacity = 1;
        
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02 + 2;
            opacity -= 0.02;
            
            confetti.style.transform = `translate(${x}px, ${y}px)`;
            confetti.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        
        animate();
    }
}

// ===== TYPEWRITER EFFECT FOR MESSAGE PAGE =====
function typewriterEffect() {
    const lines = document.querySelectorAll('.message-line');
    if (!lines.length) return;
    
    // Hide all lines initially
    lines.forEach(line => line.classList.remove('show'));
    
    // Show lines one by one
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('show');
        }, index * 800); // 800ms delay between each line
    });
}

// ===== REPLAY BUTTON FOR MESSAGE PAGE =====
function initReplayButton() {
    const replayButton = document.getElementById('replayButton');
    if (!replayButton) return;
    
    replayButton.addEventListener('click', () => {
        typewriterEffect();
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        replayButton.style.position = 'relative';
        replayButton.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// ===== SMOOTH SCROLL BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    createDiyas();
    createSparkles();
    createFloatingDiyas();
    initBondCards();
    
    // Auto-start typewriter on message page
    if (document.querySelector('.message-page')) {
        setTimeout(typewriterEffect, 500);
        initReplayButton();
    }
});

// ===== RIPPLE ANIMATION FOR REPLAY BUTTON =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            width: 20px;
            height: 20px;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
