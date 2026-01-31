import React from 'react';

interface GradientOrbProps {
  className?: string;
}

/**
 * Animated gradient orb background element
 * Inspired by Off Brand's hero gradient
 * 
 * Slowly rotates and shifts colors for a living, breathing effect
 */
export function GradientOrb({ className = '' }: GradientOrbProps) {
  return (
    <div className={`gradient-orb-container ${className}`}>
      {/* Main gradient orb */}
      <div className="gradient-orb" />
      
      {/* Glow effect */}
      <div className="gradient-orb-glow" />
      
      <style>{`
        .gradient-orb-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .gradient-orb {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            #635bff,
            #a855f7,
            #ec4899,
            #f97316,
            #eab308,
            #22c55e,
            #06b6d4,
            #635bff
          );
          filter: blur(80px);
          opacity: 0.4;
          animation: orbRotate 20s linear infinite, orbFloat 8s ease-in-out infinite;
        }
        
        .gradient-orb-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(99, 91, 255, 0.3) 0%,
            rgba(168, 85, 247, 0.2) 30%,
            transparent 70%
          );
          filter: blur(40px);
          animation: orbFloat 12s ease-in-out infinite reverse;
        }
        
        @keyframes orbRotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes orbFloat {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -55%) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Off Brand style - full-screen animated gradient that shifts colors
 * Light theme with pastel blue, pink, yellow, orange
 */
export function GradientOrbSubtle({ className = '' }: GradientOrbProps) {
  return (
    <div className={`animated-gradient-bg ${className}`}>
      <style>{`
        .animated-gradient-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          background: 
            radial-gradient(
              ellipse 80% 80% at 20% 40%,
              rgba(135, 206, 250, 0.9) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse 60% 60% at 80% 20%,
              rgba(255, 200, 100, 0.9) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse 70% 70% at 60% 60%,
              rgba(255, 150, 200, 0.8) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse 50% 50% at 30% 80%,
              rgba(135, 206, 250, 0.7) 0%,
              transparent 50%
            ),
            linear-gradient(
              135deg,
              #e8f4fc 0%,
              #fef3e2 50%,
              #fce4ec 100%
            );
          animation: gradientShift 15s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
          0%, 100% {
            background-position: 
              0% 0%,
              100% 0%,
              50% 50%,
              0% 100%,
              0% 0%;
          }
          25% {
            background-position: 
              20% 20%,
              80% 30%,
              70% 40%,
              10% 80%,
              0% 0%;
          }
          50% {
            background-position: 
              30% 40%,
              60% 50%,
              40% 60%,
              20% 70%,
              0% 0%;
          }
          75% {
            background-position: 
              10% 30%,
              90% 40%,
              60% 50%,
              5% 90%,
              0% 0%;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Dark theme version - keeps the dark bg but with colorful gradient overlay
 */
export function GradientBackgroundDark({ className = '' }: GradientOrbProps) {
  return (
    <div className={`animated-gradient-dark ${className}`}>
      <style>{`
        .animated-gradient-dark {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          background: 
            radial-gradient(
              ellipse 100% 100% at 20% 30%,
              rgba(99, 91, 255, 0.3) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse 80% 80% at 80% 20%,
              rgba(236, 72, 153, 0.25) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse 70% 70% at 70% 70%,
              rgba(59, 130, 246, 0.2) 0%,
              transparent 50%
            );
          animation: gradientShiftDark 20s ease-in-out infinite;
        }
        
        @keyframes gradientShiftDark {
          0%, 100% {
            background-position: 0% 0%, 100% 0%, 70% 70%;
          }
          33% {
            background-position: 30% 30%, 70% 20%, 50% 80%;
          }
          66% {
            background-position: 10% 50%, 90% 40%, 80% 60%;
          }
        }
      `}</style>
    </div>
  );
}
