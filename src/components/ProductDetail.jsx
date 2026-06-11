import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import LazyImage from './LazyImage';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch product (status ${res.status})`);
        }
        const data = await res.json();
        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load product details');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (loading) {
    return <div className="status-message loading-msg">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="status-message error-msg" role="alert">
        <h2>Error loading product</h2>
        <p>{error}</p>
        <Link to="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <section className="product-detail">
      <Link to="/" className="back-link">
        ← Back to products
      </Link>

      <div className="product-detail-grid">
        <LazyImage
          src={product.thumbnail}
          alt={product.title}
          className="detail-image"
        />
        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="detail-brand">Brand: {product.brand}</p>
          <p className="detail-price">${product.price}</p>
          <p className="detail-rating">Rating: {product.rating} / 5</p>
          <p className="detail-desc">{product.description}</p>
          <p className="detail-stock">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
          <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
