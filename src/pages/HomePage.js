import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const quotes = [
  { text: 'Kinda chic to meet for wine instead of texting.', author: 'THE CHAMPAGNIACS WAY' },
  { text: 'Kinda chic to drink champagne on a random Tuesday.', author: 'EVERYDAY CELEBRATION' },
  { text: 'Kinda chic to refuse to apologize for liking sweet wine.', author: 'WINE WITHOUT THE RULES' },
  { text: 'Kinda chic to pop a cork just because the sun went down in Nairobi.', author: 'SUNDOWNER MOOD' },
];

const pillars = [
  {
    num: '01',
    tag: 'CURATED GIFTING',
    title: 'Gifted by Champagniacs',
    desc: 'For the milestone moments and the “saw this and thought of you” surprises. Handwritten notes, handpicked bottles.',
    link: '/gifted',
    btnText: 'Curate a gift box',
    accent: 'wine',
  },
  {
    num: '02',
    tag: 'PRIVATE MEMBERSHIP',
    title: 'The Champagniacs Circle',
    desc: 'Good bottles, first dibs on rare pours, and an inner circle of Nairobi people who know how to celebrate life.',
    link: '/club',
    btnText: 'Meet your wine people',
    accent: 'gold',
  },
  {
    num: '03',
    tag: 'BESPOKE EVENTS',
    title: 'Meet Us for a Glass',
    desc: 'Unforgettable Sunday tastings, generous pours, zero snobbery, and stories you’ll be retelling on Monday.',
    link: '/experiences',
    btnText: 'Explore upcoming pours',
    accent: 'charcoal',
  },
];

