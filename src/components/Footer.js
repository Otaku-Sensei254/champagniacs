import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-luxury">
      <div className="footer-glow" />
      <div className="footer-top-line" />

      <div className="container footer-content">
        <div className="footer-brand-column">
          <div className="footer-lockup">
            <div className="footer-logo-ring">
              <img src="/logo.jpg" alt="Champagniacs.ke logo" className="footer-logo-img" />
            </div>
            <div>
              <span className="footer-brand-title">CHAMPAGNIACS</span>
              <span className="footer-brand-loc">NAIROBI · KENYA</span>
            </div>
          </div>

          <h3 className="footer-tagline-quote">La vie en bulles.</h3>
          <p className="footer-description">
            Good wine. Better company. A curated haven for the curious, the celebratory, and the lovers of a sparkling moment.
          </p>

          <div className="footer-badge-pill">
            <span className="wine-dot" />
            <span>EST. NAIROBI · WINE CULTURE</span>
          </div>
        </div>

        <div className="footer-nav-grid">
          <div className="footer-links-group">
            <h4 className="footer-group-title">EXPLORE</h4>
            <ul className="footer-links-list">
              <li><Link to="/experiences">Experiences & Pours</Link></li>
              <li><Link to="/gifted">Gifted Parcels</Link></li>
              <li><Link to="/club">The Circle (Club)</Link></li>
              <li><a href="#quote-section">The Champagne Way</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-group-title">CONCIERGE</h4>
            <ul className="footer-links-list">
              <li>
                <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
                  WhatsApp Concierge
                </a>
              </li>
              <li>
                <a href="mailto:hello@champagniacs.ke">
                  hello@champagniacs.ke
                </a>
              </li>
              <li>
                <a href="https://instagram.com/champagniacs.ke" target="_blank" rel="noopener noreferrer">
                  Instagram @champagniacs.ke
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-group-title">THE HOUSE</h4>
            <p className="footer-house-note">
              Curated tastings, private cellar bookings, and thoughtful gifts across Nairobi.
            </p>
            <div className="footer-wine-quote">
              “Surround yourself with people who make you happy.”
            </div>
          </div>
        </div>
      </div>

      <div className="footer-tribute-bar">
        <div className="container tribute-inner">
          <p className="tribute-text">
            Champagniacs.ke is culture, connection, and a woman-founded love for wine.
          </p>
          <div className="founder-tag">
            <span>Founded by Sharon Kathure</span>
            <span className="founder-quote">“The Champagne Ma’”</span>
          </div>
          <p className="copyright-text">
            © {new Date().getFullYear()} Champagniacs.ke. All rights reserved. Drink thoughtfully.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
