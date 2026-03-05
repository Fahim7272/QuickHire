import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Camera, Upload, X, Plus, Check, ArrowLeft, Save, FileText, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getUser, updateUserSession, isUserLoggedIn } from '../services/auth';
import { getMe, updateMe, uploadProfilePhoto } from '../services/api';

const SKILL_SUGGESTIONS = [
    'JavaScript', 'React', 'TypeScript', 'Python', 'Node.js', 'CSS', 'HTML',
    'Figma', 'UI/UX', 'Product Management', 'Marketing', 'SEO', 'Sales',
    'Data Analysis', 'SQL', 'Excel', 'Leadership', 'Communication',
    'Project Management', 'Agile', 'Scrum', 'Finance', 'Accounting',
];

function calcCompletion(u) {
    const checks = [!!u?.name, !!u?.email, !!u?.profile_photo_url, !!(u?.skills?.length), !!u?.title, !!u?.bio];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

// Keep resume in localStorage (file blob, not worth storing in DB for this demo)
function getLocalResume() {
    try { return JSON.parse(localStorage.getItem('qh_resume') || 'null'); } catch { return null; }
}
function saveLocalResume(data) { localStorage.setItem('qh_resume', JSON.stringify(data)); }
function removeLocalResume() { localStorage.removeItem('qh_resume'); }

export default function Profile() {
    const navigate = useNavigate();
    const sessionUser = getUser();
    const photoInputRef = useRef(null);
    const resumeInputRef = useRef(null);

    const [apiUser, setApiUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ title: '', bio: '', skills: [] });
    const [skillInput, setSkillInput] = useState('');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [photoUploading, setPhotoUploading] = useState(false);
    const [resumeInfo, setResumeInfo] = useState(getLocalResume);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = 'My Profile | QuickHire';
        if (!isUserLoggedIn()) { navigate('/login'); return; }
        getMe()
            .then(res => {
                const u = res.data;
                setApiUser(u);
                setForm({ title: u.title || '', bio: u.bio || '', skills: u.skills || [] });
            })
            .catch(() => {
                // fallback: use session data
                const u = sessionUser;
                setApiUser(u);
                setForm({ title: u?.title || '', bio: u?.bio || '', skills: u?.skills || [] });
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    const completion = calcCompletion({ ...apiUser, ...form, skills: form.skills });

    // ── Photo upload ──────────────────────────────────────────────────────────
    async function handlePhotoChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { setError('Photo must be under 5MB'); return; }
        setPhotoUploading(true);
        setError('');
        try {
            const res = await uploadProfilePhoto(file);
            const updated = { ...apiUser, profile_photo_url: res.data.profile_photo_url, profile_photo: res.data.profile_photo };
            setApiUser(updated);
            updateUserSession(updated);
            window.dispatchEvent(new Event('qh-profile-change'));
        } catch { setError('Photo upload failed. Please try again.'); }
        finally { setPhotoUploading(false); }
    }

    // ── Resume (localStorage) ────────────────────────────────────────────────
    function handleResumeFile(file) {
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) { setError('Resume must be under 10MB'); return; }
        const info = { name: file.name, size: file.size, type: file.type, uploadedAt: new Date().toISOString() };
        const reader = new FileReader();
        reader.onload = ev => {
            const full = { ...info, data: ev.target.result };
            setResumeInfo(full);
            saveLocalResume(full);
        };
        reader.readAsDataURL(file);
    }

    function removeResume() { setResumeInfo(null); removeLocalResume(); }

    // ── Skills ───────────────────────────────────────────────────────────────
    function addSkill(skill) {
        const s = skill.trim();
        if (!s || form.skills.includes(s)) return;
        setForm(p => ({ ...p, skills: [...p.skills, s] }));
        setSkillInput('');
    }
    function removeSkill(skill) { setForm(p => ({ ...p, skills: p.skills.filter(s => s !== skill) })); }
    const filtered = SKILL_SUGGESTIONS.filter(s => skillInput && s.toLowerCase().includes(skillInput.toLowerCase()) && !form.skills.includes(s));

    // ── Save (backend) ───────────────────────────────────────────────────────
    async function handleSave() {
        setSaving(true); setError('');
        try {
            const res = await updateMe({ title: form.title, bio: form.bio, skills: form.skills });
            setApiUser(res.data);
            updateUserSession(res.data);
            window.dispatchEvent(new Event('qh-profile-change'));
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch { setError('Failed to save profile. Please try again.'); }
        finally { setSaving(false); }
    }

    const initials = (apiUser?.name || sessionUser?.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    if (loading) return (
        <><Navbar />
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #E2E8F0', borderTopColor: '#4640DE', animation: 'spin 0.7s linear infinite' }} />
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
            <Footer /></>
    );

    return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg,#4640DE 0%,#6366F1 100%)', padding: '32px 0 52px' }}>
                    <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }} className="qh-prof-inner">
                        <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: 13, marginBottom: 20 }}
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}>
                            <ArrowLeft size={14} /> Back to Dashboard
                        </Link>
                        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', fontFamily: "'Epilogue', sans-serif" }}>My Profile</h1>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Your profile is saved to the database and visible to employers</p>
                    </div>
                </div>

                <div style={{ maxWidth: 900, margin: '-32px auto 0', padding: '0 24px 60px' }} className="qh-prof-inner">
                    {error && <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 10, padding: '12px 16px', color: '#DC2626', fontSize: 13, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>⚠ {error}</div>}

                    <div className="qh-prof-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, alignItems: 'start' }}>

                        {/* ── LEFT: Photo + Completion ── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {/* Photo card */}
                            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 24, textAlign: 'center' }}>
                                <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
                                    {apiUser?.profile_photo_url ? (
                                        <img src={apiUser.profile_photo_url} alt="Profile" style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: '3px solid #C7D2FE', display: 'block' }} />
                                    ) : (
                                        <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg,#4640DE,#6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: '#fff' }}>{initials}</div>
                                    )}
                                    <button onClick={() => photoInputRef.current?.click()} disabled={photoUploading}
                                        style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: '#4640DE', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: photoUploading ? 0.6 : 1 }}>
                                        <Camera size={13} color="#fff" />
                                    </button>
                                </div>
                                <input ref={photoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
                                <p style={{ fontWeight: 700, fontSize: 15, color: '#25324B', marginBottom: 2 }}>{apiUser?.name || 'Your Name'}</p>
                                <p style={{ fontSize: 12, color: '#7C8493', marginBottom: 12 }}>{apiUser?.email}</p>
                                <p style={{ fontSize: 12, color: '#64748B', fontStyle: 'italic', marginBottom: 16 }}>{form.title || 'Add your job title below'}</p>
                                <button onClick={() => photoInputRef.current?.click()} disabled={photoUploading}
                                    style={{ width: '100%', padding: '9px 0', border: '1.5px dashed #C7D2FE', borderRadius: 8, background: '#EEF2FF', color: '#4640DE', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                    <Camera size={13} /> {photoUploading ? 'Uploading…' : 'Change Photo'}
                                </button>
                                <p style={{ fontSize: 11, color: '#9199A3', marginTop: 8 }}>Photo stored on server · Max 5MB</p>
                            </div>

                            {/* Completion */}
                            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 20 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#25324B' }}>Profile Completion</span>
                                    <span style={{ fontSize: 13, fontWeight: 800, color: '#4640DE' }}>{completion}%</span>
                                </div>
                                <div style={{ height: 8, background: '#F1F2F4', borderRadius: 99, overflow: 'hidden', marginBottom: 14 }}>
                                    <div style={{ height: '100%', borderRadius: 99, width: `${completion}%`, background: completion >= 80 ? 'linear-gradient(90deg,#16A34A,#22C55E)' : 'linear-gradient(90deg,#4640DE,#6366F1)', transition: 'width 500ms ease' }} />
                                </div>
                                {[
                                    { label: 'Basic info (name + email)', done: !!apiUser?.name && !!apiUser?.email },
                                    { label: 'Profile photo', done: !!apiUser?.profile_photo_url },
                                    { label: 'Job title', done: !!form.title },
                                    { label: 'Professional bio', done: !!form.bio },
                                    { label: 'Skills added', done: form.skills.length > 0 },
                                ].map(item => (
                                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid #F8FAFC', fontSize: 12 }}>
                                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: item.done ? '#DCFCE7' : '#F1F2F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            {item.done ? <Check size={10} color="#16A34A" strokeWidth={3} /> : <span style={{ fontSize: 8, color: '#94A3B8' }}>○</span>}
                                        </div>
                                        <span style={{ color: item.done ? '#16A34A' : '#64748B', fontWeight: item.done ? 400 : 600 }}>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── RIGHT: Forms ── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                            {/* Basic Info */}
                            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 24 }}>
                                <h2 style={{ fontSize: 15, fontWeight: 800, color: '#25324B', marginBottom: 18, fontFamily: "'Epilogue', sans-serif" }}>Basic Information</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                                    <div>
                                        <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>Full Name</label>
                                        <input value={apiUser?.name || ''} readOnly style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #E2E8F0', background: '#F8FAFC', fontSize: 14, color: '#64748B', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>Email Address</label>
                                        <input value={apiUser?.email || ''} readOnly style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #E2E8F0', background: '#F8FAFC', fontSize: 14, color: '#64748B', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                                    </div>
                                </div>
                                <div style={{ marginBottom: 14 }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>Professional Title</label>
                                    <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder='e.g. "Senior UI Designer"'
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #E2E8F0', background: '#F8FAFC', fontSize: 14, color: '#25324B', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none' }}
                                        onFocus={e => e.target.style.borderColor = '#4640DE'} onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>Professional Bio</label>
                                    <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} placeholder="Write a short summary about yourself…" rows={4}
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #E2E8F0', background: '#F8FAFC', fontSize: 14, color: '#25324B', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none', resize: 'vertical', lineHeight: 1.6 }}
                                        onFocus={e => e.target.style.borderColor = '#4640DE'} onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
                                    <p style={{ fontSize: 11, color: '#9199A3', marginTop: 4 }}>{form.bio.length} / 1000 characters</p>
                                </div>
                            </div>

                            {/* Skills */}
                            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 24 }}>
                                <h2 style={{ fontSize: 15, fontWeight: 800, color: '#25324B', marginBottom: 6, fontFamily: "'Epilogue', sans-serif" }}>Skills</h2>
                                <p style={{ fontSize: 12, color: '#7C8493', marginBottom: 16 }}>Skills are saved to your profile in the database.</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                                    {form.skills.map(skill => (
                                        <span key={skill} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EEF2FF', color: '#4640DE', borderRadius: 9999, padding: '5px 12px', fontSize: 13, fontWeight: 600, border: '1px solid #C7D2FE' }}>
                                            {skill}
                                            <button onClick={() => removeSkill(skill)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: '#6366F1' }}><X size={12} strokeWidth={2.5} /></button>
                                        </span>
                                    ))}
                                    {form.skills.length === 0 && <span style={{ fontSize: 13, color: '#9199A3', fontStyle: 'italic' }}>No skills added yet.</span>}
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <input value={skillInput} onChange={e => setSkillInput(e.target.value)}
                                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(skillInput); } }}
                                            placeholder="Type a skill and press Enter…"
                                            style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1.5px solid #E2E8F0', background: '#F8FAFC', fontSize: 14, color: '#25324B', fontFamily: 'inherit', outline: 'none' }}
                                            onFocus={e => e.target.style.borderColor = '#4640DE'}
                                            onBlur={e => { e.target.style.borderColor = '#E2E8F0'; setTimeout(() => setSkillInput(''), 150); }} />
                                        <button onClick={() => addSkill(skillInput)} style={{ padding: '10px 16px', background: '#4640DE', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                                            <Plus size={14} /> Add
                                        </button>
                                    </div>
                                    {filtered.length > 0 && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 60, background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 10, marginTop: 4, maxHeight: 180, overflowY: 'auto' }}>
                                            {filtered.map(s => (
                                                <button key={s} onMouseDown={() => addSkill(s)} style={{ width: '100%', textAlign: 'left', padding: '9px 14px', border: 'none', background: 'none', fontSize: 13, color: '#25324B', cursor: 'pointer', fontFamily: 'inherit' }}
                                                    onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'none'}>{s}</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div style={{ marginTop: 12 }}>
                                    <p style={{ fontSize: 11, color: '#9199A3', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quick Add</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                        {SKILL_SUGGESTIONS.filter(s => !form.skills.includes(s)).slice(0, 10).map(s => (
                                            <button key={s} onClick={() => addSkill(s)}
                                                style={{ padding: '4px 12px', borderRadius: 9999, border: '1.5px solid #E2E8F0', background: '#fff', fontSize: 12, color: '#515B6F', cursor: 'pointer', fontWeight: 600, transition: 'all 150ms' }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#4640DE'; e.currentTarget.style.color = '#4640DE'; e.currentTarget.style.background = '#EEF2FF'; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#515B6F'; e.currentTarget.style.background = '#fff'; }}>+ {s}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Resume */}
                            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 24 }}>
                                <h2 style={{ fontSize: 15, fontWeight: 800, color: '#25324B', marginBottom: 4, fontFamily: "'Epilogue', sans-serif" }}>Resume / CV</h2>
                                <p style={{ fontSize: 12, color: '#7C8493', marginBottom: 16 }}>Upload your resume (PDF/DOC, max 10MB — stored locally for preview).</p>
                                {resumeInfo ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: 12 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 10, background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FileText size={22} color="#16A34A" /></div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ fontWeight: 700, fontSize: 14, color: '#15803D', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{resumeInfo.name}</p>
                                            <p style={{ fontSize: 12, color: '#4ADE80' }}>{(resumeInfo.size / 1024).toFixed(1)} KB · {new Date(resumeInfo.uploadedAt).toLocaleDateString()}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                                            <a href={resumeInfo.data} download={resumeInfo.name} style={{ width: 34, height: 34, borderRadius: 8, background: '#fff', border: '1.5px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A', textDecoration: 'none' }}><Eye size={15} /></a>
                                            <button onClick={removeResume} style={{ width: 34, height: 34, borderRadius: 8, background: '#fff', border: '1.5px solid #FCA5A5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}><X size={15} /></button>
                                        </div>
                                    </div>
                                ) : (
                                    <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
                                        onDrop={e => { e.preventDefault(); setDragOver(false); handleResumeFile(e.dataTransfer.files?.[0]); }}
                                        onClick={() => resumeInputRef.current?.click()}
                                        style={{ border: `2px dashed ${dragOver ? '#4640DE' : '#C7D2FE'}`, borderRadius: 12, padding: '32px 24px', textAlign: 'center', cursor: 'pointer', background: dragOver ? '#EEF2FF' : '#F8FAFC', transition: 'all 200ms' }}>
                                        <Upload size={32} color="#4640DE" style={{ display: 'block', margin: '0 auto 12px' }} />
                                        <p style={{ fontSize: 14, fontWeight: 700, color: '#25324B', marginBottom: 4 }}>Drag & drop or click to upload</p>
                                        <p style={{ fontSize: 12, color: '#7C8493' }}>PDF, DOC, DOCX up to 10MB</p>
                                    </div>
                                )}
                                <input ref={resumeInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => handleResumeFile(e.target.files?.[0])} />
                            </div>

                            {/* Save button */}
                            <button onClick={handleSave} disabled={saving}
                                style={{ width: '100%', padding: '14px 0', borderRadius: 12, border: 'none', background: saved ? '#16A34A' : saving ? '#6366F1' : 'linear-gradient(135deg,#4640DE,#6366F1)', color: '#fff', fontSize: 15, fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 300ms', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(70,64,222,0.3)', opacity: saving ? 0.85 : 1 }}>
                                {saved ? <><Check size={18} strokeWidth={3} /> Saved to Database!</> : saving ? 'Saving…' : <><Save size={16} /> Save Profile</>}
                            </button>
                        </div>
                    </div>
                </div>
                <style>{`@media(max-width:768px){.qh-prof-grid{grid-template-columns:1fr!important}.qh-prof-inner{padding:0 16px!important}}`}</style>
            </div>
            <Footer />
        </>
    );
}
