import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { LangContext } from '../App.jsx';
import ProductCard from '../components/ProductCard.jsx';
import data from '../data/products.json';

export default function CategoryPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = useContext(LangContext);
  const navigate = useNavigate();

  const category = data.categories.find((c) => c.id === id);
  const allProducts = data.products.filter((p) => p.categoryId === id);

  const activeSub = searchParams.get('sub') || 'All';

  const filteredProducts = activeSub === 'All'
    ? allProducts
    : allProducts.filter((p) => p.subCollection === activeSub);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!category) navigate('/');
  }, [id, category, navigate]);

  if (!category) return null;

  const catName = lang === 'ml' && category.nameMl ? category.nameMl : category.name;
  const subCollections = category.subCollections || ['All'];

  const handleSubChange = (sub) => {
    if (sub === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ sub });
    }
  };

  return (
    <div className="cat-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <button className="breadcrumb-link" onClick={() => navigate('/')}>Home</button>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">{catName}</span>
        {activeSub !== 'All' && (
          <>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">{activeSub}</span>
          </>
        )}
      </nav>

      {/* Category header */}
      <div className="cat-page-header">
        <div className="cat-page-emoji">{category.emoji}</div>
        <div>
          <h1 className="cat-page-title">{catName}</h1>
          <p className="cat-page-count">{allProducts.length} {lang === 'ml' ? 'ഉത്പന്നങ്ങൾ' : 'products'}</p>
        </div>
      </div>

      {/* Sub-collection filter tabs */}
      {subCollections.length > 1 && (
        <div className="sub-filter-wrap" role="tablist" aria-label="Filter by collection">
          <div className="sub-filter-scroll">
            {subCollections.map((sub) => (
              <button
                key={sub}
                role="tab"
                aria-selected={activeSub === sub}
                className={`sub-filter-tab${activeSub === sub ? ' active' : ''}`}
                onClick={() => handleSubChange(sub)}
              >
                {sub}
                {sub !== 'All' && (
                  <span className="sub-filter-count">
                    {allProducts.filter(p => p.subCollection === sub).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>🙏 {lang === 'ml' ? 'ഉൽപ്പന്നങ്ങൾ ഉടൻ ചേർക്കും.' : 'Products coming soon.'}</p>
          <button className="btn-hero-primary" style={{ marginTop: '16px' }} onClick={() => navigate('/')}>
            {lang === 'ml' ? 'ഷോപ്പ് തുടരൂ' : 'Continue Shopping'}
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
