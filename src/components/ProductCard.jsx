import React, { useState, useContext } from 'react';
import data from '../data/products.json';
import { LangContext } from '../App.jsx';

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.201.535 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.666.596 1.216.78 1.39.866.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
    <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.45zM12.045 21.785h-.005c-1.774 0-3.513-.474-5.031-1.37l-.36-.214-3.742.975.999-3.648-.235-.374a9.86 9.86 0 01-1.511-5.26c.001-5.45 4.436-9.884 9.892-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884z"/>
  </svg>
);

export default function ProductCard({ product }) {
  const lang = useContext(LangContext);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? product.variants[0] : null
  );

  const name = lang === 'ml' && product.nameMl ? product.nameMl : product.name;
  const btnLabel = lang === 'ml' ? 'WhatsApp-ൽ ഓർഡർ' : 'Order on WhatsApp';

  const handleOrder = () => {
    const variantText = selectedVariant ? ` (${selectedVariant})` : '';
    const text = `Hi Anandha Bodhi, I'd like to order:\n${product.name}${variantText} – ₹${product.price.toLocaleString('en-IN')}.\nQuantity: __`;
    const url = `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div className="product-card">
      {/* Image */}
      <div className={`product-img-wrap${!product.image ? ' no-photo' : ''}`}>
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          'Photo coming soon'
        )}
      </div>

      <div className="product-body">
        <p className="product-name">{name}</p>
        <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>

        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}

        {/* Variant picker */}
        {product.variants && (
          <div className="variant-picker" role="group" aria-label="Select size">
            {product.variants.map((v) => (
              <button
                key={v}
                className={`variant-btn${selectedVariant === v ? ' active' : ''}`}
                onClick={() => setSelectedVariant(v)}
              >
                {v}
              </button>
            ))}
          </div>
        )}

        {/* Order button */}
        <button className="btn-whatsapp" onClick={handleOrder} aria-label={`${btnLabel} – ${product.name}`}>
          {WA_ICON}
          {btnLabel}
        </button>
      </div>
    </div>
  );
}
