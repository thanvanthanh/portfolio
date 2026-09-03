'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SiriLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter to 100% in ~1.8s
    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(frameId);
  }, []);

  // Lock body scroll while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="siri-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(16px)',
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050508] overflow-hidden select-none cursor-pointer"
          onClick={() => setLoading(false)}
          title="Click to skip"
        >
          {/* ================================================================= */}
          {/* Apple Intelligence Edge Glow Wave (Surrounding Screen Edges)     */}
          {/* ================================================================= */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Top Border Glow */}
            <motion.div
              animate={{
                opacity: [0.6, 0.95, 0.6],
                scaleX: [0.9, 1.1, 0.9],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-12 inset-x-0 h-32 blur-3xl opacity-80"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, #2997ff 0%, #bf5af2 40%, #ff375f 70%, transparent 100%)',
              }}
            />

            {/* Bottom Border Glow */}
            <motion.div
              animate={{
                opacity: [0.6, 0.95, 0.6],
                scaleX: [1.1, 0.9, 1.1],
              }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-12 inset-x-0 h-32 blur-3xl opacity-80"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 100%, #30d158 0%, #2997ff 35%, #bf5af2 70%, transparent 100%)',
              }}
            />

            {/* Left Border Glow */}
            <motion.div
              animate={{
                opacity: [0.5, 0.85, 0.5],
                scaleY: [0.9, 1.1, 0.9],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-12 inset-y-0 w-32 blur-3xl opacity-75"
              style={{
                background:
                  'radial-gradient(ellipse at 0% 50%, #bf5af2 0%, #ff375f 50%, transparent 100%)',
              }}
            />

            {/* Right Border Glow */}
            <motion.div
              animate={{
                opacity: [0.5, 0.85, 0.5],
                scaleY: [1.1, 0.9, 1.1],
              }}
              transition={{ duration: 2.9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-12 inset-y-0 w-32 blur-3xl opacity-75"
              style={{
                background:
                  'radial-gradient(ellipse at 100% 50%, #2997ff 0%, #30d158 50%, transparent 100%)',
              }}
            />
          </div>



          {/* ================================================================= */}
          {/* Siri Intelligent Soundwaves Pulse (Central Neon Waveform)         */}
          {/* ================================================================= */}
          <div className="relative flex items-center justify-center">
            {/* Ambient Glow behind Soundwaves */}
            <div
              className="absolute h-32 w-64 rounded-full blur-3xl opacity-60 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(41,151,255,0.4) 0%, rgba(191,90,242,0.3) 50%, transparent 75%)',
              }}
            />

            <div className="relative z-10 flex items-center justify-center gap-2 h-14 px-6 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(41,151,255,0.2)]">
              {[0.35, 0.6, 0.9, 0.75, 1, 0.85, 1, 0.7, 0.95, 0.55, 0.35].map((scale, i) => (
                <motion.span
                  key={i}
                  animate={{
                    scaleY: [0.25, scale, 0.25],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: i * 0.09,
                    ease: 'easeInOut',
                  }}
                  className="w-1.5 rounded-full shadow-[0_0_12px_currentColor]"
                  style={{
                    height: '36px',
                    background:
                      'linear-gradient(180deg, #00f5d4 0%, #2997ff 35%, #bf5af2 70%, #ff375f 100%)',
                    color: '#2997ff',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ================================================================= */}
          {/* Title & Siri Status Text                                          */}
          {/* ================================================================= */}
          <div className="mt-6 flex flex-col items-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[13px] font-semibold tracking-wider text-white/90 uppercase">
                Apple Intelligence Engine
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-1 text-[20px] sm:text-[22px] font-bold tracking-tight text-white"
            >
              Than Van Thanh
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-1 text-[13px] text-white/60 font-medium"
            >
              Architecting High-Scale iOS & Mobile Applications
            </motion.p>

            {/* Segmented Loading Bar & Percent */}
            <div className="mt-6 w-56 sm:w-64 flex flex-col items-center gap-2">
              <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden border border-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background:
                      'linear-gradient(90deg, #2997ff 0%, #bf5af2 50%, #ff375f 100%)',
                    boxShadow: '0 0 12px rgba(41,151,255,0.8)',
                  }}
                />
              </div>

              <div className="flex items-center justify-between w-full text-[11px] font-mono text-white/50">
                <span>Initializing...</span>
                <span className="text-accent font-semibold">{progress}%</span>
              </div>
            </div>

            {/* Click to Skip Hint */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 text-[11px] text-white/40 tracking-wider hover:opacity-80 transition-opacity"
            >
              Click anywhere to enter →
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
