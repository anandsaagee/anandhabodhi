import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const storeNumber = '910000000000'; // Placeholder for WhatsApp number

  const handleOrder = () => {
    const text = `Hi Anandha Bodhi, I'd like to order:\n${product.name} – ₹${product.price}.\nQuantity: __`;
    const url = `https://wa.me/${storeNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        ) : (
          <div className="img-placeholder product-image">No Photo Yet</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price}</p>
        {product.description && <p className="product-desc">{product.description}</p>}
        
        <button className="btn-primary btn-whatsapp" onClick={handleOrder}>
          <span className="whatsapp-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.201.535 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.666.596 1.216.78 1.39.866.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
            </svg>
          </span>
          Order on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
