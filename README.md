# AstroVerse 🚀

**Explore Beyond Imagination.**

AstroVerse is an interactive space exploration website being developed
by five college students. It combines educational content, animated
3D experiences, space missions, quizzes, and cosmic discoveries.

## Project Status

Development is in progress.

All five members have cloned the shared repository and configured
their Git identities.

Sajid's Cosmic Discoveries module has been reviewed by Roshan and
merged into main through Pull Request #1. The team has confirmed
that category filtering and the random-fact button work.
Homepage integration is pending.

The Solar System, Planet Explorer, Space Missions, quiz, and homepage
are still being developed. Their final completion and integration
have not yet been verified.

The feature descriptions below represent the project's planned scope.

## Team and Responsibilities

| Member | Role | Assigned Branch |
| --- | --- | --- |
| Roshan | Team Lead, Repository Manager, README, Homepage and Integration | main |
| Aman | Solar System Developer | feature/solar-system |
| Wahab | Planet Explorer Developer | feature/planet-explorer |
| Aarav | Space Missions and Quiz Developer | feature/space-missions |
| Sajid | Cosmic Discoveries Developer | feature/cosmic-discoveries |

### Roshan — Team Lead

- Manage the repository and collaborator access.
- Maintain the README.
- Coordinate the team.
- Review and merge approved Pull Requests.
- Develop the homepage.
- Coordinate integration and final verification.

### Aman — Solar System Developer

- Develop the animated Sun and eight planets.
- Implement planetary orbits and rotation.
- Add interactive planet selection.
- Create the solar system's space background.

### Wahab — Planet Explorer Developer

- Develop individual planet exploration.
- Add planet information and facts.
- Create interactive 3D planet models.
- Implement zoom and rotation controls.

### Aarav — Space Missions and Quiz Developer

- Present space mission information.
- Build a quiz with at least 10 questions.
- Implement XP points and achievements.
- Develop leaderboard functionality.
- Animate the quiz interface.

### Sajid — Cosmic Discoveries Developer

- Present facts about galaxies, black holes, stars, nebulae,
  comets, asteroids, and exoplanets.
- Create responsive fact cards.
- Implement category filters.
- Add a random-fact button.
- Add hover effects and accessible controls.

## Planned Website Features

### Homepage

- AstroVerse branding and navigation.
- Animated space hero section.
- Explore Universe button.
- Links to all four feature pages.
- About section and footer.

### Solar System

- Animated Sun and all eight planets.
- Orbital movement and planet rotation.
- Interactive planet selection.
- Textured planetary surfaces.
- Animated space background.

Planet sizes, distances, and animation speeds are adjusted for viewing
and are not to scale.

### Planet Explorer

- Individual exploration of all eight planets.
- Interactive 3D models.
- Planet information and facts.
- Zoom and rotation interactions.

### Space Missions and Quiz

- Educational space mission information.
- A quiz containing at least 10 questions.
- Score calculations and XP points.
- Achievements and leaderboard functionality.
- Animated question and result interfaces.

The leaderboard's storage approach is still to be decided.

### Cosmic Discoveries

- Seven educational fact categories.
- Category filters with an updated result count.
- A random-fact button that avoids immediate repeats.
- Responsive fact cards.
- Keyboard focus styles and reduced-motion support.

Status: Merged into main. Homepage integration pending.

## Technology Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure and content |
| CSS3 | Styling, responsive layouts, and visual effects |
| JavaScript | Interactions, filters, quiz logic, and animation |
| Three.js | 3D scenes and planetary models |
| GSAP | Planned interface and transition animations |
| Git | Local version control and individual commits |
| GitHub | Shared repository, Pull Requests, and reviews |
| Python HTTP server | Local development preview |

Three.js is used in the Solar System implementation.
GSAP integration has not yet been verified.

## File Ownership

### Roshan

- README.md
- index.html
- CSS/style.css
- JavaScript/main.js

### Aman

- solar-system.html
- CSS/solar-system.css
- JavaScript/solar-system.js
- assets/textures/solar-system/

### Wahab

- planet-explorer.html
- CSS/explorer.css
- JavaScript/explorer.js

### Aarav

- space-missions.html
- CSS/missions.css
- JavaScript/missions.js

### Sajid

- cosmic-discoveries.html
- CSS/cosmic-discoveries.css
- JavaScript/cosmic-discoveries.js

This list describes assigned ownership. Some planned files and assets
may not yet be present in main.

Folder capitalization must match exactly, including CSS and JavaScript.

