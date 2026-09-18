import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LangContext } from '../App.jsx';
import { useCart } from '../context/CartContext.jsx';
import data from '../data/products.json';

const WA_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.201.535 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.666.596 1.216.78 1.39.866.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
    <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.45zM12.045 21.785h-.005c-1.774 0-3.513-.474-5.031-1.37l-.36-.214-3.742.975.999-3.648-.235-.374a9.86 9.86 0 01-1.511-5.26c.001-5.45 4.436-9.884 9.892-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884z"/>
  </svg>
);

const CLOSE_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const TRASH_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

export default function CartDrawer({ isOpen, onClose }) {
  const lang = useContext(LangContext);
  const { items, totalItems, totalPrice, dispatch } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) return;

    const lines = items.map((item, idx) => {
      const variantText = item.variant ? ` (${item.variant})` : '';
      const lineTotal = (item.unitPrice * item.quantity).toLocaleString('en-IN');
      return `${idx + 1}. ${item.product.name}${variantText} × ${item.quantity} = ₹${lineTotal}`;
    });

    const total = totalPrice.toLocaleString('en-IN');
    const message = [
      'Hi Anandha Bodhi! 🙏 I would like to place an order:',
      '',
      ...lines,
      '',
      `*Total: ₹${total}*`,
      '',
      'Please confirm availability and delivery details. Thank you!',
    ].join('\n');

    const url = `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  };

  const updateQty = (key, qty) => dispatch({ type: 'UPDATE_QTY', payload: { key, quantity: qty } });
  const removeItem = (key) => dispatch({ type: 'REMOVE_ITEM', payload: { key } });

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${isOpen ? ' visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside className={`cart-drawer${isOpen ? ' open' : ''}`} aria-label="Shopping cart" role="dialog" aria-modal="true">
        {/* Header */}
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">
            🛒 {lang === 'ml' ? 'കാർട്ട്' : 'Your Cart'}
            {totalItems > 0 && <span className="cart-count-label">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>}
          </h2>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">{CLOSE_ICON}</button>
        </div>

        {/* Body */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>{lang === 'ml' ? 'കാർട്ട് ഒഴിഞ്ഞിരിക്കുന്നു' : 'Your cart is empty'}</p>
              <button className="btn-shop-now" onClick={() => { onClose(); navigate('/'); }}>
                {lang === 'ml' ? 'ഷോപ്പ് ചെയ്യൂ' : 'Start Shopping'}
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.key} className="cart-item">
                  <div className="cart-item-img">
                    {item.product.image ? (
                      <img src={item.product.image} alt={item.product.name} loading="lazy" />
                    ) : (
                      <div className="cart-item-img-placeholder">{item.product.name.charAt(0)}</div>
                    )}
                  </div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.product.name}</p>
                    {item.variant && <p className="cart-item-variant">{item.variant}</p>}
                    <p className="cart-item-price">₹{item.unitPrice.toLocaleString('en-IN')} each</p>
                    <div className="cart-item-controls">
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => updateQty(item.key, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                        <span className="qty-value">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.key, item.quantity + 1)} aria-label="Increase quantity">+</button>
                      </div>
                      <span className="cart-item-line-total">₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</span>
                      <button className="cart-item-remove" onClick={() => removeItem(item.key)} aria-label="Remove item">{TRASH_ICON}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal">
              <span>{lang === 'ml' ? 'ആകെ' : 'Subtotal'}</span>
              <span className="cart-total-amount">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <p className="cart-note">{lang === 'ml' ? 'ഡെലിവറി ചെലവ് WhatsApp-ൽ സ്ഥിരീകരിക്കും' : 'Delivery charges will be confirmed via WhatsApp'}</p>
            <button className="btn-checkout-wa" onClick={handleCheckout}>
              {WA_ICON}
              {lang === 'ml' ? 'WhatsApp-ൽ ഓർഡർ' : 'Checkout via WhatsApp'}
            </button>
            <button className="btn-continue-shopping" onClick={onClose}>
              {lang === 'ml' ? 'ഷോപ്പിംഗ് തുടരൂ' : 'Continue Shopping'}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
