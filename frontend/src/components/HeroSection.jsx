import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import heroPerson from '../assets/Hero_Person.png';
import underlineLine from '../assets/Lines under the heading.png';
import bgPattern from '../assets/Pattern.png';

const locations = [
    'Florence, Italy',
    'Remote',
    'New York, US',
    'San Francisco, US',
    'London, UK',
    'Berlin, Germany',
    'Paris, France',
];

export default function HeroSection() {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('Florence, Italy');
    const [locOpen, setLocOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/jobs?search=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`);
    };

    const popularTags = ['UI Designer', 'UX Researcher', 'Android', 'Admin'];

    return (
        <section className="qh-hero-section" style={{ background: '#F8F8FD', position: 'relative', overflow: 'hidden', height: 680 }}>

            {/* Background pattern */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <img
                    src={bgPattern}
                    alt=""
                    style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: 'auto', objectFit: 'cover', opacity: 0.6 }}
                />
            </div>

            {/* Main content */}
            <div
                className="qh-hero-inner"
                style={{
                    maxWidth: 1440,
                    margin: '0 auto',
                    padding: '0 124px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    height: '100%',
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                {/* ── Left: Text + Search ── */}
                <div style={{ flex: '0 0 auto', maxWidth: 540, paddingBottom: 72 }}>
                    <h1
                        style={{
                            fontSize: 'clamp(40px, 5vw, 72px)',
                            fontWeight: 600,
                            color: '#25324B',
                            lineHeight: 1.12,
                            marginBottom: 16,
                            fontFamily: "'ClashDisplay', 'Epilogue', sans-serif",
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Discover<br />
                        more than<br />
                        <span style={{ color: '#26A4FF' }}>5000+ Jobs</span>
                    </h1>

                    {/* Underline squiggle stretched to match heading width */}
                    <div style={{ marginBottom: 24, marginTop: -8 }}>
                        <img src={underlineLine} alt="" style={{ width: '100%', maxWidth: 480, objectFit: 'fill', display: 'block' }} />
                    </div>

                    <p style={{
                        color: '#515B6F', fontSize: 16, lineHeight: 1.7,
                        marginBottom: 24, maxWidth: 400,
                        fontFamily: "'Epilogue', sans-serif",
                    }}>
                        Great platform for the job seeker that searching for new career heights and passionate about startups.
                    </p>

                    {/* ─── Search Bar ─── */}
                    <form
                        onSubmit={handleSearch}
                        className="qh-search-bar"
                        style={{
                            background: '#fff',
                            display: 'flex',
                            alignItems: 'stretch',
                            marginBottom: 20,
                            border: '1px solid #D6DDEB',
                            borderRadius: 0,
                            overflow: 'hidden',
                            boxShadow: '0 4px 16px rgba(37,50,75,0.06)',
                        }}
                    >
                        {/* Keyword input */}
                        <div className="qh-search-keyword" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px', flex: 1, minWidth: 0 }}>
                            <Search size={20} color="#9199A3" style={{ flexShrink: 0 }} />
                            <div style={{ flex: 1, borderBottom: '1.5px solid #D6DDEB', paddingTop: 8, paddingBottom: 2 }}>
                                <input
                                    type="text"
                                    placeholder="Job title or keyword"
                                    value={keyword}
                                    onChange={e => setKeyword(e.target.value)}
                                    style={{
                                        border: 'none', outline: 'none', background: 'transparent',
                                        color: '#25324B', fontSize: 14, width: '100%',
                                        padding: '8px 0',
                                        fontFamily: "'Epilogue', sans-serif",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="qh-search-divider" style={{ width: 1, background: '#E8ECF3', alignSelf: 'stretch' }} />

                        {/* Location dropdown */}
                        <div className="qh-search-location" style={{ position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1.5px solid #D6DDEB', paddingTop: 8, paddingBottom: 2 }}>
                                <MapPin size={18} color="#9199A3" />
                                <button
                                    type="button"
                                    onClick={() => setLocOpen(!locOpen)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        background: 'transparent', border: 'none', cursor: 'pointer',
                                        color: '#25324B', fontSize: 14, whiteSpace: 'nowrap',
                                        fontFamily: "'Epilogue', sans-serif",
                                        padding: '8px 0',
                                    }}
                                >
                                    <span>{location}</span>
                                    <ChevronDown size={15} color="#9199A3" style={{ transition: 'transform 150ms', transform: locOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                                </button>
                            </div>
                            {locOpen && (
                                <div style={{
                                    position: 'absolute', top: 'calc(100% + 4px)', left: 0,
                                    background: '#fff', border: '1px solid #D6DDEB',
                                    borderRadius: 0, boxShadow: '0 8px 24px rgba(37,50,75,0.12)',
                                    zIndex: 50, minWidth: 200, padding: '4px 0',
                                }}>
                                    {locations.map(loc => (
                                        <button
                                            key={loc}
                                            type="button"
                                            style={{
                                                width: '100%', textAlign: 'left',
                                                padding: '10px 16px', border: 'none',
                                                background: loc === location ? '#F1F2F4' : 'transparent',
                                                color: loc === location ? '#4640DE' : '#515B6F',
                                                fontSize: 14, cursor: 'pointer',
                                                fontFamily: "'Epilogue', sans-serif",
                                                fontWeight: loc === location ? 700 : 400,
                                            }}
                                            onClick={() => { setLocation(loc); setLocOpen(false); }}
                                        >
                                            {loc}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search button */}
                        <button
                            type="submit"
                            className="qh-search-btn"
                            style={{
                                background: '#4640DE', color: '#fff',
                                border: 'none', cursor: 'pointer',
                                padding: '20px 32px',
                                fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap',
                                fontFamily: "'Epilogue', sans-serif",
                                borderRadius: 0,
                                transition: 'background 150ms',
                                flexShrink: 0,
                                alignSelf: 'stretch',
                                display: 'flex', alignItems: 'center',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#3730c0'}
                            onMouseLeave={e => e.currentTarget.style.background = '#4640DE'}
                        >
                            Search my job
                        </button>
                    </form>

                    {/* Popular tags */}
                    <p style={{ color: '#515B6F', fontSize: 14, fontFamily: "'Epilogue', sans-serif" }}>
                        <span style={{ fontWeight: 600 }}>Popular :</span>{' '}
                        {popularTags.map((tag, i) => (
                            <span key={tag}>
                                <button
                                    onClick={() => navigate(`/jobs?search=${tag}`)}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        color: '#515B6F', fontSize: 14,
                                        fontFamily: "'Epilogue', sans-serif",
                                        padding: 0, transition: 'color 150ms',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#4640DE'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#515B6F'}
                                >
                                    {tag}
                                </button>
                                {i < popularTags.length - 1 && ', '}
                            </span>
                        ))}
                    </p>
                </div>

                {/* ── Right: Hero person image ── */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    paddingRight: 0,
                    marginRight: -40,
                }}>
                    <img
                        src={heroPerson}
                        alt="Professional pointing to QuickHire"
                        style={{
                            height: 'clamp(480px, 55vw, 680px)',
                            width: 'auto',
                            objectFit: 'contain',
                            objectPosition: 'bottom right',
                            display: 'block',
                            marginBottom: 0,
                        }}
                    />
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .qh-hero-inner {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        padding: 48px 24px 0 !important;
                        height: auto !important;
                    }
                    .qh-hero-inner > div:last-child {
                        align-self: center;
                        margin-right: 0 !important;
                    }
                    .qh-hero-inner > div:last-child img {
                        height: 320px !important;
                    }
                }
                @media (max-width: 640px) {
                    .qh-hero-section {
                        height: auto !important;
                    }
                    .qh-hero-inner {
                        padding: 40px 20px 40px !important;
                    }
                    .qh-hero-inner > div:last-child {
                        display: none !important;
                    }
                    .qh-search-bar {
                        flex-direction: column !important;
                        overflow: visible !important;
                    }
                    .qh-search-keyword {
                        border-right: none !important;
                        border-bottom: 1px solid #E8ECF3 !important;
                        padding: 4px 16px !important;
                    }
                    .qh-search-location {
                        border-bottom: 1px solid #E8ECF3 !important;
                        width: 100% !important;
                        padding: 4px 16px !important;
                    }
                    .qh-search-divider {
                        display: none !important;
                    }
                    .qh-search-btn {
                        width: 100% !important;
                        justify-content: center !important;
                        padding: 16px !important;
                    }
                }
            `}</style>
        </section>
    );
}
