// "Myst Orbit" — the hub's 3D hero scene, in plain three.js (no R3F) to keep
// the lazy chunk small. Myst-Core sits in the middle; every product orbits it.
// Live products are connected: a beam with request "packets" travelling to
// the core and back. Products still in development show only their planet.
// (AI apps that run through Myst-Core sit on the inner ring, the rest outside.)
//
// Loaded on demand by MystOrbit.jsx. Labels are DOM elements owned by React;
// this module only moves them (style.transform) every frame.
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Group,
  Mesh,
  SphereGeometry,
  IcosahedronGeometry,
  TorusGeometry,
  EdgesGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  MeshPhysicalMaterial,
  MeshBasicMaterial,
  LineBasicMaterial,
  PointsMaterial,
  LineSegments,
  Line,
  LineLoop,
  Points,
  HemisphereLight,
  DirectionalLight,
  PointLight,
  Color,
  Vector2,
  Vector3,
  Raycaster,
  SRGBColorSpace,
} from 'three';

const readVar = (name) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const [r, g, b] = v.split(/\s+/).map(Number);
  return new Color(r / 255, g / 255, b / 255);
};

const easeOut = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

function circlePoints(radius, segments = 160) {
  const pts = [];
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(Math.cos(a) * radius, 0, Math.sin(a) * radius);
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pts, 3));
  return g;
}

