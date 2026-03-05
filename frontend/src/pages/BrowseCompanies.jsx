import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, Building2 } from 'lucide-react';
import { mockJobs, COMPANY_LOGO_MAP } from '../services/mockData';
import { getJobs } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const INDUSTRY_MAP = {
    Marketing: 'Marketing & Advertising',
    Design: 'Creative & Design',
    Business: 'Consulting & Business',
    Technology: 'Software & Technology',
    Engineering: 'Engineering',
    Finance: 'Finance & Banking',
    Sales: 'Sales & Commerce',
    'Human Resource': 'People & HR',
};

const COMPANY_SIZES = ['1–50', '51–200', '201–500', '501–1000', '1000+'];

const CAT_COLORS = {
    Marketing: { bg: '#FFF4E5', text: '#C47B0E' },
    Design: { bg: '#EBF5FF', text: '#1E6DB7' },
    Business: { bg: '#EEF4FF', text: '#4A5AE8' },
    Technology: { bg: '#FFF0EF', text: '#C13B31' },
    Engineering: { bg: '#EDF9F0', text: '#1A7F4A' },
    Finance: { bg: '#F5F0FF', text: '#6B3FBF' },
    Sales: { bg: '#FFF0F6', text: '#C02D7A' },
    'Human Resource': { bg: '#E9F9FF', text: '#0A7FA3' },
};

function buildCompanies(jobs) {
    const map = {};
    jobs.forEach(job => {
        if (!map[job.company]) {
            map[job.company] = {
                name: job.company,
                logo: COMPANY_LOGO_MAP[job.company] || job.company_logo || null,
                category: job.category,
                location: job.location,
                openings: 0,
                size: COMPANY_SIZES[job.company.charCodeAt(0) % COMPANY_SIZES.length],
                founded: 2000 + (job.company.charCodeAt(1) % 22),
                description: `${job.company} is a leading company in ${INDUSTRY_MAP[job.category] || job.category}. We build innovative products and look for passionate people to help shape the future.`,
            };
        }
        map[job.company].openings++;
    });
    return Object.values(map);
}

const MOCK_COMPANIES = buildCompanies(mockJobs);
const MOCK_CATEGORIES = [...new Set(MOCK_COMPANIES.map(c => c.category))];

function CompanyCard({ company }) {
    const catStyle = CAT_COLORS[company.category] || { bg: '#F1F5F9', text: '#475569' };
    const initials = company.name.slice(0, 2).toUpperCase();
    const [imgFailed, setImgFailed] = useState(false);

    return (
        <div
            style={{
                background: '#fff',
                border: '1.5px solid #D6DDEB',
                borderRadius: 0,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                height: '100%',
                boxSizing: 'border-box',
                transition: 'all 200ms ease',
                cursor: 'default',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(70,64,222,0.12)';
                e.currentTarget.style.borderColor = '#B0A8FF';
                e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#D6DDEB';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Top row: logo + category badge */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    overflow: 'hidden', border: '1.5px solid #F1F5F9',
                    flexShrink: 0, background: '#EEF2FF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    {company.logo && !imgFailed ? (
                        <img
                            src={company.logo}
                            alt={company.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            onError={() => setImgFailed(true)}
                        />
                    ) : (
                        <span style={{ fontSize: 14, fontWeight: 800, color: '#4F46E5' }}>{initials}</span>
                    )}
                </div>
                <span style={{
                    background: catStyle.bg, color: catStyle.text,
                    fontSize: 11, fontWeight: 700, padding: '3px 10px',
                    borderRadius: 9999, whiteSpace: 'nowrap',
                }}>
                    {company.category}
                </span>
            </div>

            {/* Company name + description */}
            <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 6, lineHeight: 1.2 }}>
                    {company.name}
                </h3>
                <p style={{
                    fontSize: 12, color: '#64748B', lineHeight: 1.65,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                    {company.description}
                </p>
            </div>

            {/* Meta row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 12, color: '#94A3B8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={11} />{company.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Users size={11} />{company.size} employees
                </span>
                <span>Est. {company.founded}</span>
            </div>

            {/* Footer: open roles + View Jobs CTA */}
            <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 12, borderTop: '1px solid #F1F5F9',
            }}>
                <span style={{
                    fontSize: 12, fontWeight: 700, color: '#16A34A',
                    background: '#DCFCE7', padding: '4px 10px',
                    borderRadius: 9999, display: 'inline-flex', alignItems: 'center', lineHeight: 1,
                }}>
                    {company.openings} open role{company.openings !== 1 ? 's' : ''}
                </span>
                <Link
                    to={`/jobs?category=${encodeURIComponent(company.category)}`}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 13, fontWeight: 700, color: '#4640DE',
                        textDecoration: 'none', border: '1.5px solid #4640DE',
                        padding: '7px 16px', borderRadius: 0,
                        background: 'transparent', transition: 'background 150ms, color 150ms',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#4640DE'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4640DE'; }}
                >
                    View Jobs
                </Link>
            </div>
        </div>
    );
}

