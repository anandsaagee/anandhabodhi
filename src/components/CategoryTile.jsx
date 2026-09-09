import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryTile.css';

const CategoryTile = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`} className="category-tile">
      <div className="category-image-container">
        {category.image ? (
          <img src={category.image} alt={category.name} className="category-image" loading="lazy" />
        ) : (
          <div className="img-placeholder category-image"></div>
        )}
        <div className="category-overlay">
          <h2 className="category-name">{category.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default CategoryTile;
