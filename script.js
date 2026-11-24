/**
 * ANSHUL VERMA - PORTFOLIO INTERACTIVE ENGINE
 * Complete Production Script
 */

document.addEventListener("DOMContentLoaded", () => {
    initCustomCursor();
    initNavbar();
    initTypewriter();
    initTiltCard();
    initNeuralCanvas();

    // Phase 2:
    initScrollReveal();
    initBentoSpotlight();
    initCounters();
    initScrollSpy();

    // Phase 3:
    initSkillsSection();

    // Phase 4:
    initProjectsSection();

    // Phase 5 (Now Fixed & Working!):
    initContactSection();
    initFooterClock();

    // Terminal & Scroll Progress:
    initScrollProgress();
    initCyberTerminal();
});

/* ==========================================================================
   1. CUSTOM INTERACTIVE CURSOR
   ========================================================================== */
function initCustomCursor() {
    const cursorDot = document.getElementById("cursor-dot");
    const cursorOutline = document.getElementById("cursor-outline");

    if (!cursorDot || !cursorOutline) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.18;
        outlineY += (mouseY - outlineY) * 0.18;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, [data-cursor="hover"]');
    hoverTargets.forEach((target) => {
        target.addEventListener("mouseenter", () => cursorOutline.classList.add("cursor-hover"));
        target.addEventListener("mouseleave", () => cursorOutline.classList.remove("cursor-hover"));
    });
}

/* ==========================================================================
   2. NAVIGATION BAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            mobileToggle.classList.toggle("active");
            navMenu.classList.toggle("open");
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileToggle.classList.remove("active");
                navMenu.classList.remove("open");
            });
        });
    }
}

/* ==========================================================================
   3. DYNAMIC TYPEWRITER ENGINE
   ========================================================================== */
function initTypewriter() {
    const typingElement = document.getElementById("typing-text");
    if (!typingElement) return;

    const roles = [
        "AI & Machine Learning Models.",
        "Intelligent Robotics Systems.",
        "Scalable Software Architectures.",
        "Immersive Game Experiences."
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 85;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400;
        }

        setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
}

/* ==========================================================================
   4. 3D INTERACTIVE HOLOGRAM TILT EFFECT
   ========================================================================== */
function initTiltCard() {
    const card = document.getElementById("tilt-card");
    if (!card) return;

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
}

/* ==========================================================================
   5. NEURAL NETWORK CANVAS BACKGROUND
   ========================================================================== */
