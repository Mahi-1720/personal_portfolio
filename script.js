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
        rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies center of viewport
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
        const stepTime = Math.abs(Math.floor(duration / targetValue));
        
        const timer = setInterval(() => {
            start += 1;
            element.textContent = start + suffix;
            if (start >= targetValue) {
                element.textContent = targetValue + suffix;
                clearInterval(timer);
            }
        }, Math.max(stepTime, 20));
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedStats) {
                animatedStats = true;
                // Animate Leagues (Target: 5)
                animateNumber(leagueStat, 5, 1200);
                // Animate Win Rate (Target: 86%)
                animateNumber(winrateStat, 86, 1500, '%');
            }
        });
    }, { threshold: 0.2 });

    if (statsSection && leagueStat && winrateStat) {
        statsObserver.observe(statsSection);
    }

    /* ==========================================================================
       INTERACTIVE SCIENCE SANDBOX (LAB REACTONS)
       ========================================================================== */
    const beakerLiquid = document.getElementById('beaker-liquid');
    const beakerBubbles = document.getElementById('beaker-bubbles');
    const flaskLiquid = document.getElementById('flask-liquid');
    const flaskBubbles = document.getElementById('flask-bubbles');
    const labConsole = document.getElementById('lab-console');
    
    const btnSodium = document.getElementById('add-sodium');
    const btnCopper = document.getElementById('add-copper');
    const btnHeat = document.getElementById('heat-reaction');
    const btnReset = document.getElementById('reset-lab');

    // Helper to generate bubble particles
    const generateParticles = (containerElement, count, sizeRange, color = 'rgba(255,255,255,0.4)') => {
        containerElement.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const span = document.createElement('span');
            const size = Math.floor(Math.random() * (sizeRange[1] - sizeRange[0])) + sizeRange[0];
            const left = Math.random() * 85; // percentage
            const delay = Math.random() * 2; // seconds
            const duration = Math.random() * 1.5 + 1; // seconds

            span.style.width = `${size}px`;
            span.style.height = `${size}px`;
            span.style.left = `${left}%`;
            span.style.animationDelay = `${delay}s`;
            span.style.animationDuration = `${duration}s`;
            span.style.backgroundColor = color;
            
            containerElement.appendChild(span);
        }
    };

    // Lab State Logic
    if (btnSodium) {
        btnSodium.addEventListener('click', () => {
            // Beaker reaction
            beakerLiquid.style.height = '65%';
            beakerLiquid.style.backgroundColor = 'rgba(245, 197, 24, 0.85)'; // Yellow sodium flame color
            generateParticles(beakerBubbles, 25, [4, 9], 'rgba(255, 255, 255, 0.7)');
            
            labConsole.textContent = "💥 Added Sodium (Na) to water: High energetic reaction! Solution is alkaline. H₂ gas released!";
            labConsole.classList.add('reaction-active');
            setTimeout(() => labConsole.classList.remove('reaction-active'), 1000);
        });
    }

    if (btnCopper) {
        btnCopper.addEventListener('click', () => {
            // Beaker reaction
            beakerLiquid.style.height = '50%';
            beakerLiquid.style.backgroundColor = 'rgba(0, 150, 57, 0.85)'; // Greenish copper color
            generateParticles(beakerBubbles, 12, [3, 7], 'rgba(0, 245, 255, 0.4)');
            
            labConsole.textContent = "🟢 Added Copper (Cu) crystals: Solution turned gorgeous malachite green-blue.";
            labConsole.classList.add('reaction-active');
            setTimeout(() => labConsole.classList.remove('reaction-active'), 1000);
        });
    }

    if (btnHeat) {
        btnHeat.addEventListener('click', () => {
            // Flask reaction
            flaskLiquid.style.height = '70%';
            flaskLiquid.style.backgroundColor = 'rgba(230, 0, 18, 0.9)'; // Deep boil red
            generateParticles(flaskBubbles, 35, [5, 10], 'rgba(255, 240, 200, 0.6)');
            
            labConsole.textContent = "🔥 Heating the Conical Flask! Thermal expansion initiated. Phase transition from liquid to gas.";
            labConsole.classList.add('reaction-active');
            setTimeout(() => labConsole.classList.remove('reaction-active'), 1000);
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            // Reset beaker
            beakerLiquid.style.height = '40%';
            beakerLiquid.style.backgroundColor = 'rgba(0, 85, 165, 0.7)';
            beakerBubbles.innerHTML = '';
            
            // Reset flask
            flaskLiquid.style.height = '35%';
            flaskLiquid.style.backgroundColor = 'rgba(230, 0, 18, 0.7)';
            flaskBubbles.innerHTML = '';
            
            labConsole.textContent = "🔄 Lab equipment sterilized. System cooled down. Ready for new trials.";
        });
    }

    /* ==========================================================================
       COPY EMAIL INTERACTION
       ========================================================================== */
    const emailBtn = document.getElementById('btn-copy-email');
    const copyTooltip = document.getElementById('copy-tooltip');

    if (emailBtn && copyTooltip) {
        emailBtn.addEventListener('click', () => {
            const email = 'mohan.official@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                copyTooltip.textContent = 'Copied! ✅';
                emailBtn.style.borderColor = 'var(--lego-green)';
                setTimeout(() => {
                    copyTooltip.textContent = 'Copy';
                    emailBtn.style.borderColor = 'var(--dark-neutral)';
                }, 2000);
            }).catch(err => {
                console.error('Could not copy email: ', err);
            });
        });
    }

    /* ==========================================================================
       FOCUS AREA TRIVIA HINTS (CURIOSITY POP-UP)
       ========================================================================== */
    const focusCards = document.querySelectorAll('.focus-card');
    const interestQuotes = {
        physics: "🔭 Fact: Physics governs everything, from tiny subatomic particles to huge galaxy clusters. I love studying relativity!",
        math: "📐 Fact: The Golden Ratio occurs naturally in flowers, shells, and hurricanes. Mathematics is the code of nature!",
        computer: "⚡ Fact: Every piece of software is built brick by brick with logical instructions, just like programming a Lego robot!",
        gaming: "⚔️ Fact: Minecraft lets you build anything block-by-block (just like Lego), while Blox Fruits tests your combat and strategy skills!"
    };

    focusCards.forEach(card => {
        card.addEventListener('click', () => {
            const subject = card.getAttribute('data-subject');
            if (subject && interestQuotes[subject]) {
                // Let's print this cleanly in the labConsole to connect components
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
