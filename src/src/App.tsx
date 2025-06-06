import React from 'react';
import { Header } from 'components/Header';
import { Projects } from 'components/Projects';
import { About } from 'components/About';
import { Contact } from 'components/Contact';
import { Footer } from 'components/Footer';
export function App() {
  return <div className="font-sans text-gray-800 bg-white">
      <Header />
      <main>
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>;
}