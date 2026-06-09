document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE COMMAND NAV TOGGLE
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mainNav.classList.toggle('show');
        });

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
       STATISTICS TICKER (LAB SCOREBOARD INTERFACE)
       ========================================================================== */
    const statsSection = document.getElementById('achievements');
    const leagueStat = document.getElementById('stat-leagues');
    const winrateStat = document.getElementById('stat-winrate');
    let animatedStats = false;

    const animateNumber = (element, targetValue, duration, suffix = '') => {
        let start = 0;
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
       LAB READOUT MATRIX INTERACTION
       ========================================================================== */
    const focusCards = document.querySelectorAll('.focus-card');
    const labConsole = document.getElementById('lab-console');
    const interestQuotes = {
        physics: ">> LINK_ESTABLISHED // TARGET: MECHANICAL REALITIES\n>> Data Stream: Analyzing subatomic kinetic behaviors and field-force vectors. Simulation running at 100% computational load.",
        math: ">> LINK_ESTABLISHED // TARGET: LOGIC & QUANT\n>> Data Stream: Fractal equation structures and vector spaces verified. Numeric strings processing perfectly across mathematical nodes.",
        computer: ">> LINK_ESTABLISHED // TARGET: AUTOMATION CODES\n>> Data Stream: Compiling binary components, testing asynchronous API logic, and debugging multi-threaded system loops.",
        gaming: ">> LINK_ESTABLISHED // TARGET: PROCEDURAL SYSTEMS\n>> Data Stream: Grid coordinate rendering initialized in Minecraft world-arrays. Reflex processing values optimization active in Blox Fruits matrix."
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