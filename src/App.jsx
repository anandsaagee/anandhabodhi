import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import Category from './pages/Category';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<Category />} />
          </Routes>
        </main>
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

export default App;
