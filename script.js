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
       SCROLL OBSERVER FOR ACTIVE NAV LINKS & ENTRANCE REVEAL
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
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

    // Content entry fade elements setup
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    scrollRevealElements.forEach(el => {
        revealObserver.observe(el);
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
    const quoteBox = labConsole ? labConsole.closest('.quote-box') : null;
    
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
                        if (quoteBox) {
                            quoteBox.classList.add('reaction-pulsing');
                            setTimeout(() => quoteBox.classList.remove('reaction-pulsing'), 500);
                        }
                    }, 500);
                }
            }
        });
    });

    /* ==========================================================================
       6-SECOND RECURRING AUTOMATIC SYSTEM GLITCH LOOP
       ========================================================================== */
    const runGlobalGlitchSequence = () => {
        document.body.classList.add('global-glitch-active');
        
        // Temporarily mutate terminal console readout to signal anomalies
        const originalConsoleValue = labConsole ? labConsole.textContent : '';
        if (labConsole) {
            labConsole.textContent = ">> WARNING: ENVIRONMENTAL INTERFERENCE DETECTED.\n>> Realignment vectors fluctuating. Matrix stabilization routine initiated...";
            labConsole.style.color = 'var(--accent-red)';
        }

        // Clean up glitch trace states asynchronously after execution duration finishes
        setTimeout(() => {
            document.body.classList.remove('global-glitch-active');
            if (labConsole) {
                labConsole.textContent = originalConsoleValue;
                labConsole.style.color = '';
            }
        }, 450);
    };

    // Initialize infinite timer stack running precisely every 6000ms
    setInterval(runGlobalGlitchSequence, 6000);

});