import { useState, useEffect } from 'react'

const CONTRACT_ADDRESS = '0xad6c0fe4fc0c11d46032ee3ef8e1a3c37c677b07'

function App() {
  const [copied, setCopied] = useState(false)
  const [glitchText, setGlitchText] = useState('$CLONK')

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(CONTRACT_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`'
    const originalText = '$CLONK'

    const interval = setInterval(() => {
      if (Math.random() > 0.92) {
        let glitched = ''
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() > 0.7) {
            glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)]
          } else {
            glitched += originalText[i]
          }
        }
        setGlitchText(glitched)
        setTimeout(() => setGlitchText(originalText), 100)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 25%, #1a0a20 50%, #0a0f1a 75%, #0a0a0f 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Exo 2", sans-serif',
    }}>
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes neonPulse {
          0%, 100% {
            text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 80px #0080ff;
            filter: brightness(1);
          }
          50% {
            text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #0080ff;
            filter: brightness(0.8);
          }
        }

        @keyframes glitchShift {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        @keyframes borderGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1);
            border-color: rgba(0, 255, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(0, 255, 255, 0.2);
            border-color: rgba(0, 255, 255, 0.8);
          }
        }

        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          50% { border-color: transparent; }
        }

        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }

        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-30px) translateX(10px); opacity: 0.8; }
          50% { transform: translateY(-60px) translateX(-5px); opacity: 0.5; }
          75% { transform: translateY(-30px) translateX(-10px); opacity: 0.7; }
        }

        .glitch-container:hover .glitch-layer-1 {
          animation: glitchShift 0.3s infinite;
        }

        .glitch-container:hover .glitch-layer-2 {
          animation: glitchShift 0.3s infinite reverse;
        }

        .terminal-text {
          font-family: 'Share Tech Mono', monospace;
        }

        .neon-text {
          animation: neonPulse 2s ease-in-out infinite;
        }

        .copy-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.6);
        }

        .copy-btn:active {
          transform: scale(0.98);
        }

        .feature-card {
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 255, 255, 0.2);
        }

        .scanline {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.1), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
          z-index: 100;
        }

        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 99;
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }
      `}</style>

      {/* Scanline Effect */}
      <div className="scanline"></div>

      {/* Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* Grid Background */}
      <div className="grid-bg" style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}></div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            background: `rgba(0, ${Math.random() * 155 + 100}, 255, ${Math.random() * 0.5 + 0.2})`,
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `particleFloat ${Math.random() * 5 + 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            pointerEvents: 'none',
            boxShadow: '0 0 10px currentColor',
          }}
        />
      ))}

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Hero Section */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>

          {/* Glitch Logo */}
          <div
            className="glitch-container"
            style={{
              position: 'relative',
              marginBottom: '2rem',
              animation: 'float 6s ease-in-out infinite',
            }}
          >
            <div style={{
              fontSize: 'clamp(80px, 20vw, 180px)',
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 900,
              color: '#00ffff',
              textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 80px #0080ff',
              letterSpacing: '0.1em',
              position: 'relative',
            }}>
              <span className="glitch-layer-1" style={{
                position: 'absolute',
                left: '2px',
                textShadow: '-2px 0 #ff00ff',
                opacity: 0.8,
                clipPath: 'inset(0 0 50% 0)',
              }}>{glitchText}</span>
              <span className="glitch-layer-2" style={{
                position: 'absolute',
                left: '-2px',
                textShadow: '2px 0 #00ff00',
                opacity: 0.8,
                clipPath: 'inset(50% 0 0 0)',
              }}>{glitchText}</span>
              <span className="neon-text">{glitchText}</span>
            </div>
          </div>

          {/* Tagline */}
          <p style={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 'clamp(14px, 3vw, 24px)',
            color: '#8892b0',
            marginBottom: '3rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}>
            {'>'} THE_FUTURE_IS_CLONKED {'<'}
          </p>

          {/* Contract Address Terminal */}
          <div style={{
            background: 'rgba(0, 10, 20, 0.8)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '8px',
            padding: '1.5rem 2rem',
            marginBottom: '3rem',
            maxWidth: '100%',
            animation: 'borderGlow 3s ease-in-out infinite',
          }}>
            <div className="terminal-text" style={{
              color: '#00ff88',
              fontSize: '12px',
              marginBottom: '0.5rem',
              opacity: 0.7,
            }}>
              {'// CONTRACT_ADDRESS'}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <code className="terminal-text" style={{
                color: '#00ffff',
                fontSize: 'clamp(10px, 2.5vw, 16px)',
                wordBreak: 'break-all',
              }}>
                {CONTRACT_ADDRESS}
              </code>
              <button
                onClick={copyToClipboard}
                className="copy-btn"
                style={{
                  background: copied
                    ? 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)'
                    : 'linear-gradient(135deg, #00ffff 0%, #0080ff 100%)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1.5rem',
                  color: '#000',
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {copied ? '✓ COPIED' : 'COPY'}
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1000px',
            width: '100%',
            marginBottom: '3rem',
          }}>
            {[
              { icon: '⚡', title: 'HYPER FAST', desc: 'Built on blazing infrastructure' },
              { icon: '🔒', title: 'SECURE', desc: 'Contract verified & audited' },
              { icon: '🌐', title: 'COMMUNITY', desc: 'Powered by degens worldwide' },
            ].map((feature, i) => (
              <div
                key={i}
                className="feature-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 128, 255, 0.05) 100%)',
                  border: '1px solid rgba(0, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '2rem',
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{
                  fontFamily: '"Orbitron", sans-serif',
                  color: '#00ffff',
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.1em',
                }}>{feature.title}</h3>
                <p style={{
                  color: '#8892b0',
                  fontSize: '0.9rem',
                  fontFamily: '"Share Tech Mono", monospace',
                }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <a
              href={`https://dexscreener.com/base/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #00ffff 0%, #0080ff 100%)',
                border: 'none',
                borderRadius: '8px',
                padding: '1rem 2.5rem',
                color: '#000',
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 255, 255, 0.5)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)'
              }}
            >
              VIEW CHART
            </a>
            <a
              href={`https://basescan.org/token/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'transparent',
                border: '2px solid rgba(0, 255, 255, 0.5)',
                borderRadius: '8px',
                padding: '1rem 2.5rem',
                color: '#00ffff',
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.8)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.5)'
              }}
            >
              BASESCAN
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          padding: '1.5rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 255, 255, 0.1)',
        }}>
          <p style={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: '11px',
            color: 'rgba(136, 146, 176, 0.5)',
            letterSpacing: '0.05em',
          }}>
            Requested by @ShoriNoDo · Built by @clonkbot
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App