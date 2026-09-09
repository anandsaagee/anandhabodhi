import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import data from '../data/products.json';

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const category = data.categories.find(c => c.id === id);
  const products = data.products.filter(p => p.categoryId === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!category) {
      navigate('/');
    }
  }, [category, navigate]);

  if (!category) return null;

  return (
    <div className="container" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
      <h2 className="title-large" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        {category.name}
      </h2>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-2">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '3rem' }}>
          No products found in this category yet.
        </p>
      )}
    </div>
  );
};

export default Category;
