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
// SCROLL REVEAL
// =========================

const revealElements = document.querySelectorAll(
    ".section-title, .about-container, .resume-container, .skills-container, .experience-container, .services-container, .portfolio-container, .certificates-container, .contact-container"
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