import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getJobs } from '../services/api';
import { mockJobs } from '../services/mockData';

// Badge style: white bg, colored border + colored text, pill shape — matching Figma reference
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


const latestMock = mockJobs.slice(8, 16);

export default function LatestJobs() {
    const [jobs, setJobs] = useState(latestMock);
    const navigate = useNavigate();

    useEffect(() => {
        getJobs({})
            .then(res => {
                const data = res.data?.data || res.data || [];
                if (data.length > 8) setJobs(data.slice(8, 16));
            })
            .catch(() => setJobs(latestMock));
    }, []);

    return (
        <section className="bg-[#F1F2F4] py-16 relative overflow-hidden">
            {/* Background decorative lines */}
            <div className="absolute right-0 top-0 w-64 h-full pointer-events-none opacity-30">
                <svg viewBox="0 0 300 500" fill="none" className="w-full h-full">
                    <line x1="50" y1="-20" x2="300" y2="520" stroke="#C3C2E8" strokeWidth="1" />
                    <line x1="120" y1="-20" x2="370" y2="520" stroke="#C3C2E8" strokeWidth="1" />
                </svg>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#25324B]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                        Latest <span className="text-[#26A4FF]">jobs open</span>
                    </h2>
                    <button
                        onClick={() => navigate('/jobs')}
                        className="flex items-center gap-2 text-[#4640DE] font-semibold text-sm hover:gap-3 transition-all"
                    >
                        Show all jobs <ArrowRight size={18} />
                    </button>
                </div>

                {/* Two columns list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobs.map(job => (
                        <button
                            key={job.id}
                            onClick={() => navigate(`/jobs/${job.id}`)}
                            className="w-full text-left bg-white border border-[#D6DDEB] rounded-lg p-5 flex items-center gap-4 hover:shadow-md hover:border-[#4640DE] transition-all"
                        >
                            {/* Company Logo */}
                            <img
                                src={job.company_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company[0])}&background=4640DE&color=fff&size=56&bold=true`}
                                alt={job.company}
                                className="w-14 h-14 rounded-lg object-cover shrink-0"
                                onError={(e) => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company[0])}&background=4640DE&color=fff&size=56&bold=true`;
                                }}
                            />

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-[#25324B] text-base mb-0.5 truncate" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                                    {job.title}
                                </h3>
                                <p className="text-[#7C8493] text-sm mb-2">
                                    {job.company} &bull; {job.location}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${tagColors['Full-Time']}`}>
                                        {job.type || 'Full-Time'}
                                    </span>
                                    {(Array.isArray(job.tags) ? job.tags : [job.category]).map(tag => (
                                        <span
                                            key={tag}
                                            className={`text-xs font-medium px-3 py-1 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}
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