## Collaboration Workflow

1. Every member uses their own GitHub account and local clone.
2. Feature developers work on their assigned branches.
3. Members edit their own assigned files.
4. Each developer independently stages, commits, and pushes their work.
5. Each developer creates a Pull Request targeting main.
6. Roshan reviews the code and feature demonstration.
7. Roshan merges approved Pull Requests.
8. Members safely synchronize their local copies after merges.
9. Roshan coordinates homepage and shared navigation changes.

Feature developers must not push their feature work directly to main.

Check git status before staging, committing, or switching branches.
Preserve uncommitted work before synchronizing.
Report unfamiliar merge conflicts before attempting a resolution.
Do not force-push shared branches.

## Local Preview

A working installation of Python 3 is needed for this preview method.

Open Terminal inside your cloned AstroVerse folder and run:

    python3 -m http.server 8000 --bind 127.0.0.1

Keep the Terminal running while previewing.

Open a page that exists on your current branch:

- Solar System: http://127.0.0.1:8000/solar-system.html
- Planet Explorer: http://127.0.0.1:8000/planet-explorer.html
- Space Missions: http://127.0.0.1:8000/space-missions.html
- Cosmic Discoveries: http://127.0.0.1:8000/cosmic-discoveries.html

A page may be unavailable on main until its feature PR is merged.

Press Control + C in the server Terminal to stop the preview server.

An internet connection is required when loading Three.js from its CDN.

## Testing Checklist

### Homepage and Integration

- [ ] Homepage displays correctly.
- [ ] Navigation connects all four feature pages.
- [ ] All links, buttons, images, and script paths work.
- [ ] No browser console errors occur.

### Solar System

- [ ] Sun and all eight planets render correctly.
- [ ] Planetary orbits and rotation work.
- [ ] Planet textures load.
- [ ] Planet selection updates the information panel.
- [ ] The scene resizes correctly.

### Planet Explorer

- [ ] Planet selection works.
- [ ] Facts match the selected planet.
- [ ] 3D models load.
- [ ] Zoom and rotation controls work.

### Space Missions and Quiz

- [ ] Mission information displays correctly.
- [ ] The quiz includes at least 10 questions.
- [ ] Answers and score calculations work.
- [ ] XP and achievements work.
- [ ] Leaderboard behavior is implemented and clearly explained.
- [ ] Quiz restart and completion flows work.

### Cosmic Discoveries

- [x] HTML content displays.
- [x] Styling loads.
- [x] Category filters work.
- [x] The random-fact button works.
- [ ] Keyboard interactions are verified.
- [ ] Mobile and desktop layouts are verified.
- [ ] Browser console is checked for errors.
- [ ] Homepage navigation is connected.

### Final Team Verification

- [ ] All required files are present in main.
- [ ] All feature Pull Requests are reviewed and merged.
- [ ] Individual contributions are documented.
- [ ] Responsive layouts are checked across the website.
- [ ] Final demonstration is prepared.

Checked items reflect functionality confirmed by the team during development.

## Pull Requests and Contribution Evidence

Repository:
https://github.com/ROSHAN-IN/AstroVerse

| Member | Contribution | Pull Request | Status |
| --- | --- | --- | --- |
| Roshan | Repository setup and README | Not applicable to initial setup | Initial README committed and pushed |
| Aman | Solar System | To be added | PR status not yet confirmed |
| Wahab | Planet Explorer | To be added | PR status not yet confirmed |
| Aarav | Space Missions and Quiz | To be added | PR status not yet confirmed |
| Sajid | Cosmic Discoveries | [PR #1](https://github.com/ROSHAN-IN/AstroVerse/pull/1) | Reviewed by Roshan and merged |

Each member should retain their commit history, feature PR URL,
and a demonstration of their assigned module.

## Asset Credits

When using the Solar System Scope planet textures, retain their credit:

Planet textures by [Solar System Scope](https://www.solarsystemscope.com/textures/),
licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Additional asset sources and licenses will be recorded as assets are added.

## College Submission Checklist

- [ ] Public repository URL.
- [ ] All four feature Pull Request URLs.
- [ ] Individual contribution evidence for all five members.
- [ ] Updated README.
- [ ] Completed testing checklist.
- [ ] Final project demonstration.
- [ ] Short presentation explaining the project and each member's work.
- [ ] Faculty approval for the additional fifth member confirmed.

The original worksheet may specify a team size of three to four students.
Five-member participation requires faculty confirmation.
Approval has not yet been recorded in this README.