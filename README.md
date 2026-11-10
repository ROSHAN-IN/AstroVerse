# AstroVerse 🚀

## Explore Beyond Imagination

AstroVerse is an interactive space exploration website built with HTML, CSS, JavaScript and Three.js.

Explore the solar system, examine individual planets, discover space missions, test your knowledge and learn about the universe.

## Project Status

Development and integration are in progress.

| Module | Contributor | Current status |
| --- | --- | --- |
| Solar System | Aman | Feature merged through PR #2 |
| Planet Explorer | Wahab | Feature merged through PR #3 |
| Space Missions and Quiz | Aarav | Feature merged through PR #4 |
| Cosmic Discoveries | Sajid | Feature merged through PR #1 |
| Cosmic Visual Effects | Ayush | Preview development and testing in progress |
| Homepage and Navigation | Roshan | Final integration pending |
| Complete Website Testing | All members | Pending final integration |

Feature-level testing has been reported by the team. Complete testing across the integrated website remains pending.

## Meet the Team

AstroVerse has six contributors.

### Roshan — Team Lead and Repository Manager

- Manage the GitHub repository.
- Maintain project documentation.
- Coordinate development.
- Review and merge feature Pull Requests.
- Build and coordinate the homepage.
- Integrate navigation and approved visual effects.
- Coordinate final testing and deployment.

### Aman — Solar System Developer

- Create the animated Sun.
- Display all eight planets.
- Implement orbital movement and planet rotation.
- Apply planet textures.
- Add planet selection and information.
- Build the solar system's star background.

Branch — `feature/solar-system`

Assigned files

- `solar-system.html`
- `CSS/solar-system.css`
- `JavaScript/solar-system.js`
- `assets/textures/solar-system/`

### Wahab — Planet Explorer Developer

- Build interactive views of all eight planets.
- Display planet descriptions and facts.
- Reuse the project's planet textures.
- Add mouse and touch rotation.
- Add zoom, pause and reset controls.
- Display Saturn's rings.
- Support mobile layouts.

Branch — `feature/planet-explorer`

Assigned files

- `planet-explorer.html`
- `CSS/explorer.css`
- `JavaScript/explorer.js`

### Aarav — Space Missions and Quiz Developer

- Display educational space mission cards.
- Build a quiz with ten questions.
- Show answer explanations.
- Award XP for completed quizzes.
- Track achievements.
- Maintain a leaderboard in browser storage.
- Build responsive quiz interactions and animations.

Branch — `feature/space-missions`

Assigned files

- `space-missions.html`
- `CSS/missions.css`
- `JavaScript/missions.js`

### Sajid — Cosmic Discoveries Developer

- Create educational discovery cards.
- Cover galaxies, black holes, stars, nebulae, comets, asteroids and exoplanets.
- Add category filters and a result count.
- Add a random-fact button.
- Avoid immediate repetition of random facts.
- Support responsive layouts and keyboard interaction.

Branch — `feature/cosmic-discoveries`

Assigned files

- `cosmic-discoveries.html`
- `CSS/cosmic-discoveries.css`
- `JavaScript/cosmic-discoveries.js`

### Ayush — Visual Effects and Scroll Animation Developer

- Build an independent visual effects preview.
- Create animated nebula backgrounds and shooting stars.
- Add section reveals and hover effects.
- Develop scroll-controlled hero animations.
- Integrate photographic space artwork into the preview.
- Support reduced-motion preferences.
- Test effects before Roshan integrates them into the homepage.

Branch — `feature/cosmic-effects`

Assigned files

- `effects-preview.html`
- `CSS/cosmic-effects.css`
- `JavaScript/cosmic-effects.js`
- `assets/textures/cosmic-effects/`

Ayush's visual effects are currently being developed and checked. The photographic hero's image path and display still require verification.

## Features

### Solar System

- Animated Sun with a procedural surface and glowing corona.
- Eight textured planets.
- Orbital movement and planet rotation.
- Saturn's rings.
- Star background.
- Planet selection with an information panel.
- Responsive rendering and reduced-motion support.

Planet sizes, orbital distances and speeds are adjusted for viewing and are not scientifically to scale.

### Planet Explorer

- Individual views of all eight planets.
- Textured 3D models.
- Planet selection and educational facts.
- Mouse and touch dragging.
- Zoom and rotation controls.
- Pause and reset controls.
- A simplified representation of Saturn's rings.

