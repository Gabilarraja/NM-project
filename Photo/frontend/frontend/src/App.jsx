import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Trade from './pages/Trade';
import Wallet from './pages/Wallet'; // optional page

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
