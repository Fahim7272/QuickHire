import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, LogIn, Shield, CheckCircle2 } from 'lucide-react';
import quickhireLogo from '../assets/quickhire-logo.png';
import { loginAsAdmin, loginAsUser, isAdminLoggedIn, isUserLoggedIn } from '../services/auth';


const ADMIN_DOMAIN = '@admin.com';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPw, setShowPw] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');
    const isAdminEmail = form.email.toLowerCase().endsWith(ADMIN_DOMAIN);
    const justSignedUp = location.state?.signedUp;

    useEffect(() => { document.title = 'Login | QuickHire'; }, []);

    const validate = (name, value) => {
        if (name === 'email') {
            if (!value.trim()) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
        }
        if (name === 'password' && !value) return 'Password is required';
        return '';
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
        setErrors(p => ({ ...p, [name]: validate(name, value) }));
        setApiError('');
    };

    useEffect(() => {
        if (isAdminLoggedIn()) navigate('/admin', { replace: true });
        else if (isUserLoggedIn()) navigate('/dashboard', { replace: true });
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const emailErr = validate('email', form.email);
        const pwErr = validate('password', form.password);
        if (emailErr || pwErr) { setErrors({ email: emailErr, password: pwErr }); return; }
        setSubmitting(true);
        await new Promise(r => setTimeout(r, 800));
        if (isAdminEmail) {
            if (form.password !== 'admin1234') {
                setApiError('Incorrect admin password. Please check the credentials above.');
                setSubmitting(false);
                return;
            }
            loginAsAdmin();
            navigate('/admin');
        } else {
            const name = form.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            loginAsUser(name, form.email);
            navigate('/dashboard');
        }
        setSubmitting(false);
    };

    const inp = (name) => ({
        width: '100%', padding: '12px 14px 12px 42px', borderRadius: 10, fontSize: 14,
        fontFamily: 'inherit', outline: 'none', color: '#0F172A',
        border: `1.5px solid ${errors[name] ? '#FCA5A5' : '#D6DDEB'}`,
        background: errors[name] ? '#FFF5F5' : '#F8FAFC',
        transition: 'border-color 150ms, box-shadow 150ms', boxSizing: 'border-box',
    });
    const onFocus = e => { e.target.style.borderColor = '#4640DE'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(70,64,222,0.1)'; };
    const onBlur = e => { e.target.style.boxShadow = 'none'; };

    return (
        <div style={{ minHeight: '100vh', background: '#F1F2F4', display: 'flex', flexDirection: 'column' }}>

            <header style={{ background: '#fff', borderBottom: '1px solid #D6DDEB' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 124px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="qh-auth-header-inner">
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                        <img src={quickhireLogo} alt="QuickHire" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                        <span style={{ fontSize: 18, fontWeight: 800, color: '#25324B', fontFamily: "'Red Hat Display', sans-serif" }}>QuickHire</span>
                    </Link>
                </div>
            </header>


            {/* Main — centered within full width */}
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
                <div className="qh-auth-card-inner" style={{ background: '#fff', border: '1px solid #D6DDEB', borderRadius: 16, padding: '40px 40px', width: '100%', maxWidth: 480, boxShadow: '0 4px 24px rgba(37,50,75,0.06)' }}>

                    {justSignedUp && (
                        <div style={{ background: '#DCFCE7', border: '1.5px solid #86EFAC', borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: 14, color: '#15803D', fontWeight: 600 }}>Account created successfully! Please sign in to continue.</span>
                        </div>
                    )}

                    <div style={{ marginBottom: 24 }}>
                        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#25324B', letterSpacing: '-0.02em', marginBottom: 8, fontFamily: "'ClashDisplay', 'Epilogue', sans-serif" }}>
                            Welcome Back
                        </h1>

                        <p style={{ fontSize: 14, color: '#515B6F', lineHeight: 1.6 }}>Sign in to continue to QuickHire</p>
                    </div>

                    {/* Admin credentials note — single, combined */}
                    <div style={{ background: '#EEF2FF', border: '1.5px solid #C7D2FE', borderRadius: 10, padding: '14px 16px', marginBottom: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                            <div style={{ width: 24, height: 24, borderRadius: 6, background: '#4640DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Shield size={13} color="#fff" />
                            </div>
                            <p style={{ fontSize: 12, fontWeight: 800, color: '#25324B', letterSpacing: '0.01em', textTransform: 'uppercase' }}>Admin Login — Assessment Credentials</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#515B6F', paddingLeft: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ fontWeight: 600, color: '#25324B', minWidth: 68 }}>Email:</span>
                                <code style={{ background: '#fff', border: '1px solid #C7D2FE', padding: '2px 8px', borderRadius: 6, fontSize: 12, color: '#4640DE', fontWeight: 700 }}>admin@admin.com</code>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ fontWeight: 600, color: '#25324B', minWidth: 68 }}>Password:</span>
                                <code style={{ background: '#fff', border: '1px solid #C7D2FE', padding: '2px 8px', borderRadius: 6, fontSize: 12, color: '#4640DE', fontWeight: 700 }}>admin1234</code>
                            </div>
                        </div>
                    </div>

                    {apiError && (
                        <div style={{ display: 'flex', gap: 8, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 14px', marginBottom: 20, fontSize: 13, color: '#DC2626' }} role="alert">
                            <AlertCircle size={15} />{apiError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#25324B', marginBottom: 8 }}>
                                    Email Address <span style={{ color: '#FF6550' }}>*</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={15} color="#7C8493" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                    <input id="email" name="email" type="email" value={form.email}
                                        onChange={handleChange} placeholder="e.g. admin@admin.com"
                                        style={{ ...inp('email'), paddingRight: 14 }}
                                        onFocus={onFocus} onBlur={onBlur}
                                        aria-required aria-invalid={!!errors.email} autoComplete="email" />
                                </div>
                                {errors.email && <p role="alert" style={{ fontSize: 12, color: '#EF4444', marginTop: 5, display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={11} />{errors.email}</p>}
                                {isAdminEmail && !errors.email && (
                                    <p style={{ fontSize: 12, color: '#4640DE', marginTop: 5, fontWeight: 600 }}>✓ Admin account — you'll be redirected to the Admin Panel</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <label htmlFor="password" style={{ fontSize: 14, fontWeight: 600, color: '#25324B' }}>
                                        Password <span style={{ color: '#FF6550' }}>*</span>
                                    </label>
                                    <button type="button" style={{ fontSize: 13, color: '#4640DE', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                                        Forgot password?
                                    </button>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={15} color="#7C8493" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                    <input id="password" name="password" type={showPw ? 'text' : 'password'} value={form.password}
                                        onChange={handleChange} placeholder="Enter your password"
                                        style={{ ...inp('password'), paddingRight: 44 }}
                                        onFocus={onFocus} onBlur={onBlur}
                                        aria-required aria-invalid={!!errors.password} autoComplete="current-password" />
                                    <button type="button" onClick={() => setShowPw(!showPw)}
                                        style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#7C8493', padding: 0 }}
                                        aria-label={showPw ? 'Hide password' : 'Show password'}>
                                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                {errors.password && <p role="alert" style={{ fontSize: 12, color: '#EF4444', marginTop: 5, display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={11} />{errors.password}</p>}
                            </div>

                            {/* Submit */}
                            <button type="submit" disabled={submitting}
                                style={{ width: '100%', padding: '14px 0', background: '#4640DE', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: submitting ? 'wait' : 'pointer', opacity: submitting ? 0.85 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 150ms', fontFamily: "'Epilogue', sans-serif", marginTop: 4 }}
                                onMouseEnter={e => !submitting && (e.currentTarget.style.background = '#3730c0')}
                                onMouseLeave={e => { e.currentTarget.style.background = '#4640DE'; }}>
                                {submitting
                                    ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Signing in…</>
                                    : <><LogIn size={16} /> {isAdminEmail ? 'Access Admin Panel' : 'Sign In'}</>}
                            </button>
                        </div>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 20, borderTop: '1px solid #F1F2F4' }}>
                        <p style={{ fontSize: 14, color: '#7C8493' }}>
                            Don't have an account?{' '}
                            <Link to="/signup" style={{ color: '#4640DE', fontWeight: 700, textDecoration: 'none' }}>Create an account →</Link>
                        </p>
                    </div>
                </div>
            </main>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg) } }
                @media (max-width: 640px) {
                    .qh-auth-header-inner { padding: 0 16px !important; }
                    .qh-auth-card-inner { padding: 28px 20px !important; }
                }
            `}</style>
        </div>
    );
}
