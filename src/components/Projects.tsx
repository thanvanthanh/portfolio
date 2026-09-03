'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects, Project } from '~/data/portfolio';
import { ArrowUpRight } from 'lucide-react';

function Project3DCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = (e.clientX - rect.left) / rect.width - 0.5;
    const clientY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(clientX);
    y.set(clientY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[36px] border border-white/15 min-h-[460px] md:min-h-[540px] lg:min-h-[580px] p-8 sm:p-12 lg:p-14 shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-white/30 flex flex-col justify-between"
    >
      {/* Full Background Image */}
      {project.image && (
        <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
            loading="lazy"
          />
          {/* Subtle Ambient Brand Tint */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-color"
            style={{ background: project.accent }}
          />
          {/* Apple VisionOS Contrast Gradients (Deep Dark on left for crystal clear typography) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/80 to-[#07070a]/40 md:bg-gradient-to-r md:from-[#07070a] md:via-[#07070a]/85 md:to-[#07070a]/35" />
          {/* Vignette border */}
          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.7)]" />
        </div>
      )}

      {/* Top Header: Role & App Store Link */}
      <header className="relative z-10 flex items-center justify-between gap-4">
        <span className="rounded-full bg-white/15 border border-white/20 px-4 py-1.5 text-[12px] font-semibold text-white backdrop-blur-md shadow-lg">
          {project.role}
        </span>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 px-4 py-1.5 text-[12px] font-semibold text-white backdrop-blur-md transition-all active:scale-95 shadow-lg group/link"
          >
            <span>App Store</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-accent group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </header>

      {/* Main Content Info (Overlaid on Background) */}
      <div className="relative z-10 max-w-2xl mt-12 md:mt-16">
        <h3 className="text-[38px] sm:text-[54px] lg:text-[64px] font-bold leading-[1.04] tracking-tight text-white drop-shadow-md">
          {project.name}
        </h3>

        <p className="mt-3 sm:mt-4 text-[18px] sm:text-[22px] font-semibold text-white/95 tracking-tight drop-shadow">
          {project.tagline}
        </p>

        <p className="mt-3 sm:mt-4 text-[15px] sm:text-[16px] leading-relaxed text-white/80 max-w-xl drop-shadow">
          {project.description}
        </p>

        {/* Tech stack pills */}
        <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-2.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/20 bg-black/40 px-3.5 py-1 text-[13px] font-medium text-white/90 backdrop-blur-md transition-all group-hover:border-white/35 group-hover:bg-black/50"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* 3D Glass Specular Sheen (follows mouse) */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.14) 0%, transparent 60%)`,
        }}
      />
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative py-28 md:py-36 bg-[#070709] overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 rounded-full opacity-15 blur-[150px]"
        style={{ background: '#2997ff' }}
      />

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="eyebrow">Production Portfolio</span>
          <h2 className="mt-4 display-1 text-white">
            Shipped to Millions. <br />
            <span className="gradient-apple">Engineered for Perfection.</span>
          </h2>
          <p className="mt-5 lede">
            A curated collection of production mobile apps — spanning enterprise airlines super-apps, fintech wallets, food delivery at massive scale, and retail photobooth systems.
          </p>
        </motion.div>

        {/* 3D Bento Project Cards with Full Background Images */}
        <div className="mt-16 grid gap-8 md:gap-10">
          {projects.map((p, index) => (
            <Project3DCard key={p.name} project={p} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
