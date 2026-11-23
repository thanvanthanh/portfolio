'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '~/components/PortfolioProvider';

export default function SpatialCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = usePortfolio();
  const themeRef = useRef(theme);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      THREE.ColorManagement.enabled = true;
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.6, 12);

    const isMobile = window.innerWidth < 768;

    // =========================================================================
    // 1. 3D FLOWING SPATIAL WAVE HORIZON (Apple Intelligence / VisionOS Wave)
    // =========================================================================
    const cols = isMobile ? 36 : 56;
    const rows = isMobile ? 20 : 28;
    const waveCount = cols * rows;
    const wavePos = new Float32Array(waveCount * 3);
    const waveBaseXZ = new Float32Array(waveCount * 2);
    const waveColors = new Float32Array(waveCount * 3);

    const cBlue = new THREE.Color(0x38bdf8);
    const cEmerald = new THREE.Color(0x10b981);
    const cViolet = new THREE.Color(0x818cf8);
    const tmpColor = new THREE.Color();

    let ptr = 0;
    for (let r = 0; r < rows; r++) {
      const v = r / (rows - 1);
      for (let c = 0; c < cols; c++) {
        const u = c / (cols - 1);
        const x = (u - 0.5) * 32;
        const z = (v - 0.5) * 18 - 3.5;

        waveBaseXZ[ptr * 2] = x;
        waveBaseXZ[ptr * 2 + 1] = z;

        wavePos[ptr * 3] = x;
        wavePos[ptr * 3 + 1] = -4.3;
        wavePos[ptr * 3 + 2] = z;

        // Smooth gradient across the wave field: Blue -> Emerald -> Violet
        if (u < 0.5) {
          tmpColor.lerpColors(cBlue, cEmerald, u * 2);
        } else {
          tmpColor.lerpColors(cEmerald, cViolet, (u - 0.5) * 2);
        }
        waveColors[ptr * 3] = tmpColor.r;
        waveColors[ptr * 3 + 1] = tmpColor.g;
        waveColors[ptr * 3 + 2] = tmpColor.b;
        ptr++;
      }
    }

    const waveGeo = new THREE.BufferGeometry();
    const wavePosAttr = new THREE.BufferAttribute(wavePos, 3);
    wavePosAttr.setUsage(THREE.DynamicDrawUsage);
    waveGeo.setAttribute('position', wavePosAttr);
    waveGeo.setAttribute('color', new THREE.BufferAttribute(waveColors, 3));

    const waveMat = new THREE.PointsMaterial({
      size: isMobile ? 0.068 : 0.058,
      vertexColors: true,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const wavePoints = new THREE.Points(waveGeo, waveMat);
    scene.add(wavePoints);

    // =========================================================================
    // 2. 3D INTERACTIVE NEURAL CONSTELLATION (Nodes + Dynamic Synaptic Lines)
    // =========================================================================
    const nodeCount = isMobile ? 48 : 82;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);
    const nodeVelocities: { vx: number; vy: number; vz: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = (Math.random() - 0.5) * 24;
      nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 14 + 1.0;
      nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2.0;

      nodeVelocities.push({
        vx: (Math.random() - 0.5) * 0.009,
        vy: (Math.random() - 0.5) * 0.009,
        vz: (Math.random() - 0.5) * 0.006,
      });

      const col = i % 3 === 0 ? cEmerald : i % 3 === 1 ? cBlue : cViolet;
      nodeColors[i * 3] = col.r;
      nodeColors[i * 3 + 1] = col.g;
      nodeColors[i * 3 + 2] = col.b;
    }

    const nodeGeo = new THREE.BufferGeometry();
    const nodePosAttr = new THREE.BufferAttribute(nodePositions, 3);
    nodePosAttr.setUsage(THREE.DynamicDrawUsage);
    nodeGeo.setAttribute('position', nodePosAttr);
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: isMobile ? 0.11 : 0.095,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodePoints);

    // Dynamic 3D Synaptic Connection Lines between nearby Neural Nodes
    const maxSegments = nodeCount * 8;
    const linePos = new Float32Array(maxSegments * 6);
    const lineCols = new Float32Array(maxSegments * 6);
    const lineGeo = new THREE.BufferGeometry();
    const linePosAttr = new THREE.BufferAttribute(linePos, 3);
    const lineColAttr = new THREE.BufferAttribute(lineCols, 3);
    linePosAttr.setUsage(THREE.DynamicDrawUsage);
    lineColAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeo.setAttribute('position', linePosAttr);
    lineGeo.setAttribute('color', lineColAttr);
    lineGeo.setDrawRange(0, 0);

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    // Pointer, Scroll & Ripple State
    let targetMX = 0;
    let targetMY = 0;
    let curMX = 0;
    let curMY = 0;
    let scrollProgress = 0;
    let pulseBoost = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onPointerDown = () => {
      if (!prefersReducedMotion) {
        pulseBoost = 1.0;
      }
    };

    const onScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    onScroll();

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const t = clock.getElapsedTime();
      const dark = themeRef.current === 'dark';
      pulseBoost *= 0.94;

      waveMat.opacity = dark ? 0.62 : 0.34;
      waveMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      nodeMat.opacity = dark ? 0.85 : 0.48;
      nodeMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      lineMat.opacity = (dark ? 0.26 : 0.16) + pulseBoost * 0.22;
      lineMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;

      curMX += (targetMX - curMX) * 0.06;
      curMY += (targetMY - curMY) * 0.06;

      const cursorWorldX = curMX * 9.5;
      const cursorWorldY = -curMY * 5.5;

      // 1. Update Flowing 3D Spatial Horizon Wave
      if (!prefersReducedMotion) {
        const phase = t * 1.15 + scrollProgress * 4.0;
        for (let i = 0; i < waveCount; i++) {
          const bx = waveBaseXZ[i * 2];
          const bz = waveBaseXZ[i * 2 + 1];

          // Gentle cursor ripple on the 3D horizon wave
          const dx = bx - cursorWorldX;
          const dz = bz - curMY * 4.0;
          const distSq = dx * dx + dz * dz;
          const cursorWave = Math.exp(-distSq * 0.08) * (0.65 + pulseBoost * 0.8);

          const y =
            -4.4 +
            Math.sin(bx * 0.32 + phase) * 0.55 +
            Math.cos(bz * 0.42 + phase * 0.85) * 0.45 +
            cursorWave;

          wavePos[i * 3 + 1] = y;
        }
        wavePosAttr.needsUpdate = true;
        wavePoints.rotation.y = curMX * 0.08 - scrollProgress * 0.25;
      }

      // 2. Update 3D Neural Constellation & Dynamic Synaptic Links
      let segIndex = 0;
      const threshold = isMobile ? 3.8 : 3.6;
      const thresholdSq = threshold * threshold;

      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        if (!prefersReducedMotion) {
          nodePositions[i3] += nodeVelocities[i].vx;
          nodePositions[i3 + 1] += nodeVelocities[i].vy;
          nodePositions[i3 + 2] += nodeVelocities[i].vz;

          if (nodePositions[i3] > 12 || nodePositions[i3] < -12) nodeVelocities[i].vx *= -1;
          if (nodePositions[i3 + 1] > 8 || nodePositions[i3 + 1] < -6) nodeVelocities[i].vy *= -1;
          if (nodePositions[i3 + 2] > 3 || nodePositions[i3 + 2] < -7) nodeVelocities[i].vz *= -1;
        }

        const ax = nodePositions[i3];
        const ay = nodePositions[i3 + 1];
        const az = nodePositions[i3 + 2];

        for (let j = i + 1; j < nodeCount; j++) {
          if (segIndex >= maxSegments) break;
          const j3 = j * 3;
          const bx = nodePositions[j3];
          const by = nodePositions[j3 + 1];
          const bz = nodePositions[j3 + 2];

          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const dSq = dx * dx + dy * dy + dz * dz;

          if (dSq < thresholdSq) {
            const strength = 1 - Math.sqrt(dSq) / threshold;
            // Brighten synapses close to the 3D cursor position
            const cdx = (ax + bx) * 0.5 - cursorWorldX;
            const cdy = (ay + by) * 0.5 - cursorWorldY;
            const cursorProx = Math.max(0.35, 1.35 - Math.hypot(cdx, cdy) * 0.18);
            const intensity = Math.min(1, strength * cursorProx);

            const base = segIndex * 6;
            linePos[base] = ax;
            linePos[base + 1] = ay;
            linePos[base + 2] = az;
            linePos[base + 3] = bx;
            linePos[base + 4] = by;
            linePos[base + 5] = bz;

            lineCols[base] = nodeColors[i3] * intensity;
            lineCols[base + 1] = nodeColors[i3 + 1] * intensity;
            lineCols[base + 2] = nodeColors[i3 + 2] * intensity;
            lineCols[base + 3] = nodeColors[j3] * intensity;
            lineCols[base + 4] = nodeColors[j3 + 1] * intensity;
            lineCols[base + 5] = nodeColors[j3 + 2] * intensity;
            segIndex++;
          }
        }
      }

      nodePosAttr.needsUpdate = true;
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;
      lineGeo.setDrawRange(0, segIndex * 2);

      // Smooth 3D Camera Parallax
      camera.position.x += (curMX * 0.85 - camera.position.x) * 0.045;
      camera.position.y += (0.6 - curMY * 0.5 - scrollProgress * 1.1 - camera.position.y) * 0.045;
      camera.lookAt(0, -0.4 - scrollProgress * 0.8, -2.5);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);

      waveGeo.dispose();
      waveMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (webglUnavailable) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
