import React from 'react';

interface ImageCreditProps {
  credit: string;
  className?: string;
}

export function ImageCredit({ credit, className = '' }: ImageCreditProps) {
  return (
    <div className={`text-xs text-gray-400 mt-2 ${className}`}>
      <span className="font-diatype-mono">Credit: </span>
      {credit}
    </div>
  );
} 