import { Link } from 'react-router-dom';
import Logout from './Logout';

export default function Navbar() {
  const navStyle = {
    position: 'fixed', // fixes navbar at top
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    background: 'linear-gradient(90deg, #1e3c72, #2a5298)', // Attractive gradient background
    color: 'white',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    fontFamily: "'Poppins', sans-serif",
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #fff, #f0f0f0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'background-color 0.3s, transform 0.2s',
  };

  const leftLinksStyle = {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  };

  return (
    <>
      <style>
        {`
          nav a:hover {
            background-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
          }
          nav a:active {
            transform: translateY(0);
          }
        `}
      </style>
      <nav style={navStyle}>
        <div style={logoStyle}>🏡 RealEstate</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div style={leftLinksStyle}>
            <Link style={linkStyle} to="/buy">Buy</Link>
            <Link style={linkStyle} to="/sell">Sell</Link>
            <Link style={linkStyle} to="/wishlist">Wishlist</Link>
            <Link style={linkStyle} to="/profile">Profile</Link>
          </div>
          <Logout />
        </div>
      </nav>
    </>
  );
}
