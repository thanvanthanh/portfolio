'use client';

import { motion } from 'framer-motion';
import { Gauge, Layers, Cpu } from 'lucide-react';
import { usePortfolio } from '~/components/PortfolioProvider';
import Tilt3DCard from '~/components/three/Tilt3DCard';

const PILLARS = [
  {
    icon: Gauge,
    color: 'var(--accent)',
    titleEn: '120fps Native Mobile Craft',
    titleVi: 'Chuẩn mượt 120fps trên Di động',
    descEn:
      'Deep mastery of Swift, UIKit, SwiftUI, RxSwift, and Flutter — profiling memory, cold starts, and interaction physics so banking and consumer apps feel instantaneous.',
    descVi:
      'Làm chủ Swift, UIKit, SwiftUI, RxSwift và Flutter — tối ưu bộ nhớ, tốc độ khởi chạy và chuyển động vật lý cho ứng dụng ngân hàng & tiêu dùng quy mô lớn.',
  },
  {
    icon: Layers,
    color: 'var(--violet)',
    titleEn: 'Modular Enterprise Architecture',
    titleVi: 'Kiến trúc Module Quy mô Doanh nghiệp',
    descEn:
      'Proven leadership across 6-member cross-platform teams using MVVM + Clean Architecture, TCA, VIPER, Tuist modularization, Adobe AEM, and automated Fastlane CI/CD.',
    descVi:
      'Kinh nghiệm dẫn dắt đội ngũ 6 kỹ sư với MVVM + Clean Architecture, TCA, VIPER, Tuist, Adobe AEM và hệ thống CI/CD tự động hóa bằng Fastlane.',
  },
  {
    icon: Cpu,
    color: 'var(--emerald)',
    titleEn: 'AI-Native Systems & MCP',
    titleVi: 'Hệ thống AI-Native & MCP',
    descEn:
      'Going beyond prompt usage: customizing Go LLM Gateways (Bifrost), authoring Python FastMCP PostgreSQL servers with Keycloak auth, and defining team Agent Skills.',
    descVi:
      'Không chỉ dùng công cụ AI mà trực tiếp xây dựng hạ tầng: tùy biến Go LLM Gateway (Bifrost), viết Python FastMCP Server với Keycloak và chuẩn hóa Agent Skills.',
  },
];

export default function About() {
  const { lang } = usePortfolio();

  return (
    <section id="about" className="relative z-10 py-20 md:py-24">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <div className="eyebrow">Engineering Philosophy</div>
          <h2 className="display-1 mt-3 font-display" style={{ color: 'var(--ink)' }}>
            {lang === 'vi' ? (
              <>
                Độ chuẩn xác của sản phẩm.{' '}
                <span className="grad-text">Tốc độ của kỷ nguyên AI.</span>
              </>
            ) : (
              <>
                Precision in every frame.{' '}
                <span className="grad-text">Velocity through AI-native systems.</span>
              </>
            )}
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.titleEn}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
              >
                <Tilt3DCard maxTilt={8} className="h-full rounded-[28px] p-7">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{
                      background: 'var(--surface-solid)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: pillar.color }} aria-hidden="true" />
                  </div>
                  <h3
                    className="mt-5 font-display text-lg font-extrabold tracking-tight"
                    style={{ color: 'var(--ink)' }}
                  >
                    {lang === 'vi' ? pillar.titleVi : pillar.titleEn}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                    {lang === 'vi' ? pillar.descVi : pillar.descEn}
                  </p>
                </Tilt3DCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
