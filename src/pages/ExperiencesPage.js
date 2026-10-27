import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import './ProductPages.css';

const events = [
  {
    title: 'The Grape Escape',
    type: 'A slow Sunday tasting',
    date: 'SUN, 16 NOV · 2 PM',
    place: 'The Social House, Lavington',
    price: 'KSh 4,500',
    image: 'photo-1510812431401-41d2bd2722f3',
    tag: '4 SEATS LEFT',
  },
  {
    title: 'Champagne Day',
    type: 'A little sparkle, a lot of joy',
    date: 'SAT, 22 NOV · 4 PM',
    place: 'The Alchemist, Westlands',
    price: 'KSh 6,000',
    image: 'photo-1513558161293-cdaf765edfd7',
    tag: 'JUST ANNOUNCED',
  },
  {
    title: 'Midweek Sneaky Pours',
    type: 'Your Wednesday, improved',
    date: 'WED, 26 NOV · 6 PM',
    place: 'Baraza, Riverside',
    price: 'KSh 3,200',
    image: 'photo-1516594915697-87eb3b1c14ea',
    tag: 'GOOD MIDWEEK ENERGY',
  },
];

const passes = [
  { name: 'Early Bird', detail: 'For the delightfully decisive', price: '3,500', sold: true },
  { name: 'Advance Pass', detail: 'One lovely evening, all yours', price: '4,500' },
  { name: 'Wine Crew · 4 pack', detail: 'Four seats. One excellent group chat.', price: '16,000', popular: true },
];

