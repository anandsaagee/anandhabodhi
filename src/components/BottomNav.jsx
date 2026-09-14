import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HOME_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const SHOP_ICON = (
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

export default function BottomNav({ activePage, setPage }) {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <button
        className={`bottom-nav-btn${activePage === 'home' ? ' active' : ''}`}
        onClick={() => { setPage('home'); navigate('/'); }}
        aria-label="Home"
      >
        {HOME_ICON}
        Home
      </button>
      <button
        className={`bottom-nav-btn${activePage === 'shop' ? ' active' : ''}`}
        onClick={() => {
          setPage('shop');
          // Scroll to categories section
          navigate('/');
          setTimeout(() => {
            document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        aria-label="Shop"
      >
        {SHOP_ICON}
        Shop
      </button>
      <button
        className={`bottom-nav-btn${activePage === 'about' ? ' active' : ''}`}
        onClick={() => { setPage('about'); navigate('/about'); }}
        aria-label="About"
      >
        {INFO_ICON}
        About
      </button>
    </nav>
  );
}
