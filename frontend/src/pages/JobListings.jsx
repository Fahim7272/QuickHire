import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, SlidersHorizontal, Briefcase, AlertCircle } from 'lucide-react';
import { getJobs } from '../services/api';
import { mockJobs } from '../services/mockData';
import { FeaturedJobCard } from '../components/ui/JobCard';
import { SkeletonCard } from '../components/ui/LoadingSpinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CATEGORIES = ['Design', 'Sales', 'Marketing', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resource'];
const TYPES = ['Full Time', 'Part Time', 'Remote', 'Internship', 'Contract'];
const LOCATIONS = ['New York, US', 'San Francisco, US', 'London, UK', 'Berlin, Germany', 'Madrid, Spain', 'Remote', 'Toronto, Canada'];

const CAT_COLORS = {
    Marketing: '#F5A623', Design: '#1E6DB7', Business: '#4A5AE8',
    Technology: '#C13B31', Engineering: '#1A7F4A', Finance: '#6B3FBF',
    Sales: '#C02D7A', 'Human Resource': '#0A7FA3',
};

export default function JobListings() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [meta, setMeta] = useState({ total: 0, current_page: 1, last_page: 1 });
    const [filtersOpen, setFiltersOpen] = useState(false);
    const inputRef = useRef();

    const keyword = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const location = searchParams.get('location') || '';
    const type = searchParams.get('type') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    const [inputKeyword, setInputKeyword] = useState(keyword);

    useEffect(() => {
        document.title = 'Find Jobs | QuickHire';
    }, []);

    useEffect(() => { setInputKeyword(keyword); }, [keyword]);

    const fetchJobs = useCallback(async () => {
        setLoading(true); setError('');
        try {
            const params = { page };
            if (keyword) params.search = keyword.trim();
            if (category) params.category = category;
            if (location) params.location = location;
            if (type) params.type = type;
            const res = await getJobs(params);
            const data = res.data?.data || res.data || [];
            if (Array.isArray(data) && data.length > 0) {
                setJobs(data);
                setMeta(res.data?.meta || res.meta || { total: data.length, current_page: 1, last_page: 1 });
            } else {
                // Filter and show mock data
                let filtered = mockJobs.filter(j => {
                    const mk = !keyword || j.title.toLowerCase().includes(keyword.toLowerCase()) || j.company.toLowerCase().includes(keyword.toLowerCase());
                    const mc = !category || j.category === category;
                    const mt = !type || j.type === type;
                    const ml = !location || j.location.toLowerCase().includes(location.toLowerCase());
                    return mk && mc && mt && ml;
                });
                setJobs(filtered);
                setMeta({ total: filtered.length, current_page: 1, last_page: 1 });
            }
        } catch {
            let filtered = mockJobs.filter(j => {
                const mk = !keyword || j.title.toLowerCase().includes(keyword.toLowerCase()) || j.company.toLowerCase().includes(keyword.toLowerCase());
                const mc = !category || j.category === category;
                const mt = !type || j.type === type;
                const ml = !location || j.location.toLowerCase().includes(location.toLowerCase());
                return mk && mc && mt && ml;
            });
            setJobs(filtered);
            setMeta({ total: filtered.length, current_page: 1, last_page: 1 });
        } finally { setLoading(false); }
    }, [keyword, category, location, type, page]);

    useEffect(() => { fetchJobs(); }, [fetchJobs]);

    const updateParam = (key, value) => {
        const next = new URLSearchParams(searchParams);
        if (value) next.set(key, value); else next.delete(key);
        next.delete('page');
        setSearchParams(next);
    };

    const handleSearch = e => { e.preventDefault(); updateParam('search', inputKeyword.trim()); };
    const clearAll = () => { setInputKeyword(''); setSearchParams({}); };

    const activeFilters = [
        keyword && { label: `"${keyword}"`, clear: () => { setInputKeyword(''); updateParam('search', ''); } },
        category && { label: category, clear: () => updateParam('category', '') },
        type && { label: type, clear: () => updateParam('type', '') },
        location && { label: location, clear: () => updateParam('location', '') },
    ].filter(Boolean);

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
                                <li style={{ color: '#4640DE', fontWeight: 600 }}>Find Jobs</li>
                            </ol>
                        </nav>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                            <div>
                                <h1 style={{ fontSize: 28, fontWeight: 800, color: '#25324B', letterSpacing: '-0.02em', marginBottom: 4, fontFamily: "'Epilogue', sans-serif" }}>
                                    Find your <span style={{ color: '#26A4FF' }}>perfect job</span>
                                </h1>
                                <p style={{ fontSize: 14, color: '#515B6F' }}>
                                    {loading ? 'Loading…' : `${meta.total || jobs.length} job${(meta.total || jobs.length) !== 1 ? 's' : ''} available`}
                                    {activeFilters.length > 0 && <span style={{ color: '#4640DE', fontWeight: 600 }}> · {activeFilters.length} filter{activeFilters.length > 1 ? 's' : ''} active</span>}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ maxWidth: 1440, margin: '0 auto', padding: '28px 124px' }} className="qh-auth-header-inner">

                    {/* Search + Filters Panel */}
                    <div style={{ background: '#fff', border: '1px solid #D6DDEB', borderRadius: 0, padding: '16px 20px', marginBottom: 20 }}>


                        <form onSubmit={handleSearch} className="qh-jl-search-form" style={{ display: 'flex', gap: 10 }} role="search">
                            <div style={{
                                flex: 1, display: 'flex', alignItems: 'center', gap: 10,
                                border: '1.5px solid #E2E8F0', borderRadius: 10, padding: '0 14px',
                                transition: 'border-color 150ms ease, box-shadow 150ms ease', background: '#F8FAFC',
                            }}
                                onFocusCapture={e => { e.currentTarget.style.borderColor = '#4F46E5'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.1)'; e.currentTarget.style.background = '#fff'; }}
                                onBlurCapture={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#F8FAFC'; }}
                            >
                                <Search size={15} color="#94A3B8" style={{ flexShrink: 0 }} aria-hidden />
                                <input
                                    ref={inputRef}
                                    type="search"
                                    placeholder="Search job title, company, or keyword…"
                                    value={inputKeyword}
                                    onChange={e => setInputKeyword(e.target.value)}
                                    style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#0F172A', background: 'transparent', padding: '13px 0', fontFamily: 'inherit' }}
                                    aria-label="Search jobs"
                                />
                                {inputKeyword && (
                                    <button type="button" onClick={() => { setInputKeyword(''); inputRef.current?.focus(); }}
                                        style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, display: 'flex', borderRadius: 4 }}
                                        aria-label="Clear search">
                                        <X size={14} color="#94A3B8" />
                                    </button>
                                )}
                            </div>

                            <div className="qh-jl-search-buttons" style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                                <button type="submit"
                                    style={{ background: '#4640DE', color: '#fff', border: 'none', borderRadius: 0, padding: '0 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', minHeight: 44, transition: 'all 150ms ease' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#3730c0'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#4640DE'}>
                                    Search
                                </button>

                                <button type="button" onClick={() => setFiltersOpen(!filtersOpen)}
                                    aria-expanded={filtersOpen}
                                    aria-controls="filter-panel"
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 6, minHeight: 44,
                                        border: `1.5px solid ${filtersOpen ? '#4640DE' : '#D6DDEB'}`,
                                        borderRadius: 0, padding: '0 16px', fontSize: 13, fontWeight: 700,
                                        color: filtersOpen ? '#4640DE' : '#515B6F',
                                        background: filtersOpen ? '#EEF2FF' : '#F8FAFC',
                                        cursor: 'pointer', transition: 'all 150ms ease', whiteSpace: 'nowrap',
                                    }}>
                                    <SlidersHorizontal size={15} />
                                    Filters {activeFilters.length > 0 && (
                                        <span style={{ background: '#4F46E5', color: '#fff', borderRadius: 9999, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>
                                            {activeFilters.length}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>


                        {/* Active filter chips */}
                        {activeFilters.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginTop: 12, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
                                <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Active:</span>
                                {activeFilters.map((f, i) => (
                                    <button key={i} onClick={f.clear}
                                        style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#EEF2FF', color: '#4338CA', border: '1px solid #C7D2FE', borderRadius: 9999, padding: '4px 10px 4px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 150ms ease' }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#E0E7FF'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#EEF2FF'}>
                                        {f.label} <X size={11} />
                                    </button>
                                ))}
                                <button onClick={clearAll}
                                    style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, color: '#EF4444', fontWeight: 700, marginLeft: 4, padding: '4px 8px', borderRadius: 6, transition: 'background 150ms' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    Clear all ×
                                </button>
                            </div>
                        )}

                        {/* Expandable filter panel */}
                        {filtersOpen && (
                            <div id="filter-panel" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #F1F5F9', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, animation: 'slideDown 200ms ease both' }}>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: '#94A3B8', letterSpacing: '0.08em', marginBottom: 10, textTransform: 'uppercase' }}>Category</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                        {CATEGORIES.map(cat => (
                                            <button key={cat} onClick={() => updateParam('category', category === cat ? '' : cat)}
                                                style={{
                                                    padding: '5px 11px', borderRadius: 9999, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                                                    border: `1.5px solid ${category === cat ? CAT_COLORS[cat] || '#4F46E5' : '#E2E8F0'}`,
                                                    background: category === cat ? `${CAT_COLORS[cat]}18` || '#EEF2FF' : '#F8FAFC',
                                                    color: category === cat ? CAT_COLORS[cat] || '#4F46E5' : '#475569',
                                                    transition: 'all 150ms ease',
                                                }}>
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: '#94A3B8', letterSpacing: '0.08em', marginBottom: 10, textTransform: 'uppercase' }}>Job Type</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                        {TYPES.map(t => (
                                            <button key={t} onClick={() => updateParam('type', type === t ? '' : t)}
                                                style={{
                                                    padding: '5px 11px', borderRadius: 9999, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                                                    border: `1.5px solid ${type === t ? '#4F46E5' : '#E2E8F0'}`,
                                                    background: type === t ? '#EEF2FF' : '#F8FAFC',
                                                    color: type === t ? '#4F46E5' : '#475569',
                                                    transition: 'all 150ms ease',
                                                }}>
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: '#94A3B8', letterSpacing: '0.08em', marginBottom: 10, textTransform: 'uppercase' }}>Location</div>
                                    <select value={location} onChange={e => updateParam('location', e.target.value)}
                                        style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#0F172A', outline: 'none', background: '#F8FAFC', fontFamily: 'inherit', cursor: 'pointer', boxSizing: 'border-box' }}>
                                        <option value="">All Locations</option>
                                        {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Error state */}
                    {error && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', borderRadius: 12, padding: '14px 16px', marginBottom: 20, fontSize: 14 }} role="alert">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Results grid */}
                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14 }}>
                            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : jobs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px 0' }}>
                            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                <Briefcase size={32} color="#CBD5E1" />
                            </div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>No jobs found</h3>
                            <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 24, maxWidth: 320, margin: '0 auto 24px' }}>
                                Try different keywords, remove filters, or browse all categories.
                            </p>
                            <button onClick={clearAll}
                                style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="qh-jl-jobs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14, marginBottom: 32 }}>
                                {jobs.map(job => (
                                    <FeaturedJobCard key={job.id} job={job} />
                                ))}
                            </div>

                            {meta.last_page > 1 && (
                                <nav aria-label="Pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                                    <button onClick={() => updateParam('page', String(page - 1))} disabled={page === 1}
                                        style={{ padding: '9px 16px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#475569', background: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1, transition: 'all 150ms' }}>
                                        ← Prev
                                    </button>
                                    {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(p => (
                                        <button key={p} onClick={() => updateParam('page', String(p))}
                                            aria-current={p === page ? 'page' : undefined}
                                            style={{
                                                width: 38, height: 38, borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                                border: 'none', transition: 'all 150ms ease',
                                                background: p === page ? 'linear-gradient(135deg, #4F46E5, #6366F1)' : '#fff',
                                                color: p === page ? '#fff' : '#475569',
                                                boxShadow: p !== page ? 'inset 0 0 0 1.5px #E2E8F0' : '0 2px 8px rgba(79,70,229,0.3)',
                                            }}>
                                            {p}
                                        </button>
                                    ))}
                                    <button onClick={() => updateParam('page', String(page + 1))} disabled={page === meta.last_page}
                                        style={{ padding: '9px 16px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#475569', background: '#fff', cursor: page === meta.last_page ? 'not-allowed' : 'pointer', opacity: page === meta.last_page ? 0.4 : 1, transition: 'all 150ms' }}>
                                        Next →
                                    </button>
                                </nav>
                            )}
                        </>
                    )}
                </div>

                <style>{`
                    @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
                    @media(max-width:640px){
                        .qh-auth-header-inner{padding:0 16px !important;}
                        .qh-jl-search-form{flex-direction:column !important; gap:10px !important;}
                        .qh-jl-search-form > div:first-child{width:100% !important; min-width:0 !important; flex:none !important;}
                        .qh-jl-search-form > button[type="submit"]{min-height:48px !important; border-radius:8px !important; flex:1 !important;}
                        .qh-jl-search-form > button[type="button"]{min-height:48px !important; border-radius:8px !important; flex:1 !important;}
                        .qh-jl-search-buttons{display:flex !important; gap:10px !important; width:100% !important;}
                        .qh-jl-jobs-grid{grid-template-columns:1fr !important;}
                        .qh-jl-filter-panel{padding:12px 0 0 !important;}
                        .qh-jl-filter-panel .qh-filter-grid{grid-template-columns:1fr 1fr !important;}
                    }
                `}</style>
            </div>
            <Footer />
        </>
    );
}
