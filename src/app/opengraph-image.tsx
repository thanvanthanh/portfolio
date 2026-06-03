import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Than Van Thanh — Senior iOS / Mobile Developer';
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
            'linear-gradient(135deg, #0b0b0f 0%, #161629 45%, #2a1840 100%)',
          color: '#ffffff',
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
              'radial-gradient(circle, rgba(0,113,227,0.55), transparent 65%)',
            filter: 'blur(8px)',
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
              'radial-gradient(circle, rgba(255,84,112,0.45), transparent 65%)',
            filter: 'blur(8px)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#34d399',
              boxShadow: '0 0 20px rgba(52,211,153,0.7)',
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.72)',
              fontWeight: 500,
            }}
          >
            Senior iOS / Mobile Developer
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 108,
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
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.02,
              background:
                'linear-gradient(90deg, #60a5fa 0%, #c084fc 50%, #f472b6 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            Pixels with intent.
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
              gap: 14,
              flexWrap: 'wrap',
              maxWidth: 760,
            }}
          >
            {['Swift', 'SwiftUI', 'Flutter', 'TCA', 'VIPER', 'RxSwift'].map(
              (t) => (
                <div
                  key={t}
                  style={{
                    padding: '10px 22px',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: 999,
                    fontSize: 24,
                    color: 'rgba(255,255,255,0.9)',
                    background: 'rgba(255,255,255,0.05)',
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
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: 2,
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