export default function ExperiencesPage() {
  const [event, setEvent] = useState(null);
  const [pass, setPass] = useState(1);
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('details');
  const [qr, setQr] = useState('');

  useEffect(() => {
    if (state === 'ticket') {
      QRCode.toDataURL(`CHAMPAGNIACS-${event?.title}-${phone}`, {
        width: 190,
        margin: 1,
        color: { dark: '#5c0f1c', light: '#ffffff' },
      }).then(setQr);
    }
  }, [state, event, phone]);

  const openCheckout = (selectedEvent) => {
    setEvent(selectedEvent);
    setPass(1);
    setState('details');
  };

  const pay = (e) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length < 9) return;
    setState('processing');
    window.setTimeout(() => setState('ticket'), 1800);
  };

  const close = () => {
    setEvent(null);
    setState('details');
    setPhone('');
  };

  return (
    <div className="product-page experiences-page">
      <section className="page-hero event-hero">
        <div className="page-hero-backdrop">
          <img
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2000&q=85"
            alt="Wine poured for a shared table"
          />
          <div className="page-hero-overlay" />
        </div>
        <div className="container">
          <div className="page-hero-content">
            <span className="eyebrow light">GOOD PEOPLE, GOOD POUR</span>
            <p className="hero-kicker">Nairobi has plans</p>
            <h1>
              Come for the wine.<br />
              <em>Stay for your people.</em>
            </h1>
            <p>
              We make it effortless to discover your next favourite glass — and the people to share it with.
            </p>
            <div className="hero-cta-wrapper">
              <a className="button button-gold" href="#upcoming">
                <span>See What’s Pouring</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
        <div className="hero-side-note">CHAMPAGNIACS EXPERIENCES · EST. NAIROBI</div>
      </section>

      <section className="value-strip">
        <div className="container value-inner">
          <span>✦</span>
          <p>
            One seamless booking, straight to our guest list. <b>Your plans, your people, your details — all in one place.</b>
          </p>
          <span className="value-caption">MADE FOR THE GOOD TIMES</span>
        </div>
      </section>

      <section className="events-section section-space" id="upcoming">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="eyebrow wine-accent"><i /> SAVE YOUR SEAT</span>
              <h2 className="section-title">Good Things Coming Up</h2>
            </div>
            <p className="section-subtitle">
              Small tables, generous pours, and no wine exams at the door.
            </p>
          </div>

          <div className="event-grid">
            {events.map((item, index) => (
              <article className="event-card" key={item.title}>
                <div className="event-image">
                  <img
                    src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=900&q=85`}
                    alt="Wine at an intimate event"
                  />
                  <span>{item.tag}</span>
                  <small>0{index + 1}</small>
                </div>
                <div className="event-body">
                  <span className="eyebrow">{item.type}</span>
                  <h3>{item.title}</h3>
                  <p className="event-place">
                    {item.date}<br />
                    {item.place}
                  </p>
                  <div className="event-foot">
                    <span>From <b>{item.price}</b></span>
                    <button onClick={() => openCheckout(item)}>
                      Pick your pass ↗
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="event-note">
        <div className="container event-note-inner">
          <span>✦</span>
          <p>
            Come solo. Bring your whole crew. <em>Either way, you’ll leave with new friends.</em>
          </p>
          <span>THE CHAMPAGNIACS PROMISE</span>
        </div>
      </section>

      {event && (
        <div
          className="drawer-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <aside className="checkout-drawer" aria-label="Event checkout">
            <button className="drawer-close" onClick={close} aria-label="Close checkout">
              ×
            </button>

            {state === 'ticket' ? (
              <div className="ticket-success">
                <span className="eyebrow wine-accent"><i /> YOU’RE ON THE LIST</span>
                <h2>
                  That’s a date.<br />
                  <em>See you there.</em>
                </h2>
                <p>Your pass for <b>{event.title}</b> is ready.</p>

                <div className="digital-ticket">
                  <div className="ticket-brand">
                    <span>CHAMPAGNIACS</span>
                    <span>✦ NAIROBI</span>
                  </div>
                  {qr && <img src={qr} alt="Scannable ticket QR code" />}
                  <b>{event.title}</b>
                  <span>{event.date}</span>
                  <span>{event.place}</span>
                  <small>SHOW THIS PASS AT THE DOOR</small>
                </div>

                <button className="button button-gold full-button" onClick={close}>
                  Lovely, Thank You ✦
                </button>
                <p className="demo-disclaimer">Instant confirmation · Guest pass verified</p>
              </div>
            ) : (
              <>
                <span className="eyebrow wine-accent"><i /> YOUR NEXT GOOD NIGHT</span>
                <h2>{event.title}</h2>
                <p className="drawer-intro">{event.date} · {event.place}</p>

                <div className="pass-list">
                  {passes.map((item, index) => (
                    <button
                      disabled={item.sold}
                      className={`pass-option ${pass === index ? 'selected' : ''} ${item.sold ? 'sold' : ''}`}
                      key={item.name}
                      onClick={() => setPass(index)}
                    >
                      <span className="pass-radio" />
                      <span className="pass-copy">
                        <b>
                          {item.name} {item.popular && <i>CREW FAVOURITE</i>}
                        </b>
                        <small>{item.sold ? 'The early ones got it' : item.detail}</small>
                      </span>
                      <span className="pass-price">
                        {item.sold ? <del>KSh 3,500</del> : `KSh ${item.price}`}
                        {item.sold && <small>SOLD OUT</small>}
                      </span>
                    </button>
                  ))}
                </div>

                <form onSubmit={pay}>
                  <label htmlFor="phone">M-Pesa Mobile Number</label>
                  <div className="phone-input">
                    <span>🇰🇪 +254</span>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="7XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <small className="field-hint">We’ll send an instant M-Pesa prompt to your phone.</small>

                  <div className="checkout-total">
                    <span>Total · {pass === 2 ? '4 guests' : '1 guest'}</span>
                    <b>KSh {passes[pass].price}</b>
                  </div>

                  <button
                    className="button button-gold full-button"
                    disabled={state === 'processing'}
                  >
                    {state === 'processing' ? (
                      <>
                        <span className="mini-spinner" /> Sending M-Pesa STK Prompt…
                      </>
                    ) : (
                      <>
                        <span>Complete Reservation</span>
                        <span>↗</span>
                      </>
                    )}
                  </button>
                  <p className="demo-disclaimer">Instant confirmation · No real money deducted</p>
                </form>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
