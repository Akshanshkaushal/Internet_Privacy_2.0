 // App.js
import React from 'react';
import Header from './components/Navbar/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import About from './components/about';
import Home from './Home';
import Upload from './Upload';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
