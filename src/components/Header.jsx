import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectCartCount } from '../redux/cartSlice';

function Header({ onSearchChange, searchValue }) {
  const cartCount = useSelector(selectCartCount);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo">
          Shoppy<span>Globe</span>
        </Link>

        <nav className="main-nav">
          <Link to="/" className={isHome ? 'active' : ''}>
            Home
          </Link>
          <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/checkout" className={location.pathname === '/checkout' ? 'active' : ''}>
            Checkout
          </Link>
        </nav>

        {/* search only really makes sense on home page but keeping it visible everywhere */}
        {isHome && (
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search products"
            />
          </div>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
};

export default Header;
