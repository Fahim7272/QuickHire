import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown } from 'lucide-react';

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
        <section className="bg-[#F1F2F4] relative overflow-hidden">
            {/* Background decorative lines */}
            <div className="absolute inset-0 pointer-events-none">
                <svg className="absolute right-0 top-0 w-2/3 h-full opacity-30" viewBox="0 0 600 400" fill="none">
                    <line x1="200" y1="-50" x2="650" y2="450" stroke="#C3C2E8" strokeWidth="1" />
                    <line x1="280" y1="-50" x2="730" y2="450" stroke="#C3C2E8" strokeWidth="1" />
                    <line x1="360" y1="-50" x2="810" y2="450" stroke="#C3C2E8" strokeWidth="1" />
                    <rect x="330" y="30" width="90" height="90" stroke="#C3C2E8" strokeWidth="1.5" fill="none" />
                    <rect x="450" y="60" width="100" height="100" stroke="#C3C2E8" strokeWidth="1.5" fill="none" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8 relative z-10">
                {/* Left Content */}
                <div className="flex-1 max-w-xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#25324B] leading-tight mb-4" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                        Discover <br />
                        more than <br />
                        <span className="text-[#26A4FF]">5000+ Jobs</span>
                    </h1>

                    {/* Blue underline */}
                    <div className="mb-6">
                        <svg width="220" height="12" viewBox="0 0 220 12" fill="none">
                            <path d="M2 8 C40 2, 80 12, 120 6 C160 0, 200 8, 218 6" stroke="#26A4FF" strokeWidth="3" strokeLinecap="round" fill="none" />
                        </svg>
                    </div>

                    <p className="text-[#515B6F] text-base leading-relaxed mb-8 max-w-sm">
                        Great platform for the job seeker that searching for new career heights and passionate about startups.
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-0 mb-4 overflow-hidden border border-gray-100">
                        {/* Keyword Input */}
                        <div className="flex items-center gap-3 px-4 py-4 flex-1 min-w-0">
                            <Search size={20} className="text-[#9199A3] shrink-0" />
                            <input
                                type="text"
                                placeholder="Job title or keyword"
                                value={keyword}
                                onChange={e => setKeyword(e.target.value)}
                                className="outline-none border-none bg-transparent text-[#515B6F] text-sm w-full placeholder-[#9199A3]"
                            />
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-px h-10 bg-[#D6DDEB] self-center"></div>

                        {/* Location Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setLocOpen(!locOpen)}
                                className="flex items-center gap-2 px-4 py-4 text-[#515B6F] text-sm whitespace-nowrap w-full sm:w-auto"
                            >
                                <MapPin size={18} className="text-[#9199A3]" />
                                <span>{location}</span>
                                <ChevronDown size={16} className="text-[#9199A3]" />
                            </button>
                            {locOpen && (
                                <div className="absolute top-full left-0 bg-white border border-[#D6DDEB] rounded-lg shadow-lg z-50 min-w-48 py-1">
                                    {locations.map(loc => (
                                        <button
                                            key={loc}
                                            type="button"
                                            className="w-full text-left px-4 py-2.5 text-sm text-[#515B6F] hover:bg-[#F1F2F4] transition-colors"
                                            onClick={() => { setLocation(loc); setLocOpen(false); }}
                                        >
                                            {loc}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="bg-[#4640DE] hover:bg-[#3730c0] text-white font-semibold text-sm px-6 py-4 transition-colors whitespace-nowrap"
                        >
                            Search my job
                        </button>
                    </form>

                    {/* Popular tags */}
                    <p className="text-[#515B6F] text-sm">
                        <span className="font-semibold">Popular :</span>{' '}
                        {popularTags.map((tag, i) => (
                            <span key={tag}>
                                <button
                                    onClick={() => navigate(`/jobs?search=${tag}`)}
                                    className="text-[#515B6F] hover:text-[#4640DE] transition-colors"
                                >
                                    {tag}
                                </button>
                                {i < popularTags.length - 1 && ', '}
                            </span>
                        ))}
                    </p>
                </div>

                {/* Right: Hero Person Image */}
                <div className="flex-1 flex justify-center items-end relative">
                    <div className="relative w-72 md:w-80 lg:w-96">
                        <img
                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=80"
                            alt="Professional smiling"
                            className="w-full object-cover object-top rounded-b-none"
                            style={{ maxHeight: '480px', objectPosition: 'top center' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
