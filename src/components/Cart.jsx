import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../redux/cartSlice';
import CartItem from './CartItem';

function Cart() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <section className="cart-page empty-cart">
        <h2>Your Cart</h2>
        <p>Nothing here yet — go add some stuff!</p>
        <Link to="/" className="btn btn-primary">
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h2>Your Cart ({items.length} item{items.length !== 1 ? 's' : ''})</h2>
      <div className="cart-items-list">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="cart-summary">
        <p className="cart-total">
          Total: <strong>${total.toFixed(2)}</strong>
        </p>
        <Link to="/checkout" className="btn btn-primary">
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}

export default Cart;
