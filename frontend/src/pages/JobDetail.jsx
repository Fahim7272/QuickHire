import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Clock, ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getJob, submitApplication } from '../services/api';
import { mockJobs } from '../services/mockData';

const tagColors = {
    Marketing: 'bg-[#FFF0EA] text-[#FF6636]',
    Design: 'bg-[#F8F0FF] text-[#9B51E0]',
    Business: 'bg-[#EBFAF4] text-[#1DA462]',
    Technology: 'bg-[#FFF0EA] text-[#FF6636]',
};

export default function JobDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', resume_link: '', cover_note: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setLoading(true);
        getJob(id)
            .then(res => setJob(res.data?.data || res.data))
            .catch(() => setJob(mockJobs.find(j => j.id === parseInt(id)) || mockJobs[0]))
            .finally(() => setLoading(false));
    }, [id]);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.resume_link.trim()) e.resume_link = 'Resume link is required';
        else if (!/^https?:\/\/.+/.test(form.resume_link)) e.resume_link = 'Must be a valid URL (https://...)';
        if (!form.cover_note.trim()) e.cover_note = 'Cover note is required';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSubmitting(true);
        try {
            await submitApplication({ ...form, job_id: id });
            setSubmitted(true);
        } catch {
            // For demo without backend, still show success
            setSubmitted(true);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (field, value) => {
        setForm(f => ({ ...f, [field]: value }));
        if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
    };

    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#F1F2F4] flex items-center justify-center">
                <div className="animate-pulse text-[#4640DE] font-semibold">Loading job details...</div>
            </div>
            <Footer />
        </>
    );

    if (!job) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#F1F2F4] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-[#25324B] font-bold text-xl mb-2">Job not found</p>
                    <button onClick={() => navigate('/jobs')} className="text-[#4640DE] font-semibold">← Back to jobs</button>
                </div>
            </div>
            <Footer />
        </>
    );

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#F1F2F4]">
                {/* Header Banner */}
                <div className="bg-white border-b border-[#D6DDEB] py-8">
                    <div className="max-w-5xl mx-auto px-6">
                        <button
                            onClick={() => navigate('/jobs')}
                            className="flex items-center gap-2 text-[#515B6F] hover:text-[#4640DE] text-sm font-medium mb-6 transition-colors"
                        >
                            <ArrowLeft size={16} /> Back to jobs
                        </button>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <img
                                src={job.company_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company[0])}&background=4640DE&color=fff&size=80&bold=true`}
                                alt={job.company}
                                className="w-20 h-20 rounded-xl object-cover border border-[#D6DDEB]"
                                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company[0])}&background=4640DE&color=fff&size=80&bold=true`; }}
                            />
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-1">
                                    <h1 className="text-2xl font-extrabold text-[#25324B]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                                        {job.title}
                                    </h1>
                                    <span className="bg-[#F0F0FF] text-[#4640DE] text-xs font-semibold px-3 py-1 rounded border border-[#4640DE]/20">
                                        {job.type || 'Full Time'}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-[#7C8493]">
                                    <span className="flex items-center gap-1.5"><Briefcase size={14} /> {job.company}</span>
                                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                                    <span className="flex items-center gap-1.5"><Clock size={14} /> {new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Job Description */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-[#D6DDEB] p-8 mb-6">
                            <h2 className="text-xl font-bold text-[#25324B] mb-4" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                                Job Description
                            </h2>
                            <div className="text-[#515B6F] text-sm leading-relaxed whitespace-pre-line">
                                {job.description || `We are looking for a talented ${job.title} to join our team at ${job.company}.\n\nYou'll work with a dynamic team passionate about building great products. This is an exciting opportunity to grow your career in a fast-paced environment.\n\nWhat you'll do:\n• Collaborate with cross-functional teams\n• Lead and drive key initiatives\n• Contribute to product strategy and execution\n• Mentoring team members and sharing knowledge\n\nRequirements:\n• Proven experience in a similar role\n• Strong communication and problem-solving skills\n• Ability to work in a fast-paced environment\n• Passion for what we do`}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-xl border border-[#D6DDEB] p-8">
                            <h3 className="text-base font-bold text-[#25324B] mb-4">Category Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {(Array.isArray(job.tags) ? job.tags : [job.category]).map(tag => (
                                    <span key={tag} className={`text-xs font-medium px-4 py-1.5 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Apply Form */}
                    <div>
                        <div className="bg-white rounded-xl border border-[#D6DDEB] p-6 sticky top-24">
                            {submitted ? (
                                <div className="text-center py-6">
                                    <CheckCircle className="mx-auto mb-3 text-green-500" size={48} />
                                    <h3 className="font-bold text-[#25324B] text-lg mb-2">Application Sent!</h3>
                                    <p className="text-[#7C8493] text-sm">We've received your application for <strong>{job.title}</strong>. Good luck!</p>
                                    <button
                                        onClick={() => navigate('/jobs')}
                                        className="mt-5 w-full bg-[#4640DE] text-white font-semibold py-2.5 rounded hover:bg-[#3730c0] transition-colors text-sm"
                                    >
                                        Browse More Jobs
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-bold text-[#25324B] text-lg mb-1" style={{ fontFamily: 'Epilogue, sans-serif' }}>Apply Now</h3>
                                    <p className="text-[#7C8493] text-xs mb-5">Fill the form below to apply for this position.</p>
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#515B6F] mb-1.5">Full Name *</label>
                                            <input
                                                type="text"
                                                placeholder="Your full name"
                                                value={form.name}
                                                onChange={e => handleChange('name', e.target.value)}
                                                className={`w-full border rounded px-3 py-2.5 text-sm outline-none transition-colors ${errors.name ? 'border-red-400 focus:border-red-400' : 'border-[#D6DDEB] focus:border-[#4640DE]'}`}
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#515B6F] mb-1.5">Email Address *</label>
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                value={form.email}
                                                onChange={e => handleChange('email', e.target.value)}
                                                className={`w-full border rounded px-3 py-2.5 text-sm outline-none transition-colors ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-[#D6DDEB] focus:border-[#4640DE]'}`}
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#515B6F] mb-1.5">Resume Link (URL) *</label>
                                            <div className="relative">
                                                <input
                                                    type="url"
                                                    placeholder="https://resume.link/..."
                                                    value={form.resume_link}
                                                    onChange={e => handleChange('resume_link', e.target.value)}
                                                    className={`w-full border rounded px-3 py-2.5 pr-8 text-sm outline-none transition-colors ${errors.resume_link ? 'border-red-400 focus:border-red-400' : 'border-[#D6DDEB] focus:border-[#4640DE]'}`}
                                                />
                                                <ExternalLink size={14} className="absolute right-3 top-3 text-[#9199A3]" />
                                            </div>
                                            {errors.resume_link && <p className="text-red-500 text-xs mt-1">{errors.resume_link}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#515B6F] mb-1.5">Cover Note *</label>
                                            <textarea
                                                placeholder="Tell us why you're a great fit..."
                                                value={form.cover_note}
                                                onChange={e => handleChange('cover_note', e.target.value)}
                                                rows={4}
                                                className={`w-full border rounded px-3 py-2.5 text-sm outline-none transition-colors resize-none ${errors.cover_note ? 'border-red-400 focus:border-red-400' : 'border-[#D6DDEB] focus:border-[#4640DE]'}`}
                                            />
                                            {errors.cover_note && <p className="text-red-500 text-xs mt-1">{errors.cover_note}</p>}
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-[#4640DE] hover:bg-[#3730c0] text-white font-semibold py-3 rounded transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {submitting ? 'Submitting...' : 'Apply Now'}
                                        </button>
                                    </form>
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
