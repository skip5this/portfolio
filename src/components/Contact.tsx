import React from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-diatype-mono mb-8">Get in touch</h2>
          <div className="space-y-1 text-gray-600 mb-8 font-diatype">
            <p>Thanks for taking the time to explore my work.</p>
            <p>If anything resonated, feel free to reach out.</p>
          </div>
          <a href="mailto:hi.scottkbell@gmail.com" className="inline-flex text-lg mb-8 text-blue-600 hover:underline font-diatype">
            hi.scottkbell@gmail.com
          </a>
          <div className="flex gap-6">
            <a href="https://github.com/skip5this" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <GithubIcon size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/scottkbell" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <LinkedinIcon size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://x.com/skb_btc" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <TwitterIcon size={24} />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}