import React from 'react';
import { Header } from './components/Header';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { RecentWorks } from './components/RecentWorks';
import { ProjectFeature } from './components/ProjectFeature';
import { DesktopProjectFeature } from './components/DesktopProjectFeature';

// Import all project images
import strike1 from './assets/images/strike1.png';
import strike2 from './assets/images/Strike 2.png';
import strike3 from './assets/images/Strike 3.png';
import strike4 from './assets/images/Strike 4.png';
import fountain1 from './assets/images/Fountain-1.png';
import fountain2 from './assets/images/Fountain-2.png';
import fountain3 from './assets/images/Fountain-3.png';
import aioz1 from './assets/images/AiozNetwork-1.png';
import aioz2 from './assets/images/AiozNetwork-2.png';
import aioz3 from './assets/images/AiozNetwork-3.png';

export function App() {
  return (
    <div className="font-sans text-gray-800 bg-white">
      <Header />
      <main>
        <RecentWorks />
        <ProjectFeature 
          title="Strike"
          year="2023"
          images={[strike1, strike2, strike3, strike4]}
          backgroundColor="bg-strike"
        />
        <ProjectFeature 
          title="Fountain"
          year="2023"
          images={[fountain1, fountain2, fountain3]}
          backgroundColor="bg-fountain"
        />
        <DesktopProjectFeature 
          title="AIOZ Network"
          year="2024-25"
          images={[aioz1, aioz2, aioz3]}
          backgroundColor="bg-aioz"
        />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}