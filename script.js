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

});