document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Navbar
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 20) {
      navbar.style.boxShadow = "0 8px 30px rgba(30, 41, 59, 0.08)";
      navbar.style.background = "rgba(253, 251, 247, 0.95)";
    } else {
      navbar.style.boxShadow = "none";
      navbar.style.background = "rgba(253, 251, 247, 0.9)";
    }
  });

  // Reveal items
  const animatedItems = document.querySelectorAll(
    ".stat-item, .course-card, .book-card, .session-card, .info-card, .why-card, .mission-card, .resource-card",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-item");
        }
      });
    },
    { threshold: 0.1 },
  );

  animatedItems.forEach((item) => observer.observe(item));

  // Search
  const searchForms = document.querySelectorAll(".search-form");

  searchForms.forEach((form) => {
    const searchInput = form.querySelector("input");

    if (!searchInput) return;

    const searchSection = form.closest("section");
    const contentSection = searchSection?.nextElementSibling;
    const cards = contentSection?.querySelectorAll(".course-card, .book-card");

    if (!cards || !cards.length) return;

    const filterCards = () => {
      const query = searchInput.value.trim().toLowerCase();

      cards.forEach((card) => {
        const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const description =
          card.querySelector("p")?.textContent.toLowerCase() || "";

        const matches = !query || title.includes(query) || description.includes(query);
        card.style.display = matches ? "flex" : "none";
      });
    };

    searchInput.addEventListener("input", filterCards);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      filterCards();
    });
  });

  // Audio intro
  const introAudio = document.querySelector("#learnhub-audio");
  const audioVisitKey = "learnhub-audio-intro-attempted";

  if (introAudio) {
    introAudio.volume = 0.12;

    const firstVisit = !localStorage.getItem(audioVisitKey);

    if (firstVisit) {
      const tryAutoplay = () => {
        localStorage.setItem(audioVisitKey, "true");

        const playPromise = introAudio.play();

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Browser blocked autoplay
          });
        }
      };

      tryAutoplay();

      const startAfterInteraction = () => {
        if (introAudio.paused) {
          introAudio.play().catch(() => {});
        }

        window.removeEventListener("pointerdown", startAfterInteraction);
        window.removeEventListener("keydown", startAfterInteraction);
      };

      window.addEventListener("pointerdown", startAfterInteraction, { once: true });
      window.addEventListener("keydown", startAfterInteraction, { once: true });
    }
  }

});
