'use client';

import cvData from '~/data/cv.json';
import Link from 'next/link';
import { useState } from 'react';

export default function CVPage() {
  const [pdfError, setPdfError] = useState(false);

  const handleDownloadPdf = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.href = '/api/cv/download';
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[--bg] pt-12">
      {/* Header bar */}
      <div className="glass sticky top-12 z-40 border-b border-ink-200/40">
        <div className="container-x flex h-11 items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] text-ink/70 transition-colors hover:text-ink"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </Link>
            <span className="text-ink-200/60">|</span>
            <span className="text-[13px] font-medium text-ink">
              {cvData.profile.name} — CV
            </span>
          </div>

          <a
            href="/api/cv/download"
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-medium text-white transition-transform hover:scale-[1.02]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download PDF
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="container-x py-4 sm:py-8">
        {/* PDF Viewer */}
        {!pdfError ? (
          <div className="overflow-hidden rounded-2xl border border-ink-200/30 shadow-xl shadow-ink/5">
            <iframe
              src={`${cvData.pdfFile}#toolbar=0&navpanes=0&scrollbar=1`}
              className="min-h-[70vh] w-full sm:min-h-[80vh]"
              style={{ height: 'calc(100vh - 140px)' }}
              title={`${cvData.profile.name} CV`}
              onError={() => setPdfError(true)}
            />
          </div>
        ) : (
          /* Fallback: render CV from JSON */
          <CVFallback />
        )}
      </div>
    </div>
  );
}

function CVFallback() {
  const { profile, skills, experiences, education } = cvData;

  return (
    <div className="mx-auto max-w-3xl space-y-10 rounded-2xl border border-ink-200/30 bg-white p-10 shadow-xl shadow-ink/5">
      {/* Profile */}
      <div className="border-b border-ink-200/40 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink">{profile.name}</h1>
        <p className="mt-1 text-base font-medium text-ink/60">{profile.title}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-[13px] text-ink/60">
          <span>{profile.location}</span>
          <a href={`mailto:${profile.email}`} className="hover:text-ink">{profile.email}</a>
          <span>{profile.phone}</span>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-ink">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">LinkedIn</a>
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-ink/70">{profile.bio}</p>
      </div>

      {/* Skills */}
      <div>
        <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-ink/40">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s.name} className="rounded-full border border-ink-200/50 px-3 py-1 text-[13px] text-ink/80">
              {s.name}
              <span className="ml-1.5 text-[11px] text-ink/40">{s.level}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <h2 className="mb-6 text-[11px] font-semibold uppercase tracking-widest text-ink/40">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.company}>
              <div className="flex items-baseline justify-between">
                <h3 className="font-semibold text-ink">{exp.company}</h3>
                <span className="text-[12px] text-ink/50">{exp.period}</span>
              </div>
              <p className="mt-0.5 text-[13px] font-medium text-ink/60">{exp.role}</p>
              <p className="mt-2 text-[13px] text-ink/70">{exp.summary}</p>
              <ul className="mt-3 space-y-1">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-[13px] text-ink/60">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink/30" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="mb-6 text-[11px] font-semibold uppercase tracking-widest text-ink/40">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.school} className="flex items-baseline justify-between">
              <div>
                <p className="font-medium text-ink">{edu.school}</p>
                <p className="text-[13px] text-ink/60">{edu.major}</p>
              </div>
              <span className="text-[12px] text-ink/50">{edu.period}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
