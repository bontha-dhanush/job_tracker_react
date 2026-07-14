import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/dashboard" className="navbar__brand">
          <span className="navbar__logo">JT</span>
          Job Tracker
        </Link>

        <div className="navbar__actions">
          {user && (
            <span className="navbar__user">Hello, {user.fullName.split(' ')[0]}</span>
          )}
          <button type="button" className="btn btn--outline btn--sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
