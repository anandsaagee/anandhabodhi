import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LangContext } from '../App.jsx';
import { useCart } from '../context/CartContext.jsx';

const HOME_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const SHOP_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const CART_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.96-1.61L23 6H6"/>
  </svg>
);

const INFO_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

export default function BottomNav({ onCartOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useContext(LangContext);
  const { totalItems } = useCart();

  const isHome = location.pathname === '/';
  const isShop = location.pathname.startsWith('/category');
  const isAbout = location.pathname === '/about';

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <button
        className={`bottom-nav-btn${isHome ? ' active' : ''}`}
        onClick={() => navigate('/')}
        aria-label="Home"
      >
        {HOME_ICON}
        <span>{lang === 'ml' ? 'ഹോം' : 'Home'}</span>
      </button>

      <button
        className={`bottom-nav-btn${isShop ? ' active' : ''}`}
        onClick={() => {
          navigate('/');
          setTimeout(() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }), 100);
        }}
        aria-label="Shop"
      >
        {SHOP_ICON}
        <span>{lang === 'ml' ? 'ഷോപ്പ്' : 'Shop'}</span>
      </button>

      <button
        className={`bottom-nav-btn cart-nav-btn`}
        onClick={onCartOpen}
        aria-label={`Cart${totalItems > 0 ? `, ${totalItems} items` : ''}`}
      >
        <div className="cart-nav-icon-wrap">
          {CART_ICON}
          {totalItems > 0 && (
            <span className="cart-nav-badge">{totalItems > 9 ? '9+' : totalItems}</span>
          )}
        </div>
        <span>{lang === 'ml' ? 'കാർട്ട്' : 'Cart'}</span>
      </button>

      <button
        className={`bottom-nav-btn${isAbout ? ' active' : ''}`}
        onClick={() => navigate('/about')}
        aria-label="About"
      >
        {INFO_ICON}
        <span>{lang === 'ml' ? 'അറിയൂ' : 'About'}</span>
      </button>
    </nav>
  );
}