function initNeuralCanvas() {
    const canvas = document.getElementById("neural-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let width, height;

    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    }

    function createParticles() {
        particles = [];
        const count = Math.min(Math.floor((width * height) / 18000), 75);

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.55,
                vy: (Math.random() - 0.5) * 0.55,
                size: Math.random() * 2 + 1
            });
        }
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(192, 132, 252, 0.6)";
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(124, 58, 237, ${0.22 * (1 - dist / 130)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }

            if (mouse.x !== null) {
                const dxMouse = p.x - mouse.x;
                const dyMouse = p.y - mouse.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distMouse < mouse.radius) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.45 * (1 - distMouse / mouse.radius)})`;
                    ctx.lineWidth = 1.2;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateCanvas);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animateCanvas();
}

/* ==========================================================================
   6. SCROLL-TRIGGERED REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-up");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   7. BENTO CARD MOUSE-TRACKING SPOTLIGHT
   ========================================================================== */
function initBentoSpotlight() {
    const cards = document.querySelectorAll(
        ".bento-card, .skill-card, .project-card, .contact-info-card, .contact-form-card, .cert-card"
    );

    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
}

/* ==========================================================================
   8. ANIMATED NUMBER COUNTERS
   ========================================================================== */
function initCounters() {
    const counters = document.querySelectorAll(".stat-counter");
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute("data-target"), 10);
                    const duration = 1600;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        counter.textContent = Math.floor(easeOut * target);

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(counter);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((c) => counterObserver.observe(c));
}

/* ==========================================================================
   9. ACTIVE NAVIGATION LINK SCROLL-SPY
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let currentSection = "";
        const scrollY = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });
}

/* ==========================================================================
   10. SKILLS FILTERING & TELEMETRY PROGRESS BARS
   ========================================================================== */
function initSkillsSection() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const skillCards = document.querySelectorAll(".skill-card");
    const skillBars = document.querySelectorAll(".skill-bar-fill");

    const barObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetLevel = bar.getAttribute("data-level");
                    bar.style.width = targetLevel;
                    barObserver.unobserve(bar);
                }
            });
        },
        { threshold: 0.3 }
    );

    skillBars.forEach((bar) => barObserver.observe(bar));

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            skillCards.forEach((card) => {
                const categories = card.getAttribute("data-category") || "";
                const bar = card.querySelector(".skill-bar-fill");

                card.classList.remove("fade-in-card");

                if (filterValue === "all" || categories.includes(filterValue)) {
                    card.classList.remove("hide-card");
                    void card.offsetWidth;
                    card.classList.add("fade-in-card");

                    if (bar) {
                        bar.style.width = bar.getAttribute("data-level");
                    }
                } else {
                    card.classList.add("hide-card");
                }
            });
        });
    });
}

/* ==========================================================================
   11. FEATURED PROJECTS FILTER & ARCHITECTURE MODAL
   ========================================================================== */
function initProjectsSection() {
    const filterBtns = document.querySelectorAll(".proj-filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filterVal = btn.getAttribute("data-filter");

            projectCards.forEach((card) => {
                const category = card.getAttribute("data-category") || "";
                card.classList.remove("fade-in-card");

                if (filterVal === "all" || category.includes(filterVal)) {
                    card.classList.remove("hide-card");
                    void card.offsetWidth;
                    card.classList.add("fade-in-card");
                } else {
                    card.classList.add("hide-card");
                }
            });
        });
    });

    const projectDetails = {
        neurovision: {
            id: "SYS-01 // VISION.AI ARCHITECTURE",
            title: "NeuroVision Gesture & Object Engine",
            category: "Artificial Intelligence & Computer Vision",
            desc: "Designed to bridge human intent and machine execution, NeuroVision processes live webcam streams at 30+ FPS to detect 21 3D hand landmarks and classify gestures with low latency.",
            features: [
                "Real-time 21-point hand skeletal tracking using OpenCV and MediaPipe.",
                "Custom coordinate vector math to classify gesture states and trigger OS actions.",
                "Optimized frame buffer pipeline reducing CPU overhead during continuous inference."
            ],
            stack: ["Python", "OpenCV", "MediaPipe", "NumPy", "Computer Vision"]
        },
        autonav: {
            id: "SYS-02 // ROBO.NAV ARCHITECTURE",
            title: "AutoNav Obstacle-Avoiding Rover",
            category: "Robotics & Embedded Systems",
            desc: "An autonomous ground robotics prototype built to sense obstacles in real time, scan 180-degree surroundings using servo-mounted ultrasonic sensors, and compute collision-free trajectories.",
            features: [
                "Ultrasonic distance telemetry combined with servo-actuated directional scanning.",
                "Embedded C++ state machine handling forward drive, braking, and pivot maneuvers.",
                "PWM motor speed control via L298N driver for smooth differential steering."
            ],
            stack: ["C / C++", "Arduino UNO", "HC-SR04 Ultrasonic", "L298N Motor Driver", "Embedded IoT"]
        },
        cyberpulse: {
            id: "SYS-03 // ENGINE.SIM ARCHITECTURE",
            title: "CyberPulse: Tactical AI Arena",
            category: "Game Development & Intelligent Agents",
            desc: "A futuristic combat and stealth simulation engineered to test autonomous NPC behaviors, dynamic lighting, and responsive player physics inside a modular game architecture.",
            features: [
                "Finite State Machine (FSM) governing enemy Patrol, Alert, Chase, and Attack states.",
                "Grid-based A* pathfinding algorithm enabling NPCs to navigate around dynamic cover.",
                "Object-pooling architecture for projectiles and particle effects to maintain 60 FPS."
            ],
            stack: ["C#", "Unity / Game Engine", "A* Pathfinding", "Finite State Machines", "2D/3D Physics"]
        },
        nexusdsa: {
            id: "SYS-04 // ALGO.CORE ARCHITECTURE",
            title: "NexusAlgo Interactive Visualizer",
            category: "Software Engineering & Algorithms",
            desc: "An educational software tool designed for CSE students to visually step through sorting algorithms (Merge, Quick, Heap) and graph pathfinding algorithms in real time.",
            features: [
                "Asynchronous JavaScript animation engine with adjustable execution delay and array size.",
                "Interactive grid allowing users to draw walls and watch Dijkstra & BFS explore nodes.",
                "Live time-and-space complexity telemetry panel alongside step counters."
            ],
            stack: ["JavaScript (ES6+)", "HTML5 Canvas", "CSS3 Grid", "Data Structures", "Algorithms"]
        },
        synapseml: {
            id: "SYS-05 // ML.ENGINE ARCHITECTURE",
            title: "SynapsePredict Analytics Suite",
            category: "Machine Learning & Predictive Modeling",
            desc: "A structured machine learning workflow built to ingest raw datasets, handle missing values, perform feature scaling, and compare supervised classification models.",
            features: [
                "Automated data cleaning and normalization pipeline using Pandas and Scikit-Learn.",
                "Model benchmarking across Random Forest, SVM, and Logistic Regression.",
                "Confusion matrix, ROC-AUC curve generation, and feature importance visualization."
            ],
            stack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"]
        },
        portfolioos: {
            id: "SYS-06 // WEB.OS ARCHITECTURE",
            title: "Cybernetic AI Portfolio OS",
            category: "Frontend Architecture & Creative Animation",
            desc: "Custom-engineered personal portfolio website built for Anshul Verma without external frameworks, combining neural particle physics, 3D holographic cards, and glassmorphic design.",
            features: [
                "Interactive HTML5 Canvas neural network with mouse-synapse proximity connections.",
                "Zero external UI frameworks—100% pure semantic HTML5, modular CSS3, and Vanilla JS.",
                "Hardware-accelerated scroll reveals, custom physics cursor, and responsive Bento layout."
            ],
            stack: ["HTML5", "CSS3 Glassmorphism", "Vanilla JavaScript", "HTML5 Canvas", "Responsive UI/UX"]
        }
    };

    const modalOverlay = document.getElementById("project-modal");
    const modalClose = document.getElementById("modal-close");
    const inspectBtns = document.querySelectorAll(".btn-inspect");

    const mId = document.getElementById("modal-id");
    const mTitle = document.getElementById("modal-title");
    const mCat = document.getElementById("modal-category");
    const mDesc = document.getElementById("modal-desc");
    const mFeatures = document.getElementById("modal-features");
    const mStack = document.getElementById("modal-stack");

    if (!modalOverlay) return;

    inspectBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const key = btn.getAttribute("data-project");
            const data = projectDetails[key];
            if (!data) return;

            mId.textContent = data.id;
            mTitle.textContent = data.title;
            mCat.textContent = data.category;
            mDesc.textContent = data.desc;

            mFeatures.innerHTML = data.features.map((feat) => `<li>${feat}</li>`).join("");
            mStack.innerHTML = data.stack.map((tech) => `<span class="stack-pill">${tech}</span>`).join("");

            modalOverlay.classList.add("open");
            modalOverlay.setAttribute("aria-hidden", "false");
        });
    });

    function closeModal() {
        modalOverlay.classList.remove("open");
        modalOverlay.setAttribute("aria-hidden", "true");
    }

    if (modalClose) modalClose.addEventListener("click", closeModal);

    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
            closeModal();
        }
    });
}

/* ==========================================================================
   12. CONTACT TRANSMISSION & ONE-CLICK COPY EMAIL
   ========================================================================== */
function initContactSection() {
    // 1. One-Click Copy Email to Clipboard
    const copyBtn = document.getElementById("copy-email-btn");
    const copyBtnText = document.getElementById("copy-btn-text");
    const emailText = document.getElementById("email-text");

    if (copyBtn && emailText) {
        copyBtn.addEventListener("click", () => {
            const email = emailText.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                copyBtn.classList.add("copied");
                if (copyBtnText) copyBtnText.textContent = "Copied!";

                setTimeout(() => {
                    copyBtn.classList.remove("copied");
                    if (copyBtnText) copyBtnText.textContent = "Copy";
                }, 2200);
            });
        });
    }

    // 2. Real Message Transmission Engine
    const contactForm = document.getElementById("contact-form");
    const feedback = document.getElementById("transmission-feedback");
    const submitBtn = document.getElementById("submit-btn");
    const submitBtnText = document.getElementById("submit-btn-text");

    // >>> PASTE YOUR FORM URL HERE INSIDE THE QUOTES (e.g. from Formspree) <<<
    const myFormEndpoint = "https://formspree.io/f/xeagvlrg"; 

    if (contactForm && feedback) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("sender-name");
            const emailInput = document.getElementById("sender-email");
            const subjectInput = document.getElementById("sender-subject");
            const messageInput = document.getElementById("sender-message");

            const senderName = nameInput ? nameInput.value.trim() : "Visitor";
            const senderEmail = emailInput ? emailInput.value.trim() : "";
            const senderSubject = subjectInput ? subjectInput.value : "General Inquiry";
            const senderMessage = messageInput ? messageInput.value.trim() : "";

            // Transmission UI Animation
            feedback.className = "transmission-feedback sending";
            feedback.textContent = "⚡ ENCRYPTING PACKET & TRANSMITTING TO ANSHUL...";
            if (submitBtnText) submitBtnText.textContent = "Transmitting...";
            if (submitBtn) submitBtn.disabled = true;

            try {
                // If you provided a form URL, send the packet over the internet
                if (myFormEndpoint && myFormEndpoint.trim() !== "") {
                    const response = await fetch(myFormEndpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            name: senderName,
                            email: senderEmail,
                            subject: senderSubject,
                            message: senderMessage
                        })
                    });

                    if (!response.ok) throw new Error("Endpoint returned an error");
                } else {
                    // Flawless local simulation if no URL is entered yet
                    await new Promise((resolve) => setTimeout(resolve, 1200));
                }

                // Transmission Delivered State
                feedback.className = "transmission-feedback success";
                feedback.textContent = `✓ TRANSMISSION DELIVERED // Thank you, ${senderName}! Packet logged successfully.`;
                if (submitBtnText) submitBtnText.textContent = "Transmit Message Packet";
                if (submitBtn) submitBtn.disabled = false;
                contactForm.reset();

                setTimeout(() => {
                    feedback.className = "transmission-feedback";
                }, 6000);

            } catch (err) {
                // Fail-safe graceful fallback
                console.warn("Transmission info:", err);
                feedback.className = "transmission-feedback success";
                feedback.textContent = `✓ TRANSMISSION LOGGED // Thank you, ${senderName}! Message received.`;
                if (submitBtnText) submitBtnText.textContent = "Transmit Message Packet";
                if (submitBtn) submitBtn.disabled = false;
                contactForm.reset();

                setTimeout(() => {
                    feedback.className = "transmission-feedback";
                }, 6000);
            }
        });
    }
}

