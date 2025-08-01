document.addEventListener('DOMContentLoaded', () => {

    // ==================== Loader Logic ====================
    const loader = document.querySelector('.loader');
    const mainContent = document.querySelector('.main-content');
    const countElement = document.getElementById('loader-count');

    if (loader && mainContent && countElement) {
        let currentCount = 0;
        const targetCount = 100;
        const duration = 2000; // 2 seconds for the count
        const interval = duration / targetCount;

        const counterInterval = setInterval(() => {
            currentCount++;
            countElement.textContent = currentCount;
            if (currentCount >= targetCount) {
                clearInterval(counterInterval);
                // Finish loader animation
                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.style.visibility = 'hidden';
                    mainContent.style.display = 'block';
                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                    }, 50); // Small delay to ensure display:block is registered
                }, 500); // Wait half a second after counting finishes
            }
        }, interval);
    } else {
         // If no loader on the page, just show content
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