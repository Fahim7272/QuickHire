import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Briefcase, Bookmark, Eye, Calendar, MapPin, Building2,
    ArrowRight, User, TrendingUp, CheckCircle2, Clock,
    ChevronRight, Check, FileText
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getUser, logout, isUserLoggedIn } from '../services/auth';
import { mockJobs, COMPANY_LOGO_MAP } from '../services/mockData';
import { getJobs } from '../services/api';

const CATEGORY_COLORS = {
    Marketing: { bg: '#FFF4E5', text: '#C47B0E' },
    Design: { bg: '#EBF5FF', text: '#1E6DB7' },
    Business: { bg: '#EEF4FF', text: '#4A5AE8' },
    Technology: { bg: '#FFF0EF', text: '#C13B31' },
    Engineering: { bg: '#EDF9F0', text: '#1A7F4A' },
    Finance: { bg: '#F5F0FF', text: '#6B3FBF' },
    Sales: { bg: '#FFF0F6', text: '#C02D7A' },
    'Human Resource': { bg: '#E9F9FF', text: '#0A7FA3' },
};

const STATUS_STYLES = {
    Pending: { bg: '#FEF9C3', text: '#A16207', label: 'Pending' },
    Reviewed: { bg: '#DBEAFE', text: '#1E40AF', label: 'Reviewed' },
    Interview: { bg: '#DCFCE7', text: '#15803D', label: 'Interview' },
    Rejected: { bg: '#FEE2E2', text: '#B91C1C', label: 'Rejected' },
    Offer: { bg: '#F3E8FF', text: '#7C3AED', label: '🎉 Offer!' },
};

function getProfile() {
    try { return JSON.parse(localStorage.getItem('qh_user_profile') || '{}'); } catch { return {}; }
}

