import { useState } from 'react';
import './ProductPages.css';

export default function ClubPage() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  return (
    <div className="product-page club-page">
      <section className="club-hero">
        <div className="club-hero-backdrop">
          <div className="club-hero-photo" />
          <div className="club-hero-shade" />
        </div>
        <div className="container club-hero-layout">
          <div className="club-hero-content">
            <span className="eyebrow light">A CIRCLE OF VERY GOOD PEOPLE</span>
            <p className="hero-kicker">The Champagniacs Circle</p>
            <h1>
              Good wine.<br />
              <em>Better company.</em>
            </h1>
            <p>
              A little more joy in your calendar. New rare bottles to discover, insider stories from Nairobi cellars, and invitations to intimate gatherings.
            </p>
            <div className="hero-cta-wrapper">
              <a href="#join" className="button button-gold">
                <span>Find Your People</span>
                <span>↓</span>
              </a>
            </div>
          </div>

          <div className="club-hero-seal-wrap">
            <div className="circle-seal">
              <span>POUR YOURSELF<br />A LITTLE JOY</span>
              <i>✦</i>
            </div>
          </div>
        </div>
      </section>

      <section className="circle-details section-space">
        <div className="container circle-grid">
          <div>
            <span className="eyebrow wine-accent"><i /> A PRIVILEGE TO LOOK FORWARD TO</span>
            <h2>
              Good things<br />
              <em>in your inbox.</em>
            </h2>
          </div>

          <div className="circle-perks">
            <div>
              <b>01</b>
              <span>
                <strong>Notes from Sharon ("The Champagne Ma'")</strong>
                <small>Curated reads, personal bottle picks, and zero pretentiousness or confusing jargon.</small>
              </span>
            </div>
            <div>
              <b>02</b>
              <span>
                <strong>First Dibs on Rare Pours</strong>
                <small>Early access event tickets before public release and limited-run allocations.</small>
              </span>
            </div>
            <div>
              <b>03</b>
              <span>
                <strong>A Reason to Gather</strong>
                <small>Circle-only secret tastings, dinners, and sundowners shared with other wine lovers.</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="club-signup" id="join">
        <div className="container signup-inner">
          <span className="eyebrow wine-accent"><i /> A PRESCRIPTION FOR HAPPINESS</span>
          <h2>
            “My doctor said surround yourself with people who make you happy.<br />
            I simply followed instructions. Join the Champagniacs Circle.”
          </h2>

          {joined ? (
            <div className="joined-state">
              <span>✦</span>
              <b>You’re on the Circle list!</b>
              <p>Check your inbox for a personal welcome note from Sharon.</p>
            </div>
          ) : (
            <form
              className="signup-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setJoined(true);
              }}
            >
              <label htmlFor="club-email">Your Email Address</label>
              <div>
                <input
                  id="club-email"
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="button button-gold">
                  <span>Count Me In</span>
                  <span>↗</span>
                </button>
              </div>
              <small>Only good wine notes, no spam ever. You can unsubscribe anytime.</small>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
