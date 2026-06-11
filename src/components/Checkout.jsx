import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, clearCart } from '../redux/cartSlice';

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (items.length === 0) {
      alert('Your cart is empty. Add products before placing an order.');
      return;
    }

    // this is just a dummy checkout for the assignment
    // no real payment processing happens here
    setOrderPlaced(true);
    dispatch(clearCart());

    setTimeout(() => {
      navigate('/');
    }, 2500);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <section className="checkout-page">
        <h2>Checkout</h2>
        <p>Cart is empty. Add items first.</p>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
          Go to Home
        </button>
      </section>
    );
  }

  if (orderPlaced) {
    return (
      <section className="checkout-page order-success">
        <div className="success-box">
          <h2>Order placed</h2>
          <p>Thanks {form.fullName || 'there'}! Redirecting you back to home...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h3>Your Details</h3>
          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            City
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            ZIP Code
            <input
              type="text"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="btn btn-primary btn-block">
            Place Order
          </button>
        </form>

        <aside className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="summary-total">
            Total: <strong>${total.toFixed(2)}</strong>
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
