"use strict";

function startCosmicEffects() {
  const page = document.querySelector(".cosmic-page");
  if (!page) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  const smallScreen = window.matchMedia("(max-width: 700px)");
  const shootingLayer = page.querySelector(".cosmic-shooting-layer");
  const revealElements = Array.from(
    page.querySelectorAll("[data-reveal]")
  );

  let revealObserver = null;
  let shootingTimer = null;

  function revealEverything() {
    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }

    page.classList.remove("effects-ready");

    for (const element of revealElements) {
      element.classList.add("is-visible");
    }
  }

  function prepareReveals() {
    if (reducedMotion.matches ||
        !("IntersectionObserver" in window)) {
      revealEverything();
      return;
    }

    revealObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }
    }, {
      threshold: 0.12
    });

    for (const element of revealElements) {
      revealObserver.observe(element);
    }

    page.classList.add("effects-ready");
  }

  function clearShootingStar() {
    window.clearTimeout(shootingTimer);
    shootingTimer = null;

    if (shootingLayer) {
      shootingLayer.replaceChildren();
    }
  }

  function scheduleShootingStar() {
    clearShootingStar();

    if (!shootingLayer ||
        reducedMotion.matches ||
        document.hidden) {
      return;
    }

    // Fewer decorative events on small screens.
    const delay = smallScreen.matches ? 10000 : 5500;

    shootingTimer = window.setTimeout(() => {
      if (document.hidden || reducedMotion.matches) return;

      const star = document.createElement("span");
      star.className = "cosmic-shooting-star";
      star.style.left = String(5 + Math.random() * 55) + "%";
      star.style.top = String(5 + Math.random() * 40) + "%";

      shootingLayer.append(star);
      star.addEventListener("animationend", () => star.remove(), {
        once: true
      });

      // The next cycle also removes any leftover decorative element.
      shootingTimer = window.setTimeout(
        scheduleShootingStar,
        delay
      );
    }, delay);
  }

  function updateMotion() {
    page.classList.toggle(
      "effects-paused",
      document.hidden || reducedMotion.matches
    );

    if (reducedMotion.matches) {
      revealEverything();
    }

    scheduleShootingStar();
  }

  // Smooth in-page navigation respects reduced-motion preferences.
  for (const link of page.querySelectorAll('a[href^="#"]')) {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);

      if (!target || event.metaKey || event.ctrlKey ||
          event.shiftKey || event.altKey) {
        return;
      }

      event.preventDefault();

      // Move keyboard focus along with the visible scroll position.
      const hadTabindex = target.hasAttribute("tabindex");

      if (!hadTabindex) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener("blur", () => {
          target.removeAttribute("tabindex");
        }, { once: true });
      }

      target.focus({ preventScroll: true });
      target.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });
    });
  }

  document.addEventListener("visibilitychange", updateMotion);
  reducedMotion.addEventListener("change", updateMotion);
  smallScreen.addEventListener("change", scheduleShootingStar);

  window.addEventListener("pagehide", () => {
    clearShootingStar();
    if (revealObserver) revealObserver.disconnect();
  });

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      revealEverything();
      updateMotion();
    }
  });

  prepareReveals();
  updateMotion();
}

startCosmicEffects();
// Scroll controls the hero's black hole and heading.
(function setupCosmicJourney() {
  const hero = document.querySelector(".cosmic-page .cosmic-hero");
  if (!hero) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  const mobile = window.matchMedia("(max-width: 700px)");
  let frame = null;

  function drawJourney() {
    frame = null;

    const bounds = hero.getBoundingClientRect();
    const distance = Math.max(1, hero.offsetHeight - window.innerHeight);
    const progress = reducedMotion.matches
      ? 0
      : Math.max(0, Math.min(1, -bounds.top / distance));

    const eased = progress * progress * (3 - 2 * progress);
    const copyFade = Math.min(1, progress / 0.42);
    const exitFade = Math.max(0, (progress - 0.72) / 0.28);

    hero.style.setProperty(
      "--journey-copy-opacity",
      String(1 - copyFade)
    );
    hero.style.setProperty(
      "--journey-copy-y",
      String(-70 * eased) + "px"
    );
    hero.style.setProperty(
      "--journey-scale",
      String(1 + eased * (mobile.matches ? 2.2 : 3.4))
    );
    hero.style.setProperty(
      "--journey-art-x",
      String(mobile.matches ? 0 : -38 * eased) + "%"
    );
    hero.style.setProperty(
      "--journey-rotation",
      String(-20 * eased) + "deg"
    );
    hero.style.setProperty(
      "--journey-art-opacity",
      String(1 - exitFade)
    );

    // Hidden hero links are skipped during keyboard navigation.
    hero.firstElementChild.inert = copyFade >= 1;
  }

  function requestDraw() {
    if (frame === null) {
      frame = window.requestAnimationFrame(drawJourney);
    }
  }

  window.addEventListener("scroll", requestDraw, { passive: true });
  window.addEventListener("resize", requestDraw);
  reducedMotion.addEventListener("change", requestDraw);
  mobile.addEventListener("change", requestDraw);
  drawJourney();
})();