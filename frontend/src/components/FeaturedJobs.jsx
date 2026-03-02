import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import JobCard from './JobCard';
import { getJobs } from '../services/api';
import { mockJobs } from '../services/mockData';

const featuredMock = mockJobs.slice(0, 8).map(job => ({
    ...job,
    tags: job.tags || [job.category],
}));

export default function FeaturedJobs() {
    const [jobs, setJobs] = useState(featuredMock);
    const navigate = useNavigate();

    useEffect(() => {
        getJobs({})
            .then(res => {
                if (res.data?.data?.length) setJobs(res.data.data.slice(0, 8));
                else if (res.data?.length) setJobs(res.data.slice(0, 8));
            })
            .catch(() => setJobs(featuredMock));
    }, []);

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#25324B]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                        Featured <span className="text-[#26A4FF]">jobs</span>
                    </h2>
                    <button
                        onClick={() => navigate('/jobs')}
                        className="flex items-center gap-2 text-[#4640DE] font-semibold text-sm hover:gap-3 transition-all"
                    >
                        Show all jobs <ArrowRight size={18} />
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {jobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </div>
        </section>
    );
}
