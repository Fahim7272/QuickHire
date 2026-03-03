import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, ChevronDown, X, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import { getJobs } from '../services/api';
import { mockJobs } from '../services/mockData';

const categories = ['All', 'Design', 'Sales', 'Marketing', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resource'];
const locations = ['All Locations', 'Remote', 'New York, US', 'San Francisco, US', 'London, UK', 'Berlin, Germany', 'Paris, France', 'Madrid, Spain'];

export default function JobListings() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [location, setLocation] = useState(searchParams.get('location') || 'All Locations');
    const [locOpen, setLocOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        getJobs({ search: keyword, category: category === 'All' ? '' : category, location: location === 'All Locations' ? '' : location })
            .then(res => {
                const data = res.data?.data || res.data || [];
                setJobs(data.length ? data : filterMock());
            })
            .catch(() => setJobs(filterMock()))
            .finally(() => setLoading(false));
    }, [keyword, category, location]);

    const filterMock = () => {
        return mockJobs.filter(j => {
            const matchKeyword = !keyword || j.title.toLowerCase().includes(keyword.toLowerCase()) || j.company.toLowerCase().includes(keyword.toLowerCase());
            const matchCat = category === 'All' || j.category === category;
            const matchLoc = location === 'All Locations' || j.location.toLowerCase().includes(location.split(',')[0].toLowerCase());
            return matchKeyword && matchCat && matchLoc;
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ search: keyword, category, location });
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#F1F2F4]">
                {/* Page Header */}
                <div className="bg-white border-b border-[#D6DDEB] py-10">
                    <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px]">
                        <h1 className="text-3xl font-extrabold text-[#25324B] mb-2" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                            Find your <span className="text-[#26A4FF]">dream job</span>
                        </h1>
                        <p className="text-[#515B6F] text-sm mb-6">
                            {jobs.length} jobs available for you
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-sm flex flex-col sm:flex-row items-stretch border border-[#D6DDEB] overflow-hidden">
                            <div className="flex items-center gap-3 px-4 py-3 flex-1">
                                <Search size={18} className="text-[#9199A3] shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Job title or keyword"
                                    value={keyword}
                                    onChange={e => setKeyword(e.target.value)}
                                    className="outline-none bg-transparent text-[#515B6F] text-sm w-full placeholder-[#9199A3]"
                                />
                                {keyword && (
                                    <button type="button" onClick={() => setKeyword('')}>
                                        <X size={16} className="text-[#9199A3]" />
                                    </button>
                                )}
                            </div>
                            <div className="hidden sm:block w-px h-10 bg-[#D6DDEB] self-center"></div>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setLocOpen(!locOpen)}
                                    className="flex items-center gap-2 px-4 py-3 text-[#515B6F] text-sm whitespace-nowrap w-full sm:w-auto"
                                >
                                    <MapPin size={16} className="text-[#9199A3]" />
                                    <span>{location}</span>
                                    <ChevronDown size={14} className="text-[#9199A3]" />
                                </button>
                                {locOpen && (
                                    <div className="absolute top-full left-0 bg-white border border-[#D6DDEB] rounded-lg shadow-lg z-50 min-w-48 py-1">
                                        {locations.map(loc => (
                                            <button
                                                key={loc}
                                                type="button"
                                                className="w-full text-left px-4 py-2 text-sm text-[#515B6F] hover:bg-[#F1F2F4]"
                                                onClick={() => { setLocation(loc); setLocOpen(false); }}
                                            >
                                                {loc}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button type="submit" className="bg-[#4640DE] hover:bg-[#3730c0] text-white font-semibold text-sm px-6 py-3 transition-colors whitespace-nowrap">
                                Search Jobs
                            </button>
                        </form>
                    </div>
                </div>

                <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] py-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Sidebar Filters */}
                        <aside className="md:w-60 shrink-0">
                            <div className="bg-white rounded-lg border border-[#D6DDEB] p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <Filter size={16} className="text-[#4640DE]" />
                                    <h3 className="font-bold text-[#25324B] text-sm">Category</h3>
                                </div>
                                <div className="flex flex-col gap-1">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setCategory(cat)}
                                            className={`text-left px-3 py-2 rounded text-sm font-medium transition-colors ${category === cat
                                                ? 'bg-[#4640DE] text-white'
                                                : 'text-[#515B6F] hover:bg-[#F1F2F4]'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Job Grid */}
                        <div className="flex-1">
                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="bg-white border border-[#D6DDEB] rounded-lg p-5 animate-pulse">
                                            <div className="flex justify-between mb-4">
                                                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                                                <div className="w-20 h-6 bg-gray-200 rounded"></div>
                                            </div>
                                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-3 bg-gray-100 rounded mb-4 w-2/3"></div>
                                            <div className="h-3 bg-gray-100 rounded mb-1"></div>
                                            <div className="h-3 bg-gray-100 rounded w-4/5"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : jobs.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-[#515B6F] text-lg font-medium">No jobs found</p>
                                    <p className="text-[#9199A3] text-sm mt-2">Try adjusting your search filters</p>
                                    <button
                                        onClick={() => { setKeyword(''); setCategory('All'); setLocation('All Locations'); }}
                                        className="mt-4 text-[#4640DE] font-semibold text-sm hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p className="text-[#7C8493] text-sm mb-4">Showing <strong className="text-[#25324B]">{jobs.length}</strong> results</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {jobs.map(job => (
                                            <JobCard key={job.id} job={job} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
