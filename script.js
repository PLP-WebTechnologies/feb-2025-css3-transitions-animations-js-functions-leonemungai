document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const animationToggle = document.getElementById('animation-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const animateBtn = document.getElementById('animate-btn');
    const animatedImage = document.getElementById('animated-image');
    const body = document.body;

    // Load preferences from localStorage
    loadPreferences();

    // Event listeners
    animationToggle.addEventListener('change', toggleAnimations);
    themeToggle.addEventListener('change', toggleTheme);
    animateBtn.addEventListener('click', triggerAnimation);

    // Load user preferences from localStorage
    function loadPreferences() {
        // Animation preference
        const animationsEnabled = localStorage.getItem('animationsEnabled');
        if (animationsEnabled !== null) {
            animationToggle.checked = animationsEnabled === 'true';
            if (!animationToggle.checked) {
                document.querySelectorAll('*').forEach(el => {
                    el.style.animation = 'none';
                });
            }
        }

        // Theme preference
        const darkModeEnabled = localStorage.getItem('darkModeEnabled');
        if (darkModeEnabled !== null) {
            themeToggle.checked = darkModeEnabled === 'true';
            if (themeToggle.checked) {
                body.classList.add('dark-mode');
            }
        }
    }

    // Toggle animations on/off
    function toggleAnimations() {
        const enabled = animationToggle.checked;
        localStorage.setItem('animationsEnabled', enabled);
        
        if (enabled) {
            animateBtn.classList.add('pulse');
        } else {
            animateBtn.classList.remove('pulse');
        }
    }

    // Toggle dark/light theme
    function toggleTheme() {
        const darkMode = themeToggle.checked;
        localStorage.setItem('darkModeEnabled', darkMode);
        
        if (darkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    // Trigger random animation
    function triggerAnimation() {
        if (!animationToggle.checked) {
            alert('Animations are currently disabled. Enable them in preferences.');
            return;
        }

        // Remove any existing animation classes
        animatedImage.classList.remove('spin', 'bounce');
        
        // Force reflow to restart animation
        void animatedImage.offsetWidth;
        
        // Choose a random animation
        const animations = ['spin', 'bounce'];
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];
        
        animatedImage.classList.add(randomAnim);
        
        // Remove animation class after it completes
        setTimeout(() => {
            animatedImage.classList.remove(randomAnim);
        }, 3000);
    }
});