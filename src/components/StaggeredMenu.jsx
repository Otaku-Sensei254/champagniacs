'use client';

import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#101014', '#5c0f1c', '#d4af37'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/logo.jpg',
  menuButtonColor = '#ffffff',
  openMenuButtonColor = '#d4af37',
  changeMenuColorOnOpen = true,
  isFixed = true,
  accentColor = '#d4af37',
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const navigate = useNavigate();

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const toggleBtnRef = useRef(null);
  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      if (!panel) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const offscreen = position === 'left' ? -100 : 100;
    const layerStates = layers.map((el) => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 8 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 0.85, ease: 'power4.out', stagger: 0.07 },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          { '--sm-num-opacity': 1, duration: 0.6, ease: 'power2.out', stagger: 0.07 },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.45;
      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.05 },
          socialsStart + 0.05
        );
      }
    }

    return tl;
  }, [position]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);

    if (onMenuClose) onMenuClose();

    openTlRef.current?.pause();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const offscreen = position === 'left' ? -100 : 100;

    const all = [panel, ...layers].filter(Boolean);
    if (!all.length) return;

    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.4,
      ease: 'power3.in',
      stagger: 0.03,
      onComplete: () => {
        closeTweenRef.current = null;
        busyRef.current = false;
      },
    });
  }, [position, onMenuClose]);

  const toggleMenu = () => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      if (onMenuOpen) onMenuOpen();
      const tl = buildOpenTimeline();
      openTlRef.current = tl;
      tl?.play();
    } else {
      closeMenu();
    }
  };

  // Close on outside click
  useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleOutsideClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && !toggleBtnRef.current?.contains(e.target)) {
        closeMenu();
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [closeOnClickAway, open, closeMenu]);

  const handleLinkClick = (e, link, onClick) => {
    if (onClick) onClick(e);
    closeMenu();
    if (link && link.startsWith('/')) {
      navigate(link);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div
      className={`sm-scope ${isFixed ? 'fixed top-0 left-0 w-screen h-screen overflow-hidden' : 'w-full h-full'}`}
      style={{ zIndex: 1200 }}
    >
      <div
        className={
          (className ? className + ' ' : '') + 'staggered-menu-wrapper pointer-events-none relative w-full h-full'
        }
        style={accentColor ? { '--sm-accent': accentColor } : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        {/* Animated Underlay Color Layers */}
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none"
          aria-hidden="true"
        >
          {(() => {
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#101014', '#5c0f1c', '#d4af37'];
            return raw.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        {/* Mobile Header Bar */}
        <header
          className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between"
          aria-label="Mobile navigation header"
        >
          <Link
            to="/"
            onClick={() => {
              if (open) closeMenu();
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            className="sm-logo flex items-center select-none pointer-events-auto"
            aria-label="Champagniacs home"
          >
            <div className="sm-logo-ring">
              <img
                src={logoUrl || '/logo.jpg'}
                alt="Champagniacs logo"
                className="sm-logo-img"
                draggable={false}
              />
            </div>
            <div className="sm-brand-meta">
              <span className="sm-brand-title">CHAMPAGNIACS</span>
              <span className="sm-brand-sub">NAIROBI · KENYA</span>
            </div>
          </Link>

          {/* Clean Animated Hamburger Button (Hamburger ↔ X) */}
          <button
            ref={toggleBtnRef}
            className={`sm-hamburger-btn ${open ? 'open' : ''} pointer-events-auto`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span className="sm-burger-bar" />
            <span className="sm-burger-bar" />
            <span className="sm-burger-bar" />
          </button>
        </header>

        {/* Staggered Navigation Drawer Panel */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 right-0 h-full flex flex-col"
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col justify-between">
            <div>
              <div className="sm-panel-header-note">
                <span className="sm-badge-dot" />
                <span>LA VIE EN BULLES · THE CELLAR</span>
              </div>

              <ul
                className="sm-panel-list list-none m-0 p-0 flex flex-col"
                data-numbering={displayItemNumbering || undefined}
              >
                {items && items.length ? (
                  items.map((it, idx) => (
                    <li className="sm-panel-itemWrap relative overflow-hidden" key={it.label + idx}>
                      <Link
                        to={it.link}
                        className="sm-panel-item relative cursor-pointer no-underline uppercase"
                        aria-label={it.ariaLabel}
                        data-index={idx + 1}
                        onClick={(e) => handleLinkClick(e, it.link, it.onClick)}
                      >
                        <span className="sm-panel-itemLabel inline-block will-change-transform">
                          {it.label}
                        </span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="sm-panel-itemWrap relative overflow-hidden">
                    <span className="sm-panel-item relative cursor-pointer no-underline uppercase">
                      <span className="sm-panel-itemLabel inline-block will-change-transform">
                        No items
                      </span>
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div className="sm-socials" aria-label="Social links">
                <h3 className="sm-socials-title">CONNECT & GATHER</h3>
                <ul className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap">
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link no-underline relative inline-block"
                        onClick={closeMenu}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="sm-footer-tagline">
                  Founded by Sharon Kathure — “The Champagne Ma’”
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
.sm-scope { position: fixed; inset: 0; pointer-events: none; z-index: 1200; width: 100%; height: 100%; }
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; pointer-events: none; }
.sm-scope .staggered-menu-header { position: absolute; top: 0; left: 0; width: 100%; height: 74px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; background: rgba(14, 14, 18, 0.94); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(212, 175, 55, 0.22); pointer-events: none; z-index: 60; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); }
.sm-scope .staggered-menu-header > * { pointer-events: auto; }
.sm-scope .sm-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.sm-scope .sm-logo-ring { width: 44px; height: 44px; border-radius: 50%; padding: 2px; background: linear-gradient(135deg, #d4af37 0%, #5c0f1c 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px rgba(212, 175, 55, 0.25); flex-shrink: 0; }
.sm-scope .sm-logo-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
.sm-scope .sm-brand-meta { display: flex; flex-direction: column; }
.sm-scope .sm-brand-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.15rem; font-weight: 700; letter-spacing: 0.14em; color: #ffffff; line-height: 1; }
.sm-scope .sm-brand-sub { font-size: 0.52rem; letter-spacing: 0.2em; color: #d4af37; font-weight: 700; margin-top: 3px; }

/* Pure Hamburger ↔ X Morph Button */
.sm-scope .sm-hamburger-btn {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.35);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 0;
  transition: all 0.25s ease;
  z-index: 70;
}

.sm-scope .sm-hamburger-btn:hover {
  background: rgba(212, 175, 55, 0.15);
  border-color: #d4af37;
}

.sm-scope .sm-burger-bar {
  display: block;
  width: 20px;
  height: 2px;
  background: #ffffff;
  border-radius: 2px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, background-color 0.25s ease;
}

/* Morph to X */
.sm-scope .sm-hamburger-btn.open {
  background: rgba(92, 15, 28, 0.4);
  border-color: #d4af37;
}

.sm-scope .sm-hamburger-btn.open .sm-burger-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
  background: #d4af37;
}

.sm-scope .sm-hamburger-btn.open .sm-burger-bar:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.sm-scope .sm-hamburger-btn.open .sm-burger-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
  background: #d4af37;
}

/* Staggered Prelayers & Panel */
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(300px, 86vw, 480px); pointer-events: none; z-index: 40; }
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); box-shadow: -10px 0 35px rgba(0, 0, 0, 0.5); }

/* Panel Click Handling: invisible & non-blocking when closed, fully interactive when open */
.sm-scope .staggered-menu-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: clamp(300px, 86vw, 480px);
  height: 100%;
  background: #0c0c10;
  border-left: 1px solid rgba(212, 175, 55, 0.3);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  display: flex;
  flex-direction: column;
  padding: 6.5rem 2rem 2.5rem 2rem;
  overflow-y: auto;
  z-index: 50;
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.85);
  pointer-events: none;
  visibility: hidden;
}

.sm-scope .staggered-menu-wrapper[data-open] .staggered-menu-panel {
  pointer-events: auto;
  visibility: visible;
}

.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 2rem; }
.sm-scope .sm-panel-header-note { display: inline-flex; align-items: center; gap: 8px; font-size: 0.62rem; letter-spacing: 0.2em; color: var(--sm-accent, #d4af37); font-weight: 700; margin-bottom: 1.5rem; text-transform: uppercase; }
.sm-scope .sm-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #7a1526; box-shadow: 0 0 8px #7a1526; }
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1.1; }

.sm-scope .sm-panel-item {
  position: relative;
  font-family: 'Cormorant Garamond', Georgia, serif;
  color: #ffffff;
  font-weight: 500;
  font-size: clamp(2.2rem, 6.5vw, 3.2rem);
  cursor: pointer;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  transition: color 0.2s ease;
  display: block;
  width: 100%;
  text-decoration: none;
  padding: 6px 2.5rem 6px 0;
  -webkit-tap-highlight-color: transparent;
}

.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #d4af37); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.35em; right: 0; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; font-weight: 700; color: var(--sm-accent, #d4af37); letter-spacing: 0.1em; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
.sm-scope .sm-socials { margin-top: auto; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-socials-title { margin: 0; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--sm-accent, #d4af37); }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1.25rem; flex-wrap: wrap; }
.sm-scope .sm-socials-link { font-size: 0.88rem; font-weight: 600; color: rgba(255, 255, 255, 0.75); text-decoration: none; transition: all 0.2s ease; }
.sm-scope .sm-socials-link:hover { color: #ffffff; transform: translateY(-1px); }
.sm-scope .sm-footer-tagline { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 0.88rem; font-style: italic; color: rgba(255, 255, 255, 0.45); margin-top: 0.5rem; }

@media (max-width: 640px) {
  .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; padding: 6.2rem 1.6rem 2rem 1.6rem; }
  .sm-scope .sm-prelayers { width: 100%; }
}
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
