"use strict";

function startDiscoveries() {
  const filters = document.querySelector("#category-filters");
  const randomButton = document.querySelector("#random-fact-button");
  const randomOutput = document.querySelector("#random-fact");
  const resultsCount = document.querySelector("#results-count");
  const cards = Array.from(document.querySelectorAll(".fact-card"));

  if (!filters || !randomButton || !randomOutput ||
      !resultsCount || cards.length === 0) {
    console.error("Cosmic Discoveries is missing required HTML elements.");
    return;
  }

  const filterButtons = Array.from(
    filters.querySelectorAll("button[data-filter]")
  );

  let previousRandomCard = null;

  function applyFilter(category) {
    let visibleCount = 0;

    for (const card of cards) {
      const matches = category === "all" ||
        card.dataset.category === category;

      card.hidden = !matches;

      if (matches) {
        visibleCount += 1;
      }
    }

    for (const button of filterButtons) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === category)
      );
    }

    const noun = visibleCount === 1 ? "discovery" : "discoveries";
    resultsCount.textContent = `Showing ${visibleCount} ${noun}`;
  }

  for (const button of filterButtons) {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter);
    });
  }

  function showRandomFact() {
    // Random discoveries explore all categories.
    // Avoid repeating the previous card when alternatives are available.
    const alternatives = cards.filter(
      (card) => card !== previousRandomCard
    );

    const choices = alternatives.length > 0 ? alternatives : cards;
    const index = Math.floor(Math.random() * choices.length);
    const selectedCard = choices[index];

    const title = selectedCard.querySelector("h3").textContent.trim();
    const fact = selectedCard.querySelector(".fact-text").textContent.trim();
    const category = selectedCard.querySelector(".eyebrow").textContent.trim();

    randomOutput.textContent = `${category} — ${title} ${fact}`;
    previousRandomCard = selectedCard;
  }

  randomButton.addEventListener("click", showRandomFact);

  // Enable controls after their event handlers are connected.
  applyFilter("all");
  filters.disabled = false;
  randomButton.disabled = false;

  randomOutput.textContent =
    "Select Discover a Random Fact to explore any of the seven categories.";
}

startDiscoveries();