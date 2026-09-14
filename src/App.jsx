import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import Home from './pages/Home.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

export const LangContext = React.createContext('en');

export default function App() {
  const [lang, setLang] = useState('en');
  const [page, setPage] = useState('home'); // 'home' | 'about'

  return (
    <LangContext.Provider value={lang}>
      <Router>
        <Header lang={lang} setLang={setLang} activePage={page} setPage={setPage} />
        <main>
          <Routes>
            <Route path="/" element={<Home setPage={setPage} />} />
            <Route path="/category/:id" element={<CategoryPage setPage={setPage} />} />
            <Route path="/about" element={<AboutPage setPage={setPage} />} />
          </Routes>
        </main>
        <FloatingWhatsApp lang={lang} />
        <BottomNav activePage={page} setPage={setPage} />
      </Router>
    </LangContext.Provider>
  );
}