function calcCompletion(profile, user) {
    const checks = [!!user?.name, !!user?.email, !!profile.photo, !!profile.resume?.name, !!(profile.skills?.length), !!profile.title, !!profile.bio];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

function StatCard({ icon: Icon, label, value, color, bg }) {
    return (
        <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={22} color={color} />
            </div>
            <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#25324B', lineHeight: 1, letterSpacing: '-0.03em' }}>{value}</div>
                <div style={{ fontSize: 12, color: '#7C8493', marginTop: 3, fontWeight: 500 }}>{label}</div>
            </div>
        </div>
    );
}

function JobRow({ job }) {
    const navigate = useNavigate();
    const logo = COMPANY_LOGO_MAP[job.company] || job.company_logo;
    const cs = CATEGORY_COLORS[job.category] || { bg: '#F1F5F9', text: '#475569' };
    return (
        <button onClick={() => navigate(`/jobs/${job.id}`)}
            style={{ width: '100%', textAlign: 'left', background: '#fff', border: 'none', borderBottom: '1px solid #F1F2F4', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'background 150ms', fontFamily: 'inherit' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
            {logo
                ? <img src={logo} alt={job.company} style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'contain', border: '1.5px solid #F1F5F9', flexShrink: 0 }} onError={e => { e.target.style.display = 'none'; }} />
                : <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#4640DE', flexShrink: 0 }}>{(job.company || '?').slice(0, 2).toUpperCase()}</div>}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#25324B', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.title}</div>
                <div style={{ fontSize: 12, color: '#7C8493', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Building2 size={11} />{job.company}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={11} />{job.location}</span>
                </div>
            </div>
            <span style={{ background: cs.bg, color: cs.text, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 9999, flexShrink: 0 }}>{job.category}</span>
            <ChevronRight size={14} color="#94A3B8" style={{ flexShrink: 0 }} />
        </button>
    );
}

function ApplicationRow({ app }) {
    const st = STATUS_STYLES[app.status] || STATUS_STYLES.Pending;
    const logo = COMPANY_LOGO_MAP[app.company] || app.company_logo;
    const date = app.applied_at ? new Date(app.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: '1px solid #F1F2F4' }}>
            {logo
                ? <img src={logo} alt={app.company} style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'contain', border: '1.5px solid #F1F5F9', flexShrink: 0 }} onError={e => e.target.style.display = 'none'} />
                : <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#4640DE', flexShrink: 0 }}>{(app.company || '?').slice(0, 2).toUpperCase()}</div>}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#25324B', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.title}</div>
                <div style={{ fontSize: 12, color: '#7C8493', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Building2 size={11} />{app.company}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={11} />{date}</span>
                </div>
            </div>
            <span style={{ background: st.bg, color: st.text, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 9999, flexShrink: 0 }}>{st.label}</span>
        </div>
    );
}

export default function Dashboard() {
    const navigate = useNavigate();
    const user = getUser();
    const [recommended, setRecommended] = useState(mockJobs.slice(0, 4));
    const [appliedJobs, setAppliedJobs] = useState(() => {
        try { return JSON.parse(localStorage.getItem('qh_applied_jobs') || '[]'); } catch { return []; }
    });
    const [profile, setProfile] = useState(getProfile);
    const completion = calcCompletion(profile, user);

    const refreshApplied = useCallback(() => {
        try { setAppliedJobs(JSON.parse(localStorage.getItem('qh_applied_jobs') || '[]')); } catch { }
        setProfile(getProfile());
    }, []);

    useEffect(() => {
        document.title = 'Dashboard | QuickHire';
        if (!isUserLoggedIn()) { navigate('/login'); return; }
        getJobs({}).then(res => {
            const data = res.data?.data || res.data || [];
            if (data.length >= 4) setRecommended(data.slice(0, 4));
        }).catch(() => { });
        // Refresh when storage or profile changes
        window.addEventListener('storage', refreshApplied);
        window.addEventListener('qh-profile-change', refreshApplied);
        return () => {
            window.removeEventListener('storage', refreshApplied);
            window.removeEventListener('qh-profile-change', refreshApplied);
        };
    }, [navigate, refreshApplied]);

    const initials = (user?.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const joinDate = user?.at ? new Date(user.at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently';

    return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>

                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #4640DE 0%, #6366F1 100%)', padding: '40px 0 60px' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }} className="qh-dash-inner">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                                {/* Avatar: show profile photo if uploaded */}
                                {profile.photo
                                    ? <img src={profile.photo} alt="Avatar" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)', flexShrink: 0 }} />
                                    : <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2.5px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{initials}</div>}
                                <div>
                                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 4, fontWeight: 500 }}>Welcome back 👋</p>
                                    <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 2, fontFamily: "'Epilogue', sans-serif" }}>{user?.name || 'Job Seeker'}</h1>
                                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{profile.title || user?.email} · Member since {joinDate}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                <Link to="/profile"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'background 150ms' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>
                                    <User size={14} /> Edit Profile
                                </Link>
                                <Link to="/jobs"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', color: '#4640DE', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'all 150ms' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#F0F0FF'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                                    <Briefcase size={15} /> Browse Jobs
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ maxWidth: 1200, margin: '-28px auto 0', padding: '0 24px 60px' }} className="qh-dash-inner">

                    {/* Stats */}
                    <div className="qh-dash-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
                        <StatCard icon={Briefcase} label="Applications Sent" value={appliedJobs.length} color="#4640DE" bg="#EEF2FF" />
                        <StatCard icon={CheckCircle2} label="Profile Complete" value={`${completion}%`} color="#16A34A" bg="#DCFCE7" />
                        <StatCard icon={Eye} label="Profile Views" value={0} color="#D97706" bg="#FEF3C7" />
                        <StatCard icon={Calendar} label="Interviews" value={0} color="#7C3AED" bg="#F3E8FF" />
                    </div>

                    <div className="qh-dash-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>

                        {/* LEFT */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                            {/* My Applications */}
                            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
                                <div style={{ padding: '18px 20px', borderBottom: '1px solid #F1F2F4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <h2 style={{ fontSize: 16, fontWeight: 800, color: '#25324B', fontFamily: "'Epilogue', sans-serif" }}>My Applications</h2>
                                        <p style={{ fontSize: 12, color: '#7C8493', marginTop: 2 }}>{appliedJobs.length} application{appliedJobs.length !== 1 ? 's' : ''} submitted</p>
                                    </div>
                                </div>
                                {appliedJobs.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8' }}>
                                        <Briefcase size={36} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.4 }} />
                                        <p style={{ fontSize: 14, fontWeight: 600, color: '#64748B' }}>No applications yet</p>
                                        <p style={{ fontSize: 13, marginTop: 4 }}>Apply to a job and it will appear here</p>
                                        <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, background: '#4640DE', color: '#fff', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                                            Browse Jobs <ArrowRight size={13} />
                                        </Link>
                                    </div>
                                ) : appliedJobs.map((app, idx) => <ApplicationRow key={app.job_id + '-' + idx} app={app} />)}
                            </div>

                            {/* Recommended Jobs */}
                            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
                                <div style={{ padding: '18px 20px', borderBottom: '1px solid #F1F2F4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <h2 style={{ fontSize: 16, fontWeight: 800, color: '#25324B', fontFamily: "'Epilogue', sans-serif" }}>Recommended Jobs</h2>
                                        <p style={{ fontSize: 12, color: '#7C8493', marginTop: 2 }}>Based on recent activity</p>
                                    </div>
                                    <Link to="/jobs" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#4640DE', fontWeight: 600, textDecoration: 'none' }}>
                                        View all <ArrowRight size={13} />
                                    </Link>
                                </div>
                                {recommended.map(job => <JobRow key={job.id} job={job} />)}
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                            {/* Profile Completion */}
                            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: 20 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 9, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={15} color="#4640DE" /></div>
                                        <div>
                                            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#25324B' }}>Profile Completion</h3>
                                            <p style={{ fontSize: 11, color: '#7C8493' }}>Complete to get more visibility</p>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 14, fontWeight: 800, color: completion >= 80 ? '#16A34A' : '#4640DE' }}>{completion}%</span>
                                </div>
                                <div style={{ height: 7, background: '#F1F2F4', borderRadius: 99, overflow: 'hidden', marginBottom: 14 }}>
                                    <div style={{ height: '100%', borderRadius: 99, width: `${completion}%`, background: completion >= 80 ? 'linear-gradient(90deg,#16A34A,#22C55E)' : 'linear-gradient(90deg,#4640DE,#6366F1)', transition: 'width 600ms ease' }} />
                                </div>
                                {[
                                    { label: 'Basic info', done: !!user?.name && !!user?.email },
                                    { label: 'Profile photo', done: !!profile.photo },
                                    { label: 'Job title & bio', done: !!profile.title },
                                    { label: 'Resume uploaded', done: !!profile.resume?.name },
                                    { label: 'Skills added', done: !!(profile.skills?.length) },
                                ].map(item => (
                                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #F8FAFC', fontSize: 12 }}>
                                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: item.done ? '#DCFCE7' : '#F1F2F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            {item.done ? <Check size={10} color="#16A34A" strokeWidth={3} /> : <span style={{ fontSize: 8, color: '#94A3B8' }}>○</span>}
                                        </div>
                                        <span style={{ color: item.done ? '#16A34A' : '#515B6F', fontWeight: item.done ? 400 : 600, textDecoration: item.done ? 'line-through' : 'none' }}>{item.label}</span>
                                    </div>
                                ))}
                                <Link to="/profile"
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14, background: '#4640DE', color: '#fff', borderRadius: 8, padding: '10px 0', fontSize: 13, fontWeight: 700, textDecoration: 'none', transition: 'background 150ms' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#3730c0'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#4640DE'}>
                                    {completion < 100 ? 'Complete Profile' : 'Edit Profile'} <ArrowRight size={13} />
                                </Link>
                            </div>

                            {/* Market Insights */}
                            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: 20 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                                    <TrendingUp size={16} color="#4640DE" />
                                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#25324B' }}>Market Insights</h3>
                                </div>
                                {[
                                    { label: 'Jobs available today', value: '1,200+' },
                                    { label: 'Remote opportunities', value: '340+' },
                                    { label: 'New this week', value: '89' },
                                ].map(item => (
                                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid #F8FAFC', fontSize: 13 }}>
                                        <span style={{ color: '#515B6F' }}>{item.label}</span>
                                        <span style={{ fontWeight: 700, color: '#4640DE' }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Resume quick-access */}
                            <div style={{ background: profile.resume ? '#F0FDF4' : '#F8FAFC', border: `1.5px solid ${profile.resume ? '#BBF7D0' : '#E2E8F0'}`, borderRadius: 14, padding: 20 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                    <FileText size={16} color={profile.resume ? '#16A34A' : '#94A3B8'} />
                                    <h3 style={{ fontSize: 14, fontWeight: 700, color: profile.resume ? '#15803D' : '#94A3B8' }}>Resume</h3>
                                </div>
                                {profile.resume
                                    ? <>
                                        <p style={{ fontSize: 12, color: '#166534', marginBottom: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile.resume.name}</p>
                                        <a href={profile.resume.data} download={profile.resume.name}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, background: '#16A34A', color: '#fff', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                                            Download Resume
                                        </a>
                                    </>
                                    : <>
                                        <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 10 }}>No resume uploaded yet.</p>
                                        <Link to="/profile"
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, background: '#F1F5F9', color: '#515B6F', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 700, textDecoration: 'none', border: '1.5px dashed #CBD5E1' }}>
                                            Upload Resume
                                        </Link>
                                    </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <style>{`
                @media (max-width: 900px) {
                    .qh-dash-grid { grid-template-columns: 1fr !important; }
                    .qh-dash-stats { grid-template-columns: 1fr 1fr !important; }
                }
                @media (max-width: 640px) {
                    .qh-dash-stats { grid-template-columns: 1fr 1fr !important; }
                    .qh-dash-inner { padding: 0 16px !important; }
                }
            `}</style>
        </>
    );
}
