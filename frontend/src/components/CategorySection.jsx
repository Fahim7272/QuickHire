import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
    {
        name: 'Design',
        count: 235,
        icon: (
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                <line x1="15" y1="5" x2="19" y2="9" />
            </svg>
        ),
    },
    {
        name: 'Sales',
        count: 756,
        icon: (
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10" />
                <line x1="18" y1="20" x2="18" y2="4" />
                <line x1="6" y1="20" x2="6" y2="16" />
                <circle cx="12" cy="7" r="2" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        name: 'Marketing',
        count: 140,
        icon: (
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 8.01c0-1.1-.9-2-2-2h-1V4a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h2v2a2 2 0 002 2h10a2 2 0 002-2V10a2 2 0 00-2-2h-1V8h3a2 2 0 002-2v.01z" />
                <polyline points="11 8 10 16 16 12 10 8" />
            </svg>
        ),
    },
    {
        name: 'Finance',
        count: 325,
        icon: (
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
    },
    {
        name: 'Technology',
        count: 436,
        icon: (
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
    },
    {
        name: 'Engineering',
        count: 542,
        icon: (
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        name: 'Business',
        count: 211,
        icon: (
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
            </svg>
        ),
    },
    {
        name: 'Human Resource',
        count: 346,
        icon: (
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
    },
];

export default function CategorySection() {
    const navigate = useNavigate();

    return (
        <section className="bg-white py-16">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px]">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#25324B]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                        Explore by{' '}
                        <span className="text-[#26A4FF]">category</span>
                    </h2>
                    <button
                        onClick={() => navigate('/jobs')}
                        className="flex items-center gap-2 text-[#4640DE] font-semibold text-sm hover:gap-3 transition-all"
                    >
                        Show all jobs <ArrowRight size={18} />
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((cat, idx) => {
                        const isActive = idx === 2; // Marketing is highlighted
                        return (
                            <button
                                key={cat.name}
                                onClick={() => navigate(`/jobs?category=${cat.name}`)}
                                className={`p-6 rounded-lg border text-left transition-all hover:shadow-md hover:-translate-y-0.5 ${isActive
                                    ? 'bg-[#4640DE] text-white border-[#4640DE]'
                                    : 'bg-white text-[#25324B] border-[#D6DDEB] hover:border-[#4640DE]'
                                    }`}
                            >
                                <div className={`mb-4 ${isActive ? 'text-white' : 'text-[#4640DE]'}`}>
                                    {cat.icon}
                                </div>
                                <h3 className={`font-bold text-base mb-1 ${isActive ? 'text-white' : 'text-[#25324B]'}`}>
                                    {cat.name}
                                </h3>
                                <div className={`flex items-center gap-2 text-sm ${isActive ? 'text-white/80' : 'text-[#7C8493]'}`}>
                                    <span>{cat.count} jobs available</span>
                                    <ArrowRight size={14} />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
