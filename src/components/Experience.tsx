'use client';

import { motion } from 'framer-motion';
import { experiences } from '~/data/portfolio';
import { Briefcase, Calendar, CheckCircle, ChevronRight, GitBranch } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36 bg-[#0a0a0e] text-white overflow-hidden">
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute left-1/3 bottom-10 h-[500px] w-[500px] rounded-full opacity-15 blur-[140px]"
        style={{ background: '#2997ff' }}
      />

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="eyebrow">Engineering Track Record</span>
          <h2 className="mt-4 display-1 text-white">
            Proven Leadership. <br />
            <span className="gradient-apple">Years of Shipping at Scale.</span>
          </h2>
        </motion.div>

        {/* Git-Commit Style Timeline */}
        <div className="mt-16 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative rounded-[32px] border border-white/10 bg-gradient-to-b from-[#15151f]/80 to-[#0d0d12]/90 p-8 lg:p-10 backdrop-blur-xl shadow-2xl hover:border-white/20 transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-accent text-[13px] font-semibold uppercase tracking-wider">
                    <Briefcase className="h-4 w-4" />
                    <span>{exp.company}</span>
                  </div>
                  <h3 className="mt-2 text-[24px] sm:text-[28px] font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 self-start lg:self-center rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-[13px] font-medium text-white/70">
                  <Calendar className="h-3.5 w-3.5 text-accent" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="mt-6 text-[16px] text-white/80 leading-relaxed max-w-3xl">
                {exp.summary}
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                {exp.bullets.map((b, bIdx) => (
                  <div
                    key={bIdx}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[14px] text-white/75"
                  >
                    <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{b}</span>
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
