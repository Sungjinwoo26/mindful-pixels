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
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // ==================== Team Section Logic ====================
    const teamMembers = document.querySelectorAll('.team-member');
    const teamImage = document.getElementById('team-member-image');

    if (teamMembers.length > 0 && teamImage) {
        if (teamMembers[0]) {
            teamMembers[0].classList.add('active');
            teamImage.src = teamMembers[0].getAttribute('data-image');
        }
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', () => {
                teamMembers.forEach(m => m.classList.remove('active'));
                member.classList.add('active');
                const newImageSrc = member.getAttribute('data-image');
                teamImage.src = newImageSrc;
            });
        });
    }

<<<<<<< HEAD
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
=======
});

    //    <------------Imagegrid-------------->
document.addEventListener('DOMContentLoaded', () => {
    // Select all the elements needed for the slider
    const navDots = document.querySelectorAll('.slider-nav .dot');
    const gridItems = document.querySelectorAll('.product-grid .grid-item');

    // Function to change the slide
    function showSlide(slideIndex) {
        // Update the active state of the navigation dots
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });

        // Loop through each grid item and update its slides
        gridItems.forEach(item => {
            const slides = item.querySelectorAll('.slide-content');
            if (slides.length > 0) {
                slides.forEach((slide, index) => {
                    // Make sure the slide exists before toggling class
                    if(slides[slideIndex]) {
                       slide.classList.toggle('active', index === slideIndex);
                    }
                });
>>>>>>> 8c96ea4 (image grid)
            }
        });
    }

<<<<<<< HEAD
});
=======
    // Add click event listeners to each navigation dot
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Initialize the slider to the first slide
    showSlide(0);
});
// Animate grid-items when they enter the viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-visible');
      observer.unobserve(entry.target); // Animate only once
    }
  });
}, {
  threshold: 0.1,
});

document.querySelectorAll('.grid-item').forEach(item => {
  observer.observe(item);
});
>>>>>>> 8c96ea4 (image grid)
