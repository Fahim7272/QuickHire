import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import quickhireLogo from '../assets/quickhire-logo.png';
import { isAdminLoggedIn, logout } from '../services/auth';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(isAdminLoggedIn());
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const handler = () => setIsAdmin(isAdminLoggedIn());
        window.addEventListener('qh-auth-change', handler);
        return () => window.removeEventListener('qh-auth-change', handler);
    }, []);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate('/');
    };

    const navLink = (to, label) => (
        <Link to={to} onClick={() => setMenuOpen(false)}
            style={{
                color: isActive(to) ? '#4640DE' : '#515B6F',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: isActive(to) ? 700 : 500,
                padding: '6px 4px',
                borderBottom: isActive(to) ? '2px solid #4640DE' : '2px solid transparent',
                transition: 'color 150ms, border-color 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#4640DE'; }}
            onMouseLeave={e => { if (!isActive(to)) e.currentTarget.style.color = '#515B6F'; }}>
            {label}
        </Link>
    );

    return (
        <nav style={{ background: '#F8F8FD', borderBottom: '1px solid #D6DDEB', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 124px', height: 64, display: 'flex', alignItems: 'center', gap: 0 }} className="qh-nav-inner">

                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginRight: 40, flexShrink: 0 }}>
                    <img src={quickhireLogo} alt="QuickHire logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#25324B', fontFamily: "'Red Hat Display', sans-serif" }}>QuickHire</span>
                </Link>

                {/* Nav links left-aligned */}
                <div className="qh-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 28, flex: 1 }}>
                    {navLink('/jobs', 'Find Jobs')}
                    {navLink('/companies', 'Browse Companies')}
                </div>

                {/* Auth buttons */}
                <div className="qh-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
                    {isAdmin ? (
                        <>
                            <Link to="/admin"
                                style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#4640DE', textDecoration: 'none', fontSize: 15, fontWeight: 700, padding: '8px 20px', fontFamily: "'Epilogue', sans-serif", transition: 'opacity 150ms' }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
                                <LayoutDashboard size={15} /> Dashboard
                            </Link>
                            {/* vertical divider */}
                            <div style={{ width: 1, height: 28, background: '#C8C8D4', alignSelf: 'center', flexShrink: 0 }} />
                            <button onClick={handleLogout}
                                style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#4640DE', color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, padding: '10px 24px', cursor: 'pointer', fontFamily: "'Epilogue', sans-serif", transition: 'background 150ms', borderRadius: 0 }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#3730c0'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#4640DE'; }}>
                                <LogOut size={15} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Login — plain bold Epilogue text, no border */}
                            <Link to="/login"
                                style={{ color: '#4640DE', textDecoration: 'none', fontSize: 15, fontWeight: 700, padding: '8px 20px', fontFamily: "'Epilogue', sans-serif", transition: 'opacity 150ms' }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = '0.75'; }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
                                Login
                            </Link>
                            {/* Vertical divider — perfectly centered */}
                            <div style={{ width: 1, height: 28, background: '#C8C8D4', alignSelf: 'center', flexShrink: 0 }} />
                            {/* Sign Up — solid filled #4640DE, sharp corners, Epilogue */}
                            <Link to="/signup"
                                style={{ background: '#4640DE', color: '#fff', textDecoration: 'none', fontSize: 15, fontWeight: 700, padding: '10px 24px', fontFamily: "'Epilogue', sans-serif", transition: 'background 150ms', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#3730c0'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#4640DE'; }}>
                                Sign Up
                            </Link>
                        </>
                    )}
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
                <div style={{ background: '#F8F8FD', borderTop: '1px solid #D6DDEB', padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[{ to: '/jobs', label: 'Find Jobs' }, { to: '/companies', label: 'Browse Companies' }].map(({ to, label }) => (
                        <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                            style={{ color: isActive(to) ? '#4640DE' : '#475569', textDecoration: 'none', fontSize: 15, fontWeight: isActive(to) ? 700 : 500, padding: '12px 8px', borderRadius: 8 }}>
                            {label}
                        </Link>
                    ))}
                    <div style={{ height: 1, background: '#D6DDEB', margin: '8px 0' }} />
                    <div style={{ display: 'flex', gap: 10 }}>
                        {isAdmin ? (
                            <>
                                <Link to="/admin" onClick={() => setMenuOpen(false)}
                                    style={{ flex: 1, textAlign: 'center', padding: '11px 0', border: '1.5px solid #4640DE', color: '#4640DE', textDecoration: 'none', fontSize: 14, fontWeight: 700, borderRadius: 0 }}>
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout}
                                    style={{ flex: 1, textAlign: 'center', padding: '11px 0', background: '#4640DE', color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', borderRadius: 0 }}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setMenuOpen(false)}
                                    style={{ flex: 1, textAlign: 'center', padding: '11px 0', color: '#4640DE', textDecoration: 'none', fontSize: 14, fontWeight: 700, border: '1.5px solid #4640DE', borderRadius: 0 }}>
                                    Login
                                </Link>
                                <Link to="/signup" onClick={() => setMenuOpen(false)}
                                    style={{ flex: 1, textAlign: 'center', padding: '11px 0', background: '#4640DE', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 700, borderRadius: 0 }}>
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    .qh-desktop-nav { display: none !important; }
                    .qh-hamburger { display: flex !important; }
                    .qh-nav-inner { padding: 0 24px !important; }
                }
            `}</style>
        </nav>
    );
}