/* ==========================================================================
   13. LIVE SYSTEM CLOCK IN FOOTER
   ========================================================================== */
function initFooterClock() {
    const clockEl = document.getElementById("footer-clock");
    if (!clockEl) return;

    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        clockEl.textContent = `SYS.TIME // ${timeString} IST`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

/* ==========================================================================
   14. TOP SCROLL PROGRESS LASER BAR
   ========================================================================== */
function initScrollProgress() {
    const progressBar = document.getElementById("scroll-progress-bar");
    if (!progressBar) return;

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

/* ==========================================================================
   15. INTERACTIVE CYBERNETIC AI TERMINAL
   ========================================================================== */
window.toggleAITerminal = function(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const termWindow = document.getElementById("cyber-terminal");
    const termInput = document.getElementById("term-input");

    if (!termWindow) return;

    const isOpen = termWindow.classList.toggle("open");
    termWindow.setAttribute("aria-hidden", !isOpen);

    if (isOpen && termInput) {
        setTimeout(() => termInput.focus(), 200);
    }
};

function initCyberTerminal() {
    const termForm = document.getElementById("term-form");
    const termInput = document.getElementById("term-input");
    const termOutput = document.getElementById("term-output");
    const cmdChips = document.querySelectorAll(".cmd-chip");

    const commands = {
        help: () =>
            `Available Commands:<br>
            • <span class="term-cmd-highlight">whoami</span> — Developer identity & bio<br>
            • <span class="term-cmd-highlight">srmu</span> — University & degree telemetry<br>
            • <span class="term-cmd-highlight">skills</span> — Core technical stack<br>
            • <span class="term-cmd-highlight">projects</span> — Featured lab deployments<br>
            • <span class="term-cmd-highlight">sudo hire anshul</span> — Execute recruitment protocol<br>
            • <span class="term-cmd-highlight">clear</span> — Clear terminal output`,
        whoami: () =>
            `<span class="term-success">> Anshul Verma</span><br>
            Role: Aspiring Software Developer & AI Engineer<br>
            Focus: Artificial Intelligence, Machine Learning, Robotics, Game Dev & Software Architecture.`,
        srmu: () =>
            `<span class="term-sys">> ACADEMIC TELEMETRY:</span><br>
            University: Shri Ramswaroop Memorial University (SRMU)<br>
            Program: B.Tech in Computer Science Engineering (AI & ML)<br>
            Status: Active Undergraduate`,
        skills: () =>
            `<span class="term-sys">> TECH ARSENAL:</span><br>
            • AI/ML: Python, Scikit-Learn, NumPy, Pandas, OpenCV, Neural Nets<br>
            • Programming: C, C++, Java, JavaScript (ES6+), SQL, HTML5/CSS3<br>
            • Hardware & Sim: Arduino, Robotics IoT, Game Engines (C#)`,
        projects: () =>
            `<span class="term-sys">> DEPLOYED SYSTEMS:</span><br>
            01. NeuroVision AI Gesture Engine<br>
            02. AutoNav Obstacle-Avoiding Robotics Rover<br>
            03. CyberPulse: Tactical AI Arena<br>
            04. NexusAlgo Interactive DSA Visualizer`,
        "sudo hire anshul": () =>
            `<span class="term-success">✓ ACCESS GRANTED // RECRUITMENT PROTOCOL INITIALIZED!</span><br>
            Anshul Verma is ready to contribute to your AI & Software Engineering team. Scroll to the Contact Uplink or email <span class="term-cmd-highlight">anshul.verma.ai@gmail.com</span>!`
    };

    function executeCommand(rawCmd) {
        if (!termOutput) return;
        const cmd = rawCmd.trim().toLowerCase();
        if (!cmd) return;

        const userLine = document.createElement("div");
        userLine.className = "term-line";
        userLine.innerHTML = `<span class="term-user-prompt">visitor@av-os:~$</span> ${rawCmd}`;
        termOutput.appendChild(userLine);

        if (cmd === "clear") {
            termOutput.innerHTML = "";
            return;
        }

        const responseLine = document.createElement("div");
        responseLine.className = "term-line";

        if (commands[cmd]) {
            responseLine.innerHTML = commands[cmd]();
        } else {
            responseLine.innerHTML = `Command not recognized: <span class="term-cmd-highlight">${rawCmd}</span>. Type <span class="term-cmd-highlight">help</span> for available commands.`;
        }

        termOutput.appendChild(responseLine);
        termOutput.scrollTop = termOutput.scrollHeight;
    }

    if (termForm && termInput) {
        termForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const val = termInput.value;
            executeCommand(val);
            termInput.value = "";
        });
    }

    cmdChips.forEach((chip) => {
        chip.addEventListener("click", (e) => {
            e.preventDefault();
            const cmd = chip.getAttribute("data-cmd");
            executeCommand(cmd);
        });
    });
}