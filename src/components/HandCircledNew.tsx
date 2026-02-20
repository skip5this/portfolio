import React from 'react';

export function HandCircledNew() {
  return (
    <span className="hand-circled-new" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: '12px' }}>
      <span style={{
        fontFamily: "'Caveat', cursive",
        fontSize: '18px',
        fontWeight: 700,
        color: 'currentColor',
        position: 'relative',
        zIndex: 1,
        lineHeight: 1,
      }}>
        new
      </span>
      <svg
        viewBox="0 0 60 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          left: '-9px',
          top: '-6px',
          width: '48px',
          height: '30px',
          zIndex: 0,
          overflow: 'visible',
        }}
      >
        <ellipse
          className="circle-stroke"
          cx="30"
          cy="16"
          rx="27"
          ry="13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          transform="rotate(-4 30 16)"
        />
      </svg>
      <style>{`
        .hand-circled-new .circle-stroke {
          stroke-dasharray: 130;
          stroke-dashoffset: 130;
          animation: circleDraw 4s ease-in-out infinite;
        }
        @keyframes circleDraw {
          0% { stroke-dashoffset: 130; opacity: 1; }
          25% { stroke-dashoffset: 0; opacity: 1; }
          50% { stroke-dashoffset: 0; opacity: 1; }
          65% { stroke-dashoffset: 0; opacity: 0; }
          80% { stroke-dashoffset: 130; opacity: 0; }
          81% { stroke-dashoffset: 130; opacity: 1; }
          100% { stroke-dashoffset: 130; opacity: 1; }
        }
      `}</style>
    </span>
  );
}
