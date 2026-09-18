import React, { useState, useContext } from 'react';
import { LangContext } from '../App.jsx';
import { useCart } from '../context/CartContext.jsx';

const CART_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.96-1.61L23 6H6"/>
  </svg>
);

const CHECK_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// Get the effective price for a product (handles frameVariants, posterVariants, or plain price)
function getEffectivePrice(product, variant) {
  if (variant && product.frameVariants) {
    const fv = product.frameVariants.find((v) => v.size === variant);
    if (fv) return fv.price;
    return product.frameVariants[0].price;
  }
  if (variant && product.posterVariants) {
    const pv = product.posterVariants.find((v) => v.size === variant);
    if (pv) return pv.price;
    return product.posterVariants[0].price;
  }
  return product.price;
}

export default function ProductCard({ product }) {
  const lang = useContext(LangContext);
  const { dispatch } = useCart();

  // Determine variant type
  const hasVariants = !!product.variants;
  const hasFrameVariants = !!product.frameVariants;
  const hasPosterVariants = !!product.posterVariants;

  const defaultVariant = hasVariants
    ? product.variants[0]
    : hasFrameVariants
    ? product.frameVariants[0].size
    : hasPosterVariants
    ? product.posterVariants[0].size
    : null;

  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [added, setAdded] = useState(false);

  const name = lang === 'ml' && product.nameMl ? product.nameMl : product.name;
  const price = getEffectivePrice(product, selectedVariant);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, variant: selectedVariant, quantity: 1 },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="product-card">
      {/* Image */}
      <div className={`product-img-wrap${!product.image ? ' no-photo' : ''}`}>
        {product.image ? (
          <img src={product.image} alt={name} loading="lazy" />
        ) : (
          <div className="product-img-placeholder">
            <span>{name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="product-body">
        <p className="product-name">{name}</p>
        <p className="product-price">₹{(price || 0).toLocaleString('en-IN')}</p>

        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}

        {/* Variant picker — standard variants */}
        {hasVariants && (
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

        {/* Variant picker — frame variants */}
        {hasFrameVariants && (
          <div className="variant-picker" role="group" aria-label="Select frame size">
            {product.frameVariants.map((fv) => (
              <button
                key={fv.size}
                className={`variant-btn${selectedVariant === fv.size ? ' active' : ''}`}
                onClick={() => setSelectedVariant(fv.size)}
              >
                {fv.size} — ₹{fv.price}
              </button>
            ))}
          </div>
        )}

        {/* Variant picker — poster variants */}
        {hasPosterVariants && (
          <div className="variant-picker" role="group" aria-label="Select poster size">
            {product.posterVariants.map((pv) => (
              <button
                key={pv.size}
                className={`variant-btn${selectedVariant === pv.size ? ' active' : ''}`}
                onClick={() => setSelectedVariant(pv.size)}
              >
                {pv.size} — ₹{pv.price}
              </button>
            ))}
          </div>
        )}

        {/* Add to Cart button */}
        <button
          className={`btn-add-to-cart${added ? ' added' : ''}`}
          onClick={handleAddToCart}
          aria-label={`Add ${name} to cart`}
        >
          {added ? (
            <>{CHECK_ICON} {lang === 'ml' ? 'ചേർത്തു!' : 'Added!'}</>
          ) : (
            <>{CART_ICON} {lang === 'ml' ? 'കാർട്ടിൽ ചേർക്കൂ' : 'Add to Cart'}</>
          )}
        </button>
      </div>
    </div>
  );
}
