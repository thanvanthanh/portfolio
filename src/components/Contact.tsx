'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { profile } from '~/data/portfolio';
import { Mail, Phone, Copy, Check, Send, Sparkles, Download, ArrowUpRight } from 'lucide-react';

const cvUrl = 'https://docs.google.com/document/d/1zy0CLTFpKulEcNGr6-1J28yXWlbJY-dNKJvHrIdGMnY/edit?usp=sharing';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.37 9.74v-8.37H5.09v8.37h2.74z" />
    </svg>
  );
}

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const fireConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#2997ff', '#bf5af2', '#30d158', '#ffffff'],
    });
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    fireConfetti();
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-[#070709] text-white overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[150px]"
          style={{ background: 'radial-gradient(circle, #2997ff, #bf5af2)' }}
        />
      </div>

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl rounded-[40px] border border-white/15 bg-gradient-to-b from-[#181824]/90 to-[#0f0f16]/95 p-8 sm:p-14 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] text-center relative overflow-hidden"
        >
          {/* Subtle Top AirDrop Indicator */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-white/80">
              AirDrop Direct Contact
            </span>
          </div>

          <h2 className="mt-6 display-1 text-white">
            Ready to craft your next <br />
            <span className="gradient-apple">flagship iOS experience?</span>
          </h2>

          <p className="mt-5 lede max-w-xl mx-auto">
            Available for Senior iOS, Lead Mobile, and high-impact contract roles. Let's engineer something extraordinary together.
          </p>

          {/* Quick Copy Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => copyToClipboard(profile.email, 'email')}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-black shadow-[0_10px_30px_rgba(255,255,255,0.25)] transition-all hover:bg-white/90 active:scale-95"
            >
              <Mail className="h-4 w-4 text-accent" />
              <span>{profile.email}</span>
              {copiedEmail ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="h-4 w-4 text-black/40 group-hover:text-black transition-colors" />
              )}
            </button>

            <button
              onClick={() => copyToClipboard(profile.phone, 'phone')}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-[15px] font-medium text-white/90 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
            >
              <Phone className="h-4 w-4 text-accent" />
              <span>{profile.phone}</span>
              {copiedPhone ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4 text-white/40" />
              )}
            </button>
          </div>

          {/* Social Links */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-[14px]">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
              <ArrowUpRight className="h-3 w-3 text-white/40" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <LinkedinIcon className="h-4 w-4" />
              <span>LinkedIn</span>
              <ArrowUpRight className="h-3 w-3 text-white/40" />
            </a>

            <a
              href={cvUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>View Full CV</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </motion.div>

        {/* Apple Pro Footer */}
        <footer className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-white/40">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="h-5 w-5 rounded-full object-cover opacity-80" />
            <span>© 2026 {profile.name}</span>
          </div>
          <div>{profile.location}</div>
        </footer>
      </div>
    </section>
  );
}
