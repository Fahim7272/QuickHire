import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import quickhireLogo from '../assets/quickhire-logo.png';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navLink = (to, label) => (
        <Link to={to} onClick={() => setMenuOpen(false)}
            style={{
                color: isActive(to) ? '#4640DE' : '#515B6F',
                textDecoration: 'none', fontSize: 14, fontWeight: isActive(to) ? 700 : 500,
                padding: '6px 4px', borderBottom: isActive(to) ? '2px solid #4640DE' : '2px solid transparent',
                transition: 'color 150ms, border-color 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#4640DE'; }}
            onMouseLeave={e => { if (!isActive(to)) e.currentTarget.style.color = '#515B6F'; }}>
            {label}
        </Link>
    );

    return (
        <nav style={{ background: '#fff', borderBottom: '1px solid #F1F5F9', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 4px rgba(15,23,42,0.06)' }}>
            <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', gap: 0 }}>

                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginRight: 40, flexShrink: 0 }}>
                    <img src={quickhireLogo} alt="QuickHire logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', fontFamily: "'Red Hat Display', sans-serif" }}>QuickHire</span>
                </Link>

                {/* Desktop: Nav links LEFT-ALIGNED with logo */}
                <div className="qh-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 28, flex: 1 }}>
                    {navLink('/jobs', 'Find Jobs')}
                    {navLink('/companies', 'Browse Companies')}
                </div>

                {/* Auth buttons */}
                <div className="qh-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                    <Link to="/login"
                        style={{ color: '#4640DE', textDecoration: 'none', fontSize: 14, fontWeight: 700, padding: '8px 16px', borderRadius: 8, border: '1.5px solid #4640DE', transition: 'all 150ms' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#EEF2FF'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                        Login
                    </Link>
                    <Link to="/signup"
                        style={{ background: '#4640DE', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 700, padding: '9px 20px', borderRadius: 8, boxShadow: '0 2px 8px rgba(70,64,222,0.3)', transition: 'all 150ms' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#3730c0'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(70,64,222,0.45)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#4640DE'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(70,64,222,0.3)'; }}>
                        Sign Up
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button className="qh-hamburger" onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#0F172A', padding: 4, display: 'none', marginLeft: 'auto' }}>
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile drawer */}
            {menuOpen && (
                <div style={{ background: '#fff', borderTop: '1px solid #F1F5F9', padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[{ to: '/jobs', label: 'Find Jobs' }, { to: '/companies', label: 'Browse Companies' }].map(({ to, label }) => (
                        <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                            style={{ color: isActive(to) ? '#4640DE' : '#475569', textDecoration: 'none', fontSize: 15, fontWeight: isActive(to) ? 700 : 500, padding: '12px 8px', borderRadius: 8 }}>
                            {label}
                        </Link>
                    ))}
                    <div style={{ height: 1, background: '#F1F5F9', margin: '8px 0' }} />
                    <div style={{ display: 'flex', gap: 10 }}>
                        <Link to="/login" onClick={() => setMenuOpen(false)}
                            style={{ flex: 1, textAlign: 'center', padding: '11px 0', border: '1.5px solid #4640DE', borderRadius: 10, color: '#4640DE', textDecoration: 'none', fontSize: 14, fontWeight: 700, transition: 'all 150ms' }}>
                            Login
                        </Link>
                        <Link to="/signup" onClick={() => setMenuOpen(false)}
                            style={{ flex: 1, textAlign: 'center', padding: '11px 0', background: '#4640DE', borderRadius: 10, color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 700, transition: 'all 150ms' }}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    .qh-desktop-nav { display: none !important; }
                    .qh-hamburger { display: flex !important; }
                }
            `}</style>
        </nav>
    );
}
