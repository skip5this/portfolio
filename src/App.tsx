import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { StrikeCaseStudy } from './pages/StrikeCaseStudy';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/strike-case-study" element={<StrikeCaseStudy />} />
      </Routes>
    </Router>
  );
}