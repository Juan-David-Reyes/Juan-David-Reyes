"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uScroll;
  uniform vec3 uColorBase;
  uniform vec3 uColorGlowA;
  uniform vec3 uColorGlowB;

  varying vec2 vUv;

  // Suave campo orgánico sin ruido pesado para mantener 60fps en móvil y desktop
  float organicWave(vec2 p, float t) {
    float wave1 = sin(p.x * 2.1 + t * 0.35) * cos(p.y * 1.7 - t * 0.25);
    float wave2 = sin((p.x + p.y) * 1.6 - t * 0.2) * 0.5;
    return (wave1 + wave2) * 0.5 + 0.5;
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 uv = (vUv - 0.5) * aspect;
    vec2 pointer = (uPointer - 0.5) * aspect;

    float dist = length(uv - pointer * 0.45);
    float pointerGlow = smoothstep(0.95, 0.0, dist);

    vec2 flowUv = uv + vec2(0.0, uScroll * 0.25);
    float field = organicWave(flowUv, uTime);

    vec3 color = mix(uColorBase, uColorGlowA, field * 0.42);
    color = mix(color, uColorGlowB, pointerGlow * 0.34);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function getPaletteUniforms(isDark: boolean) {
  if (isDark) {
    return {
      base: new THREE.Color("#101110"),
      glowA: new THREE.Color("#1a2b28"),
      glowB: new THREE.Color("#2c4a44"),
    };
  }
  return {
    base: new THREE.Color("#faf8f5"),
    glowA: new THREE.Color("#e8efe9"),
    glowB: new THREE.Color("#d5e5e0"),
  };
}

/**
 * Escena WebGL minimalista (Concepto Organic Craft).
 * Un único plano con shader GLSL suave para no comprometer el hilo principal ni el LCP.
 */
export default function AmbientOrganicCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId = 0;
    let isVisible = !document.hidden;

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const initialPalette = getPaletteUniforms(colorSchemeQuery.matches);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(container.clientWidth, container.clientHeight),
      },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
      uColorBase: { value: initialPalette.base },
      uColorGlowA: { value: initialPalette.glowA },
      uColorGlowB: { value: initialPalette.glowB },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const targetPointer = new THREE.Vector2(0.5, 0.5);
    let targetScroll = 0;

    const handleResize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetPointer.set(
        event.clientX / Math.max(window.innerWidth, 1),
        1 - event.clientY / Math.max(window.innerHeight, 1)
      );
    };

    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      targetScroll = window.scrollY / maxScroll;
    };

    const handleSchemeChange = (event: MediaQueryListEvent) => {
      const next = getPaletteUniforms(event.matches);
      uniforms.uColorBase.value.copy(next.base);
      uniforms.uColorGlowA.value.copy(next.glowA);
      uniforms.uColorGlowB.value.copy(next.glowB);
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    handleResize();
    handleScroll();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    colorSchemeQuery.addEventListener("change", handleSchemeChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastTime = performance.now();

    const animate = (now: number) => {
      frameId = window.requestAnimationFrame(animate);
      if (!isVisible) {
        lastTime = now;
        return;
      }

      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      uniforms.uTime.value += delta;
      // Amortiguación suave para evitar movimientos bruscos
      uniforms.uPointer.value.lerp(targetPointer, 0.045);
      uniforms.uScroll.value += (targetScroll - uniforms.uScroll.value) * 0.06;

      renderer.render(scene, camera);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      colorSchemeQuery.removeEventListener("change", handleSchemeChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}
