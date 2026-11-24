"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const DROP_COUNT = 6;

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  // xy = posición UV (0..1), z = rotación (rad), w = escala
  uniform vec4 uCircle;
  uniform vec4 uTriangle;
  uniform vec4 uSquare;
  // xy = posición UV (0..1), z = radio
  uniform vec3 uDrops[${DROP_COUNT}];
  uniform float uSmoothK;
  uniform float uAspect;
  uniform float uTime;
  uniform float uWobble;

  varying vec2 vUv;

  vec2 rotate2D(vec2 p, float a) {
    float c = cos(a);
    float s = sin(a);
    return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
  }

  float sdCircle(vec2 p, float r) {
    return length(p) - r;
  }

  float sdRoundedTriangle(vec2 p, float r, float roundness) {
    const float k = 1.7320508;
    p.x = abs(p.x) - r;
    p.y = p.y + r / k;
    if (p.x + k * p.y > 0.0) {
      p = vec2(p.x - k * p.y, -k * p.x - p.y) * 0.5;
    }
    p.x -= clamp(p.x, -2.0 * r, 0.0);
    return -length(p) * sign(p.y) - roundness;
  }

  float sdRoundedSquare(vec2 p, float r, float roundness) {
    vec2 q = abs(p) - vec2(r - roundness);
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - roundness;
  }

  float smin(float a, float b, float k) {
    if (k <= 0.0001) return min(a, b);
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  void main() {
    vec2 p = vec2((vUv.x - 0.5) * uAspect, vUv.y - 0.5);

    vec2 cPos = vec2((uCircle.x - 0.5) * uAspect, uCircle.y - 0.5);
    vec2 tPos = vec2((uTriangle.x - 0.5) * uAspect, uTriangle.y - 0.5);
    vec2 sPos = vec2((uSquare.x - 0.5) * uAspect, uSquare.y - 0.5);

    vec2 cp = p - cPos;
    float wobbleC = sin(cp.x * 38.0 + uTime * 2.1) * cos(cp.y * 34.0 - uTime * 1.7);
    float dCircle = sdCircle(cp, 0.095 * uCircle.w) + wobbleC * uWobble;

    vec2 tp = rotate2D(p - tPos, uTriangle.z);
    float wobbleT = sin(tp.x * 36.0 - uTime * 2.3) * cos(tp.y * 40.0 + uTime * 1.8);
    float dTriangle = sdRoundedTriangle(tp, 0.095 * uTriangle.w, 0.015 * uTriangle.w) + wobbleT * uWobble;

    vec2 sp = rotate2D(p - sPos, uSquare.z);
    float wobbleS = sin(sp.x * 34.0 + uTime * 1.9) * cos(sp.y * 38.0 - uTime * 2.2);
    float dSquare = sdRoundedSquare(sp, 0.085 * uSquare.w, 0.018 * uSquare.w) + wobbleS * uWobble;

    float d = smin(dCircle, dTriangle, uSmoothK);
    d = smin(d, dSquare, uSmoothK);

    // Pequeñas gotas amorfas desprendidas de cada figura
    float dropK = max(uSmoothK * 0.55, 0.018);
    for (int i = 0; i < ${DROP_COUNT}; i++) {
      float dr = uDrops[i].z;
      if (dr > 0.001) {
        vec2 dPos = vec2((uDrops[i].x - 0.5) * uAspect, uDrops[i].y - 0.5);
        float dDrop = sdCircle(p - dPos, dr);
        d = smin(d, dDrop, dropK);
      }
    }

    // Antialiasing vectorial nítido con fwidth()
    float edge = max(fwidth(d), 0.0014);
    float ink = 1.0 - smoothstep(-edge * 0.75, edge * 0.75, d);
    if (ink < 0.01) discard;

    // Blanco puro para mix-blend-mode: difference (negro en #F5F5F5, blanco sobre H1)
    gl_FragColor = vec4(1.0, 1.0, 1.0, ink);
  }
`;

interface PrimitiveBody {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  scale: number;
}

interface DropBody {
  parentIndex: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  phase: number;
}

/**
 * Núcleo orgánico en Three.js que en reposo unifica las 3 primitivas del diseño
 * (Círculo, Triángulo y Cuadrado) y al tocarlo se fragmenta en las 3 piezas nítidas
 * antes de volver a acoplarse en orden.
 */
export default function HeroInkMetaballsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frameId = 0;
    let isVisible = !document.hidden;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    let width = Math.max(container.clientWidth, 1);
    let height = Math.max(container.clientHeight, 1);

    const getAnchor = () => {
      const isCompact = width < 768;
      return {
        x: isCompact ? 0.28 : 0.25,
        y: isCompact ? 0.74 : 0.52,
      };
    };

    const initialAnchor = getAnchor();
    const shapes: [PrimitiveBody, PrimitiveBody, PrimitiveBody] = [
      {
        x: initialAnchor.x,
        y: initialAnchor.y,
        vx: 0,
        vy: 0,
        angle: 0,
        vAngle: 0,
        scale: 1,
      },
      {
        x: initialAnchor.x,
        y: initialAnchor.y,
        vx: 0,
        vy: 0,
        angle: 0.15,
        vAngle: 0,
        scale: 1,
      },
      {
        x: initialAnchor.x,
        y: initialAnchor.y,
        vx: 0,
        vy: 0,
        angle: -0.15,
        vAngle: 0,
        scale: 1,
      },
    ];

    const drops: DropBody[] = Array.from({ length: DROP_COUNT }, (_, i) => ({
      parentIndex: i % 3,
      x: initialAnchor.x,
      y: initialAnchor.y,
      vx: 0,
      vy: 0,
      baseRadius: 0.014 + (i % 2) * 0.007,
      radius: 0,
      phase: i * 1.15,
    }));

    const uniformDrops = Array.from(
      { length: DROP_COUNT },
      () => new THREE.Vector3(initialAnchor.x, initialAnchor.y, 0)
    );

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uCircle: { value: new THREE.Vector4(initialAnchor.x, initialAnchor.y, 0, 1) },
      uTriangle: { value: new THREE.Vector4(initialAnchor.x, initialAnchor.y, 0.15, 1) },
      uSquare: { value: new THREE.Vector4(initialAnchor.x, initialAnchor.y, -0.15, 1) },
      uDrops: { value: uniformDrops },
      uSmoothK: { value: 0.072 },
      uAspect: { value: width / height },
      uTime: { value: 0 },
      uWobble: { value: 0.0045 },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      width = Math.max(container.clientWidth, 1);
      height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height, false);
      uniforms.uAspect.value = width / height;
    };

    let splitEnergy = 0;
    let lastPointerX = -1;
    let lastPointerY = -1;
    let lastSplitAt = 0;

    const triggerSplit = (
      dirX: number,
      dirY: number,
      strength: number
    ) => {
      if (reducedMotion) return;
      splitEnergy = Math.min(1, Math.max(splitEnergy, strength));

      // Cada primitiva toma una dirección distinta al fraccionarse
      const directions = [
        { x: 0.22 + dirX * 0.65, y: 0.18 + dirY * 0.65, spin: 1.4 },
        { x: 0.42 + dirX * 0.9, y: -0.06 + dirY * 0.75, spin: -2.1 },
        { x: -0.14 + dirX * 0.55, y: -0.22 + dirY * 0.6, spin: 1.8 },
      ];

      shapes.forEach((shape, idx) => {
        const d = directions[idx];
        shape.vx += d.x * strength;
        shape.vy += d.y * strength;
        shape.vAngle += d.spin * strength;
      });

      drops.forEach((drop) => {
        const parent = shapes[drop.parentIndex];
        const angle = Math.random() * Math.PI * 2;
        const kick = (0.14 + Math.random() * 0.22) * strength;
        if (drop.radius < 0.002) {
          drop.x = parent.x;
          drop.y = parent.y;
        }
        drop.vx += parent.vx * 0.45 + Math.cos(angle) * kick;
        drop.vy += parent.vy * 0.45 + Math.sin(angle) * kick;
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion) return;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) {
        lastPointerX = -1;
        lastPointerY = -1;
        return;
      }

      const vx = lastPointerX >= 0 ? x - lastPointerX : 0;
      const vy = lastPointerY >= 0 ? y - lastPointerY : 0;
      lastPointerX = x;
      lastPointerY = y;

      const aspect = width / height;
      const speed = Math.hypot(vx, vy);

      let touched = false;
      shapes.forEach((shape) => {
        const dx = (shape.x - x) * aspect;
        const dy = shape.y - y;
        const d = Math.hypot(dx, dy);
        const hitRadius = 0.135;

        if (d < hitRadius && d > 0.0001) {
          touched = true;
          const push = (1 - d / hitRadius) * 0.12;
          shape.vx += (dx / d / aspect) * push + vx * 0.75;
          shape.vy += (dy / d) * push + vy * 0.75;
        }
      });

      const now = performance.now();
      if (touched && speed > 0.004 && now - lastSplitAt > 140) {
        lastSplitAt = now;
        triggerSplit(vx * 3.5, vy * 3.5, Math.min(0.85, 0.35 + speed * 8));
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (reducedMotion) return;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) return;

      const aspect = width / height;
      const touched = shapes.some((shape) => {
        const d = Math.hypot((shape.x - x) * aspect, shape.y - y);
        return d < 0.16;
      });
      if (!touched) return;

      const anchor = getAnchor();
      triggerSplit((x - anchor.x) * 1.1, (y - anchor.y) * 1.1, 1.0);
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let time = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      frameId = window.requestAnimationFrame(animate);
      if (!isVisible) {
        lastTime = now;
        return;
      }

      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (!reducedMotion) {
        time += delta;
      }

      const anchor = getAnchor();
      const aspect = width / Math.max(height, 1);
      splitEnergy = Math.max(0, splitEnergy - delta * 0.38);

      const damping = Math.pow(0.92, delta * 60);

      // En reposo respiran acopladas en un solo núcleo; al separarse muestran su geometría pura
      const restOffsets = [
        {
          x: Math.cos(time * 0.7) * 0.026,
          y: Math.sin(time * 0.9) * 0.026,
          angle: 0,
        },
        {
          x: Math.cos(time * 0.6 + 2.1) * 0.036,
          y: Math.sin(time * 0.8 + 1.4) * 0.036,
          angle: Math.sin(time * 0.4) * 0.35,
        },
        {
          x: Math.cos(time * 0.55 + 4.2) * 0.032,
          y: Math.sin(time * 0.75 + 3.6) * 0.032,
          angle: Math.cos(time * 0.35) * 0.3,
        },
      ];

      shapes.forEach((shape, idx) => {
        const rest = restOffsets[idx];
        const targetX = anchor.x + rest.x / Math.max(aspect, 0.8);
        const targetY = anchor.y + rest.y;

        shape.vx += (targetX - shape.x) * 3.1 * delta;
        shape.vy += (targetY - shape.y) * 3.1 * delta;
        shape.vAngle += (rest.angle - shape.angle) * 2.4 * delta;

        shape.vx *= damping;
        shape.vy *= damping;
        shape.vAngle *= damping;

        shape.x += shape.vx * delta * 2.8;
        shape.y += shape.vy * delta * 2.8;
        shape.angle += shape.vAngle * delta * 2.2;
      });

      // Unión suave alta en reposo (1 núcleo) y más baja al separarse (3 figuras nítidas)
      const targetK = 0.072 * (1 - splitEnergy * 0.84);
      uniforms.uSmoothK.value +=
        (targetK - uniforms.uSmoothK.value) * Math.min(1, delta * 8);
      uniforms.uTime.value = time;
      const targetWobble = reducedMotion ? 0 : 0.0045 + splitEnergy * 0.0065;
      uniforms.uWobble.value +=
        (targetWobble - uniforms.uWobble.value) * Math.min(1, delta * 8);

      uniforms.uCircle.value.set(
        shapes[0].x,
        shapes[0].y,
        shapes[0].angle,
        shapes[0].scale
      );
      uniforms.uTriangle.value.set(
        shapes[1].x,
        shapes[1].y,
        shapes[1].angle,
        shapes[1].scale
      );
      uniforms.uSquare.value.set(
        shapes[2].x,
        shapes[2].y,
        shapes[2].angle,
        shapes[2].scale
      );

      // Actualiza las 6 gotas satélites que se desprenden y vuelven a su figura madre
      const dropSpread = 0.032 + splitEnergy * 0.065;
      drops.forEach((drop, idx) => {
        const parent = shapes[drop.parentIndex];
        const orbitAngle = time * 1.15 + drop.phase;
        const targetX =
          parent.x + (Math.cos(orbitAngle) * dropSpread) / Math.max(aspect, 0.8);
        const targetY = parent.y + Math.sin(orbitAngle) * dropSpread;

        drop.vx += (targetX - drop.x) * 3.6 * delta;
        drop.vy += (targetY - drop.y) * 3.6 * delta;
        drop.vx *= damping;
        drop.vy *= damping;
        drop.x += drop.vx * delta * 2.8;
        drop.y += drop.vy * delta * 2.8;

        const targetDropRadius =
          drop.baseRadius * (0.28 + Math.min(0.72, splitEnergy * 1.15));
        drop.radius += (targetDropRadius - drop.radius) * Math.min(1, delta * 7);
        uniformDrops[idx].set(drop.x, drop.y, drop.radius);
      });

      renderer.render(scene, camera);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 mix-blend-difference"
    />
  );
}