export default function BrowseCompanies() {
    const [keyword, setKeyword] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const [allCompanies, setAllCompanies] = useState(MOCK_COMPANIES);
    const [categories, setCategories] = useState(MOCK_CATEGORIES);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Browse Companies | QuickHire';
        setLoading(true);
        getJobs({ per_page: 100 })
            .then(res => {
                const data = res.data?.data || res.data || [];
                if (Array.isArray(data) && data.length) {
                    const companies = buildCompanies(data);
                    setAllCompanies(companies);
                    setCategories([...new Set(companies.map(c => c.category))]);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const filtered = allCompanies.filter(c => {
        const kw = keyword.toLowerCase();
        const matchKw = !kw
            || c.name.toLowerCase().includes(kw)
            || c.location.toLowerCase().includes(kw)
            || c.category.toLowerCase().includes(kw);
        const matchCat = !activeCategory || c.category === activeCategory;
        return matchKw && matchCat;
    });

    return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>

                {/* Page header */}
                <div style={{ background: '#fff', borderBottom: '1px solid #D6DDEB', padding: '28px 0' }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 124px' }} className="qh-auth-header-inner">
                        <nav aria-label="Breadcrumb" style={{ marginBottom: 10 }}>
                            <ol style={{ display: 'flex', gap: 6, listStyle: 'none', padding: 0, margin: 0, fontSize: 12, color: '#9199A3' }}>
                                <li><Link to="/" style={{ color: '#9199A3', textDecoration: 'none' }}>Home</Link></li>
                                <li aria-hidden style={{ fontSize: 11 }}>›</li>
                                <li style={{ color: '#4640DE', fontWeight: 600 }}>Browse Companies</li>
                            </ol>
                        </nav>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                            <div>
                                <h1 style={{ fontSize: 28, fontWeight: 800, color: '#25324B', letterSpacing: '-0.02em', marginBottom: 4, fontFamily: "'Epilogue', sans-serif" }}>
                                    Browse <span style={{ color: '#26A4FF' }}>Companies</span>
                                </h1>
                                <p style={{ fontSize: 14, color: '#515B6F' }}>
                                    {loading ? 'Loading companies…' : (
                                        <>{filtered.length} compan{filtered.length !== 1 ? 'ies' : 'y'} found
                                            {activeCategory && <span style={{ color: '#4640DE', fontWeight: 600 }}> in {activeCategory}</span>}
                                        </>
                                    )}
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#7C8493' }}>
                                <Building2 size={16} color="#4640DE" />
                                <span>{allCompanies.length} companies total</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 124px' }} className="qh-auth-header-inner">

                    {/* Search + category filter */}
                    <div style={{ background: '#fff', border: '1px solid #D6DDEB', borderRadius: 0, padding: '16px 20px', marginBottom: 24 }}>

                        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                            <div style={{
                                flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 10,
                                border: '1px solid #D6DDEB', borderRadius: 8, padding: '0 14px',
                                background: '#F8FAFC', transition: 'all 150ms',
                            }}
                                onFocusCapture={e => { e.currentTarget.style.borderColor = '#4640DE'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(70,64,222,0.1)'; e.currentTarget.style.background = '#fff'; }}
                                onBlurCapture={e => { e.currentTarget.style.borderColor = '#D6DDEB'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#F8FAFC'; }}>
                                <Search size={15} color="#9199A3" style={{ flexShrink: 0 }} />
                                <input
                                    type="search"
                                    placeholder="Search companies by name, location, or industry…"
                                    value={keyword}
                                    onChange={e => setKeyword(e.target.value)}
                                    style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#25324B', background: 'transparent', padding: '12px 0', fontFamily: 'inherit' }}
                                    aria-label="Search companies"
                                />
                                {keyword && (
                                    <button onClick={() => setKeyword('')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9199A3', padding: 2 }} aria-label="Clear search">✕</button>
                                )}
                            </div>
                        </div>

                        {/* Category pills */}
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: '#9199A3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Filter by Industry</div>
                            <div className="qh-filter-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                <button
                                    onClick={() => setActiveCategory('')}
                                    style={{
                                        padding: '6px 14px', borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                        border: `1.5px solid ${!activeCategory ? '#4640DE' : '#D6DDEB'}`,
                                        background: !activeCategory ? '#EEF2FF' : '#fff',
                                        color: !activeCategory ? '#4640DE' : '#515B6F',
                                        transition: 'all 150ms',
                                    }}>
                                    All
                                </button>
                                {categories.map(cat => {
                                    const cs = CAT_COLORS[cat] || { bg: '#F1F5F9', text: '#475569' };
                                    const active = activeCategory === cat;
                                    return (
                                        <button key={cat} onClick={() => setActiveCategory(active ? '' : cat)}
                                            style={{
                                                padding: '6px 14px', borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                                border: `1.5px solid ${active ? cs.text : '#D6DDEB'}`,
                                                background: active ? cs.bg : '#fff',
                                                color: active ? cs.text : '#515B6F',
                                                transition: 'all 150ms',
                                            }}>
                                            {cat}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Companies grid */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: '#9199A3' }}>
                            <div style={{ width: 40, height: 40, border: '3px solid #E2E8F0', borderTopColor: '#4640DE', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.7s linear infinite' }} />
                            <p style={{ fontSize: 14 }}>Loading companies…</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '64px 0', background: '#fff', border: '1px solid #D6DDEB' }}>
                            <Building2 size={44} color="#D6DDEB" style={{ display: 'block', margin: '0 auto 16px' }} />
                            <p style={{ fontSize: 16, fontWeight: 700, color: '#25324B', marginBottom: 6 }}>No companies found</p>
                            <p style={{ fontSize: 14, color: '#7C8493' }}>Try adjusting your search or filters.</p>
                            <button onClick={() => { setKeyword(''); setActiveCategory(''); }}
                                style={{ marginTop: 16, background: '#4640DE', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="qh-company-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
                            {filtered.map(company => (
                                <CompanyCard key={company.name} company={company} />
                            ))}
                        </div>
                    )}
                </div>

                <style>{`
                    @keyframes spin { to { transform: rotate(360deg); } }
                    @media (max-width: 1024px) {
                        .qh-company-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    }
                    @media (max-width: 640px) {
                        .qh-auth-header-inner { padding: 0 16px !important; }
                        .qh-company-grid { grid-template-columns: 1fr !important; }
                        .qh-filter-pills { gap: 6px !important; }
                    }
                `}</style>
            </div>
            <Footer />
        </>
    );
}
