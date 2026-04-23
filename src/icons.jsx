/* global React */

const Icon = {
  Plus: (p) => <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Send: (p) => <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ArrowUp: (p) => <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  Close: (p) => <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" {...p}><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>,
  Search: (p) => <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" {...p}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>,
};

/* Logo: cerchio inscritto in un quadrato.
   Il quadrato è il bordo; il cerchio è la forma interna tangente. */
const BrandMark = ({ size = 24, strokeColor = "currentColor", fillColor = "var(--accent)" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="2" y="2" width="28" height="28" fill="none" stroke={strokeColor} strokeWidth="1.25" />
    <circle cx="16" cy="16" r="13" fill="none" stroke={strokeColor} strokeWidth="1.25" />
  </svg>
);

/* Variante "pieno" — cerchio colorato dentro quadrato */
const BrandMarkFilled = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="1.5" y="1.5" width="29" height="29" fill="none" stroke="currentColor" strokeWidth="1.25" />
    <circle cx="16" cy="16" r="13" fill="var(--accent)" opacity="0.85" />
  </svg>
);

Object.assign(window, { Icon, BrandMark, BrandMarkFilled });
