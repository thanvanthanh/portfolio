'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { profile, stats, techMarquee } from '~/data/portfolio';
import { ArrowUpRight, Cpu } from 'lucide-react';

const showcaseApps = [
  {
    id: 'yogiyo',
    name: 'Yogiyo',
    category: 'Food Delivery · Korea',
    tech: 'Swift · TCA · Tuist',
    image: '/hero/yogiyo.jpg',
    color: '#ff0844',
    metrics: '3M+ Active Users',
    floatingTechs: [
      { name: 'Swift', icon: '🕊️', x: -148, y: -75, z: 50 },
      { name: 'TCA', icon: '🏛️', x: 148, y: -65, z: 65 },
      { name: 'Tuist', icon: '🛠️', x: -148, y: 85, z: 45 },
      { name: 'MVVM', icon: '⚡️', x: 148, y: 95, z: 55 },
    ],
  },
  {
    id: 'vnasa',
    name: 'VNASA Super-App',
    category: 'Vietnam Airlines Enterprise',
    tech: 'Flutter · BLoC · Fastlane',
    image: '/hero/vna-app.png',
    color: '#0071e3',
    metrics: '15,000+ Employees',
    floatingTechs: [
      { name: 'Flutter', icon: '💙', x: -148, y: -75, z: 50 },
      { name: 'BLoC', icon: '🧱', x: 148, y: -65, z: 65 },
      { name: 'Fastlane', icon: '🚀', x: -148, y: 85, z: 45 },
      { name: 'Firebase', icon: '🔥', x: 148, y: 95, z: 55 },
    ],
  },
  {
    id: 'photoism',
    name: 'Photoism',
    category: 'Korea #1 Photobooth',
    tech: 'SwiftUI · TCA · Naver SDK',
    image: '/hero/photoism.jpg',
    color: '#11998e',
    metrics: 'Top 1 Kiosk App',
    floatingTechs: [
      { name: 'SwiftUI', icon: '⚡️', x: -148, y: -75, z: 50 },
      { name: 'TCA', icon: '🏛️', x: 148, y: -65, z: 65 },
      { name: 'Naver SDK', icon: '🟢', x: -148, y: 85, z: 45 },
      { name: 'Kakao SDK', icon: '🟡', x: 148, y: 95, z: 55 },
    ],
  },
  {
    id: 'snapism',
    name: 'Snapism',
    category: 'Photobooth Machine · Korea',
    tech: 'MVP · SnapKit · Kakao/Naver',
    image: '/hero/snapism.png',
    color: '#0071e3',
    metrics: 'App Store Korea',
    floatingTechs: [
      { name: 'MVP', icon: '📐', x: -148, y: -75, z: 50 },
      { name: 'SnapKit', icon: '📦', x: 148, y: -65, z: 65 },
      { name: 'Firebase', icon: '🔥', x: -148, y: 85, z: 45 },
      { name: 'AppAuth', icon: '🔐', x: 148, y: 95, z: 55 },
    ],
  },
  {
    id: 'toyota',
    name: 'Toyota Wallet',
    category: 'Official E-Wallet · Japan',
    tech: 'Swift · VIPER · RxSwift',
    image: '/hero/toyota.jpg',
    color: '#1d6ee0',
    metrics: 'Fintech Enterprise',
    floatingTechs: [
      { name: 'VIPER', icon: '🧩', x: -148, y: -75, z: 50 },
      { name: 'RxSwift', icon: '⚡️', x: 148, y: -65, z: 65 },
      { name: 'RxCocoa', icon: '📦', x: -148, y: 85, z: 45 },
      { name: 'E-Wallet', icon: '💳', x: 148, y: 95, z: 55 },
    ],
  },
];

