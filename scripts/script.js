// Apply theme before DOM loads to prevent FOUC
(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light-mode") {
    document.documentElement.classList.add("light-mode");
    document.body.classList.add("light-mode");
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const updateThemeIcons = (isLightMode) => {
    const themeToggle = document.getElementById("theme-toggle");
    const themeToggleMobile = document.getElementById("theme-toggle-mobile");
    const icon = isLightMode
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';

    if (themeToggle) themeToggle.innerHTML = icon;
    if (themeToggleMobile) themeToggleMobile.innerHTML = icon;
  };

  const applyTheme = (isLightMode) => {
    const body = document.body;
    if (isLightMode) {
      body.classList.add("light-mode");
      localStorage.setItem("theme", "light-mode");
    } else {
      body.classList.remove("light-mode");
      localStorage.removeItem("theme");
    }
    updateThemeIcons(isLightMode);
  };

  const closeMobileMenu = () => {
    const navLinks = document.querySelector(".nav-links");
    const menuToggle = document.querySelector(".menu-toggle");

    if (navLinks) {
      navLinks.classList.remove("active");
    }
    if (menuToggle) {
      menuToggle.classList.remove("open");
    }
  };

  // ========== Page Location and Last Modified Date ==========
  const pageLocation = document.getElementById("pageLocation");
  if (pageLocation) {
    pageLocation.innerText = `Page Location: ${window.location.href}`;
  }

  const lastModified = document.getElementById("lastModified");
  const date = new Date(document.lastModified);

  if (lastModified) {
    lastModified.innerText = `Last Modified: ${date.toLocaleDateString(
      "en-GB"
    )} ${date.toLocaleTimeString("en-GB")}`;
  }

  // ========== Theme Toggle ==========
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  const isLightMode = savedTheme === "light-mode";
  updateThemeIcons(isLightMode);

  const toggleTheme = () => {
    const willBeLightMode = !body.classList.contains("light-mode");
    applyTheme(willBeLightMode);
  };

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme);
  }

  // ========== Scroll Animations ==========
  const sections = document.querySelectorAll("section");

  if (sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  // ========== Mobile Navigation Toggle ==========
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("open");
    });

    const navLinkItems = navLinks.querySelectorAll("a");
    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.getComputedStyle(menuToggle).display !== "none") {
          closeMobileMenu();
        }
      });
    });
  }

  // ========== Close mobile menu on window resize ==========
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    }, 250);
  });
});
