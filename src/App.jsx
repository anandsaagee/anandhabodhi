import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Home from './pages/Home.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import CartPage from './pages/CartPage.jsx';
import { CartProvider } from './context/CartContext.jsx';

export const LangContext = React.createContext('en');

export default function App() {
  const [lang, setLang] = useState('en');
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <LangContext.Provider value={lang}>
      <CartProvider>
        <Router>
          <Header lang={lang} setLang={setLang} onCartOpen={() => setCartOpen(true)} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
          <FloatingWhatsApp lang={lang} />
          <BottomNav onCartOpen={() => setCartOpen(true)} />
        </Router>
      </CartProvider>
    </LangContext.Provider>
  );
}