export function createOrbitScene(container, { products, labels, coreLabel, reduceMotion, onHover, onSelect }) {
  const small = container.clientWidth < 520;

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.display = 'block';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 6, 12); // real framing is set in resize()

  // --- Lights (warm, soft) ---
  const hemi = new HemisphereLight(0xfff4ea, 0xd9c8b8, 1.6);
  const key = new DirectionalLight(0xffffff, 1.6);
  key.position.set(4, 6, 6);
  const glow = new PointLight(0xe8835a, 6, 12, 1.6);
  scene.add(hemi, key, glow);

  const root = new Group();
  root.rotation.x = 0.08;
  scene.add(root);

  const disposables = [];
  const track = (...items) => {
    disposables.push(...items);
    return items[0];
  };

  // --- Myst-Core ---
  const peach = readVar('--warm-peach');
  const coreMat = track(
    new MeshPhysicalMaterial({
      color: peach,
      roughness: 0.28,
      metalness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      emissive: peach,
      emissiveIntensity: 0.18,
    }),
  );
  const core = new Mesh(track(new SphereGeometry(1, 64, 64)), coreMat);
  root.add(core);

  const shellMat = track(new LineBasicMaterial({ color: readVar('--warm-ink'), transparent: true, opacity: 0.22 }));
  const shell = new LineSegments(track(new EdgesGeometry(track(new IcosahedronGeometry(1.5, 1)))), shellMat);
  root.add(shell);

  const haloMat = track(new MeshBasicMaterial({ color: peach, transparent: true, opacity: 0.55 }));
  const halo = new Mesh(track(new TorusGeometry(1.95, 0.014, 8, 160)), haloMat);
  halo.rotation.x = Math.PI / 2.3;
  root.add(halo);

  // --- Orbits: AI apps (via Myst-Core) on the inner ring, the rest outside ---
  const lineMat = track(new LineBasicMaterial({ color: readVar('--warm-muted'), transparent: true, opacity: 0.35 }));
  const inner = products.filter((p) => p.poweredByCore);
  const outer = products.filter((p) => !p.poweredByCore);
  const outerRadius = outer.length ? 4.1 : 3.0;
  const rings = [
    { radius: 3.0, tilt: 0.12, speed: 0.16, items: inner },
    { radius: 4.1, tilt: -0.16, speed: -0.1, items: outer },
  ].filter((r) => r.items.length);

  const orbs = []; // { product, mesh, ring, angle0, beam, packets, index }
  rings.forEach((ring) => {
    const pivot = new Group();
    pivot.rotation.z = ring.tilt;
    root.add(pivot);
    ring.pivot = pivot;
    ring.angle = 0;
    pivot.add(new LineLoop(track(circlePoints(ring.radius)), lineMat));

    ring.items.forEach((product, i) => {
      const color = new Color(product.color);
      const building = product.status !== 'live';
      const mat = track(
        new MeshPhysicalMaterial({
          color,
          roughness: 0.3,
          clearcoat: 1,
          clearcoatRoughness: 0.2,
          emissive: color,
          emissiveIntensity: 0.12,
          transparent: building,
          opacity: building ? 0.55 : 1,
        }),
      );
      const mesh = new Mesh(track(new SphereGeometry(small ? 0.4 : 0.36, 48, 48)), mat);
      const ringMat = track(new MeshBasicMaterial({ color, transparent: true, opacity: building ? 0.7 : 0.35 }));
      const orbRing = new Mesh(track(new TorusGeometry(0.56, 0.012, 6, 64)), ringMat);
      orbRing.rotation.x = Math.PI / 2;
      mesh.add(orbRing);
      mesh.userData.index = products.indexOf(product);
      pivot.add(mesh);

      const orb = {
        product,
        mesh,
        ring,
        angle0: (i / ring.items.length) * Math.PI * 2 + (ring === rings[0] ? 0.4 : 1.2),
        index: products.indexOf(product),
        scale: 0,
        hoverScale: 1,
        labelShift: 0, // eased vertical nudge that keeps labels from overlapping
      };

      if (product.status === 'live') {
        const beamGeo = track(new BufferGeometry());
        beamGeo.setAttribute('position', new Float32BufferAttribute(new Float32Array(6), 3));
        const beamMat = track(new LineBasicMaterial({ color, transparent: true, opacity: 0.35 }));
        orb.beam = new Line(beamGeo, beamMat);
        root.add(orb.beam);
        const packetGeo = track(new SphereGeometry(0.055, 12, 12));
        const packetMat = track(new MeshBasicMaterial({ color }));
        orb.packets = [0, 0.5].map((offset) => {
          const m = new Mesh(packetGeo, packetMat);
          root.add(m);
          return { mesh: m, offset: offset + i * 0.17 };
        });
      }
      orbs.push(orb);
    });
  });

  // --- Dust particles for depth ---
  const count = small ? 120 : 240;
  const dust = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 5.5 + Math.random() * 4;
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    dust[i * 3] = r * Math.sin(p) * Math.cos(t);
    dust[i * 3 + 1] = r * Math.cos(p) * 0.6;
    dust[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
  }
  const dustGeo = track(new BufferGeometry());
  dustGeo.setAttribute('position', new Float32BufferAttribute(dust, 3));
  const dustMat = track(new PointsMaterial({ color: readVar('--warm-muted'), size: 0.05, transparent: true, opacity: 0.55 }));
  const dustPoints = new Points(dustGeo, dustMat);
  root.add(dustPoints);

  // --- Theme sync (light/dark via class on <html>) ---
  const applyTheme = () => {
    const p = readVar('--warm-peach');
    coreMat.color.copy(p);
    coreMat.emissive.copy(p);
    haloMat.color.copy(p);
    shellMat.color.copy(readVar('--warm-ink'));
    lineMat.color.copy(readVar('--warm-muted'));
    dustMat.color.copy(readVar('--warm-muted'));
    const dark = document.documentElement.classList.contains('dark');
    hemi.intensity = dark ? 1.1 : 1.6;
    shellMat.opacity = dark ? 0.3 : 0.22;
    requestRender();
  };
  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  // --- Interaction ---
  const pointer = new Vector2(0, 0);
  const parallax = { x: 0, y: 0 };
  const raycaster = new Raycaster();
  let hovered = -1;
  let external = -1; // highlight requested from a DOM label

  const setHovered = (i) => {
    if (i === hovered) return;
    hovered = i;
    renderer.domElement.style.cursor = i >= 0 ? 'pointer' : '';
    onHover?.(i);
    requestRender();
  };

  const onPointerMove = (e) => {
    const r = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(orbs.map((o) => o.mesh), false)[0];
    setHovered(hit ? hit.object.userData.index : -1);
    requestRender();
  };
  const onPointerLeave = () => {
    pointer.set(0, 0);
    setHovered(-1);
  };
  const onClick = () => {
    if (hovered >= 0) onSelect?.(hovered);
  };
  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('pointerleave', onPointerLeave);
  renderer.domElement.addEventListener('click', onClick);

  // --- Sizing ---
  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    camera.aspect = w / h;
    // Pull back until the outermost orbit (plus its orbs) fits horizontally
    const halfFov = Math.tan((camera.fov * Math.PI) / 360);
    const margin = w < 520 ? 0.2 : 0.55;
    const z = Math.max(9, ((outerRadius + margin) * 1.02) / (halfFov * camera.aspect));
    // Look down on the orbits (~27°) so they read as rings, not flat lines
    camera.position.set(0, z * 0.5, z);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    requestRender();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  // --- Loop (pauses off-screen / hidden tab; renders on demand when reduced) ---
  let visible = true;
  let raf = 0;
  let last = performance.now();
  let time = 0;
  const start = performance.now();
  const tmp = new Vector3();
  const corePos = new Vector3();

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) kick();
  });
  io.observe(container);
  const onVisibility = () => {
    if (!document.hidden) kick();
  };
  document.addEventListener('visibilitychange', onVisibility);

  function frame(now) {
    raf = 0;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const intro = reduceMotion ? 1 : easeOut((now - start) / 1400);
    const active = hovered >= 0 ? hovered : external;
    const slow = active >= 0 ? 0.25 : 1;
    if (!reduceMotion) time += dt * slow;

    // Parallax follows the pointer gently
    const px = reduceMotion ? 0 : pointer.x * 0.25;
    const py = reduceMotion ? 0 : pointer.y * 0.12;
    parallax.x += (px - parallax.x) * 0.05;
    parallax.y += (py - parallax.y) * 0.05;
    root.rotation.y = parallax.x + (reduceMotion ? 0 : time * 0.04);
    root.rotation.x = 0.08 - parallax.y;

    const s = 0.6 + 0.4 * intro;
    core.scale.setScalar(s * (1 + (reduceMotion ? 0 : Math.sin(time * 1.6) * 0.025)));
    shell.rotation.y = time * 0.22;
    shell.rotation.x = time * 0.1;
    halo.rotation.z = time * 0.3;
    glow.intensity = 5 + (reduceMotion ? 0 : Math.sin(time * 2) * 1.2);
    dustPoints.rotation.y = -time * 0.02;
    core.getWorldPosition(corePos);

    rings.forEach((ring) => {
      ring.angle = time * ring.speed;
    });

    const w = container.clientWidth;
    const h = container.clientHeight;
    const placed = []; // label boxes this frame, resolved for overlaps below
    orbs.forEach((orb, k) => {
      const a = orb.angle0 + orb.ring.angle;
      orb.mesh.position.set(Math.cos(a) * orb.ring.radius, 0, Math.sin(a) * orb.ring.radius);
      const appear = reduceMotion ? 1 : easeOut((now - start - 250 - k * 120) / 900);
      orb.hoverScale += ((orb.index === active ? 1.35 : 1) - orb.hoverScale) * 0.15;
      orb.mesh.scale.setScalar(Math.max(appear, 0.001) * orb.hoverScale);
      orb.mesh.rotation.y = time * 0.8;

      orb.mesh.getWorldPosition(tmp);
      if (orb.beam) {
        const local = root.worldToLocal(tmp.clone());
        const arr = orb.beam.geometry.attributes.position.array;
        arr[0] = local.x;
        arr[1] = local.y;
        arr[2] = local.z;
        arr[3] = 0;
        arr[4] = 0;
        arr[5] = 0;
        orb.beam.geometry.attributes.position.needsUpdate = true;
        orb.beam.material.opacity = (orb.index === active ? 0.8 : 0.3) * appear;
        orb.packets.forEach((pk) => {
          // ping-pong: product -> core -> product
          const t = (time * 0.45 + pk.offset) % 1;
          const f = t < 0.5 ? t * 2 : 2 - t * 2;
          pk.mesh.position.copy(local).multiplyScalar(1 - f);
          pk.mesh.visible = !reduceMotion && appear > 0.9;
        });
      }

      // DOM label follows the orb
      const el = labels[orb.index];
      if (el) {
        tmp.y += 0.62 * orb.hoverScale;
        const depth = tmp.z;
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * w;
        const y = (-tmp.y * 0.5 + 0.5) * h;
        placed.push({ orb, el, x, y, depth, appear, lw: el.offsetWidth, lh: el.offsetHeight });
      }
    });

    // Keep labels readable: the label nearer the camera keeps its spot, any
    // label behind it that would overlap is nudged upward (eased, no jumps).
    placed.sort((a, b) => b.depth - a.depth);
    // The "Myst-Core" label under the core is a fixed obstacle that never moves
    if (coreLabel) {
      tmp.set(0, -1.25 * s, 0).applyMatrix4(root.matrixWorld).project(camera);
      const ch = coreLabel.offsetHeight;
      placed.unshift({ core: true, x: (tmp.x * 0.5 + 0.5) * w, y: (-tmp.y * 0.5 + 0.5) * h + ch, lw: coreLabel.offsetWidth, lh: ch, orb: { labelShift: 0 } });
    }
    placed.forEach((a, i) => {
      if (a.core) return;
      let target = 0;
      for (let pass = 0; pass < 2; pass++) {
        for (let j = 0; j < i; j++) {
          const b = placed[j];
          const ay = a.y + target;
          const by = b.y + b.orb.labelShift;
          if (Math.abs(a.x - b.x) < (a.lw + b.lw) / 2 + 6 && Math.abs(ay - by) < a.lh + 4) {
            target = by - a.lh - 6 - a.y;
          }
        }
      }
      a.orb.labelShift = reduceMotion ? target : a.orb.labelShift + (target - a.orb.labelShift) * 0.2;
      const y = a.y + a.orb.labelShift;
      a.el.style.transform = `translate(${a.x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -100%)`;
      a.el.style.opacity = String(a.appear * (a.depth < -0.8 ? 0.55 : 1));
      a.el.style.zIndex = String(Math.round(100 + a.depth * 10));
    });

    // Core label sits just under the core
    if (coreLabel) {
      tmp.set(0, -1.25 * s, 0).applyMatrix4(root.matrixWorld).project(camera);
      coreLabel.style.transform = `translate(${((tmp.x * 0.5 + 0.5) * w).toFixed(1)}px, ${((-tmp.y * 0.5 + 0.5) * h).toFixed(1)}px) translate(-50%, 0)`;
      coreLabel.style.opacity = String(intro);
    }

    renderer.render(scene, camera);

    const animating = !reduceMotion || Math.abs(parallax.x - px) > 0.001 || orbs.some((o) => Math.abs(o.hoverScale - (o.index === active ? 1.35 : 1)) > 0.001);
    if (visible && !document.hidden && animating) raf = requestAnimationFrame(frame);
  }

  function kick() {
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }
  function requestRender() {
    kick();
  }

  resize();
  kick();

  return {
    highlight(i) {
      external = i;
      requestRender();
    },
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
      renderer.domElement.removeEventListener('click', onClick);
      disposables.forEach((d) => d.dispose?.());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
