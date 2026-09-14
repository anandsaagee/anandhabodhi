import React, { useContext, useEffect } from 'react';
import { LangContext } from '../App.jsx';
import data from '../data/products.json';

const PHONE_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
  </svg>
);

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.201.535 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.666.596 1.216.78 1.39.866.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
    <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.45z"/>
  </svg>
);

export default function AboutPage({ setPage }) {
  const lang = useContext(LangContext);

  useEffect(() => {
    setPage('about');
    window.scrollTo(0, 0);
  }, [setPage]);

  const waUrl = `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent('Hi Anandha Bodhi, I have a question.')}`;

  return (
    <div className="page-wrapper">
      <div className="about-page">
        <h2>{lang === 'ml' ? 'ഞങ്ങളെ കുറിച്ച്' : 'About Us'}</h2>
        <p>
          {lang === 'ml'
            ? 'ആനന്ദ ബോധി ഒരു പ്രീമിയം ഹൈന്ദവ ഭക്തി ലൈഫ്‌സ്‌റ്റൈൽ ബ്രാൻഡ് ആണ്. ഞങ്ങൾ ഉന്നതനിലവാരമുള്ള പൂജ ഉൽപ്പന്നങ്ങൾ, ദേവ ചിത്രങ്ങൾ, പരമ്പരാഗത വസ്ത്രങ്ങൾ എന്നിവ നൽകുന്നു.'
            : 'Anandha Bodhi is a premium Hindu devotional lifestyle brand. We offer high-quality puja essentials, deity frames, and traditional wear rooted in timeless Indian tradition.'}
        </p>
        <p>
          {lang === 'ml'
            ? 'ഞങ്ങളുടെ എല്ലാ ഉൽപ്പന്നങ്ങളും ഭക്തിയോടെ തിരഞ്ഞെടുക്കപ്പെട്ടതാണ്.'
            : 'Every product is carefully curated to bring sanctity and beauty into your home.'}
        </p>

        <div className="contact-block">
          <h3>{lang === 'ml' ? 'ബന്ധപ്പെടുക' : 'Contact Us'}</h3>

          <div className="contact-item">
            {PHONE_ICON}
            <a href={`tel:+${data.whatsappNumber}`}>
              +{data.whatsappNumber}
            </a>
          </div>

          <div className="contact-item">
            {WA_ICON}
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              {lang === 'ml' ? 'WhatsApp-ൽ ബന്ധപ്പെടുക' : 'Chat on WhatsApp'}
            </a>
          </div>

          <div className="contact-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="10" r="3"/>
              <path d="M12 2a8 8 0 00-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 00-8-8z"/>
            </svg>
            <span>{lang === 'ml' ? 'കേരളം, ഇന്ത്യ' : 'Kerala, India'}</span>
          </div>

          <div className="contact-item" style={{ marginTop: '4px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
            <span>
              {lang === 'ml'
                ? 'സമയം: തിങ്കൾ – ശനി, 9am – 7pm'
                : 'Hours: Mon – Sat, 9am – 7pm'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
