import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LangContext } from '../App.jsx';
import ProductCard from '../components/ProductCard.jsx';
import data from '../data/products.json';

export default function CategoryPage({ setPage }) {
  const { id } = useParams();
  const lang = useContext(LangContext);
  const navigate = useNavigate();

  const category = data.categories.find((c) => c.id === id);
  const products = data.products.filter((p) => p.categoryId === id);

  useEffect(() => {
    setPage('shop');
    window.scrollTo(0, 0);
    if (!category) navigate('/');
  }, [id, category, navigate, setPage]);

  if (!category) return null;

  const catName = lang === 'ml' && category.nameMl ? category.nameMl : category.name;

  return (
    <div className="page-wrapper">
      <h2 className="cat-page-title">{catName}</h2>

      {products.length === 0 ? (
        <div className="empty-state">
          {lang === 'ml' ? 'ഉൽപ്പന്നങ്ങൾ ഉടൻ ചേർക്കും.' : 'Products coming soon.'}
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
