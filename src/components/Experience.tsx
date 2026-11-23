'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, GraduationCap } from 'lucide-react';
import { experiences, education } from '~/data/portfolio';
import { usePortfolio } from '~/components/PortfolioProvider';
import Tilt3DCard from '~/components/three/Tilt3DCard';

export default function Experience() {
  const { lang } = usePortfolio();

  return (
    <section id="experience" className="relative z-10 py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <div className="eyebrow">Career Track Record &amp; Education</div>
          <h2 className="display-1 mt-3 font-display" style={{ color: 'var(--ink)' }}>
            {lang === 'vi' ? (
              <>
                Hơn 5 năm thực chiến.{' '}
                <span className="grad-text">Từ Fintech đến AI Gateway.</span>
              </>
            ) : (
              <>
                5+ Years of Delivery.{' '}
                <span className="grad-text">From Fintech to AI Gateways.</span>
              </>
            )}
          </h2>
        </div>

        {/* 3D Spatial Depth Timeline Rail */}
        <div
          className="mt-12 space-y-6 border-l-2 pl-6 sm:pl-8"
          style={{ borderColor: 'rgba(56, 189, 248, 0.32)' }}
        >
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              className="relative"
            >
              {/* Glowing Spatial Depth Node */}
              <span
                className="absolute -left-[33px] top-8 h-4 w-4 rounded-full sm:-left-[41px]"
                style={{
                  background: exp.active ? '#10b981' : idx === 1 ? '#38bdf8' : '#64748b',
                  boxShadow: exp.active
                    ? '0 0 18px rgba(16, 185, 129, 0.9)'
                    : idx === 1
                    ? '0 0 16px rgba(56, 189, 248, 0.75)'
                    : 'none',
                }}
              />

              <Tilt3DCard maxTilt={4} className="rounded-[30px] p-6 sm:p-8">
                <div
                  className="flex flex-col justify-between gap-4 border-b pb-5 lg:flex-row lg:items-center"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div>
                    <div
                      className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider"
                      style={{ color: exp.active ? 'var(--emerald)' : 'var(--accent)' }}
                    >
                      <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>
                        {exp.company} · {exp.location}
                      </span>
                    </div>
                    <h3
                      className="mt-1.5 font-display text-xl font-extrabold sm:text-2xl"
                      style={{ color: 'var(--ink)' }}
                    >
                      {exp.role}
                    </h3>
                  </div>

                  <div
                    className="inline-flex items-center gap-2 self-start rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold lg:self-center"
                    style={
                      exp.active
                        ? {
                            background: 'rgba(16, 185, 129, 0.14)',
                            border: '1px solid rgba(16, 185, 129, 0.34)',
                            color: 'var(--emerald)',
                          }
                        : {
                            background: 'var(--surface-solid)',
                            border: '1px solid var(--border)',
                            color: 'var(--ink-2)',
                          }
                    }
                  >
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="mt-4 max-w-3xl text-sm leading-relaxed sm:text-base" style={{ color: 'var(--ink-2)' }}>
                  {lang === 'vi' ? exp.summaryVi : exp.summary}
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {exp.highlights.map((bullet, bIdx) => (
                    <div
                      key={bIdx}
                      className="flex items-start gap-2.5 rounded-2xl p-3.5 text-sm"
                      style={{
                        background: 'var(--surface-solid)',
                        border: '1px solid var(--border)',
                        color: 'var(--ink-2)',
                      }}
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: exp.active ? 'var(--emerald)' : 'var(--accent)' }}
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md px-2.5 py-1 font-mono text-[11px]"
                      style={{
                        background: 'var(--surface-solid)',
                        border: '1px solid var(--border)',
                        color: 'var(--ink-3)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Tilt3DCard>
            </motion.div>
          ))}
        </div>

        {/* Education & Training Strip */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {education.map((edu, idx) => (
            <Tilt3DCard
              key={edu.school}
              maxTilt={6}
              className="flex items-start justify-between gap-4 rounded-3xl p-6"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    background: 'var(--surface-solid)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <GraduationCap
                    className="h-5 w-5"
                    style={{ color: idx === 0 ? 'var(--accent)' : 'var(--emerald)' }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div
                    className="font-mono text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: idx === 0 ? 'var(--accent)' : 'var(--emerald)' }}
                  >
                    {edu.badge}
                  </div>
                  <h3 className="mt-1 font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
                    {edu.school}
                  </h3>
                  <p className="mt-0.5 text-sm" style={{ color: 'var(--ink-2)' }}>
                    {edu.degree}
                  </p>
                </div>
              </div>
              <span className="shrink-0 font-mono text-xs" style={{ color: 'var(--ink-3)' }}>
                {edu.period}
              </span>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
}
