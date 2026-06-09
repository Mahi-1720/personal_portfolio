document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE NAVIGATION TOGGLE
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mainNav.classList.toggle('show');
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mainNav.classList.remove('show');
            });
        });
    }

    /* ==========================================================================
       SCROLL OBSERVER FOR ACTIVE NAV LINKS
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', 
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    /* ==========================================================================
       STATISTICS TICKER (CRICKET SCOREBOARD)
       ========================================================================== */
    const statsSection = document.getElementById('achievements');
    const leagueStat = document.getElementById('stat-leagues');
    const winrateStat = document.getElementById('stat-winrate');
    let animatedStats = false;

    const animateNumber = (element, targetValue, duration, suffix = '') => {
        let start = 0;
        // Rectifies small integer math bugs to maintain fluid increment streams
        const stepTime = Math.max(Math.floor(duration / (targetValue * 2)), 15);
        
        const timer = setInterval(() => {
            start += 1;
            element.textContent = start + suffix;
            if (start >= targetValue) {
                element.textContent = targetValue + suffix;
                clearInterval(timer);
            }
        }, stepTime);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedStats) {
                animatedStats = true;
                animateNumber(leagueStat, 5, 1200);
                animateNumber(winrateStat, 86, 1500, '%');
            }
        });
    }, { threshold: 0.2 });

    if (statsSection && leagueStat && winrateStat) {
        statsObserver.observe(statsSection);
    }

    /* ==========================================================================
       INTERACTIVE SCIENCE SANDBOX (LAB CONNECTIONS)
       ========================================================================== */
    const focusCards = document.querySelectorAll('.focus-card');
    const labConsole = document.getElementById('lab-console');
    const interestQuotes = {
        physics: "🔭 Telemetry: Physics governs structural interactions, from quantum mechanics to cosmic networks. Exploring general relativity variables!",
        math: "📐 Telemetry: The Golden Ratio maps perfectly to natural frameworks. Advanced mathematics acts as the structural script of nature.",
        computer: "⚡ Telemetry: Every digital micro-architecture compiles logically through clean expressions—building software arrays parameter by parameter.",
        gaming: "📊 Telemetry: Minecraft tracks procedural grid layouts, while Blox Fruits evaluates immediate reflex processing and tactical combat metrics."
    };

    focusCards.forEach(card => {
        card.addEventListener('click', () => {
            const subject = card.getAttribute('data-subject');
            if (subject && interestQuotes[subject]) {
                const labSection = document.getElementById('ambition');
                if (labSection) {
                    labSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                        labConsole.textContent = interestQuotes[subject];
                        labConsole.classList.add('reaction-active');
                        setTimeout(() => labConsole.classList.remove('reaction-active'), 1200);
                    }, 500);
                }
            }
        });
    });

});