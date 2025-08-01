document.addEventListener('DOMContentLoaded', () => {

    // ==================== Loader Logic ====================
    const loader = document.querySelector('.loader');
    const mainContent = document.querySelector('.main-content');
    const countElement = document.getElementById('loader-count');
    const nowElement = document.getElementById('loader-now'); // Get the "NOW" element

    if (loader && mainContent && countElement && nowElement) {
        let currentCount = 0;
        const targetCount = 100;
        const duration = 2000;
        const interval = duration / targetCount;

        // Add blinking class to "NOW" when loading starts
        nowElement.classList.add('blinking');

        const counterInterval = setInterval(() => {
            currentCount++;
            if (currentCount > targetCount) {
                currentCount = targetCount;
            }
            countElement.textContent = currentCount;

            if (currentCount >= targetCount) {
                clearInterval(counterInterval);
                
                // Remove blinking class when loading is complete
                nowElement.classList.remove('blinking');

                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.style.visibility = 'hidden';
                    mainContent.style.display = 'block';
                    setTimeout(() => mainContent.style.opacity = '1', 50);
                }, 500);
            }
        }, interval);
    } else {
         document.querySelectorAll('.main-content').forEach(el => {
            el.style.display = 'block';
            el.style.opacity = '1';
        });
    }

  

    // ==================== Navbar Logic ====================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }


    // ==================== Team Section Logic ====================
    const teamMembers = document.querySelectorAll('.team-member');
    const teamImage = document.getElementById('team-member-image');

    if (teamMembers.length > 0 && teamImage) {
        // Set initial state
        teamMembers[0].classList.add('active');
        teamImage.src = teamMembers[0].getAttribute('data-image');

        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', () => {
                // Remove active class from all members
                teamMembers.forEach(m => m.classList.remove('active'));
                
                // Add active class to the hovered member
                member.classList.add('active');
                
                // Change the image
                const newImageSrc = member.getAttribute('data-image');
                teamImage.src = newImageSrc;
            });
        });
    }



// ==================== Meditation Timer Logic ====================
    const timerDisplay = document.getElementById('timer-display');

    // Only run this script on the meditation page
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

        // Event Listeners
        durationSlider.addEventListener('input', () => {
            totalSeconds = parseInt(durationSlider.value) * 60;
            updateTimerDisplay();
        });

        controlBtn.addEventListener('click', () => {
            if (timerInterval) { // Timer is running or paused
                if (isPaused) {
                    resumeTimer();
                } else {
                    pauseTimer();
                }
            } else { // Timer has not started
                startTimer();
            }
        });

        resetBtn.addEventListener('click', resetTimer);

        // Initial display update
        updateTimerDisplay();
    }
});