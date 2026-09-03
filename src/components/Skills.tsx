'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '~/data/portfolio';
import { Cpu, Layers, Sparkles, Terminal, Wrench, Shield } from 'lucide-react';

const skillCategories = [
  {
    title: 'Core Mobile & UI',
    icon: <Cpu className="h-4 w-4 text-accent" />,
    items: [
      { name: 'Swift & SwiftUI', level: 'Expert', desc: 'Modern declarative UI, animation, async/await', icon: '🍎' },
      { name: 'Objective-C & UIKit', level: 'Expert', desc: 'Legacy interop, custom view controllers, AutoLayout', icon: '🧱' },
      { name: 'Flutter & Dart', level: 'Advanced', desc: 'Cross-platform leadership, custom rendering', icon: '💙' },
    ],
  },
  {
    title: 'Architecture & State',
    icon: <Layers className="h-4 w-4 text-[#bf5af2]" />,
    items: [
      { name: 'TCA (Composable)', level: 'Expert', desc: 'Composable architecture, testable unidirectional state', icon: '🏛️' },
      { name: 'VIPER & Clean Architecture', level: 'Expert', desc: 'Scalable separation of concerns for enterprise apps', icon: '🧩' },
      { name: 'MVVM & Coordinator', level: 'Expert', desc: 'Flow navigation, decoupled view models', icon: '🎯' },
    ],
  },
  {
    title: 'Reactive & Data Systems',
    icon: <Sparkles className="h-4 w-4 text-[#64d2ff]" />,
    items: [
      { name: 'RxSwift & Combine', level: 'Advanced', desc: 'Reactive streams, debounced events, binding', icon: '🌊' },
      { name: 'CoreData, Realm, Firebase', level: 'Advanced', desc: 'Offline-first persistence, local cache & sync', icon: '🔥' },
      { name: 'LiveKit, WebSocket, SDKs', level: 'Strong', desc: 'Real-time audio/video streaming & custom SDK design', icon: '📡' },
    ],
  },
  {
    title: 'Tooling & CI/CD',
    icon: <Wrench className="h-4 w-4 text-[#30d158]" />,
    items: [
      { name: 'Fastlane & Tuist', level: 'Advanced', desc: 'Automated code signing, provisioning & modular project generation', icon: '🚀' },
      { name: 'Jenkins & GitHub Actions', level: 'Advanced', desc: 'Automated test suite, nightly build distribution', icon: '⚙️' },
      { name: 'Performance Profiling', level: 'Expert', desc: 'Instruments, memory leak hunting, 60/120fps frame budgeting', icon: '⚡' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36 bg-[#0a0a0f] overflow-hidden">
      {/* Subtle ambient light */}
      <div
        className="pointer-events-none absolute right-1/4 top-1/4 h-[500px] w-[500px] rounded-full opacity-15 blur-[120px]"
        style={{ background: '#bf5af2' }}
      />

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="eyebrow">Technical Mastery</span>
          <h2 className="mt-4 display-1 text-white">
            Engineered with Precision. <br />
            <span className="gradient-apple">The iOS Core Stack.</span>
          </h2>
          <p className="mt-5 lede">
            Deep mastery of the Apple ecosystem, from low-level runtime optimizations to declarative SwiftUI fluid motion and production CI/CD automation.
          </p>
        </motion.div>

        {/* 3D Spatial Grid: iOS Control Center Style */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="rounded-[32px] border border-white/10 bg-gradient-to-b from-[#15151e]/80 to-[#0e0e14]/90 p-7 lg:p-8 backdrop-blur-2xl shadow-xl hover:border-white/20 transition-all group"
            >
              <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 text-white font-semibold text-[17px]">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  {cat.icon}
                </div>
                <span>{cat.title}</span>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="group/item flex items-start justify-between gap-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-white/15 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[24px] select-none">{item.icon}</span>
                      <div>
                        <div className="text-[15px] font-semibold text-white group-hover/item:text-accent transition-colors">
                          {item.name}
                        </div>
                        <div className="mt-0.5 text-[12px] text-white/50">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/10 border border-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white/80">
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
