import { useState, useEffect } from 'react';

const API_URL = 'https://dummyjson.com/products';

// custom hook for pulling product list
// used inside ProductList so the fetch logic stays separate
function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        const data = await res.json();
        if (!cancelled) {
          setProducts(data.products || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Something went wrong while fetching products');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}

export default useFetchProducts;
