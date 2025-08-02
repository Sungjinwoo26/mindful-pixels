document.addEventListener('DOMContentLoaded', () => {

    // ==================== Loader Logic ====================
    const loader = document.querySelector('.loader');
    if (loader) {
        const mainContent = document.querySelector('.main-content');
        const countElement = document.getElementById('loader-count');
        const nowElement = document.getElementById('loader-now');

        if (mainContent && countElement && nowElement) {
            let currentCount = 0;
            const targetCount = 100;
            const duration = 2000;
            const interval = duration / targetCount;

            nowElement.classList.add('blinking');

            const counterInterval = setInterval(() => {
                currentCount++;
                if (currentCount > targetCount) {
                    currentCount = targetCount;
                }
                countElement.textContent = currentCount;

                if (currentCount >= targetCount) {
                    clearInterval(counterInterval);
                    nowElement.classList.remove('blinking');
                    setTimeout(() => {
                        loader.style.opacity = '0';
                        loader.style.visibility = 'hidden';
                        mainContent.style.display = 'block';
                        setTimeout(() => mainContent.style.opacity = '1', 50);
                    }, 500);
                }
            }, interval);
        }
    }

    // ==================== Navbar Logic ====================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        // This single line handles both opening and closing
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

    
     // ==================== Team Section Logic  ====================
    const teamMembers = document.querySelectorAll('.team-member');
    const teamImage = document.getElementById('team-member-image');

    if (teamMembers.length > 0 && teamImage) {
        // Set the first member as active by default on page load
        if (teamMembers[0]) {
            teamMembers[0].classList.add('active');
            teamImage.src = teamMembers[0].getAttribute('data-image');
        }

        teamMembers.forEach(member => {
            const handleInteraction = () => {
                // Don't do anything if it's already active
                if (member.classList.contains('active')) return;

                // Remove active class from all other members
                teamMembers.forEach(m => m.classList.remove('active'));
          
                // Add active class to the current member
                member.classList.add('active');
              
                // Change the image source
                const newImageSrc = member.getAttribute('data-image');
                teamImage.src = newImageSrc;
            };

            // Add listeners for both mouse hover and touch/click
            member.addEventListener('mouseenter', handleInteraction);
            member.addEventListener('click', handleInteraction);
        });
    }


    // ==================== Meditation Timer Logic ====================
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        const durationSlider = document.getElementById('duration-slider');
        const controlBtn = document.getElementById('timer-control-btn');
        const resetBtn = document.getElementById('timer-reset-btn');
        const breathingCircle = document.querySelector('.breathing-circle');
        const mainAudio = document.getElementById('meditation-audio');
        const chimeAudio = document.getElementById('chime-audio');
        let timerInterval = null;
        let totalSeconds = parseInt(durationSlider.value) * 60;
        let isPaused = false;

        const updateTimerDisplay = () => {
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        const startTimer = () => {
            breathingCircle.classList.add('animating');
            controlBtn.textContent = 'PAUSE';
            resetBtn.style.display = 'inline-block';
            durationSlider.disabled = true;
            mainAudio.play();

            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    mainAudio.pause();
                    chimeAudio.play();
                    breathingCircle.classList.remove('animating');
                    controlBtn.textContent = 'COMPLETE';
                    controlBtn.disabled = true;
                }
            }, 1000);
        };

        const pauseTimer = () => {
            clearInterval(timerInterval);
            isPaused = true;
            mainAudio.pause();
            breathingCircle.style.animationPlayState = 'paused';
            controlBtn.textContent = 'RESUME';
        };

        const resumeTimer = () => {
            isPaused = false;
            breathingCircle.style.animationPlayState = 'running';
            mainAudio.play();
            startTimer();
            controlBtn.textContent = 'PAUSE';
        };

        const resetTimer = () => {
            clearInterval(timerInterval);
            timerInterval = null;
            totalSeconds = parseInt(durationSlider.value) * 60;
            isPaused = false;
            updateTimerDisplay();
            mainAudio.pause();
            mainAudio.currentTime = 0;
            controlBtn.textContent = 'BEGIN';
            controlBtn.disabled = false;
            resetBtn.style.display = 'none';
            durationSlider.disabled = false;
            breathingCircle.classList.remove('animating');
            breathingCircle.style.animationPlayState = 'running';
        };

        durationSlider.addEventListener('input', () => {
            if (!timerInterval) {
                totalSeconds = parseInt(durationSlider.value) * 60;
                updateTimerDisplay();
            }
        });

        controlBtn.addEventListener('click', () => {
            if (controlBtn.textContent === 'BEGIN') {
                startTimer();
            } else if (controlBtn.textContent === 'PAUSE') {
                pauseTimer();
            } else if (controlBtn.textContent === 'RESUME') {
                resumeTimer();
            }
        });

        resetBtn.addEventListener('click', resetTimer);
        updateTimerDisplay();
    }

    // ==================== Contact Form AJAX Logic ====================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formStatus = document.getElementById('form-status');

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const submitButton = form.querySelector('button');

            submitButton.textContent = 'SENDING...';
            submitButton.disabled = true;
            formStatus.textContent = ''; // Clear previous status

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = "Thank you! Your message has been sent.";
                    formStatus.style.color = "#a7c957"; // Success green
                    form.reset();
                } else {
                    formStatus.textContent = "Oops! There was a problem submitting your form.";
                    formStatus.style.color = "#ff6b6b"; // Error red
                }
            } catch (error) {
                formStatus.textContent = "Something went wrong. Please try again.";
                formStatus.style.color = "#ff6b6b"; // Error red
            } finally {
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
                setTimeout(() => { formStatus.textContent = ""; }, 5000); // Clear status after 5s
            }
        });
    }


      // ==================== Digital Zen Garden Logic ====================
    const zenCanvas = document.getElementById('zen-garden-canvas');
    if (zenCanvas) {
        const ctx = zenCanvas.getContext('2d');
        const rakeBtn = document.getElementById('rake-garden-btn');
        let isRaking = false;

        // Set canvas size based on its container
        const setCanvasSize = () => {
            const container = zenCanvas.parentElement;
            zenCanvas.width = container.clientWidth;
            zenCanvas.height = container.clientWidth * 0.6; // Maintain an aspect ratio
            smoothSand(); // Redraw sand after resize
        };

        // Function to draw the base sand color
        const smoothSand = () => {
            ctx.fillStyle = '#f4f1e9';
            ctx.fillRect(0, 0, zenCanvas.width, zenCanvas.height);
        };

        // Function to draw the rake lines
        const drawRake = (x, y) => {
            if (!isRaking) return;
            
            ctx.lineWidth = 1; // Set consistent line width for all devices
            ctx.lineCap = 'round';
            
            // Draw multiple lines for a "rake" effect
            for (let i = -4; i <= 4; i += 4) {
                ctx.beginPath();
                ctx.moveTo(lastX + i, lastY + i);
                ctx.lineTo(x + i, y + i);
                // Use a darker, more visible color for the grooves
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
                ctx.stroke();
            }

            // Update last coordinates
            [lastX, lastY] = [x, y];
        };

        let lastX = 0;
        let lastY = 0;

        // Event Listeners for Mouse
        zenCanvas.addEventListener('mousedown', (e) => {
            isRaking = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });
        zenCanvas.addEventListener('mousemove', (e) => drawRake(e.offsetX, e.offsetY));
        zenCanvas.addEventListener('mouseup', () => isRaking = false);
        zenCanvas.addEventListener('mouseout', () => isRaking = false);

        // Event Listeners for Touch
        zenCanvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isRaking = true;
            const touch = e.touches[0];
            const rect = zenCanvas.getBoundingClientRect();
            [lastX, lastY] = [touch.clientX - rect.left, touch.clientY - rect.top];
        });
        zenCanvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = zenCanvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            drawRake(x, y);
        });
        zenCanvas.addEventListener('touchend', () => isRaking = false);
        zenCanvas.addEventListener('touchcancel', () => isRaking = false);


        // Rake button functionality
        rakeBtn.addEventListener('click', smoothSand);

        // Initial setup
        window.addEventListener('resize', setCanvasSize);
        setCanvasSize();
    }



});