export default function Hero() {
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [islandExpanded, setIslandExpanded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Auto-switch app every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAppIndex((prev) => (prev + 1) % showcaseApps.length);
      setCycleKey((k) => k + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeAppIndex]);

  const handleSelectApp = (index: number) => {
    setActiveAppIndex(index);
    setCycleKey((k) => k + 1);
  };

  // 3D Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Springs for ProMotion 120Hz feeling
  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const currentApp = showcaseApps[activeAppIndex];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] lg:min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12 overflow-hidden flex flex-col justify-between"
    >
      {/* 3D Ambient Background Lights */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-1/2 top-[-10%] h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-35 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #2997ff, transparent 65%)' }}
        />
        <div
          className="absolute right-[-10%] top-[30%] h-[450px] w-[450px] rounded-full opacity-20 blur-[110px]"
          style={{ background: 'radial-gradient(circle, #bf5af2, transparent 65%)' }}
        />
        <div
          className="absolute left-[-10%] bottom-[10%] h-[400px] w-[400px] rounded-full opacity-20 blur-[110px]"
          style={{ background: 'radial-gradient(circle, #30d158, transparent 65%)' }}
        />
        {/* Subtle Apple Keynote Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container-x w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 my-auto">
        {/* Left Headline & Pitch */}
        <div className="flex-1 text-center lg:text-left z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
            <span className="text-[11px] sm:text-[12px] font-semibold tracking-wider text-accent uppercase">
              iOS / Mobile Developer · 5+ Years
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-5 text-[38px] sm:text-[52px] lg:text-[64px] font-bold leading-[1.08] tracking-tight text-white"
          >
            <span>{profile.name}.</span>
            <span className="block mt-1 gradient-apple font-bold">
              Precision in every frame.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] leading-relaxed text-white/70 max-w-lg mx-auto lg:mx-0"
          >
            Specialized in architecting high-scale iOS applications with <strong className="text-white font-medium">Swift, SwiftUI, TCA, VIPER</strong> and <strong className="text-white font-medium">Flutter</strong>. Shipped products serving over 3,000,000+ active users.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5"
          >
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] sm:text-[15px] font-semibold text-black shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-all hover:bg-white/90 hover:scale-[1.02] active:scale-95"
            >
              <span>Explore Selected Work</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[14px] sm:text-[15px] font-medium text-white/90 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/35 active:scale-95"
            >
              <span>Let's talk</span>
              <span className="text-white/40 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>

          {/* Highlights Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 sm:mt-10 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left"
          >
            {stats.map((s, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[24px] sm:text-[26px] font-bold tracking-tight text-white">{s.value}</span>
                <span className="text-[11px] uppercase tracking-wider text-white/50">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Interactive iPhone 16 Pro Showcase (True Physical Dimensions & Ratio: 71.5mm x 149.6mm) */}
        <div className="flex-1 w-full max-w-[380px] lg:max-w-[400px] flex flex-col items-center justify-center relative perspective-container py-2">
          {/* 3D Floating Tech Badges (Dynamically Changing with Each App) */}
          <AnimatePresence mode="popLayout">
            {currentApp.floatingTechs.map((tech, idx) => (
              <motion.div
                key={`${currentApp.id}-${tech.name}`}
                initial={{ opacity: 0, scale: 0.6, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: -12 }}
                transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:flex absolute z-30 items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3 py-1.5 shadow-2xl backdrop-blur-xl pointer-events-none"
                style={{
                  left: `calc(50% + ${tech.x}px)`,
                  top: `calc(50% + ${tech.y}px)`,
                  transform: `translateZ(${tech.z}px)`,
                  animation: `float-subtle 4s ease-in-out infinite`,
                  animationDelay: `${idx * 0.4}s`,
                }}
              >
                <span className="text-[14px]">{tech.icon}</span>
                <span className="text-[12px] font-semibold text-white tracking-wide">{tech.name}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Realistic iPhone 16 Pro Shell (Ratio 71.5mm / 149.6mm = 1:2.092) */}
          <div className="relative flex items-center justify-center">
            {/* Physical Hardware Buttons on Left Side */}
            <div className="absolute -left-[3px] top-[80px] w-[3.5px] h-[18px] rounded-l-[3px] bg-[#383842] border-l border-white/20" title="Action Button" />
            <div className="absolute -left-[3px] top-[110px] w-[3.5px] h-[34px] rounded-l-[3px] bg-[#383842] border-l border-white/20" title="Volume Up" />
            <div className="absolute -left-[3px] top-[152px] w-[3.5px] h-[34px] rounded-l-[3px] bg-[#383842] border-l border-white/20" title="Volume Down" />

            {/* Physical Hardware Buttons on Right Side */}
            <div className="absolute -right-[3px] top-[120px] w-[3.5px] h-[48px] rounded-r-[3px] bg-[#383842] border-r border-white/20" title="Power Button" />
            <div className="absolute -right-[2px] top-[210px] w-[2.5px] h-[38px] rounded-r-[2px] bg-[#2a2a32] border-r border-white/10 opacity-70" title="Camera Control" />

            {/* 3D Phone Body */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-[235px] xs:w-[250px] sm:w-[265px] lg:w-[270px] xl:w-[280px] aspect-[71.5/149.6] rounded-[50px] p-[6.5px] bg-gradient-to-b from-[#565662] via-[#28282e] to-[#121216] shadow-[0_35px_80px_rgba(0,0,0,0.85),0_0_35px_rgba(41,151,255,0.25)] border border-white/25 transition-shadow duration-300"
            >
              {/* Antenna Line Details on Outer Band */}
              <div className="absolute left-[36px] -top-[1px] w-[3px] h-[2px] bg-black/60 rounded-full" />
              <div className="absolute right-[36px] -top-[1px] w-[3px] h-[2px] bg-black/60 rounded-full" />
              <div className="absolute left-[36px] -bottom-[1px] w-[3px] h-[2px] bg-black/60 rounded-full" />
              <div className="absolute right-[36px] -bottom-[1px] w-[3px] h-[2px] bg-black/60 rounded-full" />

              {/* Ultra-Thin Bezel OLED Screen (19.5:9 aspect ratio) */}
              <div className="relative h-full w-full rounded-[44px] bg-black overflow-hidden border-[2.5px] border-[#18181c] shadow-inner">
                {/* Micro Speaker Slot at Top Edge */}
                <div className="absolute top-[3px] left-1/2 -translate-x-1/2 z-50 w-12 h-[3px] rounded-full bg-[#1c1c22] opacity-80" />

                {/* Dynamic Island Screen Header with Subtle Morph on App Change */}
                <div className="absolute top-2.5 inset-x-0 z-40 flex justify-center pointer-events-auto">
                  <motion.div
                    key={`island-${cycleKey}`}
                    onClick={() => setIslandExpanded(!islandExpanded)}
                    initial={{ scale: 0.96 }}
                    animate={{
                      scale: 1,
                      width: islandExpanded ? '180px' : '84px',
                      height: islandExpanded ? '32px' : '22px',
                    }}
                    transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                    className="cursor-pointer rounded-full bg-black border border-white/10 px-2.5 flex items-center justify-between shadow-lg overflow-hidden"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {islandExpanded && (
                        <span className="text-[10px] font-medium text-white/90 truncate">
                          Swift 5.10 · Build OK
                        </span>
                      )}
                    </div>
                    {/* Camera lens reflection dot */}
                    <div className="h-2 w-2 rounded-full bg-[#0a152e] border border-blue-400/40" />
                  </motion.div>
                </div>

                {/* Status Bar */}
                <div className="absolute top-2.5 inset-x-5 z-30 flex items-center justify-between text-[10px] font-semibold text-white pointer-events-none">
                  <span>9:41</span>
                  <div className="flex items-center gap-1 text-[9px]">
                    <span>5G</span>
                    <span className="h-2.5 w-4 border border-white/80 rounded-[2px] inline-flex items-center p-[1px]">
                      <span className="h-full w-full bg-white rounded-[1px]" />
                    </span>
                  </div>
                </div>

                {/* Screen App Image & Smooth ProMotion Transition (No Black Screen Gaps) */}
                <div className="relative h-full w-full overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={currentApp.id}
                      initial={{ opacity: 0, x: 30, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -30, scale: 0.98 }}
                      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                      className="absolute inset-0 h-full w-full"
                    >
                      <img
                        src={currentApp.image}
                        alt={currentApp.name}
                        className="h-full w-full object-cover"
                      />
                      {/* Gloss Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* App Details Badge inside Phone with Smooth Text Morph */}
                  <div className="absolute bottom-4 inset-x-3.5 z-30 flex flex-col text-white pointer-events-none">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentApp.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                            {currentApp.category}
                          </span>
                          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] backdrop-blur font-medium">
                            {currentApp.metrics}
                          </span>
                        </div>
                        <h3 className="mt-0.5 text-[17px] font-bold tracking-tight text-white">
                          {currentApp.name}
                        </h3>
                        <p className="text-[11px] text-white/70">{currentApp.tech}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Home Indicator Bar at Bottom */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-40 w-24 h-1 rounded-full bg-white/50 backdrop-blur" />
                </div>

                {/* Dynamic Glass Glare following Mouse */}
                <motion.div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.75) 0%, transparent 60%)`,
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Keynote Segmented Progress Bar (5 segments for 5 apps) */}
          <div className="mt-4 sm:mt-5 flex items-center justify-center gap-1.5 w-full max-w-[260px] sm:max-w-[280px]">
            {showcaseApps.map((app, index) => {
              const isPast = index < activeAppIndex;
              const isActive = index === activeAppIndex;
              return (
                <div
                  key={`segment-${app.id}`}
                  onClick={() => handleSelectApp(index)}
                  className="h-[3px] flex-1 rounded-full bg-white/15 overflow-hidden cursor-pointer relative transition-colors hover:bg-white/30"
                  title={app.name}
                >
                  {isPast && <div className="h-full w-full bg-white/50 rounded-full" />}
                  {isActive && (
                    <motion.div
                      key={`seg-fill-${cycleKey}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 3, ease: 'linear' }}
                      style={{ originX: 0 }}
                      className="h-full w-full bg-accent rounded-full shadow-[0_0_8px_rgba(41,151,255,0.9)]"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* App Switcher Interactive Pills with Liquid Glow Progress */}
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 z-20 w-full">
            {showcaseApps.map((app, index) => {
              const isActive = index === activeAppIndex;
              return (
                <button
                  key={app.id}
                  onClick={() => handleSelectApp(index)}
                  className={`relative overflow-hidden rounded-full px-3 py-1.5 text-[11px] sm:text-[12px] font-medium transition-all active:scale-95 ${isActive
                    ? 'border border-white/40 text-white shadow-[0_0_20px_rgba(41,151,255,0.3)] font-semibold scale-[1.02]'
                    : 'border border-white/10 bg-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.12]'
                    }`}
                >
                  {/* Subtle Liquid Glow Wave that Fills the Active Pill over 3s */}
                  {isActive && (
                    <motion.div
                      key={`pill-glow-${cycleKey}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 3, ease: 'linear' }}
                      style={{ originX: 0 }}
                      className="absolute inset-0 bg-gradient-to-r from-accent/30 via-blue-500/25 to-accent/15 rounded-full"
                    />
                  )}
                  <span className="relative z-10">{app.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Infinite Toolkit Marquee */}
      <div className="mt-6 sm:mt-8 border-y border-white/10 bg-[#0c0c11]/80 py-4 backdrop-blur-xl">
        <div className="marquee container-x flex items-center gap-4 overflow-hidden">
          <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.25em] text-accent flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5" />
            Core Stack
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div
              className="flex gap-8 whitespace-nowrap will-change-transform"
              style={{ animation: 'marquee 35s linear infinite' }}
            >
              {[...techMarquee, ...techMarquee].map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="text-[12px] sm:text-[13px] font-semibold text-white/60 hover:text-white transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
