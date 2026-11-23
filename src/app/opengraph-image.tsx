import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Than Van Thanh — Mobile Engineer & AI-Native Systems Builder';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'linear-gradient(135deg, #04050a 0%, #0b1224 48%, #071e1b 100%)',
          color: '#f8fafc',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(56,189,248,0.45), transparent 65%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -180,
            left: -140,
            width: 560,
            height: 560,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(16,185,129,0.4), transparent 65%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 20px rgba(16,185,129,0.8)',
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: 5,
              textTransform: 'uppercase',
              color: 'rgba(248,250,252,0.78)',
              fontWeight: 600,
            }}
          >
            Mobile Engineer · AI-Native Systems
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.02,
              display: 'flex',
            }}
          >
            Than Van Thanh.
          </div>
          <div
            style={{
              fontSize: 66,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.08,
              background:
                'linear-gradient(90deg, #38bdf8 0%, #22d3ee 48%, #10b981 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            Spatial Mobile Craft &amp; MCP Scale.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              maxWidth: 800,
            }}
          >
            {['Swift', 'SwiftUI', 'Flutter', 'Go', 'FastMCP', 'Kiro', 'MCP'].map(
              (t) => (
                <div
                  key={t}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid rgba(56,189,248,0.35)',
                    borderRadius: 999,
                    fontSize: 22,
                    color: 'rgba(248,250,252,0.92)',
                    background: 'rgba(15,23,42,0.65)',
                    display: 'flex',
                  }}
                >
                  {t}
                </div>
              ),
            )}
          </div>
          <div
            style={{
              fontSize: 22,
              color: 'rgba(248,250,252,0.65)',
              letterSpacing: 1.5,
              display: 'flex',
            }}
          >
            thanvanthanh.info.vn
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
