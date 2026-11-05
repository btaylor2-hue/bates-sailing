// Bates Sailing — small progressive enhancements. The page works without this file.

(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");

  // Solid nav once the visitor scrolls past the top of the hero
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Phones: fade the headline out as the intro text scrolls up over the pinned photo
  const heroPin = document.querySelector(".hero-pin");
  const heroTitle = document.querySelector(".hero h1");
  const heroText = document.querySelector(".hero-pitch p");
  if (heroPin && heroTitle && heroText) {
    const fadeTitle = () => {
      if (getComputedStyle(heroPin).position !== "sticky") { heroTitle.style.opacity = ""; return; }
      const gap = heroText.getBoundingClientRect().top - heroTitle.getBoundingClientRect().bottom;
      heroTitle.style.opacity = String(Math.min(1, Math.max(0, (gap + 40) / 60)));
    };
    fadeTitle();
    window.addEventListener("scroll", fadeTitle, { passive: true });
    window.addEventListener("resize", fadeTitle);
  }

  // Mobile menu
  if (toggle && links) {
    const setOpen = (open) => {
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
    };
    toggle.addEventListener("click", () => setOpen(!links.classList.contains("is-open")));
    links.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && links.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
  }

  // Highlight the section in view in the nav
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]:not(.btn)')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          if (a.getAttribute("href") === "#" + entry.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  // Photo strip previous / next
  const strip = document.getElementById("photo-strip");
  document.querySelectorAll("[data-strip]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = btn.dataset.strip === "next" ? 1 : -1;
      strip.scrollBy({ left: dir * strip.clientWidth * 0.8, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  });

  // Gallery page: open photos in a full-screen viewer (links still work without JS)
  const lightbox = document.querySelector(".lightbox");
  const galleryLinks = [...document.querySelectorAll(".g-item")];
  if (lightbox && galleryLinks.length && typeof lightbox.showModal === "function") {
    const lbImg = lightbox.querySelector("img");
    const lbCount = lightbox.querySelector(".lb-count");
    let current = 0;
    let opener = null;

    const show = (i) => {
      current = (i + galleryLinks.length) % galleryLinks.length;
      const thumb = galleryLinks[current].querySelector("img");
      lbImg.src = galleryLinks[current].href;
      lbImg.alt = thumb.alt;
      lbCount.textContent = `${current + 1} of ${galleryLinks.length}`;
    };

    galleryLinks.forEach((link, i) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        opener = link;
        show(i);
        lightbox.showModal();
      });
    });
    lightbox.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
    lightbox.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
    lightbox.querySelector(".lb-close").addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
    // Clicking the dark area around the photo closes the viewer
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });
    lightbox.addEventListener("close", () => { if (opener) opener.focus(); });

    // Swipe left or right on touch screens
    let touchX = null;
    lightbox.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener("touchend", (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      touchX = null;
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
