import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import './Navbar.css';
import logo from '../logo.png';

const Navbar = () => {
  const { isAuthenticated, user, logout, isAdmin, isSeller } = useAuth();
  const { getCartItemsCount } = useCart();

  const admin = typeof isAdmin === 'function' ? isAdmin() : false;
  const seller = typeof isSeller === 'function' ? isSeller() : false;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="ShoeStore Logo" className="logo-image" />
        </Link>

        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>

          {isAuthenticated ? (
            <>
              {!admin && (
                <li>
                  <Link to="/cart">🛒 Cart ({getCartItemsCount()})</Link>
                </li>
              )}

              <li><Link to="/profile">Profile</Link></li>
              {admin && <li><Link to="/admin">Admin</Link></li>}
              {seller && <li><Link to="/seller-dashboard">Seller</Link></li>}
              <li><button onClick={logout} className="logout-btn">Logout</button></li>
              <li className="user-greeting">Hi, {user?.name}</li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