Planet models use a common viewing size for exploration.

### Space Missions and Quiz

- Mission cards covering Apollo 11, Chandrayaan-3 and Voyager 1.
- Ten quiz questions with explanations.
- XP awarded after quiz completion.
- First Flight, Star Navigator and Perfect Orbit achievements.
- Player names, best scores and attempt tracking.
- A leaderboard stored in the current browser.

Quiz progress uses localStorage. Saved records belong to the browser and website origin where the quiz is played. Clearing browser storage removes saved records. If browser storage is unavailable, progress can continue for the current page session.

### Cosmic Discoveries

- Seven space fact categories.
- Educational fact cards.
- Category filtering.
- Updated result counts.
- Random facts with immediate-repeat prevention.
- Responsive styling and reduced-motion support.

### Visual Effects Preview

Ayush's preview includes work on

- Animated nebula backgrounds.
- Shooting stars.
- Floating artwork.
- Section reveal animations.
- Card and button hover effects.
- Scroll-controlled hero zoom and text fading.
- A photographic space hero.

Final appearance, image loading and integration are still being verified.

## Technology

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure and accessible content |
| CSS3 | Layout, responsive design and visual effects |
| JavaScript | Interactions, quiz logic and animation control |
| Three.js | Solar System and Planet Explorer rendering |
| localStorage | Browser-based quiz records |
| Git and GitHub | Version control, reviews and collaboration |
| Python HTTP server | Local development preview |

The 3D modules use Three.js version `0.180.0`, loaded from a CDN.

Internet access is required to load the CDN library. GSAP has not been added to the current implementation.

## Project Files

| Page or asset | Location |
| --- | --- |
| Solar System page | `solar-system.html` |
| Solar System styles | `CSS/solar-system.css` |
| Solar System script | `JavaScript/solar-system.js` |
| Planet Explorer page | `planet-explorer.html` |
| Planet Explorer styles | `CSS/explorer.css` |
| Planet Explorer script | `JavaScript/explorer.js` |
| Space Missions page | `space-missions.html` |
| Space Missions styles | `CSS/missions.css` |
| Space Missions script | `JavaScript/missions.js` |
| Cosmic Discoveries page | `cosmic-discoveries.html` |
| Cosmic Discoveries styles | `CSS/cosmic-discoveries.css` |
| Cosmic Discoveries script | `JavaScript/cosmic-discoveries.js` |
| Visual Effects preview | `effects-preview.html` |
| Visual Effects styles | `CSS/cosmic-effects.css` |
| Visual Effects script | `JavaScript/cosmic-effects.js` |
| Planet textures | `assets/textures/solar-system/` |
| Visual Effects artwork | `assets/textures/cosmic-effects/` |

Ayush's preview files are under development on his feature branch. Their availability depends on the branch being viewed.

The integrated homepage is still pending.

## Run Locally on macOS

1. Clone the repository using your GitHub account.
2. Open the cloned `AstroVerse` folder in VS Code.
3. Select **Terminal → New Terminal**.
4. Confirm that the terminal is inside the project folder containing the HTML files.
5. Start the local server.

    python3 -m http.server 8000 --bind 127.0.0.1

6. Keep that terminal running.
7. Open a page using the links below.

| Page | Local URL |
| --- | --- |
| Solar System | http://127.0.0.1:8000/solar-system.html |
| Planet Explorer | http://127.0.0.1:8000/planet-explorer.html |
| Space Missions | http://127.0.0.1:8000/space-missions.html |
| Cosmic Discoveries | http://127.0.0.1:8000/cosmic-discoveries.html |
| Visual Effects preview | http://127.0.0.1:8000/effects-preview.html |

The Visual Effects preview requires Ayush's files to be present in the local checkout.

If port 8000 is occupied, start the server on port 8001.

    python3 -m http.server 8001 --bind 127.0.0.1

Then use `8001` in the browser URLs.

Stop the server by pressing **Control + C** in its terminal.

Each member runs the server on their own computer. A localhost link opens the server running on the computer where the link is used.

## Collaboration Workflow

1. Confirm the repository folder and current branch before making changes.
2. Develop assigned features on the contributor's own feature branch.
3. Stage the intended files using their exact paths.
4. Check the staged changes.
5. Create commits with the contributor's correct Git identity.
6. Push the feature branch.
7. Create a Pull Request targeting `main`.
8. Roshan reviews the changes and checks the feature.
9. Roshan merges the approved Pull Request.
10. Members safely synchronize their local `main` after the merge.

