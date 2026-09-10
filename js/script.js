// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("show");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("show")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


// Close menu after clicking a link

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


// =========================
// ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = contactForm ? contactForm.querySelector("button[type='submit']") : null;

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (formStatus) {
            formStatus.textContent = "Sending...";
            formStatus.style.color = "";
        }

        if (submitBtn) {
            submitBtn.disabled = true;
        }

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        })
            .then(response => {

                if (response.ok) {

                    if (formStatus) {
                        formStatus.textContent = "Thanks! Your message has been sent successfully.";
                        formStatus.style.color = "green";
                    }

                    contactForm.reset();

                } else {

                    return response.json().then(data => {

                        const errorMsg =
                            (data && data.errors)
                                ? data.errors.map(e => e.message).join(", ")
                                : "Something went wrong. Please try again.";

                        if (formStatus) {
                            formStatus.textContent = errorMsg;
                            formStatus.style.color = "red";
                        }

                    });

                }

            })
            .catch(() => {

                if (formStatus) {
                    formStatus.textContent = "Network error. Please check your connection and try again.";
                    formStatus.style.color = "red";
                }

            })
            .finally(() => {

                if (submitBtn) {
                    submitBtn.disabled = false;
                }

            });

    });

}


// =========================
// SKILL BARS ANIMATION
// =========================

const skillBars = document.querySelectorAll(".skill-bar span");

const skillObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const targetWidth = entry.target.getAttribute("data-width");

                entry.target.style.width = targetWidth;

            } else {

                entry.target.style.width = "0";

            }

        });

    },
    {
        threshold: 0.3
    }
);

skillBars.forEach(bar => {

    skillObserver.observe(bar);

});


// =========================
// ABOUT TEXT TYPEWRITER
// =========================

const aboutPara1 = document.getElementById("aboutPara1");
const aboutPara2 = document.getElementById("aboutPara2");
const aboutTextBlock = document.querySelector(".about-text");

if (aboutPara1 && aboutPara2 && aboutTextBlock) {

    const text1 = aboutPara1.textContent.trim().replace(/\s+/g, " ");
    const text2 = aboutPara2.textContent.trim().replace(/\s+/g, " ");

    aboutPara1.textContent = "";
    aboutPara2.textContent = "";

    let typingRunId = 0;

    function typeText(element, text, speed, runId, callback) {

        element.classList.add("typing-cursor");

        let index = 0;

        function typeChar() {

            if (runId !== typingRunId) {
                return;
            }

            if (index < text.length) {

                element.textContent += text.charAt(index);
                index++;

                setTimeout(typeChar, speed);

            } else {

                element.classList.remove("typing-cursor");

                if (callback) {
                    callback();
                }

            }

        }

        typeChar();

    }

    function playTyping() {

        typingRunId++;

        const currentRunId = typingRunId;

        aboutPara1.textContent = "";
        aboutPara2.textContent = "";

        typeText(aboutPara1, text1, 15, currentRunId, () => {

            typeText(aboutPara2, text2, 15, currentRunId);

        });

    }

    const aboutTextObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    playTyping();

                } else {

                    typingRunId++;

                    aboutPara1.classList.remove("typing-cursor");
                    aboutPara2.classList.remove("typing-cursor");

                    aboutPara1.textContent = "";
                    aboutPara2.textContent = "";

                }

            });

        },
        {
            threshold: 0.3
        }
    );

    aboutTextObserver.observe(aboutTextBlock);

}


// =========================
// ABOUT INFO STAGGER
// =========================

const aboutInfo = document.querySelector(".about-info");

if (aboutInfo) {

    const aboutInfoObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("in-view");

                } else {

                    entry.target.classList.remove("in-view");

                }

            });

        },
        {
            threshold: 0.3
        }
    );

    aboutInfoObserver.observe(aboutInfo);

}


// =========================
// SERVICES & CERTIFICATES STAGGER
// =========================

const staggerContainers = document.querySelectorAll(
    ".services-container, .certificates-container, .experience-container"
);

const staggerObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("in-view");

            } else {

                entry.target.classList.remove("in-view");

            }

        });

    },
    {
        threshold: 0.2
    }
);

staggerContainers.forEach(container => {

    staggerObserver.observe(container);

});


// =========================
// SCROLL REVEAL
// =========================

const revealElements = document.querySelectorAll(
    ".section-title, .about-container, .skills-container, .experience-container, .services-container, .portfolio-container, .certificates-container, .contact-container"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.1
    }
);


revealElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});