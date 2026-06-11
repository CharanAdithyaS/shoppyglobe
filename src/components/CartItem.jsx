import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import LazyImage from './LazyImage';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const decreaseQty = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const increaseQty = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  return (
    <div className="cart-item">
      <LazyImage src={item.thumbnail} alt={item.title} className="cart-item-img" />
      <div className="cart-item-info">
        <h3>{item.title}</h3>
        <p className="cart-item-price">${item.price} each</p>
      </div>
      <div className="qty-controls">
        <button type="button" onClick={decreaseQty} aria-label="Decrease quantity">
          −
        </button>
        <span>{item.quantity}</span>
        <button type="button" onClick={increaseQty} aria-label="Increase quantity">
          +
        </button>
      </div>
      <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>
      <button type="button" className="btn btn-danger btn-sm" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