const HomePage = () => {
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveQuote((quote) => (quote + 1) % quotes.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="home-redesign">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="hero-backdrop-img" role="img" aria-label="Champagne and wine glasses at sunset" />
        <div className="hero-vignette-overlay" />
        <div className="hero-wine-glow" />

        <div className="container hero-layout">
          <div className="hero-narrative">
            <div className="hero-badge">
              <span className="badge-wine-dot" />
              <span>NAIROBI, KENYA · WINE WITHOUT THE RULES</span>
            </div>

            <p className="hero-kicker-text">A little more sparkle. A lot more together.</p>

            <h1 className="hero-headline">
              Making wine fun,<br />
              approachable & exciting.<br />
              <em>One bottle at a time.</em>
            </h1>

            <p className="hero-lead-text">
              Good wine. Better company. No complicated etiquette, no gatekeeping — come as you are, and we’ll pour the first glass.
            </p>

            <div className="hero-actions-row">
              <Link to="/experiences" className="button button-gold">
                <span>Find Your Next Pour</span>
                <span className="btn-arrow">↗</span>
              </Link>
              <Link to="/gifted" className="button button-wine">
                <span>Curate a Gift</span>
                <span className="btn-arrow">→</span>
              </Link>
            </div>

            <div className="hero-founder-meta">
              <span className="meta-sparkle">✦</span>
              <div className="meta-text">
                <span>Curated & Founded by Sharon Kathure</span>
                <b>“The Champagne Ma’”</b>
              </div>
            </div>
          </div>

          <div className="hero-visual-side">
            <div className="hero-emblem-seal">
              <div className="seal-ring">
                <div className="seal-text-circle">
                  <span>GOOD WINE · GOOD PEOPLE · NAIROBI</span>
                </div>
                <div className="seal-center">
                  <span className="seal-star">✦</span>
                  <span className="seal-initials">C.KE</span>
                </div>
              </div>
            </div>

            <div className="hero-floating-card glass-panel">
              <div className="floating-card-header">
                <span className="live-pulse" />
                <span className="floating-title">NEXT TASTING GATHERING</span>
              </div>
              <p className="floating-event-name">The Grape Escape — Sunday Edition</p>
              <div className="floating-details">
                <span>The Social House, Lavington</span>
                <span className="floating-seats">4 SEATS LEFT</span>
              </div>
              <Link to="/experiences" className="floating-card-link">
                View seats & passes →
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-footer-bar">
          <div className="container hero-footer-inner">
            <span className="hero-coord">1.2921° S, 36.8219° E · NAIROBI</span>
            <span className="hero-scroll-invite">SCROLL TO DISCOVER THE POURS ↓</span>
            <span className="hero-sparkle-glyph">✦</span>
          </div>
        </div>
      </section>

      {/* ================= INTRO STRIP ================= */}
      <section className="intro-marquee-strip">
        <div className="container intro-flex">
          <div className="intro-left">
            <span className="intro-monogram">C.</span>
            <p className="intro-tagline">
              For the curious, the celebratory, and the “just because” people.
            </p>
          </div>
          <div className="intro-badges">
            <span className="accent-pill">✦ Hand-Picked Bottles</span>
            <span className="accent-pill">✦ Zero Wine Snobbery</span>
            <span className="accent-pill">✦ Nairobi Express Gifting</span>
          </div>
        </div>
      </section>

      {/* ================= KINDA CHIC PHILOSOPHY & SLIDER ================= */}
      <section className="kinda-chic-section section-space" id="quote-section">
        <div className="container kinda-chic-grid">
          <div className="chic-sidebar">
            <span className="eyebrow">A CHAMPAGNIACS STATE OF MIND</span>
            <h2 className="chic-title">
              The art of<br />
              <em>kinda chic.</em>
            </h2>
            <p className="chic-description">
              There is no wrong reason to open something lovely. We celebrate Tuesday triumphs, spontaneous friends, and the wines you truly enjoy.
            </p>

            <div className="quote-nav-controls">
              <button
                className="quote-nav-btn"
                aria-label="Previous quote"
                onClick={() => setActiveQuote((activeQuote + quotes.length - 1) % quotes.length)}
              >
                ←
              </button>
              <span className="quote-counter">
                0{activeQuote + 1} <i>/</i> 0{quotes.length}
              </span>
              <button
                className="quote-nav-btn"
                aria-label="Next quote"
                onClick={() => setActiveQuote((activeQuote + 1) % quotes.length)}
              >
                →
              </button>
            </div>
          </div>

          <div className="quote-display-card luxury-card">
            <div className="quote-wine-glow" />
            <span className="quote-giant-marks">“</span>
            <p key={activeQuote} className="quote-active-text">
              {quotes[activeQuote].text}
            </p>
            <span className="quote-author-tag">{quotes[activeQuote].author}</span>

            <div className="quote-progress-pills">
              {quotes.map((q, idx) => (
                <button
                  key={q.text}
                  className={`progress-pill ${activeQuote === idx ? 'active' : ''}`}
                  onClick={() => setActiveQuote(idx)}
                  aria-label={`Go to quote ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="chic-visual-card">
            <div className="chic-img-frame">
              <img
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85"
                alt="Champagne glasses catching golden afternoon light"
                className="chic-img"
              />
              <div className="chic-img-overlay" />
              <div className="chic-badge-tag">
                <span>THE POUR<br />IS YOURS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PATHWAYS / PILLARS ================= */}
      <section className="pathways-section section-space">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">YOUR KIND OF GOOD TIME</span>
              <h2 className="section-title">What are we celebrating?</h2>
            </div>
            <p className="section-subtitle">
              Whatever it is, there’s an open bottle and a seat reserved with your name on it.
            </p>
          </div>

          <div className="pathway-cards-grid">
            {pillars.map((pillar) => (
              <Link
                to={pillar.link}
                key={pillar.num}
                className={`pillar-card luxury-card pillar-${pillar.accent}`}
              >
                <div className="pillar-top-meta">
                  <span className="pillar-number">{pillar.num} / {pillar.tag}</span>
                  <span className="pillar-arrow-icon">↗</span>
                </div>

                <div className="pillar-body">
                  <div className="pillar-icon-symbol">
                    {pillar.accent === 'wine' ? '🍷' : pillar.accent === 'gold' ? '🥂' : '✦'}
                  </div>
                  <h3 className="pillar-headline">{pillar.title}</h3>
                  <p className="pillar-text">{pillar.desc}</p>
                </div>

                <div className="pillar-footer">
                  <span className="pillar-action-label">{pillar.btnText}</span>
                  <span className="pillar-chevron">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCES HIGHLIGHT PREVIEW ================= */}
      <section className="highlights-section section-space">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="eyebrow wine-accent"><i /> ON TAP IN NAIROBI</span>
              <h2 className="section-title">Upcoming Pours & Gatherings</h2>
            </div>
            <Link to="/experiences" className="section-view-all">
              View all calendar dates <span>↗</span>
            </Link>
          </div>

          <div className="highlights-grid">
            <div className="highlight-item luxury-card">
              <div className="highlight-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=85"
                  alt="The Grape Escape wine tasting"
                />
                <span className="badge-wine-highlight">4 SEATS LEFT</span>
              </div>
              <div className="highlight-details">
                <span className="highlight-date">SUN, 16 NOV · 2 PM · LAVINGTON</span>
                <h4>The Grape Escape</h4>
                <p>A slow Sunday afternoon tasting pairing South African gems with artisan cheeses.</p>
                <div className="highlight-foot">
                  <span className="highlight-price">From <b>KSh 4,500</b></span>
                  <Link to="/experiences" className="highlight-cta-btn">Book Pass ↗</Link>
                </div>
              </div>
            </div>

            <div className="highlight-item luxury-card">
              <div className="highlight-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=800&q=85"
                  alt="Champagne Day celebration"
                />
                <span className="badge-gold-highlight">JUST ANNOUNCED</span>
              </div>
              <div className="highlight-details">
                <span className="highlight-date">SAT, 22 NOV · 4 PM · WESTLANDS</span>
                <h4>Champagne Day</h4>
                <p>Curated sparkling flights, French champagnes, bubbly cocktails, and unmatched vibes.</p>
                <div className="highlight-foot">
                  <span className="highlight-price">From <b>KSh 6,000</b></span>
                  <Link to="/experiences" className="highlight-cta-btn">Book Pass ↗</Link>
                </div>
              </div>
            </div>

            <div className="highlight-item luxury-card">
              <div className="highlight-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=800&q=85"
                  alt="Midweek Sneaky Pours"
                />
                <span className="badge-charcoal-highlight">MIDWEEK ENERGY</span>
              </div>
              <div className="highlight-details">
                <span className="highlight-date">WED, 26 NOV · 6 PM · RIVERSIDE</span>
                <h4>Midweek Sneaky Pours</h4>
                <p>Your Wednesday made infinitely better. 4 mystery pours and unhurried conversations.</p>
                <div className="highlight-foot">
                  <span className="highlight-price">From <b>KSh 3,200</b></span>
                  <Link to="/experiences" className="highlight-cta-btn">Book Pass ↗</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CLUB CALLOUT BANNER ================= */}
      <section className="vip-banner-section">
        <div className="vip-wine-backlight" />
        <div className="container vip-banner-inner">
          <span className="eyebrow wine-accent">
            <i /> A PRESCRIPTION FOR HAPPINESS
          </span>

          <h2 className="vip-banner-quote">
            “My doctor said surround yourself with people who make you happy.<br />
            I simply followed instructions. Join the Champagniacs Circle.”
          </h2>

          <div className="vip-banner-actions">
            <Link to="/club" className="button button-gold">
              <span>Join The Champagniacs Circle</span>
              <span className="btn-arrow">↗</span>
            </Link>
            <Link to="/experiences" className="button button-outline">
              <span>See What’s Pouring</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>

          <div className="vip-seal-sparkle">✦</div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
