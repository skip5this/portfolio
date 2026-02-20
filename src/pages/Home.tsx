import React from 'react';
import { Header } from '../components/Header';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { RecentWorks } from '../components/RecentWorks';
import { ProjectFeature } from '../components/ProjectFeature';
import { DesktopProjectFeature } from '../components/DesktopProjectFeature';
import { AIPortalImageWarhol } from '../components/AIPortalImageWarhol';
import { AIPortalImageWarholBlue } from '../components/AIPortalImageWarholBlue';
import { AIPortalImageWarholYellow } from '../components/AIPortalImageWarholYellow';

// Import all project images
import strike1 from '../assets/images/strike1.png';
import strike2 from '../assets/images/strike2.png';
import strike3 from '../assets/images/strike3.png';
import strike4 from '../assets/images/strike4.png';
import fountain1 from '../assets/images/fountain1.png';
import fountain2 from '../assets/images/fountain2.png';
import fountain3 from '../assets/images/fountain3.png';
import fountain4 from '../assets/images/fountain4.png';
import aioz1 from '../assets/images/AiozNetwork-1.png';
import aioz2 from '../assets/images/aioz2.png';
import aioz3 from '../assets/images/aioz3.png';

type AIVariant = 'dark' | 'blue' | 'yellow';

interface HomeProps {
  aiVariant?: AIVariant;
}

const AISection: React.FC<{ variant: AIVariant }> = ({ variant }) => {
  switch (variant) {
    case 'blue': return <AIPortalImageWarholBlue />;
    case 'yellow': return <AIPortalImageWarholYellow />;
    case 'dark': 
    default: return <AIPortalImageWarhol />;
  }
};

export function Home({ aiVariant = 'dark' }: HomeProps) {
  return (
    <div className="font-sans text-gray-800 bg-white">
      <Header />
      <main>
        <RecentWorks />
        {/* <AISection variant={aiVariant} /> */}
        <ProjectFeature 
          title="Strike"
          year="2021-23"
          images={[strike1, strike2, strike3, strike4]}
          backgroundColor="bg-strike"
          companyUrl="https://strike.me/"
          caseStudyUrl="/strike-case-study"
        />
        <ProjectFeature 
          title="Fountain"
          year="2023"
          images={[fountain1, fountain2, fountain3, fountain4]}
          backgroundColor="bg-fountain"
          companyUrl="https://www.fountain.fm/"
        />
        <DesktopProjectFeature 
          title="AIOZ Network"
          year="2024-25"
          images={[aioz1, aioz2, aioz3]}
          backgroundColor="bg-aioz"
          companyUrl="https://aioz.network/"
        />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
