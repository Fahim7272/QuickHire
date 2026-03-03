import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getJobs } from '../services/api';
import { mockJobs } from '../services/mockData';
import patternBg from '../assets/Pattern.png';
import bgLatestJobs from '../assets/BG-Latest jobs open.png';

const tagColors = {
    'Full-Time': 'border border-[#56CDAD] text-[#56CDAD] bg-white',
    'Full Time': 'border border-[#56CDAD] text-[#56CDAD] bg-white',
    'Part Time': 'border border-[#FFB836] text-[#FFB836] bg-white',
    'Remote': 'border border-[#26A4FF] text-[#26A4FF] bg-white',
    'Internship': 'border border-[#FF6550] text-[#FF6550] bg-white',
    'Contract': 'border border-[#7C8493] text-[#7C8493] bg-white',
    Marketing: 'border border-[#FFB836] text-[#FFB836] bg-white',
    Design: 'border border-[#4640DE] text-[#4640DE] bg-white',
    Business: 'border border-[#4640DE] text-[#4640DE] bg-white',
    Technology: 'border border-[#FF6550] text-[#FF6550] bg-white',
    Engineering: 'border border-[#56CDAD] text-[#56CDAD] bg-white',
    Finance: 'border border-[#9B51E0] text-[#9B51E0] bg-white',
    Sales: 'border border-[#FF6550] text-[#FF6550] bg-white',
    'Human Resource': 'border border-[#26A4FF] text-[#26A4FF] bg-white',
};

export default function LatestJobs() {
    const [jobs, setJobs] = useState(mockJobs.slice(7, 15));
    const navigate = useNavigate();

    useEffect(() => {
        getJobs({})
            .then(res => {
                const data = res.data?.data || res.data || [];
                if (data.length > 7) setJobs(data.slice(7, 15));
            })
            .catch(() => setJobs(mockJobs.slice(7, 15)));
    }, []);

    return (
        <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 64, paddingBottom: 64 }}>

            {/* Layer 1: solid white base so text is always readable */}
            <div style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 0 }} />

            {/* Layer 2: BG-Latest jobs open.png stretched to cover */}
            <img
                src={bgLatestJobs}
                alt=""
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />

            {/* Layer 3: Pattern.png anchored to the right side */}
            <img
                src={patternBg}
                alt=""
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    height: '100%',
                    width: 'auto',
                    objectFit: 'cover',
                    objectPosition: 'right center',
                    opacity: 0.5,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    zIndex: 2,
                }}
            />

            {/* Layer 4: Content */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] relative" style={{ zIndex: 10 }}>
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#25324B]">
                        Latest <span className="text-[#26A4FF]">jobs open</span>
                    </h2>
                    <button
                        onClick={() => navigate('/jobs')}
                        className="flex items-center gap-2 text-[#4640DE] font-semibold text-sm hover:gap-3 transition-all"
                    >
                        Show all jobs <ArrowRight size={18} />
                    </button>
                </div>

                {/* 2-column grid — no stroke, white bg, subtle shadow on hover */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobs.map(job => (
                        <button
                            key={job.id}
                            onClick={() => navigate(`/jobs/${job.id}`)}
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                background: '#fff',
                                border: 'none',
                                borderRadius: 0,
                                padding: 20,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16,
                                cursor: 'pointer',
                                transition: 'box-shadow 200ms ease',
                                fontFamily: 'inherit',
                            }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(70,64,222,0.12)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                        >
                            <img
                                src={job.company_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company[0])}&background=4640DE&color=fff&size=56&bold=true`}
                                alt={job.company}
                                style={{ width: 56, height: 56, borderRadius: 0, objectFit: 'contain', flexShrink: 0 }}
                                onError={e => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company[0])}&background=4640DE&color=fff&size=56&bold=true`;
                                }}
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="qh-card-title font-semibold text-[#25324B] text-base mb-0.5 truncate">
                                    {job.title}
                                </h3>
                                <p className="text-[#7C8493] text-sm mb-2">
                                    {job.company} &bull; {job.location}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span
                                        className={`text-xs font-semibold px-3 rounded-full border ${tagColors[job.type] || tagColors['Full-Time']}`}
                                        style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1, paddingTop: 4, paddingBottom: 4 }}
                                    >
                                        {job.type || 'Full-Time'}
                                    </span>
                                    {(Array.isArray(job.tags) ? job.tags : [job.category]).map(tag => (
                                        <span
                                            key={tag}
                                            className={`text-xs font-medium px-3 py-1 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}
                                            style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