Feature contributors must use their own branches and Pull Requests.

Shared-file and homepage changes are coordinated by Roshan. Preserve local work before switching branches or synchronizing.

## Pull Requests

| Pull Request | Contributor | Feature | Reported status |
| --- | --- | --- | --- |
| [PR #1](https://github.com/ROSHAN-IN/AstroVerse/pull/1) | Sajid | Cosmic Discoveries | Merged |
| [PR #2](https://github.com/ROSHAN-IN/AstroVerse/pull/2) | Aman | Solar System | Merged |
| [PR #3](https://github.com/ROSHAN-IN/AstroVerse/pull/3) | Wahab | Planet Explorer | Merged |
| [PR #4](https://github.com/ROSHAN-IN/AstroVerse/pull/4) | Aarav | Space Missions and Quiz | Merged |

Ayush's Pull Request will be added after his preview is tested and submitted.

## Design and Accessibility

- Dark navy backgrounds.
- Cyan, blue and purple accents.
- Glass-style cards.
- Responsive page layouts.
- Keyboard focus indicators.
- Skip links.
- Reduced-motion support.
- Decorative layers that allow interaction with page controls.

Final accessibility and performance checks will take place after integration.

## Credits and References

### Planet Textures

Planet textures were obtained from Solar System Scope.

Source — https://www.solarsystemscope.com/textures/

License — Creative Commons Attribution 4.0 International.

License details — https://creativecommons.org/licenses/by/4.0/

Retain texture attribution when sharing or publishing the project.

### Three.js

Three.js is used for interactive 3D rendering.

Website — https://threejs.org/

License — https://github.com/mrdoob/three.js/blob/dev/LICENSE

### Space Mission References

Apollo 11 — https://www.nasa.gov/history/apollo-11-mission-overview/

Chandrayaan-3 — https://www.isro.gov.in/Chandrayaan3.html

Voyager — https://science.nasa.gov/mission/voyager/

### Visual Effects Artwork

The supplied space artwork includes a visible credit to Doğan Ural.

Record the original source and applicable usage permission or license before publishing this artwork. Preserve the creator attribution.

## Final Integration Checklist

- [ ] Complete and test Ayush's visual effects preview.
- [ ] Verify the photographic hero's image path.
- [ ] Review and merge Ayush's Pull Request.
- [ ] Synchronize Roshan's local repository.
- [ ] Build or complete the homepage.
- [ ] Connect all four educational feature pages.
- [ ] Integrate approved visual effects.
- [ ] Add consistent navigation.
- [ ] Verify all CSS, JavaScript and image paths.
- [ ] Check links and buttons.
- [ ] Check the browser console.
- [ ] Test mobile, tablet and desktop layouts.
- [ ] Check animation performance and reduced-motion behavior.
- [ ] Update documentation to match the final website.

## Final Testing Checklist

- [ ] Solar System renders and animates.
- [ ] Planet selection updates the information panel.
- [ ] All eight planet textures load.
- [ ] Planet Explorer selection and facts work.
- [ ] Dragging, zoom, pause and reset work.
- [ ] Mission cards and reference links work.
- [ ] All ten quiz questions work.
- [ ] Explanations and final results display correctly.
- [ ] XP is awarded once per completed attempt.
- [ ] Achievements update correctly.
- [ ] Saved quiz records and leaderboard work.
- [ ] Cosmic Discoveries filters work.
- [ ] Random facts work.
- [ ] Visual effects work with scrolling and keyboard navigation.
- [ ] Reduced-motion preferences are respected.
- [ ] Existing features work after integration.

## College Submission

Prepare the following before submission.

- Final repository URL.
- Approved and merged feature Pull Requests.
- Individual contribution records for all six members.
- Screenshots or recordings of the completed features.
- Final demonstration checklist.
- Project presentation.
- Deployment URL, if deployed.
- Faculty approval documentation for the six-member team.

If the original worksheet specifies three to four members, record the faculty-approved arrangement for the expanded team.

## Repository

https://github.com/ROSHAN-IN/AstroVerse

---

Built by Roshan, Aman, Wahab, Aarav, Sajid and Ayush.

**AstroVerse — Explore Beyond Imagination.**