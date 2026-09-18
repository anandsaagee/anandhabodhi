import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LangContext } from '../App.jsx';
import ProductCard from '../components/ProductCard.jsx';
import data from '../data/products.json';

const FEATURED_IDS = ['pe-001', 'gg-001', 'fw-001', 'tw-001', 'sp-001', 'pr-003'];

export default function Home() {
  const lang = useContext(LangContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredProducts = FEATURED_IDS
    .map((id) => data.products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <div className="home-hero-badge">🪔 Sacred Living</div>
          <h1 className="home-hero-title">
            {lang === 'ml' ? 'ആനന്ദ ബോധി' : 'Anandha Bodhi'}
          </h1>
          <p className="home-hero-subtitle">
            {lang === 'ml'
              ? 'ഭക്തിയുടെ ലോകത്തേക്ക് സ്വാഗതം'
              : 'Sacred Living. Timeless Tradition.'}
          </p>
          <p className="home-hero-desc">
            {lang === 'ml'
              ? 'ആരാധനാ ഉത്പന്നങ്ങൾ, ദേവ-ദേവ വിഗ്രഹങ്ങൾ, പരമ്പരാഗത വസ്ത്രം – WhatsApp-ൽ ഓർഡർ ചെയ്യൂ.'
              : 'Authentic puja essentials, deity idols, traditional wear and more — order easily via WhatsApp.'}
          </p>
          <div className="home-hero-ctas">
            <button
              className="btn-hero-primary"
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {lang === 'ml' ? 'ഷോപ്പ് ചെയ്യൂ' : 'Shop Now'}
            </button>
            <a
              href={`https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent('Hi Anandha Bodhi, I would like to know more about your products.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-secondary"
            >
              💬 {lang === 'ml' ? 'ചോദിക്കൂ' : 'Ask Us'}
            </a>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <div className="features-strip">
        <div className="feature-item">🚚 <span>Free Delivery above ₹999</span></div>
        <div className="feature-item">🙏 <span>100% Authentic</span></div>
        <div className="feature-item">💬 <span>WhatsApp Support</span></div>
        <div className="feature-item">🔒 <span>Secure Orders</span></div>
      </div>

      {/* Categories Grid */}
      <section id="categories" className="section-wrap" aria-label="Product categories">
        <div className="section-header">
          <h2 className="section-title">
            {lang === 'ml' ? 'വിഭാഗങ്ങൾ' : 'Shop by Category'}
          </h2>
        </div>
        <div className="category-grid">
          {data.categories.map((cat) => {
            const name = lang === 'ml' && cat.nameMl ? cat.nameMl : cat.name;
            return (
              <div
                key={cat.id}
                className="category-card"
                role="button"
                tabIndex={0}
                aria-label={`Browse ${name}`}
                onClick={() => navigate(`/category/${cat.id}`)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/category/${cat.id}`)}
              >
                <div className="category-emoji-wrap">
                  <span className="category-emoji">{cat.emoji}</span>
                </div>
                <div className="category-label">{name}</div>
                {cat.subCollections && (
                  <div className="category-sub-hint">
                    {(cat.subCollections || []).filter(s => s !== 'All').slice(0, 2).join(' · ')}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-wrap featured-section" aria-label="Featured products">
        <div className="section-header">
          <h2 className="section-title">
            {lang === 'ml' ? 'ജനപ്രിയ ഉത്പന്നങ്ങൾ' : 'Popular Products'}
          </h2>
          <button className="section-view-all" onClick={() => navigate('/category/puja-essentials')}>
            {lang === 'ml' ? 'എല്ലാം കാണൂ' : 'View All'} →
          </button>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* WhatsApp Banner */}
      <section className="wa-banner">
        <div className="wa-banner-content">
          <div className="wa-banner-icon">💬</div>
          <div>
            <h3>{lang === 'ml' ? 'ഞങ്ങളോട് ചോദിക്കൂ' : 'Have a question?'}</h3>
            <p>{lang === 'ml' ? 'WhatsApp-ൽ ഞങ്ങൾ ലഭ്യമാണ്' : 'Chat with us on WhatsApp — we reply fast!'}</p>
          </div>
          <a
            href={`https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent('Hi Anandha Bodhi! I need help choosing a product.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-banner-btn"
          >
            {lang === 'ml' ? 'ഇപ്പോൾ ചാറ്റ്' : 'Chat Now'}
          </a>
        </div>
      </section>
    </div>
  );
}
