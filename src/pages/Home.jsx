import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LangContext } from '../App.jsx';
import data from '../data/products.json';

export default function Home({ setPage }) {
  const lang = useContext(LangContext);
  const navigate = useNavigate();

  useEffect(() => {
    setPage('home');
    window.scrollTo(0, 0);
  }, [setPage]);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="home-hero">
        <h1>
          {lang === 'ml'
            ? 'ആനന്ദ ബോധി'
            : 'Anandha Bodhi'}
        </h1>
        <p>
          {lang === 'ml'
            ? 'ഭക്തിയുടെ ലോകത്തേക്ക് സ്വാഗതം'
            : 'Sacred Living. Timeless Tradition.'}
        </p>
        <button
          className="btn-shop-all"
          onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Shop our products"
        >
          {lang === 'ml' ? 'ഷോപ്പ് ചെയ്യൂ' : 'Shop Now'}
        </button>
      </div>

      {/* Categories */}
      <section id="categories" aria-label="Product categories">
        <h2 className="section-title">
          {lang === 'ml' ? 'വിഭാഗങ്ങൾ' : 'Categories'}
        </h2>
        <div className="category-grid">
          {data.categories.map((cat) => {
            const name = lang === 'ml' && cat.nameMl ? cat.nameMl : cat.name;
            if (cat.comingSoon) {
              return (
                <div key={cat.id} className="category-card placeholder">
                  <div className="category-img-wrap">
                    {lang === 'ml' ? 'ഉടൻ വരുന്നു...' : 'Coming Soon'}
                  </div>
                  <div className="category-label">{name}</div>
                </div>
              );
            }
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
                <div className="category-img-wrap">
                  {cat.image && <img src={cat.image} alt={name} loading="lazy" />}
                </div>
                <div className="category-label">{name}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
