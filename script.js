/* =============================================
   MANDVI BHADORIA — PORTFOLIO
   script.js
   ============================================= */

"use strict";

/* ─── DOM REFERENCES ─── */
const navbar      = document.getElementById("navbar");
const hamburger   = document.getElementById("hamburger");
const navLinks    = document.getElementById("nav-links");
const backToTop   = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

/* ─────────────────────────────
   NAVBAR — scroll effect + active link
───────────────────────────── */
function updateNavbar() {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  highlightNavLink();
}

function highlightNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollY  = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute("id");
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar(); // run once on load

/* ─────────────────────────────
   HAMBURGER MENU
───────────────────────────── */
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

/* ─────────────────────────────
   BACK TO TOP BUTTON
───────────────────────────── */
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}, { passive: true });

/* ─────────────────────────────
   INTERSECTION OBSERVER — reveal animations
───────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.10 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ─────────────────────────────
   STAGGERED REVEAL — project cards
───────────────────────────── */
const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".project-card");
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add("visible");
          }, i * 90);
        });
        projectObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05 }
);

const projectsGrid = document.querySelector(".projects-grid");
if (projectsGrid) {
  // Mark cards as reveal targets via JS stagger instead of CSS
  projectsGrid.querySelectorAll(".project-card").forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    card.style.transition = "opacity 0.55s ease, transform 0.55s ease, border-color 0.3s, box-shadow 0.3s, transform 0.3s";
  });
  projectObserver.observe(projectsGrid);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-card.visible").forEach(card => {
    card.style.opacity = "";
    card.style.transform = "";
  });
});

// When a project card becomes "visible" via the observer callback, animate it
const projectCardObserverIndividual = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        projectCardObserverIndividual.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);
if (projectsGrid) {
  projectsGrid.querySelectorAll(".project-card").forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
    projectCardObserverIndividual.observe(card);
  });
}

/* ─────────────────────────────
   STAGGERED REVEAL — cert cards
───────────────────────────── */
const certCardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        certCardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

const certsGrid = document.querySelector(".certs-grid");
if (certsGrid) {
  certsGrid.querySelectorAll(".cert-item").forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    card.style.transition = `opacity 0.55s ease ${i * 0.08}s, transform 0.55s ease ${i * 0.08}s, border-color 0.3s, box-shadow 0.3s`;
    certCardObserver.observe(card);
  });
}

/* ─────────────────────────────
   SKILL CARDS — staggered reveal + progress bars
───────────────────────────── */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Animate skill bar after card appears
        const fillEl = entry.target.querySelector(".skill-fill");
        if (fillEl) {
          const targetWidth = fillEl.getAttribute("data-width");
          setTimeout(() => {
            fillEl.style.width = targetWidth + "%";
          }, 200);
        }

        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".skill-card").forEach(card => skillObserver.observe(card));

/* ─────────────────────────────
   STAT COUNTER ANIMATION
───────────────────────────── */
function animateCounter(el, target, duration = 1400) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = start;
  }, 16);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".stat-card");
        cards.forEach((card, i) => {
          const numEl = card.querySelector(".stat-num");
          if (!numEl) return;

          // Extract numeric part
          const raw    = numEl.textContent.replace(/\D/g, "");
          const target = parseInt(raw, 10);
          const em     = numEl.querySelector("em");
          const suffix = em ? em.outerHTML : "";

          setTimeout(() => {
            numEl.innerHTML = `<span class="counter-val">0</span>${suffix}`;
            animateCounter(numEl.querySelector(".counter-val"), target);
          }, i * 150);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const aboutStats = document.querySelector(".about-stats");
if (aboutStats) statsObserver.observe(aboutStats);

/* ─────────────────────────────
   CONTACT FORM HANDLING
───────────────────────────── */
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name    = contactForm.querySelector("#name").value.trim();
    const email   = contactForm.querySelector("#email").value.trim();
    const message = contactForm.querySelector("#message").value.trim();

    // Simple validation
    if (!name || !email || !message) {
      shakeForm();
      return;
    }

    if (!isValidEmail(email)) {
      const emailInput = contactForm.querySelector("#email");
      emailInput.style.borderColor = "#ef4444";
      setTimeout(() => emailInput.style.borderColor = "", 2000);
      return;
    }

    // Simulate send (replace with real API call if needed)
    const submitBtn = contactForm.querySelector("[type='submit']");
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

    setTimeout(() => {
      submitBtn.style.display = "none";
      formSuccess.classList.add("show");
      contactForm.reset();
    }, 1200);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeForm() {
  const form = document.querySelector(".contact-form");
  form.style.animation = "none";
  form.style.transform = "translateX(0)";

  let count = 0;
  const shakeInterval = setInterval(() => {
    form.style.transform = `translateX(${count % 2 === 0 ? "6px" : "-6px"})`;
    count++;
    if (count >= 8) {
      clearInterval(shakeInterval);
      form.style.transform = "translateX(0)";
    }
  }, 60);
}

/* ─────────────────────────────
   SMOOTH ANCHOR SCROLL (extra safety for all internal links)
───────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ─────────────────────────────
   TYPING EFFECT — hero subtitle
───────────────────────────── */
const subtitleEl = document.querySelector(".hero-subtitle");
if (subtitleEl) {
  const phrases = [
    "Software Developer & Problem Solver",
    "Computer Science Engineer",
    "DSA Enthusiast",
    "Java & Python Programmer",
    "Full Stack Developer"
  ];
  let phraseIdx  = 0;
  let charIdx    = 0;
  let deleting   = false;
  let typingTimeout;

  function type() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      subtitleEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        typingTimeout = setTimeout(type, 2200);
        return;
      }
    } else {
      subtitleEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingTimeout = setTimeout(type, 400);
        return;
      }
    }

    typingTimeout = setTimeout(type, deleting ? 45 : 80);
  }

  // Start typing after hero fade-in
  setTimeout(type, 1200);
}

/* ─────────────────────────────
   SUBTLE PARALLAX ON HERO GRID
───────────────────────────── */
const heroGrid = document.querySelector(".hero-grid-bg");
if (heroGrid) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    heroGrid.style.transform = `translateY(${scrollY * 0.25}px)`;
  }, { passive: true });
}
