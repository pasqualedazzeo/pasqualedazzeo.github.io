document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Navbar color change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
    });

    // Animate skill bars on scroll
    const skillSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    let animated = false;

    window.addEventListener('scroll', function() {
        if (isInViewport(skillSection) && !animated) {
            progressBars.forEach(bar => {
                const width = bar.getAttribute('style').match(/\d+/)[0];
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 100);
            });
            animated = true;
        }
    });

    // Helper function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Typing effect for the header
    const phrases = ["AI Engineer", "Machine Learning Enthusiast", "Problem Solver"];
    let i = 0;
    let j = 0;
    let currentPhrase = [];
    let isDeleting = false;
    let isEnd = false;

    function loop() {
        isEnd = false;
        document.querySelector(".lead").innerHTML = currentPhrase.join('');

        if (i < phrases.length) {
            if (!isDeleting && j <= phrases[i].length + 1) {
                currentPhrase.push(phrases[i][j]);
                j++;
            }

            if (isDeleting && j <= phrases[i].length + 1) {
                currentPhrase.pop(phrases[i][j]);
                j--;
            }

            if (j == phrases[i].length + 1) {
                isEnd = true;
                isDeleting = true;
            }

            if (isDeleting && j === 0) {
                currentPhrase = [];
                isDeleting = false;
                i++;
                if (i == phrases.length) {
                    i = 0;
                }
            }
        }
        const spedUp = Math.random() * (80 -50) + 50;
        const normalSpeed = Math.random() * (300 - 200) + 200;
        const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed;
        setTimeout(loop, time);
    }

    loop();
});