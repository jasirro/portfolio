document.addEventListener("DOMContentLoaded", () => {
  // Active nav on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function setActive() {
    let current = "";
    const top = window.scrollY + 140; // offset for sticky nav
    sections.forEach(sec => {
      if (top >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
  }
  window.addEventListener("scroll", setActive);
  setActive();

  // Fade-in on intersection
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.15 });
  document.querySelectorAll(".fade-in").forEach(el => io.observe(el));

  // Hero rotating descriptions
  const lines = [
    "If you have data, let’s look at data. If all we have are opinions, let’s go with mine.",
    "If you have data, let’s look at data. If all we have are opinions, let’s go with mine.t",
    "connect me"
  ];
  const heroEl = document.getElementById("hero-rotator");
  if (heroEl) {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % lines.length;
      heroEl.textContent = lines[i];
    }, 2500);
  }

  // Contact form validation
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("form-status");
  const validateEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      statusEl.textContent = "Please fill out all fields.";
      statusEl.style.color = "#ef4444";
      return;
    }
    if (!validateEmail(email)) {
      statusEl.textContent = "Enter a valid email.";
      statusEl.style.color = "#00995E";
      return;
    }

    statusEl.textContent = "Sending...";
    statusEl.style.color = "#64748b";

    try {
    

      await new Promise(r => setTimeout(r, 800));

      form.reset();
      statusEl.textContent = "Message sent! Thanks for reaching out.";
      statusEl.style.color = "#10b981";
    } catch (err) {
      statusEl.textContent = "Could not send message. Try again later.";
      statusEl.style.color = "#FFC567";
    }
  });

  // Theme toggle (persisted)
  const themeBtn = document.querySelector(".theme-toggle");
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  if (stored) root.setAttribute("data-theme", stored);
  updateThemeIcon();

  themeBtn?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const current = root.getAttribute("data-theme") || "dark";
    if (themeBtn) themeBtn.textContent = current === "dark" ? "🌙" : "☀️";
  }
});
