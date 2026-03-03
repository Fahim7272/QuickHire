import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { timeAgo } from '../services/mockData';

/**
 * JobCard — UI/UX laws applied:
 * • Fitts's Law: entire card is clickable (large target)
 * • Law of Proximity: related info grouped together
 * • Visual Hierarchy: title > company > description > tags
 * • Von Restorff Effect: type badge stands out with colour
 * • Aesthetic-Usability Effect: clean card = perceived as more trustworthy
 * • Progressive Disclosure: description truncated, full visible on detail page
 * • Doherty Threshold: hover animations < 150ms (instant feedback)
 */

const typeColors = {
    'Full Time': 'bg-[#E8F5E9] text-[#27AE60] border-[#27AE60]/25',
    'Part Time': 'bg-[#FFF3E0] text-[#F57C00] border-[#F57C00]/25',
    'Remote': 'bg-[#E3F2FD] text-[#1976D2] border-[#1976D2]/25',
    'Internship': 'bg-[#F3E5F5] text-[#7B1FA2] border-[#7B1FA2]/25',
    'Contract': 'bg-[#FCE4EC] text-[#C2185B] border-[#C2185B]/25',
};

const tagColors = {
    Marketing: 'bg-[#FFF0EA] text-[#FF6636]',
    Design: 'bg-[#F8F0FF] text-[#9B51E0]',
    Business: 'bg-[#EBFAF4] text-[#1DA462]',
    Technology: 'bg-[#EEF6FF] text-[#4640DE]',
    Engineering: 'bg-[#EEF6FF] text-[#4640DE]',
    Sales: 'bg-[#FFEEEA] text-[#FF574B]',
    Finance: 'bg-[#EBFAF4] text-[#1DA462]',
    'Human Resource': 'bg-[#FFF8E1] text-[#F9A825]',
};

export default function JobCard({ job }) {
    const navigate = useNavigate();
    const typeClass = typeColors[job.type] || typeColors['Full Time'];
    // Collect unique tags: prefer job.tags array; fall back to job.category
    const tags = Array.isArray(job.tags) && job.tags.length
        ? [...new Set(job.tags)]
        : job.category ? [job.category] : [];

    return (
        <button
            onClick={() => navigate(`/jobs/${job.id}`)}
            aria-label={`View ${job.title} at ${job.company}`}
            className="
                group w-full text-left bg-white border border-[#D6DDEB] rounded-xl p-5
                hover:shadow-lg hover:border-[#4640DE]/40 hover:-translate-y-1
                transition-all duration-200 ease-out flex flex-col gap-3
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE]
            "
        >
            {/* Top row: Logo + Type badge — Law of Proximity */}
            <div className="flex items-start justify-between">
                <img
                    src={job.company_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=4640DE&color=fff&size=48&bold=true`}
                    alt={`${job.company} logo`}
                    className="w-12 h-12 rounded-xl object-cover border border-[#F1F2F4]"
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company[0])}&background=4640DE&color=fff&size=48&bold=true`;
                    }}
                />
                {/* Von Restorff Effect: type badge is colour-coded */}
                <span className={`text-xs font-semibold border rounded-full px-3 py-1 ${typeClass}`}>
                    {job.type || 'Full Time'}
                </span>
            </div>

            {/* Title + Company — Visual Hierarchy */}
            <div>
                <h3
                    className="qh-card-title font-semibold text-[#25324B] text-base mb-1 group-hover:text-[#4640DE] transition-colors line-clamp-1"
                >
                    {job.title}
                </h3>
                {/* Law of Proximity: company + location together */}
                <p className="text-[#7C8493] text-sm flex items-center gap-1.5">
                    <span className="font-medium text-[#515B6F]">{job.company}</span>
                    <span className="text-[#D6DDEB]">•</span>
                    <MapPin size={12} className="shrink-0" />
                    <span className="truncate">{job.location}</span>
                </p>
            </div>

            {/* Description — Progressive Disclosure: 2-line clamp */}
            <p className="text-[#515B6F] text-sm leading-relaxed line-clamp-2 flex-1">
                {job.description}
            </p>

            {/* Footer: Tags + Date Posted — Serial Position Effect: date at end */}
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#F1F2F4]">
                <div className="flex flex-wrap gap-1.5">
                    {tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                {/* Recency — Scarcity effect: shows freshness */}
                <span className="text-xs text-[#9199A3] whitespace-nowrap ml-2">
                    {timeAgo(job.created_at)}
                </span>
            </div>
        </button>
    );
}
