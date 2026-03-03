import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, LogIn, Info } from 'lucide-react';
import quickhireLogo from '../assets/quickhire-logo.png';

const ADMIN_DOMAIN = '@admin.com';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPw, setShowPw] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');
    const isAdminEmail = form.email.toLowerCase().endsWith(ADMIN_DOMAIN);

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

    const handleSubmit = async e => {
        e.preventDefault();
        const emailErr = validate('email', form.email);
        const pwErr = validate('password', form.password);
        if (emailErr || pwErr) { setErrors({ email: emailErr, password: pwErr }); return; }

        setSubmitting(true);
        // Simulate auth — redirect admin users to admin panel
        await new Promise(r => setTimeout(r, 800));
        if (isAdminEmail) {
            navigate('/admin');
        } else {
            navigate('/');
        }
        setSubmitting(false);
    };

    const inp = (name, hasErr) => ({
        width: '100%', padding: '12px 14px 12px 42px', borderRadius: 10, fontSize: 14,
        fontFamily: 'inherit', outline: 'none', color: '#0F172A',
        border: `1.5px solid ${hasErr ? '#FCA5A5' : '#E2E8F0'}`,
        background: hasErr ? '#FFF5F5' : '#F8FAFC',
        transition: 'border-color 150ms, box-shadow 150ms', boxSizing: 'border-box',
    });
    const onFocus = e => { e.target.style.borderColor = '#4F46E5'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.1)'; };
    const onBlur = e => { e.target.style.boxShadow = 'none'; };

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
            {/* Top bar */}
            <header style={{ background: '#fff', borderBottom: '1px solid #F1F5F9', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                    <img src={quickhireLogo} alt="QuickHire" style={{ width: 30, height: 30, objectFit: 'contain' }} />
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', fontFamily: "'Red Hat Display', sans-serif" }}>QuickHire</span>
                </Link>
                <p style={{ fontSize: 13, color: '#94A3B8' }}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: '#4F46E5', fontWeight: 700, textDecoration: 'none' }}>Sign up</Link>
                </p>
            </header>

            {/* Card */}
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
                <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 20, padding: '40px 36px', width: '100%', maxWidth: 440, boxShadow: '0 8px 32px rgba(15,23,42,0.07)' }}>

                    <div style={{ marginBottom: 28 }}>
                        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 6 }}>Welcome back 👋</h1>
                        <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.5 }}>Sign in to your QuickHire account</p>
                    </div>

                    {/* Admin hint */}
                    <div style={{ display: 'flex', gap: 8, background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: 10, padding: '10px 14px', marginBottom: 24, alignItems: 'flex-start' }}>
                        <Info size={14} color="#4F46E5" style={{ flexShrink: 0, marginTop: 1 }} />
                        <p style={{ fontSize: 12, color: '#4338CA', lineHeight: 1.5, margin: 0 }}>
                            <strong>Admin?</strong> Use your <code style={{ background: '#C7D2FE', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>@admin.com</code> email to be redirected to the admin panel.
                        </p>
                    </div>

                    {apiError && (
                        <div style={{ display: 'flex', gap: 8, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 14px', marginBottom: 20, fontSize: 13, color: '#DC2626' }} role="alert">
                            <AlertCircle size={15} />{apiError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                                    Email Address <span style={{ color: '#EF4444' }}>*</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={15} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                    <input id="email" name="email" type="email" value={form.email}
                                        onChange={handleChange} placeholder="you@example.com"
                                        style={{ ...inp('email', !!errors.email), paddingRight: 14 }}
                                        onFocus={onFocus} onBlur={onBlur}
                                        aria-required aria-invalid={!!errors.email} autoComplete="email" />
                                </div>
                                {errors.email && <p role="alert" style={{ fontSize: 11, color: '#EF4444', marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}><AlertCircle size={10} />{errors.email}</p>}
                                {isAdminEmail && !errors.email && (
                                    <p style={{ fontSize: 11, color: '#4F46E5', marginTop: 4, fontWeight: 600 }}>✓ Admin account detected — you'll be redirected to the Admin Panel</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <label htmlFor="password" style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>
                                        Password <span style={{ color: '#EF4444' }}>*</span>
                                    </label>
                                    <button type="button" style={{ fontSize: 12, color: '#4F46E5', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                                        Forgot password?
                                    </button>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={15} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                    <input id="password" name="password" type={showPw ? 'text' : 'password'} value={form.password}
                                        onChange={handleChange} placeholder="••••••••"
                                        style={{ ...inp('password', !!errors.password), paddingRight: 44 }}
                                        onFocus={onFocus} onBlur={onBlur}
                                        aria-required aria-invalid={!!errors.password} autoComplete="current-password" />
                                    <button type="button" onClick={() => setShowPw(!showPw)}
                                        style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0 }}
                                        aria-label={showPw ? 'Hide password' : 'Show password'}>
                                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                {errors.password && <p role="alert" style={{ fontSize: 11, color: '#EF4444', marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}><AlertCircle size={10} />{errors.password}</p>}
                            </div>

                            {/* Submit */}
                            <button type="submit" disabled={submitting}
                                style={{ width: '100%', padding: 14, background: 'linear-gradient(135deg,#4F46E5,#6366F1)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: submitting ? 'wait' : 'pointer', opacity: submitting ? 0.85 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(79,70,229,0.35)', transition: 'all 150ms ease', marginTop: 4 }}
                                onMouseEnter={e => !submitting && (e.currentTarget.style.boxShadow = '0 6px 24px rgba(79,70,229,0.5)')}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(79,70,229,0.35)'}>
                                {submitting
                                    ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Signing in…</>
                                    : <><LogIn size={16} /> {isAdminEmail ? 'Access Admin Panel' : 'Sign In'}</>}
                            </button>
                        </div>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: 24, padding: '16px 0 0', borderTop: '1px solid #F1F5F9' }}>
                        <p style={{ fontSize: 13, color: '#94A3B8' }}>
                            New to QuickHire?{' '}
                            <Link to="/signup" style={{ color: '#4F46E5', fontWeight: 700, textDecoration: 'none' }}>Create an account →</Link>
                        </p>
                    </div>
                </div>
            </main>

            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
    );
}
