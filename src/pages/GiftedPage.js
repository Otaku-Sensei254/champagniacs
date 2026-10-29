import { useEffect, useState } from 'react';
import './ProductPages.css';

const gifts = [
  {
    name: 'The Little Celebration',
    note: 'A reason is optional.',
    price: 'KSh 8,500',
    photo: 'photo-1547595628-c61a29f496f0',
  },
  {
    name: 'A Very Good Pairing',
    note: 'Two bottles. Zero guesswork.',
    price: 'KSh 12,000',
    photo: 'photo-1510812431401-41d2bd2722f3',
  },
  {
    name: 'The Host With The Most',
    note: 'For their next dinner party.',
    price: 'KSh 15,500',
    photo: 'photo-1513558161293-cdaf765edfd7',
  },
  {
    name: 'Bubbles & Besties',
    note: 'A little sparkle goes a long way.',
    price: 'KSh 10,500',
    photo: 'photo-1516594915697-87eb3b1c14ea',
  },
];

const wineTypes = ['Red & lovely', 'Crisp & white', 'Rosé all day', 'Bubbles, please'];
const extras = ['Stemmed Crystal Glasses · KSh 2,500', 'Brass Corkscrew · KSh 1,200', 'No extras, just wine'];

export default function GiftedPage() {
  const [customizing, setCustomizing] = useState(false);
  const [selectedGift, setSelectedGift] = useState(gifts[0]);
  const [wine, setWine] = useState(wineTypes[3]);
  const [extra, setExtra] = useState(extras[2]);
  const [note, setNote] = useState('');
  const [added, setAdded] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!customizing) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setCustomizing(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [customizing]);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="product-page gifted-page">
      <section className="page-hero gift-hero">
        <div className="page-hero-backdrop">
          <img
            src="https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&w=2000&q=85"
            alt="Curated wine and gift parcel table"
          />
          <div className="page-hero-overlay" />
        </div>
        <div className="container">
          <div className="page-hero-content">
            <span className="eyebrow light">A LITTLE BOX OF LOVELY</span>
            <p className="hero-kicker">Gifting, with excellent taste</p>
            <h1>
              They’ll remember<br />
              <em>the thought.</em>
            </h1>
            <p>
              We take care of the bottle, the packaging details, and the handwritten note that makes it uniquely theirs.
            </p>
            <div className="hero-cta-wrapper">
              <a className="button button-gold" href="#the-gifts">
                <span>Find Their Gift</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
        <div className="hero-side-note">CURATED IN NAIROBI · SENT WITH LOVE</div>
      </section>

      <section className="value-strip" data-reveal>
        <div className="container value-inner">
          <span>♡</span>
          <p>
            Gift ideas shouldn’t get lost in your DMs. <b>Choose, personalize, and we’ll handle the lovely delivery bit.</b>
          </p>
          <span className="value-caption">SENT WITH A LITTLE EXTRA CARE</span>
        </div>
      </section>

      <section className="gift-catalog section-space" id="the-gifts">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="eyebrow wine-accent"><i /> GIFTED BY CHAMPAGNIACS</span>
              <h2 className="section-title">For the “Just Because”s</h2>
            </div>
            <p className="section-subtitle">
              Thoughtful parcels, hand-selected by people who appreciate fine bottles.
            </p>
          </div>

          <div className="gift-grid" data-reveal>
            {gifts.map((gift, index) => (
              <article className="gift-card" key={gift.name}>
                <button
                  className="gift-photo"
                  onClick={() => {
                    setSelectedGift(gift);
                    setAdded(false);
                    setStep(1);
                    setCustomizing(true);
                  }}
                  aria-label={`Customize ${gift.name}`}
                >
                  <img
                    src={`https://images.unsplash.com/${gift.photo}?auto=format&fit=crop&w=900&q=85`}
                    alt="Curated wine gift box"
                  />
                  <span>{index < 2 ? 'POPULAR SELECTION' : 'CHAMPAGNIACS FAVOURITE'}</span>
                  <i>↗</i>
                </button>
                <div className="gift-info">
                  <div>
                    <h3>{gift.name}</h3>
                    <p>{gift.note}</p>
                  </div>
                  <b>{gift.price}</b>
                </div>
                <button
                  className="gift-customize"
                  onClick={() => {
                    setSelectedGift(gift);
                    setAdded(false);
                    setStep(1);
                    setCustomizing(true);
                  }}
                >
                  <span>Make It Theirs</span>
                  <span>→</span>
                </button>
              </article>
            ))}
          </div>

          <div className="corporate-callout" data-reveal>
            <div>
              <span className="eyebrow wine-accent"><i /> FOR THE WHOLE OFFICE</span>
              <h3>A Little Thank You, at Scale.</h3>
              <p>
                Client appreciation gifts, team promotions, or festive end-of-year hampers. Handcrafted and delivered across Nairobi.
              </p>
            </div>
            <a
              href="mailto:hello@champagniacs.ke?subject=Corporate%20Gifting%20Inquiry"
              className="button button-gold"
            >
              <span>Let’s Talk Gifting</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {customizing && (
        <div
          className="drawer-backdrop gift-customizer-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setCustomizing(false);
          }}
        >
          <aside
            className="checkout-drawer gift-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gift-customizer-title"
            tabIndex={-1}
          >
            <button
              className="drawer-close"
              type="button"
              onClick={() => setCustomizing(false)}
              aria-label="Close customizer"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="m5 5 10 10M15 5 5 15" />
              </svg>
            </button>

            <div className="gift-preview-panel">
              <div className="gift-preview-image">
                <img
                  src={`https://images.unsplash.com/${selectedGift.photo}?auto=format&fit=crop&w=900&q=85`}
                  alt={selectedGift.name}
                />
                <span>CURATED WITH CARE</span>
              </div>
              <div className="gift-preview-copy">
                <span className="eyebrow">YOUR STARTING POINT</span>
                <h3>{selectedGift.name}</h3>
                <p>{selectedGift.note}</p>
                <b>{selectedGift.price}</b>
              </div>
              <div className="gift-preview-foot"><span>01</span> A thoughtful gift, made personal</div>
            </div>

            <div className="gift-custom-content">
              <span className="eyebrow wine-accent"><i /> A GIFT THAT FEELS LIKE YOU</span>
              <h2 id="gift-customizer-title">
                Make it <em>theirs.</em>
              </h2>

              <div className="stepper">
                {['The Wine', 'The Extras', 'Your Note'].map((label, index) => (
                  <button
                    className={step === index + 1 ? 'active' : step > index + 1 ? 'done' : ''}
                    key={label}
                    onClick={() => setStep(index + 1)}
                  >
                    <i>{step > index + 1 ? '✓' : index + 1}</i>
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {step === 1 && (
                <div className="custom-step">
                  <h3>First, what do they love?</h3>
                  <p>Choose a wine mood to guide our sommelier's curation.</p>
                  <div className="choice-grid">
                    {wineTypes.map((type) => (
                      <button
                        className={wine === type ? 'chosen' : ''}
                        key={type}
                        onClick={() => setWine(type)}
                      >
                        <span className="choice-label">{type}</span>
                        <span className="checkmark">{wine === type ? '✓' : '+'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="custom-step">
                  <h3>Something special to go with it?</h3>
                  <p>The thoughtful finishing touches that elevate the moment.</p>
                  <div className="choice-list">
                    {extras.map((item) => (
                      <button
                        className={extra === item ? 'chosen' : ''}
                        key={item}
                        onClick={() => setExtra(item)}
                      >
                        <span className="choice-label">{item}</span>
                        <span className="checkmark">{extra === item ? '✓' : '○'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="custom-step">
                  <h3>Say it your way.</h3>
                  <p>We’ll handwrite your words into an embossed envelope.</p>
                  <textarea
                    maxLength={180}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="A little something from you… (e.g. Happy birthday! Let's pop this together soon.)"
                  />
                  <div className="note-count">{note.length} / 180 characters</div>

                  <div className="custom-summary">
                    <span>THE WINE</span>
                    <b>{wine}</b>
                    <span>THE EXTRA</span>
                    <b>{extra.split(' · ')[0]}</b>
                  </div>
                </div>
              )}

              {added ? (
                <div className="added-message">
                  <span>✦</span>
                  <b>Lovely choice. It’s saved to your gifting parcel.</b>
                  <small>
                    {wine} · {extra.split(' · ')[0]}
                    {note ? ` · “${note}”` : ''}
                  </small>
                  <button
                    onClick={() => {
                      setCustomizing(false);
                      setStep(1);
                    }}
                  >
                    Back to the Gifts →
                  </button>
                </div>
              ) : (
                <div className="custom-footer">
                  {step > 1 && (
                    <button className="back-step" onClick={() => setStep(step - 1)}>
                      ← Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button className="button button-gold" onClick={() => setStep(step + 1)}>
                      <span>Next: {step === 1 ? 'Add an Extra' : 'Your Note'}</span>
                      <span>→</span>
                    </button>
                  ) : (
                    <button className="button button-gold" onClick={() => setAdded(true)}>
                      <span>Complete Gift Parcel</span>
                      <span>↗</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
