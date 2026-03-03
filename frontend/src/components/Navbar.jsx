import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import quickhireLogo from '../assets/quickhire-logo.png';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav style={{ background: '#fff', borderBottom: '1px solid #F1F5F9', position: 'sticky', top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                    <img src={quickhireLogo} alt="QuickHire logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', fontFamily: "'Red Hat Display', sans-serif" }}>QuickHire</span>
                </Link>

                {/* Desktop nav links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="qh-desktop-nav">
                    <Link to="/jobs" style={{ color: '#515B6F', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 150ms' }}
                        onMouseEnter={e => e.target.style.color = '#4F46E5'}
                        onMouseLeave={e => e.target.style.color = '#515B6F'}>
                        Find Jobs
                    </Link>
                    <Link to="/companies" style={{ color: '#515B6F', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 150ms' }}
                        onMouseEnter={e => e.target.style.color = '#4F46E5'}
                        onMouseLeave={e => e.target.style.color = '#515B6F'}>
                        Browse Companies
                    </Link>
                </div>

                {/* Auth buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="qh-desktop-nav">
                    <Link to="/login" style={{ color: '#4F46E5', textDecoration: 'none', fontSize: 14, fontWeight: 700, padding: '8px 16px', borderRadius: 8, transition: 'background 150ms' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#EEF2FF'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        Login
                    </Link>
                    <Link to="/signup" style={{ background: 'linear-gradient(135deg,#4F46E5,#6366F1)', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 700, padding: '9px 20px', borderRadius: 8, boxShadow: '0 2px 8px rgba(79,70,229,0.3)', transition: 'all 150ms' }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(79,70,229,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(79,70,229,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                        Sign Up
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button className="qh-hamburger" onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#0F172A', padding: 4, display: 'none' }}>
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile drawer */}
            {menuOpen && (
                <div style={{ background: '#fff', borderTop: '1px solid #F1F5F9', padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {[
                        { to: '/jobs', label: 'Find Jobs' },
                        { to: '/companies', label: 'Browse Companies' },
                    ].map(({ to, label }) => (
                        <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                            style={{ color: '#475569', textDecoration: 'none', fontSize: 15, fontWeight: 500, padding: '12px 8px', borderRadius: 8, transition: 'background 150ms, color 150ms' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#0F172A'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; }}>
                            {label}
                        </Link>
                    ))}
                    <div style={{ height: 1, background: '#F1F5F9', margin: '8px 0' }} />
                    <div style={{ display: 'flex', gap: 10 }}>
                        <Link to="/login" onClick={() => setMenuOpen(false)}
                            style={{ flex: 1, textAlign: 'center', padding: '11px 0', border: '1.5px solid #E2E8F0', borderRadius: 10, color: '#4F46E5', textDecoration: 'none', fontSize: 14, fontWeight: 700, background: '#F8FAFC', transition: 'all 150ms' }}>
                            Login
                        </Link>
                        <Link to="/signup" onClick={() => setMenuOpen(false)}
                            style={{ flex: 1, textAlign: 'center', padding: '11px 0', background: 'linear-gradient(135deg,#4F46E5,#6366F1)', borderRadius: 10, color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 700, transition: 'all 150ms' }}>
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
