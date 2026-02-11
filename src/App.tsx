import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { StrikeCaseStudy } from './pages/StrikeCaseStudy';
import { LoopIn } from './pages/LoopIn';
import { LoopInCaseStudy } from './pages/LoopInCaseStudy';
import { DynamicQuality } from './pages/DynamicQuality';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home aiVariant="dark" />} />
        <Route path="/v/dark" element={<Home aiVariant="dark" />} />
        <Route path="/v/blue" element={<Home aiVariant="blue" />} />
        <Route path="/v/yellow" element={<Home aiVariant="yellow" />} />
        <Route path="/strike-case-study" element={<StrikeCaseStudy />} />
        <Route path="/loopin" element={<LoopIn />} />
        <Route path="/loopin/case-study" element={<LoopInCaseStudy />} />
        <Route path="/dq" element={<DynamicQuality />} />
      </Routes>
    </Router>
  );
}