import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StaggeredMenu from './StaggeredMenu';
import './Navbar.css';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Experiences', ariaLabel: 'View upcoming wine pours', link: '/experiences' },
  { label: 'Gifted', ariaLabel: 'Curated wine gift boxes', link: '/gifted' },
  { label: 'The Circle', ariaLabel: 'Join the Champagniacs Circle', link: '/club' },
];

const socialItems = [
  { label: 'Instagram', link: 'https://instagram.com/champagniacs.ke' },
  { label: 'WhatsApp', link: 'https://wa.me/254700000000' },
  { label: 'Email', link: 'mailto:hello@champagniacs.ke' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`navbar-header desktop-only ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-top-accent" />
        <nav className="navbar-container container">
          <Link to="/" className="brand-lockup" aria-label="Champagniacs.ke home">
            <div className="brand-logo-frame">
              <img src="/logo.jpg" alt="Champagniacs.ke logo" className="brand-logo" />
              <div className="brand-logo-ring" />
            </div>
            <div className="brand-text">
              <span className="brand-title">CHAMPAGNIACS</span>
              <span className="brand-subtitle">
                <span className="dot" /> NAIROBI · WINE CULTURE
              </span>
            </div>
          </Link>

          <ul className="nav-menu" id="site-navigation">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <li key={item.link} className="nav-item">
                  <Link
                    to={item.link}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive && <span className="nav-indicator" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="nav-actions">
            <Link to="/experiences" className="nav-cta-button">
              <span className="cta-label">RESERVE A POUR</span>
              <span className="cta-glyph">✦</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Staggered Menu from React Bits */}
      <div className="mobile-only-menu">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#ffffff"
          changeMenuColorOnOpen={true}
          colors={['#101014', '#5c0f1c', '#d4af37']}
          logoUrl="/logo.jpg"
          accentColor="#d4af37"
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </div>
    </>
  );
};

export default Navbar;
