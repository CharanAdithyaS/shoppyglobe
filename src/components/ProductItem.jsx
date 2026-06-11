import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addToCart } from '../redux/cartSlice';
import LazyImage from './LazyImage';

function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart(product));
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <LazyImage
          src={product.thumbnail}
          alt={product.title}
          className="product-thumb"
        />
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-rating">★ {product.rating}</p>
      </Link>
      <button type="button" className="btn btn-primary" onClick={handleAdd}>
        Add to Cart
      </button>
    </article>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number,
  }).isRequired,
};

export default ProductItem;
