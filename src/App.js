import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeatureList from './components/FeatureList';
import FeatureForm from './components/FeatureForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<FeatureList />} />
        <Route path="/add" element={<FeatureForm />} />
        <Route path="/edit/:id" element={<FeatureForm />} />
      </Routes>
    </Router>
  );
}

export default App;