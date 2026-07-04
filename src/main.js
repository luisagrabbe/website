import './styles/main.css';
import { CONFIG } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const instagramLink = document.getElementById('instagram-link');
  const calendlyLink = document.getElementById('calendly-link');
  if (instagramLink) instagramLink.href = CONFIG.INSTAGRAM_URL;
  if (calendlyLink) calendlyLink.href = CONFIG.CALENDLY_URL;

  // The hero is the entire page right now, so its stagger fires on load —
  // there's nothing below the fold to scroll-observe.
  document.getElementById('hero-stagger')?.classList.add('is-visible');

  // Every mouse-driven effect below shares the same gate: only devices
  // with a precise pointer that can actually hover (skips touch, where
  // mousemove/hover don't mean anything), and only when motion is welcome.
  const canHover =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  if (!canHover) return;

  // Portrait tilt: a subtle 3D parallax that follows the cursor.
  const frame = document.getElementById('portrait-frame');
  if (frame) {
    const maxTilt = 8;

    frame.addEventListener('mousemove', (event) => {
      const rect = frame.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `perspective(800px) rotateX(${(-y * maxTilt).toFixed(2)}deg) rotateY(${(x * maxTilt).toFixed(2)}deg)`;
    });

    frame.addEventListener('mouseleave', () => {
      frame.style.transform = '';
    });
  }

  // Ambient glow follows the cursor across the whole hero — eased via the
  // CSS transition on .hero__glow so it trails rather than snapping, but
  // the range needs to be a real fraction of the glow's own size (it's up
  // to 800px wide) to actually read as movement once it's blurred by 60px.
  const hero = document.getElementById('main');
  const glow = document.getElementById('hero-glow');
  if (hero && glow) {
    const maxShift = 90;

    hero.addEventListener('mousemove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      glow.style.transform = `translateY(-50%) translate(${(x * maxShift).toFixed(1)}px, ${(y * maxShift).toFixed(1)}px)`;
    });

    hero.addEventListener('mouseleave', () => {
      glow.style.transform = '';
    });
  }

  // Approaching the portrait cluster "wakes it up": the ambient glow
  // brightens and the orbit rings speed up, tying the two ambient effects
  // to the same moment of attention instead of feeling like two unrelated
  // animations.
  const visual = document.getElementById('hero-visual');
  if (hero && visual) {
    visual.addEventListener('mouseenter', () => {
      hero.classList.add('is-engaged');
      visual.classList.add('is-active');
    });
    visual.addEventListener('mouseleave', () => {
      hero.classList.remove('is-engaged');
      visual.classList.remove('is-active');
    });
  }

  // Magnetic buttons: while the cursor is over a button, it drifts toward
  // it slightly. JS fully owns `transform` here (rather than layering a
  // CSS :hover transform on top) since an inline style and a CSS rule
  // fighting over the same property on every mousemove would just flicker.
  document.querySelectorAll('.btn').forEach((btn) => {
    const strength = 0.25;

    btn.addEventListener('mousemove', (event) => {
      const rect = btn.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${(x * strength).toFixed(1)}px, ${(y * strength).toFixed(1)}px) scale(1.04)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
});
