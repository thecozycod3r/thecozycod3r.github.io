import * as THREE from 'three';

/**
 * The business, drawn as a constellation.
 *
 * Four clusters left to right — win clients, run the work, prove results,
 * watch the money — linked inside and across. Signal-yellow pulses travel
 * the bridges from one stage to the next: the work flowing through the
 * system. The pointer tilts the camera; scrolling out of the hero flies it
 * forward through the field.
 *
 * Behaviour contract (Website Master Design §10):
 * - Runtime: Three.js, one scene, points + line segments, additive blending
 * - DPR capped at 1.75; renders only while visible and the tab is shown
 * - Reduced motion: one still frame, no loop
 * - Context loss: stops cleanly, the CSS gradient behind remains
 * - Teardown releases every geometry, material, listener and the renderer
 */
export interface Constellation {
  setScroll(p: number): void;
  dispose(): void;
}

const STAGES = 4;
const NODES_PER_STAGE = 46;
const DUST = 600;
const PULSES = 26;

function rand(seed: number) {
  // Deterministic, so the drawing is the same on every visit.
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

export function createConstellation(canvas: HTMLCanvasElement, opts: { reduce: boolean }): Constellation {
  const r = rand(7);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  // Soft additive points don't need retina resolution; 1.25x keeps a 120 Hz budget.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 14);

  // ── Nodes ────────────────────────────────────────────────────────────
  const centres: THREE.Vector3[] = [];
  const stagePoints: THREE.Vector3[][] = [];
  const nodePos: number[] = [];
  const nodeSize: number[] = [];
  for (let s = 0; s < STAGES; s++) {
    const c = new THREE.Vector3((s - 1.5) * 5.4, (r() - 0.5) * 1.6, (r() - 0.5) * 2);
    centres.push(c);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < NODES_PER_STAGE; i++) {
      const rad = 0.4 + Math.pow(r(), 0.7) * 2.3;
      const th = r() * Math.PI * 2;
      const ph = Math.acos(2 * r() - 1);
      const p = new THREE.Vector3(
        c.x + rad * Math.sin(ph) * Math.cos(th) * 0.9,
        c.y + rad * Math.cos(ph) * 0.75,
        c.z + rad * Math.sin(ph) * Math.sin(th),
      );
      pts.push(p);
      nodePos.push(p.x, p.y, p.z);
      nodeSize.push(i === 0 ? 3.2 : 0.6 + r() * 1.4);
    }
    stagePoints.push(pts);
  }

  const dotTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d')!;
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.35, 'rgba(255,255,255,0.55)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();

  // Additive soft dots with a depth fade (stands in for fog, no chunk surgery).
  const pointMat = (color: number, size: number, opacity: number) =>
    new THREE.ShaderMaterial({
      uniforms: {
        uTex: { value: dotTex },
        uColor: { value: new THREE.Color(color) },
        uSize: { value: size * renderer.getPixelRatio() },
        uOpacity: { value: opacity },
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        uniform float uSize;
        varying float vFade;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float d = -mv.z;
          vFade = 1.0 - smoothstep(14.0, 34.0, d);
          gl_PointSize = uSize * aSize * (10.0 / max(d, 0.1));
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D uTex; uniform vec3 uColor; uniform float uOpacity;
        varying float vFade;
        void main() {
          vec4 t = texture2D(uTex, gl_PointCoord);
          gl_FragColor = vec4(uColor, t.a * uOpacity * vFade);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

  const nodesGeo = new THREE.BufferGeometry();
  nodesGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePos, 3));
  nodesGeo.setAttribute('aSize', new THREE.Float32BufferAttribute(nodeSize, 1));
  const nodesMat = (pointMat(0xb9c8ff, 7, 0.95));
  const nodes = new THREE.Points(nodesGeo, nodesMat);

  // ── Ambient dust ─────────────────────────────────────────────────────
  const dustPos: number[] = [];
  const dustSize: number[] = [];
  for (let i = 0; i < DUST; i++) {
    dustPos.push((r() - 0.5) * 40, (r() - 0.5) * 18, (r() - 0.5) * 30 - 4);
    dustSize.push(0.3 + r() * 0.8);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.Float32BufferAttribute(dustPos, 3));
  dustGeo.setAttribute('aSize', new THREE.Float32BufferAttribute(dustSize, 1));
  const dustMat = (pointMat(0x6f89ff, 4, 0.5));
  const dust = new THREE.Points(dustGeo, dustMat);

  // ── Edges: near neighbours inside a stage, a few bridges across ──────
  const linePos: number[] = [];
  const bridges: [THREE.Vector3, THREE.Vector3][] = [];
  stagePoints.forEach((pts) => {
    pts.forEach((a, i) => {
      const near = pts
        .map((b, j) => ({ j, d: a.distanceToSquared(b) }))
        .filter((x) => x.j !== i)
        .sort((x, y) => x.d - y.d)
        .slice(0, 2);
      near.forEach(({ j }) => {
        if (j > i) linePos.push(a.x, a.y, a.z, pts[j].x, pts[j].y, pts[j].z);
      });
    });
  });
  for (let s = 0; s < STAGES - 1; s++) {
    const from = stagePoints[s];
    const to = stagePoints[s + 1];
    const byRight = [...from].sort((a, b) => b.x - a.x).slice(0, 5);
    const byLeft = [...to].sort((a, b) => a.x - b.x).slice(0, 5);
    byRight.forEach((a, k) => {
      const b = byLeft[k];
      bridges.push([a, b]);
      linePos.push(a.x, a.y, a.z, b.x, b.y, b.z);
    });
  }
  const linesGeo = new THREE.BufferGeometry();
  linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
  const linesMat = new THREE.LineBasicMaterial({ color: 0x6f89ff, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false });
  const lines = new THREE.LineSegments(linesGeo, linesMat);

  // ── Pulses travelling the bridges ────────────────────────────────────
  const pulseState = Array.from({ length: PULSES }, () => ({ b: Math.floor(r() * bridges.length), t: r(), v: 0.18 + r() * 0.22 }));
  const pulsePos = new Float32Array(PULSES * 3);
  const pulseGeo = new THREE.BufferGeometry();
  pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3));
  pulseGeo.setAttribute('aSize', new THREE.Float32BufferAttribute(new Array(PULSES).fill(2.4), 1));
  const pulseMat = (pointMat(0xffc21a, 9, 1));
  const pulses = new THREE.Points(pulseGeo, pulseMat);

  const group = new THREE.Group();
  group.add(lines, nodes, pulses);
  scene.add(group, dust);

  // ── Interaction state ────────────────────────────────────────────────
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let scroll = 0;
  const onPointer = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Fit all four stages on narrow screens by pulling the camera back.
    camera.position.z = w < 700 ? 22 : w < 1100 ? 17 : 14;
    camera.updateProjectionMatrix();
    // The loop may be off (reduced motion, offscreen): redraw the resized buffer once.
    renderer.render(scene, camera);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  // ── Loop, gated on visibility ────────────────────────────────────────
  let inView = true;
  let tabShown = document.visibilityState === 'visible';
  let raf = 0;
  let last = performance.now();
  let lost = false;

  const step = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;

    group.rotation.y = pointer.x * 0.22 + Math.sin(now * 0.00012) * 0.08;
    group.rotation.x = pointer.y * 0.12;
    dust.rotation.y += dt * 0.012;

    for (let i = 0; i < PULSES; i++) {
      const p = pulseState[i];
      p.t += dt * p.v;
      if (p.t > 1) {
        p.t = 0;
        p.b = Math.floor(Math.random() * bridges.length);
      }
      const [a, b] = bridges[p.b];
      pulsePos[i * 3] = a.x + (b.x - a.x) * p.t;
      pulsePos[i * 3 + 1] = a.y + (b.y - a.y) * p.t;
      pulsePos[i * 3 + 2] = a.z + (b.z - a.z) * p.t;
    }
    pulseGeo.attributes.position.needsUpdate = true;

    // Scroll out of the hero = fly forward into the field.
    camera.position.y = -scroll * 2;
    group.position.z = scroll * 9;
    linesMat.opacity = 0.22 * (1 - scroll * 0.7);
    renderer.render(scene, camera);
  };

  const loop = (now: number) => {
    step(now);
    raf = inView && tabShown && !lost ? requestAnimationFrame(loop) : 0;
  };
  const start = () => {
    if (opts.reduce || raf || lost || !inView || !tabShown) return;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const io = new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    if (inView) start();
    else stop();
  });
  io.observe(canvas);
  const onVis = () => {
    tabShown = document.visibilityState === 'visible';
    if (tabShown) start();
    else stop();
  };
  document.addEventListener('visibilitychange', onVis);

  const onLost = (e: Event) => {
    e.preventDefault();
    lost = true;
    stop();
  };
  canvas.addEventListener('webglcontextlost', onLost);

  // First frame immediately (and the only one under reduced motion).
  step(performance.now());
  start();

  return {
    setScroll(p) {
      // Reduced motion: the scene is a still drawing; scrolling does not move it.
      if (opts.reduce) return;
      scroll = Math.max(0, Math.min(1, p));
    },
    dispose() {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onLost);
      [nodesGeo, dustGeo, linesGeo, pulseGeo].forEach((g) => g.dispose());
      [nodesMat, dustMat, linesMat, pulseMat].forEach((m) => m.dispose());
      dotTex.dispose();
      renderer.dispose();
    },
  };
}
