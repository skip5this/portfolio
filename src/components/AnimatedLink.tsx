import React from 'react';
import { Link } from 'react-router-dom';

interface AnimatedLinkProps {
  to?: string;
  href?: string;
  children: string;
  className?: string;
  arrow?: boolean;
}

/**
 * Animated link with letter-by-letter rollover effect
 * Inspired by Off Brand (itsoffbrand.com) footer links
 * 
 * Text rolls up to reveal on hover, arrow slides right
 */
export function AnimatedLink({ to, href, children, className = '', arrow = true }: AnimatedLinkProps) {
  // Split text into individual characters
  const chars = children.split('');
  
  const content = (
    <span className="animated-link-wrapper group inline-flex items-center gap-2">
      <span className="animated-link-text relative overflow-hidden">
        {/* Default text */}
        <span className="inline-flex">
          {chars.map((char, i) => (
            <span
              key={`default-${i}`}
              className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full"
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        {/* Hover text (revealed from below) */}
        <span className="absolute left-0 top-0 inline-flex">
          {chars.map((char, i) => (
            <span
              key={`hover-${i}`}
              className="inline-block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>
      {arrow && (
        <span className="animated-link-arrow transition-transform duration-300 ease-out group-hover:translate-x-1">
          →
        </span>
      )}
    </span>
  );

  const baseClasses = `${className} cursor-pointer`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {content}
      </a>
    );
  }

  return <span className={baseClasses}>{content}</span>;
}
