import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'PflegeAI - KI-gestützte Pflegeassistenz';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0b',
          position: 'relative',
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            left: '100px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-200px',
            right: '100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(192, 132, 252, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Logo + Name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {/* Logo icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
            }}
          >
            {/* Sparkle icon SVG */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              <path d="M20 3v4" />
              <path d="M22 5h-4" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            Pflege
            <span
              style={{
                background: 'linear-gradient(90deg, #a78bfa 0%, #e879f9 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              AI
            </span>
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Pflege,{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #a78bfa 0%, #e879f9 50%, #a78bfa 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              intelligent.
            </span>
          </span>
          <span
            style={{
              fontSize: '28px',
              color: '#a1a1aa',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            KI-Sprachassistenz für Pflegeheime
          </span>
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            marginTop: '48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <span style={{ fontSize: '20px' }}>🇩🇪</span>
            <span style={{ fontSize: '16px', color: '#a1a1aa' }}>Made in Germany</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <span style={{ fontSize: '16px', color: '#a1a1aa' }}>DSGVO-konform</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
