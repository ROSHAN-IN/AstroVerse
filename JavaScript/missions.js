"use strict";

function startMissions() {
  const questions = [
    {
      question: "Which mission first landed humans on the Moon?",
      options: ["Apollo 11", "Voyager 1", "Chandrayaan-3", "Apollo 8"],
      answer: 0,
      explanation: "Apollo 11 landed Neil Armstrong and Buzz Aldrin on the Moon in 1969."
    },
    {
      question: "Which organisation developed Chandrayaan-3?",
      options: ["NASA", "ESA", "ISRO", "JAXA"],
      answer: 2,
      explanation: "Chandrayaan-3 was developed by the Indian Space Research Organisation."
    },
    {
      question: "What is the name of Chandrayaan-3's rover?",
      options: ["Vikram", "Pragyan", "Curiosity", "Perseverance"],
      answer: 1,
      explanation: "Pragyan is the rover. Vikram is the lander."
    },
    {
      question: "Which spacecraft entered interstellar space in 2012?",
      options: ["Apollo 11", "Hubble", "Voyager 1", "Chandrayaan-3"],
      answer: 2,
      explanation: "Voyager 1 crossed into interstellar space in August 2012."
    },
    {
      question: "Which planet is the largest in our solar system?",
      options: ["Earth", "Saturn", "Neptune", "Jupiter"],
      answer: 3,
      explanation: "Jupiter is the largest planet in our solar system."
    },
    {
      question: "Which planet is famous for its extensive bright rings?",
      options: ["Mars", "Saturn", "Mercury", "Venus"],
      answer: 1,
      explanation: "Saturn has a broad, bright ring system made mostly of ice particles."
    },
    {
      question: "What gives Mars its familiar reddish appearance?",
      options: ["Liquid oceans", "Methane clouds", "Iron minerals", "Green plants"],
      answer: 2,
      explanation: "Iron minerals in the surface produce Mars's reddish appearance."
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Mercury", "Venus", "Earth", "Mars"],
      answer: 0,
      explanation: "Mercury is the closest planet to the Sun."
    },
    {
      question: "Which planet is the hottest in our solar system?",
      options: ["Mercury", "Jupiter", "Mars", "Venus"],
      answer: 3,
      explanation: "Venus's thick atmosphere traps heat, making it hotter than Mercury."
    },
    {
      question: "Which planet is farthest from the Sun?",
      options: ["Saturn", "Uranus", "Neptune", "Jupiter"],
      answer: 2,
      explanation: "Neptune is the eighth and farthest planet from the Sun."
    }
  ];

  const form = document.querySelector("#start-form");
  const nameInput = document.querySelector("#player-name");
  const activePanel = document.querySelector("#quiz-active");
  const resultPanel = document.querySelector("#quiz-result");
  const questionText = document.querySelector("#question-text");
  const answers = document.querySelector("#answer-options");
  const feedback = document.querySelector("#answer-feedback");
  const nextButton = document.querySelector("#next-question");
  const counter = document.querySelector("#question-counter");
  const scoreLabel = document.querySelector("#quiz-score");
  const progress = document.querySelector("#quiz-progress");
  const storageMessage = document.querySelector("#storage-message");

  const storageKey = "astroverse.missions.players.v1";
  let players = [];
  let currentName = "";
  let questionIndex = 0;
  let score = 0;
  let answered = false;
  let phase = "idle";

  // Validate saved data before using it in the interface.
  try {
    const saved = localStorage.getItem(storageKey);

    if (saved !== null) {
      const parsed = JSON.parse(saved);

      const valid = Array.isArray(parsed) && parsed.every((player) =>
        player &&
        typeof player.name === "string" &&
        player.name.trim().length > 0 &&
        player.name.length <= 24 &&
        Number.isSafeInteger(player.best) &&
        player.best >= 0 &&
        player.best <= questions.length &&
        Number.isSafeInteger(player.attempts) &&
        player.attempts >= 1 &&
        Number.isSafeInteger(player.xp) &&
        player.xp >= player.best * 10 &&
        player.xp <= player.attempts * questions.length * 10 &&
        player.xp % 10 === 0
      );

      if (!valid) throw new Error("Invalid saved quiz data.");

      players = parsed;
    }
  } catch (error) {
    console.warn("Saved quiz results could not be read:", error);
    storageMessage.textContent =
      "Previous results could not be loaded. You can still play.";
  }

  function findPlayer(name) {
    const key = name.toLowerCase();

    return players.find((player) =>
      player.name.toLowerCase() === key
    );
  }

  function renderProfile(player) {
    document.querySelector("#profile-name").textContent =
      player ? player.name : "No completed quiz yet";
    document.querySelector("#total-xp").textContent =
      player ? String(player.xp) : "0";
    document.querySelector("#best-score").textContent =
      (player ? player.best : 0) + " / " + questions.length;

    const achievements = [
      {
        name: "First Flight",
        requirement: "Complete one quiz",
        unlocked: Boolean(player && player.attempts >= 1)
      },
      {
        name: "Star Navigator",
        requirement: "Score at least 8 / 10",
        unlocked: Boolean(player && player.best >= 8)
      },
      {
        name: "Perfect Orbit",
        requirement: "Score 10 / 10",
        unlocked: Boolean(player && player.best === 10)
      }
    ];

    const list = document.querySelector("#achievement-list");
    list.replaceChildren();

    for (const achievement of achievements) {
      const item = document.createElement("li");
      item.classList.toggle("unlocked", achievement.unlocked);
      item.textContent =
        (achievement.unlocked ? "Unlocked: " : "Locked: ") +
        achievement.name + " - " + achievement.requirement;
      list.append(item);
    }
  }

  function renderLeaderboard() {
    const body = document.querySelector("#leaderboard-body");
    body.replaceChildren();

    const ranked = players.slice().sort((first, second) =>
      second.best - first.best ||
      second.xp - first.xp ||
      first.name.localeCompare(second.name)
    );

    if (ranked.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 5;
      cell.textContent = "Complete a quiz to record the first result.";
      row.append(cell);
      body.append(row);
      return;
    }

    for (let index = 0; index < ranked.length; index++) {
      const player = ranked[index];
      const row = document.createElement("tr");
      const values = [
        index + 1,
        player.name,
        player.best + " / " + questions.length,
        player.xp,
        player.attempts
      ];

      for (const value of values) {
        const cell = document.createElement("td");
        cell.textContent = String(value);
        row.append(cell);
      }

      body.append(row);
    }
  }

  function saveResults() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(players));
      storageMessage.textContent =
        "Results saved in this browser for this site address.";
    } catch (error) {
      console.warn("Results could not be saved:", error);
      storageMessage.textContent =
        "Browser storage is unavailable. Results remain visible " +
        "for this session but may be lost when you reload.";
    }
  }

  function renderQuestion() {
    const current = questions[questionIndex];
    answered = false;
    answers.replaceChildren();
    feedback.textContent = "";
    nextButton.disabled = true;

    counter.textContent =
      "Question " + (questionIndex + 1) + " of " + questions.length;
    scoreLabel.textContent = "Correct answers: " + score;
    progress.value = questionIndex;
    questionText.textContent = current.question;

    nextButton.textContent =
      questionIndex === questions.length - 1
        ? "Finish quiz"
        : "Next question";

    for (let index = 0; index < current.options.length; index++) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer";
      button.textContent = current.options[index];
      button.addEventListener("click", () => chooseAnswer(index));
      answers.append(button);
    }

    questionText.focus();
  }

  function chooseAnswer(selectedIndex) {
    if (phase !== "playing" || answered) return;

    answered = true;
    const current = questions[questionIndex];
    const correct = selectedIndex === current.answer;

    if (correct) score += 1;

    const buttons = Array.from(answers.querySelectorAll("button"));

    buttons.forEach((button, index) => {
      button.disabled = true;

      if (index === current.answer) {
        button.classList.add("correct");
        button.textContent += " - Correct answer";
      } else if (index === selectedIndex) {
        button.classList.add("incorrect");
        button.textContent += " - Your answer";
      }
    });

    feedback.textContent =
      (correct ? "Correct! " : "Not quite. ") + current.explanation;
    scoreLabel.textContent = "Correct answers: " + score;
    progress.value = questionIndex + 1;
    nextButton.disabled = false;
    nextButton.focus();
  }

  function finishQuiz() {
    // Prevent double clicks from recording the same attempt twice.
    if (phase !== "playing") return;
    phase = "finished";

    const earnedXP = score * 10;
    let player = findPlayer(currentName);

    if (!player) {
      player = {
        name: currentName,
        best: 0,
        attempts: 0,
        xp: 0
      };
      players.push(player);
    }

    player.best = Math.max(player.best, score);
    player.attempts += 1;
    player.xp += earnedXP;

    saveResults();
    renderProfile(player);
    renderLeaderboard();

    activePanel.hidden = true;
    resultPanel.hidden = false;
    form.hidden = false;

    document.querySelector("#result-summary").textContent =
      currentName + ", you scored " + score + " / " +
      questions.length + " and earned " + earnedXP + " XP.";

    form.querySelector("button").textContent = "Play again";
    document.querySelector("#result-title").focus();
  }

  nameInput.addEventListener("input", () => {
    nameInput.setCustomValidity("");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (phase === "playing") return;

    const cleanedName = nameInput.value.trim().replace(/\s+/g, " ");

    if (!cleanedName) {
      nameInput.setCustomValidity("Enter an explorer name.");
      nameInput.reportValidity();
      return;
    }

    nameInput.setCustomValidity("");
    nameInput.value = cleanedName;
    currentName = cleanedName;
    questionIndex = 0;
    score = 0;
    phase = "playing";

    form.hidden = true;
    resultPanel.hidden = true;
    activePanel.hidden = false;

    renderProfile(findPlayer(currentName));
    renderQuestion();
  });

  nextButton.addEventListener("click", () => {
    if (phase !== "playing" || !answered) return;

    if (questionIndex === questions.length - 1) {
      finishQuiz();
    } else {
      questionIndex += 1;
      renderQuestion();
    }
  });

  renderProfile(null);
  renderLeaderboard();
}

startMissions();