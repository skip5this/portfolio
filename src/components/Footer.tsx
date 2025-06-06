import React from 'react';
export function Footer() {
  return <footer className="py-8 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
      </div>
    </footer>;
}