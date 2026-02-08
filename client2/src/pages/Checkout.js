import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { orderService } from '../services/api';
import '../styles/Checkout.css';
import SuccessModal from '../components/SuccessModal';
import { useAuth } from '../contexts/AuthContext';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    phoneNumber: ''
  });

  useEffect(() => {
    if (user) {
      setShippingAddress(prev => ({
        street: user.address?.street || prev.street,
        city: user.address?.city || prev.city,
        state: user.address?.state || prev.state,
        zipCode: user.address?.zipCode || prev.zipCode,
        country: user.address?.country || prev.country,
        phoneNumber: user.phoneNumber || prev.phoneNumber
      }));
    }
  }, [user]);

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [customerNotes, setCustomerNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 10;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (cart.length === 0) throw new Error('Your cart is empty.');

      const items = cart.map(item => ({
        product: item.product._id,
        color: item.color,
        size: item.size,
        quantity: item.quantity
      }));

      const safeShippingAddress = {
        street: shippingAddress.street || '',
        city: shippingAddress.city || '',
        state: shippingAddress.state || '',
        zipCode: shippingAddress.zipCode || '',
        country: shippingAddress.country || 'USA',
        phoneNumber: shippingAddress.phoneNumber || ''
      };

      const orderData = {
        items,
        shippingAddress: safeShippingAddress,
        paymentMethod,
        customerNotes
      };


      const response = await orderService.create(orderData);

      setCreatedOrder({
        id: response.data.data._id,
        total: total,
        itemsCount: cart.length
      });

      setShowSuccessModal(true);
      clearCart();

    } catch (err) {
      console.error('Order error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cart.length === 0 && !showSuccessModal) {
      navigate('/cart');
    }
  }, [cart, showSuccessModal, navigate]);


  return (
    <div className="checkout-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate('/cart')}>
        ← Back to Cart
      </button>

      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <section className="form-section">
              <h2>Shipping Address</h2>
              
              <div className="form-group">
                <label>Street Address *</label>
                <input
                  type="text"
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                  required
                  placeholder="123 Main St"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Zip Code *</label>
                  <input
                    type="text"
                    value={shippingAddress.zipCode}
                    onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    value={shippingAddress.phoneNumber}
                    onChange={(e) => setShippingAddress({...shippingAddress, phoneNumber: e.target.value})}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                {['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'].map(method => (
                  <label key={method} className="radio-option">
                    <input
                      type="radio"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {method}
                  </label>
                ))}
              </div>
            </section>

            <section className="form-section">
              <h2>Order Notes (Optional)</h2>
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="Special instructions..."
                rows="3"
              />
            </section>

            <button type="submit" className="place-order-btn" disabled={loading}>
              {loading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cart.map((item, index) => (
              <div key={index} className="summary-item">
                <img src={item.product.mainImage} alt={item.product.name} />
                <div className="item-details">
                  <p className="item-name">{item.product.name}</p>
                  <p className="item-specs">{item.color} • Size {item.size} • Qty: {item.quantity}</p>
                </div>
                <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-line">
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-line total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        orderId={createdOrder?.id}
        total={createdOrder?.total?.toFixed(2)}
        itemsCount={createdOrder?.itemsCount}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/');
        }}
      />
    </div>
  );
};

export default Checkout;