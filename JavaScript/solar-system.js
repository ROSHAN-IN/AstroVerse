"use strict";

async function startSolarSystem() {
  const container = document.querySelector("#solar-system-view");
  if (!container) return;

  const placeholder = container.querySelector(".scene-placeholder");
  if (placeholder) placeholder.textContent = "Loading the Sun…";

  try {
    const THREE = await import(
      "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js"
    );

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050914);

    const canvas = renderer.domElement;
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", "A golden Sun with a granular surface, dark sunspots and a glowing corona.");
    container.replaceChildren(canvas);

    // The shader calculates the colour at each visible point on the sphere.
    const surface = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vPoint;
        varying vec3 vNormal;
        varying vec3 vToCamera;

        void main() {
          vPoint = normalize(position);
          vec4 viewPoint = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalMatrix * normal;
          vToCamera = -viewPoint.xyz;
          gl_Position = projectionMatrix * viewPoint;
        }
      `,
      fragmentShader: `
        varying vec3 vPoint;
        varying vec3 vNormal;
        varying vec3 vToCamera;

        float hash(vec3 p) {
          p = fract(p * 0.3183099 + vec3(0.11, 0.27, 0.43));
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        float noise3(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
            f.z);
        }

        void main() {
          vec3 p = normalize(vPoint);
          float broad = noise3(p * 6.0);
          vec3 warped = p * 54.0 + 1.8 * vec3(
            broad, noise3(p * 8.0 + 9.0), noise3(p * 7.0 + 17.0)
          );
          float cells = noise3(warped);
          float seams = 1.0 - smoothstep(0.02, 0.14, abs(cells - 0.5));
          float heat = clamp(0.25 + 0.5 * cells + 0.32 * broad
                             - 0.26 * seams, 0.0, 1.0);
          vec3 colour = mix(vec3(0.65, 0.12, 0.009),
                            vec3(1.0, 0.82, 0.29), heat);

          // Irregular spots rotate with the surface.
          float d = min(distance(p, normalize(vec3(-0.31, 0.16, 1.0))),
                        1.6 * distance(p, normalize(vec3(-0.21, 0.12, 1.0))));
          d += 0.015 * (cells - 0.5);
          colour *= mix(0.22, 1.0, smoothstep(0.012, 0.052, d));

          // The visible solar surface grows darker toward its edge.
          float facing = max(dot(normalize(vNormal), normalize(vToCamera)), 0.0);
          colour *= 0.48 + 0.52 * sqrt(facing);
          gl_FragColor = vec4(colour, 1.0);
          #include <colorspace_fragment>
        }
      `
    });

    const sun = new THREE.Mesh(new THREE.SphereGeometry(1.25, 80, 56), surface);
    scene.add(sun);

    // A transparent radial texture gives the corona a soft outer edge.
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = glowCanvas.height = 256;
    const ctx = glowCanvas.getContext("2d");
    const glow = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    glow.addColorStop(0, "rgba(255,178,60,0.7)");
    glow.addColorStop(0.59, "rgba(255,151,42,0.55)");
    glow.addColorStop(0.66, "rgba(255,119,25,0.20)");
    glow.addColorStop(0.80, "rgba(255,98,16,0.06)");
    glow.addColorStop(1, "rgba(255,80,8,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 256, 256);

    const glowTexture = new THREE.CanvasTexture(glowCanvas);
    glowTexture.colorSpace = THREE.SRGBColorSpace;
    const corona = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    corona.scale.set(4.4, 4.4, 1);
    corona.position.z = -0.25;
    scene.add(corona);

    const positions = [];
    for (let i = 0; i < 750; i++) {
      positions.push((Math.random() - 0.5) * 40,
                     (Math.random() - 0.5) * 24,
                     -4 - Math.random() * 24);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    scene.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({
      color: 0xcad9ff, size: 0.035
    })));

    function resize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = 6 / Math.min(1, camera.aspect);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    new ResizeObserver(resize).observe(container);
    resize();
// Make room for the orbits while keeping the existing Sun and corona.
    sun.scale.setScalar(0.22);
    corona.scale.set(0.968, 0.968, 1);
    corona.position.z = -0.055;

    // Each row gives the planet's name, colour, radius, orbit size and speed.
    const planetData = [
      { name: "Mercury", color: "#aaa39b", radius: 0.030, orbit: 0.40, speed: 0.85 },
      { name: "Venus",   color: "#edc788", radius: 0.050, orbit: 0.54, speed: 0.65 },
      { name: "Earth",   color: "#478fe8", radius: 0.055, orbit: 0.70, speed: 0.52 },
      { name: "Mars",    color: "#d57650", radius: 0.038, orbit: 0.86, speed: 0.42 },
      { name: "Jupiter", color: "#d7ab89", radius: 0.110, orbit: 1.08, speed: 0.24 },
      { name: "Saturn",  color: "#e6cc91", radius: 0.085, orbit: 1.36, speed: 0.18 },
      { name: "Uranus",  color: "#87d8db", radius: 0.063, orbit: 1.62, speed: 0.13 },
      { name: "Neptune", color: "#5484e8", radius: 0.061, orbit: 1.88, speed: 0.10 }
    ];

    // Tilt the orbital plane so we can see planets pass in front of the Sun.
    const orbitalPlane = new THREE.Group();
    orbitalPlane.rotation.x = -0.85;
    scene.add(orbitalPlane);

    // Sunlight illuminates the inward-facing side of every planet.
    scene.add(new THREE.PointLight(0xffedce, 5, 0, 2));
    scene.add(new THREE.AmbientLight(0xffffff, 0.65));

    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0x7184a8,
      transparent: true,
      opacity: 0.35
    });

    const planets = planetData.map((data, index) => {
      const orbitPoints = [];
      for (let i = 0; i < 128; i++) {
        const angle = (i / 128) * Math.PI * 2;
        orbitPoints.push(new THREE.Vector3(
          Math.cos(angle) * data.orbit,
          Math.sin(angle) * data.orbit,
          0
        ));
      }

      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      orbitalPlane.add(new THREE.LineLoop(orbitGeometry, orbitMaterial));

      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(data.radius, 32, 24),
        new THREE.MeshStandardMaterial({ color: data.color, roughness: 1 })
      );
      mesh.name = data.name;
      // Give every planet a visible size.
      const rockyPlanets = ["Mercury", "Venus", "Earth", "Mars"];
      const size = rockyPlanets.includes(data.name) ? 1.8 : 1.25;
      mesh.scale.setScalar(size);

      // Match each planet to its downloaded image.
      const texturePath =
        `assets/textures/solar-system/${data.name.toLowerCase()}.jpg`;

      new THREE.TextureLoader().load(
        texturePath,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          mesh.material.map = texture;

          // Let the image supply the surface colours.
          mesh.material.color.set("#ffffff");
          mesh.material.needsUpdate = true;
        },
        undefined,
        (error) => {
          console.error(`Could not load ${texturePath}`, error);
        }
      );
      orbitalPlane.add(mesh);

      if (data.name === "Saturn") {
        const rings = new THREE.Mesh(
          new THREE.RingGeometry(data.radius * 1.3, data.radius * 1.95, 64),
          new THREE.MeshBasicMaterial({
            color: 0xd8bd92,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.75
          })
        );
        rings.rotation.x = 0.35;
        mesh.add(rings);
      }

      // Start planets at different points instead of lining them up.
      return { mesh, orbit: data.orbit, speed: data.speed, angle: index * 2.4 };
    });
    // Planet selection updates the existing spotlight section.
    const spotlightTitle = document.querySelector("#planet-title");
    const spotlightDescription = document.querySelector(
      "#planet-description"
    );

    const planetFacts = {
      Mercury: "Mercury is the closest planet to the Sun and the smallest planet in our solar system.",
      Venus: "Venus has a thick atmosphere that traps heat. It is the hottest planet in our solar system.",
      Earth: "Earth is the third planet from the Sun and the only world currently known to support life.",
      Mars: "Mars is a rocky planet. Iron minerals in its surface give it its familiar reddish appearance.",
      Jupiter: "Jupiter is the largest planet in our solar system. Its Great Red Spot is a giant storm.",
      Saturn: "Saturn is a gas giant surrounded by rings made mostly of ice particles, with rock and dust.",
      Uranus: "Uranus is an ice giant that rotates on its side compared with the plane of its orbit.",
      Neptune: "Neptune is the farthest planet from the Sun. Methane in its atmosphere absorbs red light."
    };

    if (spotlightTitle && spotlightDescription) {
      const selectionContainer = document.createElement("div");
      const selectionLabel = document.createElement("label");
      const planetSelect = document.createElement("select");

      selectionLabel.htmlFor = "planet-select";
      selectionLabel.textContent = "Choose a planet";
      selectionLabel.style.display = "block";
      selectionLabel.style.marginBottom = "8px";

      planetSelect.id = "planet-select";

      Object.assign(planetSelect.style, {
        width: "100%",
        maxWidth: "320px",
        padding: "12px",
        marginBottom: "20px",
        border: "1px solid #79e7ff",
        borderRadius: "10px",
        background: "#10182c",
        color: "#f0f4ff",
        font: "inherit"
      });

      for (const planet of planets) {
        const option = document.createElement("option");
        option.value = planet.mesh.name;
        option.textContent = planet.mesh.name;
        planetSelect.append(option);
      }

      selectionContainer.append(selectionLabel, planetSelect);
      spotlightDescription.before(selectionContainer);

      spotlightDescription.setAttribute("role", "status");
      spotlightDescription.setAttribute("aria-atomic", "true");

      function selectPlanet(name) {
        spotlightTitle.textContent = name;
        spotlightDescription.textContent = planetFacts[name];
        planetSelect.value = name;
      }

      planetSelect.addEventListener("change", () => {
        selectPlanet(planetSelect.value);
      });

      // Convert the clicked screen position into a ray through the scene.
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const selectableMeshes = planets.map((planet) => planet.mesh);

      canvas.addEventListener("click", (event) => {
        const bounds = canvas.getBoundingClientRect();
        const clickX = event.clientX - bounds.left;
        const clickY = event.clientY - bounds.top;

        pointer.x = (clickX / bounds.width) * 2 - 1;
        pointer.y = -(clickY / bounds.height) * 2 + 1;

        scene.updateMatrixWorld(true);
        raycaster.setFromCamera(pointer, camera);

        // Detect planet bodies and Saturn's rings.
        const hits = raycaster.intersectObjects(selectableMeshes, true);

        if (hits.length > 0) {
          const clickedObject = hits[0].object;
          const selected = planets.find((planet) =>
            planet.mesh === clickedObject ||
            planet.mesh.children.includes(clickedObject)
          );

          if (selected) {
            selectPlanet(selected.mesh.name);
            return;
          }
        }

        // Make small planets easier to click.
        let nearestPlanet = null;
        let nearestDistance = 18;

        for (const planet of planets) {
          const position = new THREE.Vector3();
          planet.mesh.getWorldPosition(position);
          position.project(camera);

          if (position.z < -1 || position.z > 1) continue;

          const screenX = (position.x + 1) * bounds.width / 2;
          const screenY = (1 - position.y) * bounds.height / 2;
          const distance = Math.hypot(
            clickX - screenX,
            clickY - screenY
          );

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestPlanet = planet;
          }
        }

        if (nearestPlanet) {
          selectPlanet(nearestPlanet.mesh.name);
        }
      });

      selectPlanet("Earth");
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let previousTime = null;
    renderer.setAnimationLoop((time) => {
      const seconds = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      if (!reducedMotion.matches) sun.rotation.y += seconds * 0.055;
    for (const planet of planets) {
        if (!reducedMotion.matches) {
          planet.angle += seconds * planet.speed;
          planet.mesh.rotation.y += seconds * 0.2;
        }
        planet.mesh.position.set(
          Math.cos(planet.angle) * planet.orbit,
          Math.sin(planet.angle) * planet.orbit,
          0
        );
      }  
      renderer.render(scene, camera);
    });
  } catch (error) {
    console.error("Solar scene failed:", error);
    container.textContent = "The Sun could not load. Check the browser console.";
  }
}

startSolarSystem();