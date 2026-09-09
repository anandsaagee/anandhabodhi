import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="header">
      <div className="container header-content">
        {!isHome ? (
          <button 
            className="back-btn" 
            onClick={() => navigate(-1)}
            aria-label="Go Back"
          >
            ← Back
          </button>
        ) : (
          <div className="spacer"></div> /* To keep logo centered if back button is missing */
        )}
        
        <div className="logo-container" onClick={() => navigate('/')}>
          <h1 className="logo-text">Anandha Bodhi</h1>
        </div>

        <div className="spacer"></div>
      </div>
    </header>
  );
};

export default Header;
