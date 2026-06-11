import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useFetchProducts from '../hooks/useFetchProducts';
import { selectSearchTerm } from '../redux/searchSlice';
import ProductItem from './ProductItem';

function ProductList() {
  const { products, loading, error } = useFetchProducts();
  const searchTerm = useSelector(selectSearchTerm);

  // filter products based on redux search state
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  if (loading) {
    return (
      <div className="status-message loading-msg">
        <p>Loading products, hang tight...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message error-msg" role="alert">
        <h2>Could not load products</h2>
        <p>{error}</p>
        <p className="error-hint">Check your internet connection and refresh the page.</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="status-message">
        <p>No products found for &quot;{searchTerm}&quot;. Try a different search.</p>
      </div>
    );
  }

  return (
    <section className="product-list-section">
      <h2 className="section-heading">Our Products</h2>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
