"use client";

import { useEffect, useRef, memo, useState } from "react";
import { createPortal } from "react-dom";

type Neuron = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseSize: number;
  energy: number;
  lastFired: number;
  connections: number[];
  depth: number;
  hue: number;
  pulsePhase: number;
};

type Signal = {
  fromIndex: number;
  toIndex: number;
  progress: number;
  strength: number;
  hue: number;
};

const ParticleCanvas = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | null>(null);
  const neuronsRef = useRef<Neuron[]>([]);
  const signalsRef = useRef<Signal[]>([]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height),
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const neurons = neuronsRef.current;
    const signals = signalsRef.current;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initializeNeurons = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      neurons.length = 0;

      for (let i = 0; i < 30; i++) {
        const layer = Math.floor(i / 10);
        const layerProgress = (i % 10) / 10;

        let x, y, depth, hue;

        switch (layer) {
          case 0:
            x = w * 0.15 + Math.random() * w * 0.2;
            y = h * 0.2 + layerProgress * h * 0.6;
            depth = 0.8;
            hue = 45;
            break;
          case 1:
            x = w * 0.4 + Math.random() * w * 0.2;
            y = h * 0.15 + layerProgress * h * 0.7;
            depth = 0.6;
            hue = 180 + Math.random() * 60;
            break;
          default:
            x = w * 0.65 + Math.random() * w * 0.2;
            y = h * 0.25 + layerProgress * h * 0.5;
            depth = 0.4;
            hue = 280 + Math.random() * 40;
            break;
        }

        const neuron: Neuron = {
          x,
          y,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: 3 + Math.random() * 4,
          baseSize: 3 + Math.random() * 4,
          opacity: 0.4 + Math.random() * 0.4,
          energy: Math.random(),
          lastFired: 0,
          connections: [],
          depth,
          hue,
          pulsePhase: Math.random() * Math.PI * 2,
        };

        neurons.push(neuron);
      }

      neurons.forEach((neuron, i) => {
        const connectionCount = 2 + Math.floor(Math.random() * 3);
        for (let j = 0; j < connectionCount; j++) {
          const targetIndex = Math.floor(Math.random() * neurons.length);
          if (targetIndex !== i && !neuron.connections.includes(targetIndex)) {
            const distance = Math.sqrt(
              (neuron.x - neurons[targetIndex].x) ** 2 +
                (neuron.y - neurons[targetIndex].y) ** 2
            );
            if (distance < w * 0.3) {
              neuron.connections.push(targetIndex);
            }
          }
        }
      });
    };

    const createSignal = (
      fromIndex: number,
      toIndex: number,
      strength: number = 1
    ) => {
      signals.push({
        fromIndex,
        toIndex,
        progress: 0,
        strength,
        hue: neurons[fromIndex].hue,
      });
    };

    const updateNeurons = (
      timestamp: number,
      mouse: { x: number; y: number }
    ) => {
      neurons.forEach((neuron, i) => {
        const mouseDistance = Math.sqrt(
          (mouse.x - neuron.x) ** 2 + (mouse.y - neuron.y) ** 2
        );
        let mouseForce = Math.max(0, 150 - mouseDistance) / 150;

        const w = window.innerWidth;
        const h = window.innerHeight;
        const centerX = w / 2;
        const contentZoneWidth = w * 0.6;

        const inContentZone =
          Math.abs(mouse.x - centerX) < contentZoneWidth / 2 &&
          mouse.y > h * 0.1 &&
          mouse.y < h * 0.9;

        if (inContentZone) {
          mouseForce *= 0.3;
        }

        if (mouseForce > 0.2) {
          neuron.energy = Math.min(
            1,
            neuron.energy + (inContentZone ? 0.02 : 0.05)
          );
          const fireThreshold = inContentZone ? 0.3 : 0.7;
          const cooldown = inContentZone ? 1500 : 500;

          if (
            timestamp - neuron.lastFired > cooldown &&
            Math.random() < fireThreshold
          ) {
            neuron.lastFired = timestamp;
            neuron.connections.forEach((connectionIndex) => {
              createSignal(i, connectionIndex, neuron.energy);
            });
          }
        }

        if (timestamp - neuron.lastFired > 2000 && Math.random() < 0.002) {
          neuron.lastFired = timestamp;
          neuron.connections.forEach((connectionIndex) => {
            createSignal(i, connectionIndex, 0.5);
          });
        }

        neuron.energy *= 0.99;

        neuron.vx += (Math.random() - 0.5) * 0.01;
        neuron.vy += (Math.random() - 0.5) * 0.01;
        neuron.vx *= 0.98;
        neuron.vy *= 0.98;
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;

        const pulse = Math.sin(timestamp * 0.003 + neuron.pulsePhase) * 0.3 + 1;
        neuron.size = neuron.baseSize * pulse * (1 + neuron.energy * 0.5);
      });
    };

    const updateSignals = () => {
      for (let i = signals.length - 1; i >= 0; i--) {
        const signal = signals[i];
        signal.progress += 0.02 * signal.strength;

        if (signal.progress >= 1) {
          const targetNeuron = neurons[signal.toIndex];
          if (targetNeuron) {
            targetNeuron.energy = Math.min(
              1,
              targetNeuron.energy + signal.strength * 0.3
            );

            if (Math.random() < signal.strength * 0.6) {
              targetNeuron.connections.forEach((connectionIndex) => {
                createSignal(
                  signal.toIndex,
                  connectionIndex,
                  signal.strength * 0.7
                );
              });
            }
          }
          signals.splice(i, 1);
        }
      }
    };

    const draw = (timestamp: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const parallaxOffset = scrollYRef.current * 0.08;
      const mouse = mouseRef.current;

      updateNeurons(timestamp, mouse);
      updateSignals();

      // Draw connections
      neurons.forEach((neuron, i) => {
        neuron.connections.forEach((connectionIndex) => {
          const target = neurons[connectionIndex];
          if (!target) return;

          const opacity = Math.min(neuron.opacity, target.opacity) * 0.3;
          const gradient = ctx.createLinearGradient(
            neuron.x,
            neuron.y,
            target.x,
            target.y
          );
          gradient.addColorStop(0, `hsla(${neuron.hue}, 70%, 60%, ${opacity})`);
          gradient.addColorStop(1, `hsla(${target.hue}, 70%, 60%, ${opacity})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(neuron.x, neuron.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });
      });

      // Draw signals
      signals.forEach((signal) => {
        const from = neurons[signal.fromIndex];
        const to = neurons[signal.toIndex];
        if (!from || !to) return;

        const x = from.x + (to.x - from.x) * signal.progress;
        const y = from.y + (to.y - from.y) * signal.progress;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        gradient.addColorStop(
          0,
          `hsla(${signal.hue}, 100%, 80%, ${signal.strength})`
        );
        gradient.addColorStop(1, `hsla(${signal.hue}, 100%, 80%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 4 * signal.strength, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw neurons
      neurons.forEach((neuron) => {
        const py = neuron.y + parallaxOffset * neuron.depth;

        const coreGradient = ctx.createRadialGradient(
          neuron.x,
          py,
          0,
          neuron.x,
          py,
          neuron.size
        );
        const energyBoost = neuron.energy * 0.5;
        coreGradient.addColorStop(
          0,
          `hsla(${neuron.hue}, 80%, ${70 + energyBoost * 30}%, ${neuron.opacity + energyBoost})`
        );
        coreGradient.addColorStop(
          0.7,
          `hsla(${neuron.hue}, 60%, ${50 + energyBoost * 20}%, ${neuron.opacity * 0.8})`
        );
        coreGradient.addColorStop(1, `hsla(${neuron.hue}, 40%, 30%, 0)`);

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(neuron.x, py, neuron.size, 0, Math.PI * 2);
        ctx.fill();

        if (neuron.energy > 0.5) {
          ctx.strokeStyle = `hsla(${neuron.hue}, 100%, 80%, ${(neuron.energy - 0.5) * 2})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(neuron.x, py, neuron.size + 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    initializeNeurons();

    const ro = new ResizeObserver(() => {
      resize();
      initializeNeurons();
    });
    ro.observe(document.body);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
});

ParticleCanvas.displayName = "ParticleCanvas";

export function StableParticleBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(<ParticleCanvas />, document.body);
}
