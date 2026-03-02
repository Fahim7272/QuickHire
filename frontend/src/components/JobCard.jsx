import { useNavigate } from 'react-router-dom';

const tagColors = {
    Marketing: 'bg-[#FFF0EA] text-[#FF6636]',
    Design: 'bg-[#F8F0FF] text-[#9B51E0]',
    Business: 'bg-[#EBFAF4] text-[#1DA462]',
    Technology: 'bg-[#FFF0EA] text-[#FF6636]',
    Engineering: 'bg-[#EEF6FF] text-[#4640DE]',
    Sales: 'bg-[#FFEEEA] text-[#FF574B]',
    Finance: 'bg-[#EBFAF4] text-[#1DA462]',
};

export default function JobCard({ job }) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(`/jobs/${job.id}`)}
            className="w-full text-left bg-white border border-[#D6DDEB] rounded-lg p-5 hover:shadow-md hover:border-[#4640DE] transition-all hover:-translate-y-0.5 flex flex-col gap-3"
        >
            {/* Header: Logo + Badge */}
            <div className="flex items-start justify-between">
                <img
                    src={job.company_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=4640DE&color=fff&size=48&bold=true`}
                    alt={job.company}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company[0])}&background=4640DE&color=fff&size=48&bold=true`;
                    }}
                />
                <span className="text-xs font-semibold text-[#4640DE] border border-[#4640DE]/30 rounded px-2.5 py-1 bg-[#F0F0FF]">
                    {job.type || 'Full Time'}
                </span>
            </div>

            {/* Body */}
            <div>
                <h3 className="font-bold text-[#25324B] text-base mb-0.5" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                    {job.title}
                </h3>
                <p className="text-[#7C8493] text-sm">
                    {job.company} &bull; {job.location}
                </p>
            </div>

            {/* Description */}
            <p className="text-[#515B6F] text-sm leading-relaxed line-clamp-2">
                {job.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
                {(job.tags || job.category ? [job.category] : []).map((tag) => (
                    <span
                        key={tag}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </button>
    );
}
