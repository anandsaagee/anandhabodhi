import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LangContext } from '../App.jsx';
import { useCart } from '../context/CartContext.jsx';
import data from '../data/products.json';

const WA_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.201.535 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.666.596 1.216.78 1.39.866.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
    <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.45zM12.045 21.785h-.005c-1.774 0-3.513-.474-5.031-1.37l-.36-.214-3.742.975.999-3.648-.235-.374a9.86 9.86 0 01-1.511-5.26c.001-5.45 4.436-9.884 9.892-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884z"/>
  </svg>
);

const CART_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.96-1.61L23 6H6"/>
  </svg>
);

const CLOSE_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const HAMBURGER_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CHEVRON_DOWN = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function Header({ lang, setLang, onCartOpen }) {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaActive, setMegaActive] = useState(null); // category id
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const headerRef = useRef(null);

  // Close mega menu on outside click
  useEffect(() => {
    function handler(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMegaActive(null);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const goTo = (path) => {
    navigate(path);
    setMobileOpen(false);
    setMegaActive(null);
  };

  const toggleMobile = (catId) => {
    setMobileExpanded((prev) => (prev === catId ? null : catId));
  };

  return (
    <>
      <header className="site-header" ref={headerRef}>
        <div className="header-inner">
          {/* Logo */}
          <div className="header-logo" onClick={() => goTo('/')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && goTo('/')}>
            <span className="logo-title">Anandha Bodhi</span>
            <span className="logo-sub">Sacred Living. Timeless Tradition.</span>
          </div>

          {/* Desktop Nav */}
          <nav className="header-desktop-nav" aria-label="Main navigation">
            <button className="nav-link" onClick={() => goTo('/')}>Home</button>
            {data.categories.map((cat) => (
              <div
                key={cat.id}
                className="nav-item-wrap"
                onMouseEnter={() => setMegaActive(cat.id)}
                onMouseLeave={() => setMegaActive(null)}
              >
                <button
                  className={`nav-link has-mega${megaActive === cat.id ? ' active' : ''}`}
                  onClick={() => { goTo(`/category/${cat.id}`); setMegaActive(null); }}
                  onFocus={() => setMegaActive(cat.id)}
                  aria-haspopup="true"
                  aria-expanded={megaActive === cat.id}
                >
                  {cat.emoji} {lang === 'ml' && cat.nameMl ? cat.nameMl : cat.name}
                  <span className="nav-chevron">{CHEVRON_DOWN}</span>
                </button>
                {/* Mega dropdown */}
                {megaActive === cat.id && (
                  <div className="mega-panel" role="menu">
                    <div className="mega-panel-inner">
                      <div className="mega-category-title" onClick={() => goTo(`/category/${cat.id}`)}>
                        {cat.emoji} {lang === 'ml' && cat.nameMl ? cat.nameMl : cat.name}
                        <span className="mega-view-all">View All →</span>
                      </div>
                      <div className="mega-sub-grid">
                        {(cat.subCollections || []).filter(s => s !== 'All').map((sub) => (
                          <button
                            key={sub}
                            className="mega-sub-link"
                            onClick={() => goTo(`/category/${cat.id}?sub=${encodeURIComponent(sub)}`)}
                            role="menuitem"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button className="nav-link" onClick={() => goTo('/about')}>About</button>
          </nav>

          {/* Right side actions */}
          <div className="header-actions">
            {/* Language toggle */}
            <div className="lang-toggle">
              <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')} aria-label="English">EN</button>
              <button className={`lang-btn${lang === 'ml' ? ' active' : ''}`} onClick={() => setLang('ml')} aria-label="Malayalam">മല</button>
            </div>
            {/* Cart */}
            <button className="cart-btn" onClick={onCartOpen} aria-label={`Cart, ${totalItems} items`}>
              {CART_ICON}
              {totalItems > 0 && <span className="cart-badge">{totalItems > 99 ? '99+' : totalItems}</span>}
            </button>
            {/* Hamburger (mobile only) */}
            <button className="hamburger-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              {HAMBURGER_ICON}
            </button>
          </div>
        </div>

        {/* Desktop mega menu overlay backdrop */}
        {megaActive && <div className="mega-backdrop" onMouseEnter={() => setMegaActive(null)} />}
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}
      <nav className={`mobile-drawer${mobileOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-logo">Anandha Bodhi</span>
          <button className="mobile-drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            {CLOSE_ICON}
          </button>
        </div>
        <div className="mobile-drawer-body">
          <button className="mobile-nav-link" onClick={() => goTo('/')}>🏠 Home</button>
          {data.categories.map((cat) => (
            <div key={cat.id} className="mobile-nav-accordion">
              <button
                className={`mobile-nav-link accordion-trigger${mobileExpanded === cat.id ? ' expanded' : ''}`}
                onClick={() => toggleMobile(cat.id)}
              >
                <span>{cat.emoji} {lang === 'ml' && cat.nameMl ? cat.nameMl : cat.name}</span>
                <span className={`accordion-chevron${mobileExpanded === cat.id ? ' open' : ''}`}>{CHEVRON_DOWN}</span>
              </button>
              {mobileExpanded === cat.id && (
                <div className="mobile-sub-links">
                  <button className="mobile-sub-link all-link" onClick={() => goTo(`/category/${cat.id}`)}>
                    All {lang === 'ml' && cat.nameMl ? cat.nameMl : cat.name}
                  </button>
                  {(cat.subCollections || []).filter(s => s !== 'All').map((sub) => (
                    <button
                      key={sub}
                      className="mobile-sub-link"
                      onClick={() => goTo(`/category/${cat.id}?sub=${encodeURIComponent(sub)}`)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="mobile-nav-link" onClick={() => goTo('/about')}>ℹ️ About</button>
          {/* WhatsApp quick chat */}
          <a
            href={`https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent('Hi Anandha Bodhi, I have a question about your products.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-wa-link"
          >
            {WA_ICON}
            Chat on WhatsApp
          </a>
        </div>
      </nav>
    </>
  );
}
