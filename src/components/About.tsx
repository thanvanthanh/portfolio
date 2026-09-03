'use client';

import { motion } from 'framer-motion';
import { stats } from '~/data/portfolio';
import { Sparkles, Gauge, Compass, Rocket } from 'lucide-react';

const pillars = [
  {
    icon: <Gauge className="h-6 w-6 text-accent" />,
    title: '120fps Performance First',
    desc: 'Deep profiling with Xcode Instruments, zero dropped frames, sub-second cold starts, and careful memory budgeting for buttery smooth rendering.',
  },
  {
    icon: <Compass className="h-6 w-6 text-[#bf5af2]" />,
    title: 'Apple HIG & Motion Obsessed',
    desc: 'Rigid adherence to Apple Human Interface Guidelines. Crafting fluid spring animations, tactile haptic feedback, and spatial depth.',
  },
  {
    icon: <Rocket className="h-6 w-6 text-[#30d158]" />,
    title: 'Modular & Resilient Architecture',
    desc: 'Battle-tested experience with TCA, VIPER, Tuist modularization, and unidirectional data flow to keep multi-engineer codebases rock solid.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-[#070709] text-white overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-[10%] top-[20%] h-[480px] w-[480px] rounded-full opacity-20 blur-[130px]"
          style={{ background: '#2997ff' }}
        />
        <div
          className="absolute right-[5%] bottom-[10%] h-[460px] w-[460px] rounded-full opacity-20 blur-[130px]"
          style={{ background: '#bf5af2' }}
        />
      </div>

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="eyebrow">Philosophy</span>
          <h2 className="mt-4 display-1 text-white">
            Apps that feel natural. <br />
            <span className="gradient-apple">Like they were always meant to be.</span>
          </h2>
          <p className="mt-6 lede">
            A truly exceptional mobile application is one where the user never thinks about the software — only the experience. Having spent 5+ years mastering Swift, Objective-C, SwiftUI and Flutter across high-frequency finance, enterprise airlines, and food delivery platforms, I hold every line of code to that standard.
          </p>
        </motion.div>

        {/* 3D Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#14141c]/90 to-[#0c0c10]/95 p-8 backdrop-blur-2xl shadow-xl hover:border-white/20 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                {p.icon}
              </div>
              <h3 className="mt-6 text-[20px] font-bold text-white tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
