import React from 'react';
import { MailIcon, GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
          <p className="text-gray-600 mb-8">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
          <a href="mailto:your.email@example.com" className="inline-flex items-center gap-2 text-lg mb-8 text-blue-600 hover:underline">
            <MailIcon size={20} />
            your.email@example.com
          </a>
          <div className="flex justify-center gap-6">
            <a href="#" className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <GithubIcon size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <LinkedinIcon size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <TwitterIcon size={24} />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}