import React from 'react';
import CategoryTile from '../components/CategoryTile';
import data from '../data/products.json';

const Home = () => {
  return (
    <div className="container" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="title-large" style={{ fontSize: '2.5rem' }}>Sacred Living. Timeless Tradition.</h2>
        <p className="subtitle">Discover our curated collection of spiritual essentials.</p>
        <button 
          className="btn-primary btn-shop" 
          onClick={() => {
            document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Shop Now
        </button>
      </div>

      <div id="categories">
        <h3 className="title-large" style={{ textAlign: 'left', marginBottom: '1.5rem', fontSize: '1.75rem' }}>Categories</h3>
        <div className="grid grid-cols-2">
          {data.categories.map((category) => (
            <CategoryTile key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
