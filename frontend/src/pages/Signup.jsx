import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, User, CheckCircle2 } from 'lucide-react';
import quickhireLogo from '../assets/quickhire-logo.png';

function passwordStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0-4
}

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['#E2E8F0', '#EF4444', '#F97316', '#EAB308', '#22C55E'];

export default function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [errors, setErrors] = useState({});
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const strength = passwordStrength(form.password);

    useEffect(() => { document.title = 'Sign Up | QuickHire'; }, []);

    const validate = (name, value) => {
        if (name === 'name' && !value.trim()) return 'Full name is required';
        if (name === 'email') {
            if (!value.trim()) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
        }
        if (name === 'password') {
            if (!value) return 'Password is required';
            if (value.length < 8) return 'At least 8 characters required';
        }
        if (name === 'confirm') {
            if (!value) return 'Please confirm your password';
            if (value !== form.password) return 'Passwords do not match';
        }
        return '';
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
        setErrors(p => ({ ...p, [name]: validate(name, value) }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const newErrors = {};
        ['name', 'email', 'password', 'confirm'].forEach(k => {
            const err = validate(k, form[k]);
            if (err) newErrors[k] = err;
        });
        if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
        setSubmitting(true);
        await new Promise(r => setTimeout(r, 900));
        setDone(true);
        setTimeout(() => navigate('/'), 2000);
    };

    const inp = (name, extra = {}) => ({
        width: '100%', padding: '12px 14px 12px 42px', borderRadius: 10, fontSize: 14,
        fontFamily: 'inherit', outline: 'none', color: '#0F172A',
        border: `1.5px solid ${errors[name] ? '#FCA5A5' : '#E2E8F0'}`,
        background: errors[name] ? '#FFF5F5' : '#F8FAFC',
        transition: 'border-color 150ms, box-shadow 150ms', boxSizing: 'border-box', ...extra,
    });
    const onFocus = e => { e.target.style.borderColor = '#4F46E5'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.1)'; };
    const onBlur = e => { e.target.style.boxShadow = 'none'; };

    if (done) return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <CheckCircle2 size={36} color="#16A34A" />
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>Account created! 🎉</h2>
                <p style={{ fontSize: 14, color: '#94A3B8' }}>Redirecting you to the homepage…</p>
            </div>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: '#F1F2F4', display: 'flex', flexDirection: 'column' }}>
            <header style={{ background: '#fff', borderBottom: '1px solid #D6DDEB' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 124px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="qh-auth-header-inner">
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                        <img src={quickhireLogo} alt="QuickHire" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                        <span style={{ fontSize: 18, fontWeight: 800, color: '#25324B', fontFamily: "'Red Hat Display', sans-serif" }}>QuickHire</span>
                    </Link>
                    <p style={{ fontSize: 14, color: '#7C8493' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#4640DE', fontWeight: 700, textDecoration: 'none' }}>Log in</Link>
                    </p>
                </div>
            </header>

            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
                <div style={{ background: '#fff', border: '1px solid #D6DDEB', borderRadius: 16, padding: '40px 40px', width: '100%', maxWidth: 480, boxShadow: '0 4px 24px rgba(37,50,75,0.06)' }}>

                    <div style={{ marginBottom: 24 }}>
                        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#25324B', letterSpacing: '-0.02em', marginBottom: 6, fontFamily: "'Epilogue', sans-serif" }}>Create your account</h1>
                        <p style={{ fontSize: 14, color: '#515B6F', lineHeight: 1.5 }}>Join thousands finding their dream job on QuickHire</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                            {/* Full Name */}
                            <div>
                                <label htmlFor="name" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Full Name <span style={{ color: '#EF4444' }}>*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <User size={15} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Jane Doe"
                                        style={inp('name')} onFocus={onFocus} onBlur={onBlur} aria-required aria-invalid={!!errors.name} autoComplete="name" />
                                </div>
                                {errors.name && <p role="alert" style={{ fontSize: 11, color: '#EF4444', marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}><AlertCircle size={10} />{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Email Address <span style={{ color: '#EF4444' }}>*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={15} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                                        style={inp('email')} onFocus={onFocus} onBlur={onBlur} aria-required aria-invalid={!!errors.email} autoComplete="email" />
                                </div>
                                {errors.email && <p role="alert" style={{ fontSize: 11, color: '#EF4444', marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}><AlertCircle size={10} />{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Password <span style={{ color: '#EF4444' }}>*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={15} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                    <input id="password" name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Min. 8 characters"
                                        style={{ ...inp('password'), paddingRight: 44 }} onFocus={onFocus} onBlur={onBlur} aria-required aria-invalid={!!errors.password} autoComplete="new-password" />
                                    <button type="button" onClick={() => setShowPw(!showPw)}
                                        style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0 }}
                                        aria-label={showPw ? 'Hide password' : 'Show password'}>
                                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>

                                {/* Password strength bar */}
                                {form.password && (
                                    <div style={{ marginTop: 8 }}>
                                        <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} style={{ flex: 1, height: 3, borderRadius: 9999, background: i <= strength ? STRENGTH_COLORS[strength] : '#E2E8F0', transition: 'background 250ms' }} />
                                            ))}
                                        </div>
                                        <p style={{ fontSize: 11, color: STRENGTH_COLORS[strength], fontWeight: 600 }}>{STRENGTH_LABELS[strength]}</p>
                                    </div>
                                )}
                                {errors.password && <p role="alert" style={{ fontSize: 11, color: '#EF4444', marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}><AlertCircle size={10} />{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirm" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Confirm Password <span style={{ color: '#EF4444' }}>*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={15} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                    <input id="confirm" name="confirm" type={showConfirm ? 'text' : 'password'} value={form.confirm} onChange={handleChange} placeholder="Re-enter password"
                                        style={{ ...inp('confirm'), paddingRight: 44 }} onFocus={onFocus} onBlur={onBlur} aria-required aria-invalid={!!errors.confirm} autoComplete="new-password" />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                        style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0 }}
                                        aria-label={showConfirm ? 'Hide password' : 'Show password'}>
                                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                {errors.confirm && <p role="alert" style={{ fontSize: 11, color: '#EF4444', marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}><AlertCircle size={10} />{errors.confirm}</p>}
                                {!errors.confirm && form.confirm && form.confirm === form.password && (
                                    <p style={{ fontSize: 11, color: '#16A34A', marginTop: 4, fontWeight: 600 }}>✓ Passwords match</p>
                                )}
                            </div>

                            <p style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.5 }}>
                                By creating an account, you agree to our{' '}
                                <span style={{ color: '#4F46E5', fontWeight: 600, cursor: 'pointer' }}>Terms of Service</span> and{' '}
                                <span style={{ color: '#4F46E5', fontWeight: 600, cursor: 'pointer' }}>Privacy Policy</span>.
                            </p>

                            <button type="submit" disabled={submitting}
                                style={{ width: '100%', padding: 14, background: 'linear-gradient(135deg,#4F46E5,#6366F1)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: submitting ? 'wait' : 'pointer', opacity: submitting ? 0.85 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(79,70,229,0.35)', transition: 'all 150ms ease' }}
                                onMouseEnter={e => !submitting && (e.currentTarget.style.boxShadow = '0 6px 24px rgba(79,70,229,0.5)')}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(79,70,229,0.35)'}>
                                {submitting
                                    ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Creating account…</>
                                    : 'Create Account →'}
                            </button>
                        </div>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 20, borderTop: '1px solid #F1F2F4' }}>
                        <p style={{ fontSize: 14, color: '#7C8493' }}>
                            Already have an account?{' '}
                            <Link to="/login" style={{ color: '#4640DE', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
                        </p>
                    </div>
                </div>
            </main>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg) } }
                @media (max-width: 768px) {
                    .qh-auth-header-inner { padding: 0 24px !important; }
                }
            `}</style>
        </div>
    );
}
