"use strict";

async function startExplorer() {
  const container = document.querySelector("#planet-view");
  const status = document.querySelector("#viewer-status");
  const selector = document.querySelector("#planet-select");
  const controls = document.querySelector("#viewer-controls");
  const zoom = document.querySelector("#zoom");
  const rotationButton = document.querySelector("#toggle-rotation");

  const planetData = [
    {
      name: "Mercury",
      type: "Terrestrial",
      position: "First",
      description: "Mercury is the smallest planet and the closest to the Sun.",
      fact: "Despite being closest to the Sun, Mercury is cooler than Venus.",
      color: "#aaa39b"
    },
    {
      name: "Venus",
      type: "Terrestrial",
      position: "Second",
      description: "Venus has a thick atmosphere that traps intense heat.",
      fact: "Venus rotates in the opposite direction to most planets.",
      color: "#edc788"
    },
    {
      name: "Earth",
      type: "Terrestrial",
      position: "Third",
      description: "Earth is the only world currently known to support life.",
      fact: "Liquid water oceans cover most of Earth's surface.",
      color: "#478fe8"
    },
    {
      name: "Mars",
      type: "Terrestrial",
      position: "Fourth",
      description: "Mars is a rocky world with a thin atmosphere and polar ice.",
      fact: "Iron minerals in its surface give Mars its reddish appearance.",
      color: "#d57650"
    },
    {
      name: "Jupiter",
      type: "Gas giant",
      position: "Fifth",
      description: "Jupiter is the largest planet in our solar system.",
      fact: "Its Great Red Spot is a giant atmospheric storm.",
      color: "#d7ab89"
    },
    {
      name: "Saturn",
      type: "Gas giant",
      position: "Sixth",
      description: "Saturn is surrounded by a broad system of icy rings.",
      fact: "Its rings contain countless particles of ice, rock, and dust.",
      color: "#e6cc91"
    },
    {
      name: "Uranus",
      type: "Ice giant",
      position: "Seventh",
      description: "Uranus is an ice giant with a blue-green atmosphere.",
      fact: "Uranus rotates on its side compared with the plane of its orbit.",
      color: "#87d8db"
    },
    {
      name: "Neptune",
      type: "Ice giant",
      position: "Eighth",
      description: "Neptune is the farthest planet from the Sun.",
      fact: "Methane in Neptune's atmosphere absorbs red light.",
      color: "#5484e8"
    }
  ];

  let renderer;

  try {
    const THREE = await import(
      "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js"
    );

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#070b18");

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const canvas = renderer.domElement;
    canvas.setAttribute("role", "img");
    container.replaceChildren(canvas);
    container.setAttribute("aria-busy", "false");

    scene.add(new THREE.AmbientLight(0xffffff, 1.4));

    const sunlight = new THREE.DirectionalLight(0xfff4df, 3);
    sunlight.position.set(-3, 2, 4);
    scene.add(sunlight);

    const world = new THREE.Group();
    scene.add(world);

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 48),
      new THREE.MeshStandardMaterial({ roughness: 0.95 })
    );
    world.add(globe);

    const rings = new THREE.Mesh(
      new THREE.RingGeometry(1.25, 2, 96),
      new THREE.MeshStandardMaterial({
        color: "#cdb58e",
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        roughness: 1
      })
    );
    rings.rotation.x = Math.PI / 2;
    world.add(rings);

    const starPositions = [];
    for (let i = 0; i < 600; i++) {
      starPositions.push(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 25,
        -5 - Math.random() * 20
      );
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3)
    );
    scene.add(new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: "#b7c9ef", size: 0.03 })
    ));

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let autoRotate = !reducedMotion.matches;
    let dragging = false;
    let previousX = 0;
    let previousY = 0;
    let selectionVersion = 0;

    const loader = new THREE.TextureLoader();

    function updateRotationButton() {
      rotationButton.setAttribute("aria-pressed", String(autoRotate));
      rotationButton.textContent = autoRotate
        ? "Pause rotation"
        : "Auto-rotate";
    }

    function updateCamera() {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      const distance = 10 - Number(zoom.value) * 0.045;
      camera.aspect = width / height;
      camera.position.z = distance / Math.min(1, camera.aspect);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    function resetView() {
      world.rotation.set(0.2, 0, -0.12);
      zoom.value = "35";
      updateCamera();
    }

function selectPlanet(name) {
      const data = planetData.find((planet) => planet.name === name);
      const version = ++selectionVersion;

      document.querySelector("#planet-name").textContent = data.name;
      document.querySelector("#planet-description").textContent =
        data.description;
      document.querySelector("#planet-type").textContent = data.type;
      document.querySelector("#planet-position").textContent =
        data.position;
      document.querySelector("#planet-fact").textContent = data.fact;

      canvas.setAttribute(
        "aria-label",
        "Interactive 3D model of " + data.name +
        ". Use the controls to rotate and zoom."
      );

      if (globe.material.map) {
        globe.material.map.dispose();
      }

      globe.material.map = null;
      globe.material.color.set(data.color);
      globe.material.needsUpdate = true;
      rings.visible = data.name === "Saturn";

      status.textContent = "Loading " + name + "'s texture...";
      resetView();

      const texturePath =
        "assets/textures/solar-system/" +
        name.toLowerCase() +
        ".jpg";

      loader.load(
        texturePath,
        (texture) => {
          if (version !== selectionVersion) {
            texture.dispose();
            return;
          }

          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = Math.min(
            8,
            renderer.capabilities.getMaxAnisotropy()
          );

          globe.material.map = texture;
          globe.material.color.set("#ffffff");
          globe.material.needsUpdate = true;

          status.textContent = name + " ready. Drag to explore.";
        },
        undefined,
        () => {
          if (version === selectionVersion) {
            status.textContent =
              name + "'s texture could not load. Check " +
              texturePath;
          }
        }
      );
    }

    selector.replaceChildren();

    for (const planet of planetData) {
      const option = document.createElement("option");
      option.value = planet.name;
      option.textContent = planet.name;
      selector.append(option);
    }

    selector.value = "Earth";
    selector.addEventListener("change", () => {
      selectPlanet(selector.value);
    });

    zoom.addEventListener("input", updateCamera);

    document.querySelector("#rotate-left").addEventListener("click", () => {
      world.rotation.y -= 0.3;
    });

    document.querySelector("#rotate-right").addEventListener("click", () => {
      world.rotation.y += 0.3;
    });

    rotationButton.addEventListener("click", () => {
      autoRotate = !autoRotate;
      updateRotationButton();
    });

    document.querySelector("#reset-view").addEventListener("click", resetView);

    canvas.addEventListener("pointerdown", (event) => {
      if (!event.isPrimary || event.button !== 0) return;

      dragging = true;
      previousX = event.clientX;
      previousY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    });

    canvas.addEventListener("pointermove", (event) => {
      if (!dragging || !event.isPrimary) return;

      world.rotation.y += (event.clientX - previousX) * 0.008;
      world.rotation.x += (event.clientY - previousY) * 0.008;
      world.rotation.x = THREE.MathUtils.clamp(
        world.rotation.x, -1.3, 1.3
      );

      previousX = event.clientX;
      previousY = event.clientY;
    });

    canvas.addEventListener("lostpointercapture", () => {
      dragging = false;
    });

    canvas.addEventListener("pointerup", (event) => {
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    });

    canvas.addEventListener("pointercancel", () => {
      dragging = false;
    });

    reducedMotion.addEventListener("change", () => {
      if (reducedMotion.matches) {
        autoRotate = false;
        updateRotationButton();
      }
    });

    new ResizeObserver(updateCamera).observe(container);

    updateRotationButton();
    selectPlanet("Earth");
    selector.disabled = false;
    controls.disabled = false;

    let previousTime = null;

    renderer.setAnimationLoop((time) => {
      const delta = previousTime === null
        ? 0
        : Math.min((time - previousTime) / 1000, 0.05);

      previousTime = time;

      if (autoRotate && !dragging && !document.hidden) {
        world.rotation.y += delta * 0.12;
      }

      renderer.render(scene, camera);
    });
  } catch (error) {
    console.error("Planet Explorer failed:", error);

    if (renderer) {
      renderer.setAnimationLoop(null);
      renderer.dispose();
    }

    selector.disabled = true;
    controls.disabled = true;
    container.setAttribute("aria-busy", "false");

    const message = document.createElement("p");
    message.className = "scene-placeholder";
    message.textContent = "The 3D viewer could not start.";
    container.replaceChildren(message);

    status.textContent =
      "Check your internet connection and browser Console, then refresh.";
  }
}

startExplorer();