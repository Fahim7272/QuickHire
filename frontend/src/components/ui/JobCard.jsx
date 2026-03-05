import { useNavigate } from 'react-router-dom';
import { MapPin, Building2 } from 'lucide-react';
import { COMPANY_LOGO_MAP } from '../../services/mockData';

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

const TYPE_COLORS = {
    'Full Time': { bg: '#DCFCE7', text: '#15803D' },
    'Part Time': { bg: '#FEF3C7', text: '#B45309' },
    'Remote': { bg: '#DBEAFE', text: '#1D4ED8' },
    'Internship': { bg: '#F3E8FF', text: '#7C3AED' },
    'Contract': { bg: '#FCE7F3', text: '#9D174D' },
};

export function FeaturedJobCard({ job }) {
    const navigate = useNavigate();
    const catStyle = CATEGORY_COLORS[job.category] || { bg: '#F1F5F9', text: '#475569' };
    const typeStyle = TYPE_COLORS[job.type] || TYPE_COLORS['Full Time'];
    const initials = (job.company || '?').slice(0, 2).toUpperCase();
    const resolvedLogo = COMPANY_LOGO_MAP[job.company] || job.company_logo || null;

    return (
        <button
            onClick={() => navigate(`/jobs/${job.id}`)}
            aria-label={`View ${job.title} at ${job.company}`}
            style={{
                width: '100%', textAlign: 'left', background: '#fff',
                border: '1.5px solid #D6DDEB', borderRadius: 0, padding: 20,
                cursor: 'pointer', transition: 'all 200ms ease',
                display: 'flex', flexDirection: 'column', gap: 12,
                fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,70,229,0.12)';
                e.currentTarget.style.borderColor = '#C7D2FE';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Top row: logo + type badge */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                {resolvedLogo ? (
                    <img
                        src={resolvedLogo}
                        alt={job.company}
                        style={{ width: 44, height: 44, borderRadius: 11, objectFit: 'cover', border: '1.5px solid #F1F5F9' }}
                        onError={e => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <div style={{
                    width: 44, height: 44, borderRadius: 11,
                    background: '#EEF2FF', display: resolvedLogo ? 'none' : 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 800, color: '#4F46E5',
                }}>
                    {initials}
                </div>
                <span style={{
                    fontSize: 11, fontWeight: 700,
                    background: typeStyle.bg, color: typeStyle.text,
                    borderRadius: 9999, padding: '4px 10px',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    lineHeight: 1,
                }}>
                    {job.type || 'Full Time'}
                </span>
            </div>

            {/* Title + company */}
            <div>
                <div className="qh-card-title" style={{ fontSize: 15, fontWeight: 600, color: '#0F172A', marginBottom: 5, lineHeight: 1.3 }}>
                    {job.title}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 12, color: '#94A3B8' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Building2 size={11} />{job.company}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <MapPin size={11} />{job.location}
                    </span>
                </div>
            </div>

            {/* Description */}
            <p style={{
                fontSize: 12, color: '#64748B', lineHeight: 1.7,
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
                margin: 0, flex: 1,
            }}>
                {job.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <span style={{
                    fontSize: 11, fontWeight: 700,
                    background: catStyle.bg, color: catStyle.text,
                    borderRadius: 9999, padding: '4px 10px',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    lineHeight: 1,
                }}>
                    {job.category}
                </span>
                {Array.isArray(job.tags) && job.tags.filter(t => t !== job.category).slice(0, 1).map(tag => {
                    const ts = CATEGORY_COLORS[tag] || { bg: '#F1F5F9', text: '#475569' };
                    return (
                        <span key={tag} style={{ fontSize: 11, fontWeight: 700, background: ts.bg, color: ts.text, borderRadius: 9999, padding: '4px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                            {tag}
                        </span>
                    );
                })}
            </div>
        </button>
    );
}

export default FeaturedJobCard;
