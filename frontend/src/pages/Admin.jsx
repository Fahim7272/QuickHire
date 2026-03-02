import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, AlertCircle, Briefcase, LogOut } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getJobs, createJob, deleteJob } from '../services/api';
import { mockJobs } from '../services/mockData';

const CATEGORIES = ['Design', 'Sales', 'Marketing', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resource'];
const JOB_TYPES = ['Full Time', 'Part Time', 'Internship', 'Contract', 'Remote'];

const emptyForm = { title: '', company: '', company_logo: '', location: '', category: '', description: '', type: 'Full Time' };

export default function Admin() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await getJobs();
            const data = res.data?.data || res.data || [];
            setJobs(data.length ? data : mockJobs);
        } catch {
            setJobs(mockJobs);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchJobs(); }, []);

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Required';
        if (!form.company.trim()) e.company = 'Required';
        if (!form.location.trim()) e.location = 'Required';
        if (!form.category) e.category = 'Required';
        if (!form.description.trim()) e.description = 'Required';
        return e;
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSubmitting(true);
        try {
            await createJob(form);
            showToast('Job listing created successfully!');
            setForm(emptyForm);
            setShowForm(false);
            await fetchJobs();
        } catch {
            // Demo mode: add to local state
            const newJob = {
                ...form,
                id: Date.now(),
                created_at: new Date().toISOString(),
                tags: [form.category],
                company_logo: form.company_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.company[0])}&background=4640DE&color=fff&size=48&bold=true`,
            };
            setJobs(j => [newJob, ...j]);
            showToast('Job created (demo mode)!');
            setForm(emptyForm);
            setShowForm(false);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteJob(id);
            showToast('Job deleted.');
        } catch {
            // Demo mode
            showToast('Job removed (demo mode).');
        }
        setJobs(j => j.filter(job => job.id !== id));
        setConfirmDelete(null);
    };

    const handleChange = (field, val) => {
        setForm(f => ({ ...f, [field]: val }));
        if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#F1F2F4]">
                {/* Toast */}
                {toast && (
                    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                        {toast.msg}
                    </div>
                )}

                {/* Confirm Delete Modal */}
                {confirmDelete && (
                    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
                            <h3 className="font-bold text-[#25324B] text-lg mb-2">Delete Job?</h3>
                            <p className="text-[#515B6F] text-sm mb-6">
                                Are you sure you want to delete <strong>"{confirmDelete.title}"</strong>? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setConfirmDelete(null)} className="flex-1 border border-[#D6DDEB] text-[#515B6F] font-semibold py-2 rounded hover:bg-[#F1F2F4] text-sm transition-colors">
                                    Cancel
                                </button>
                                <button onClick={() => handleDelete(confirmDelete.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded text-sm transition-colors">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Admin Header */}
                <div className="bg-white border-b border-[#D6DDEB]">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-extrabold text-[#25324B]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                                Admin Dashboard
                            </h1>
                            <p className="text-[#7C8493] text-sm">Manage job listings</p>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="flex items-center gap-2 bg-[#4640DE] hover:bg-[#3730c0] text-white font-semibold px-5 py-2.5 rounded transition-colors text-sm"
                        >
                            <Plus size={18} />
                            Post a Job
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'Total Jobs', value: jobs.length, color: 'text-[#4640DE]' },
                            { label: 'Full Time', value: jobs.filter(j => j.type === 'Full Time' || j.type === 'Full-Time').length, color: 'text-green-600' },
                            { label: 'Part Time', value: jobs.filter(j => j.type === 'Part Time').length, color: 'text-orange-500' },
                            { label: 'Remote', value: jobs.filter(j => j.type === 'Remote' || j.location?.toLowerCase().includes('remote')).length, color: 'text-blue-500' },
                        ].map(s => (
                            <div key={s.label} className="bg-white border border-[#D6DDEB] rounded-xl p-5">
                                <div className={`text-3xl font-extrabold ${s.color} mb-1`}>{s.value}</div>
                                <div className="text-[#7C8493] text-sm">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Create Job Form */}
                    {showForm && (
                        <div className="bg-white border border-[#D6DDEB] rounded-xl p-8 mb-8">
                            <h2 className="text-lg font-bold text-[#25324B] mb-6" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                                + Post New Job
                            </h2>
                            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-semibold text-[#515B6F] mb-1.5">Job Title *</label>
                                    <input type="text" placeholder="e.g. Brand Designer" value={form.title} onChange={e => handleChange('title', e.target.value)}
                                        className={`w-full border rounded px-3 py-2.5 text-sm outline-none focus:border-[#4640DE] ${errors.title ? 'border-red-400' : 'border-[#D6DDEB]'}`} />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#515B6F] mb-1.5">Company *</label>
                                    <input type="text" placeholder="e.g. Dropbox" value={form.company} onChange={e => handleChange('company', e.target.value)}
                                        className={`w-full border rounded px-3 py-2.5 text-sm outline-none focus:border-[#4640DE] ${errors.company ? 'border-red-400' : 'border-[#D6DDEB]'}`} />
                                    {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#515B6F] mb-1.5">Location *</label>
                                    <input type="text" placeholder="e.g. San Francisco, US" value={form.location} onChange={e => handleChange('location', e.target.value)}
                                        className={`w-full border rounded px-3 py-2.5 text-sm outline-none focus:border-[#4640DE] ${errors.location ? 'border-red-400' : 'border-[#D6DDEB]'}`} />
                                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#515B6F] mb-1.5">Category *</label>
                                    <select value={form.category} onChange={e => handleChange('category', e.target.value)}
                                        className={`w-full border rounded px-3 py-2.5 text-sm outline-none focus:border-[#4640DE] ${errors.category ? 'border-red-400' : 'border-[#D6DDEB]'}`}>
                                        <option value="">Select category</option>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#515B6F] mb-1.5">Job Type</label>
                                    <select value={form.type} onChange={e => handleChange('type', e.target.value)}
                                        className="w-full border border-[#D6DDEB] rounded px-3 py-2.5 text-sm outline-none focus:border-[#4640DE]">
                                        {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#515B6F] mb-1.5">Company Logo URL</label>
                                    <input type="url" placeholder="https://..." value={form.company_logo} onChange={e => handleChange('company_logo', e.target.value)}
                                        className="w-full border border-[#D6DDEB] rounded px-3 py-2.5 text-sm outline-none focus:border-[#4640DE]" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-[#515B6F] mb-1.5">Description *</label>
                                    <textarea placeholder="Describe the role, requirements, and responsibilities..." value={form.description} onChange={e => handleChange('description', e.target.value)}
                                        rows={4} className={`w-full border rounded px-3 py-2.5 text-sm outline-none focus:border-[#4640DE] resize-none ${errors.description ? 'border-red-400' : 'border-[#D6DDEB]'}`} />
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>
                                <div className="md:col-span-2 flex gap-3">
                                    <button type="submit" disabled={submitting}
                                        className="bg-[#4640DE] hover:bg-[#3730c0] text-white font-semibold px-8 py-2.5 rounded text-sm transition-colors disabled:opacity-60">
                                        {submitting ? 'Posting...' : 'Post Job'}
                                    </button>
                                    <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm); setErrors({}); }}
                                        className="border border-[#D6DDEB] text-[#515B6F] font-semibold px-6 py-2.5 rounded text-sm hover:bg-[#F1F2F4] transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Jobs Table */}
                    <div className="bg-white border border-[#D6DDEB] rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-[#D6DDEB] flex items-center justify-between">
                            <h2 className="font-bold text-[#25324B]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                                All Job Listings
                            </h2>
                            <span className="text-[#7C8493] text-sm">{jobs.length} listings</span>
                        </div>
                        {loading ? (
                            <div className="p-8 text-center text-[#7C8493]">Loading...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-[#F8F8FD] text-left">
                                            <th className="px-6 py-3.5 text-xs font-semibold text-[#7C8493] uppercase tracking-wide">Job</th>
                                            <th className="px-4 py-3.5 text-xs font-semibold text-[#7C8493] uppercase tracking-wide">Company</th>
                                            <th className="px-4 py-3.5 text-xs font-semibold text-[#7C8493] uppercase tracking-wide">Location</th>
                                            <th className="px-4 py-3.5 text-xs font-semibold text-[#7C8493] uppercase tracking-wide">Category</th>
                                            <th className="px-4 py-3.5 text-xs font-semibold text-[#7C8493] uppercase tracking-wide">Type</th>
                                            <th className="px-4 py-3.5 text-xs font-semibold text-[#7C8493] uppercase tracking-wide">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#F1F2F4]">
                                        {jobs.map(job => (
                                            <tr key={job.id} className="hover:bg-[#FAFAFF] transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={job.company_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company[0])}&background=4640DE&color=fff&size=40&bold=true`}
                                                            alt={job.company}
                                                            className="w-10 h-10 rounded-lg object-cover"
                                                            onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company[0])}&background=4640DE&color=fff&size=40&bold=true`; }}
                                                        />
                                                        <span className="font-semibold text-[#25324B] text-sm">{job.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-[#515B6F] text-sm">{job.company}</td>
                                                <td className="px-4 py-4 text-[#515B6F] text-sm">{job.location}</td>
                                                <td className="px-4 py-4">
                                                    <span className="text-xs font-medium bg-[#F0F0FF] text-[#4640DE] px-2.5 py-1 rounded">{job.category}</span>
                                                </td>
                                                <td className="px-4 py-4 text-[#515B6F] text-sm">{job.type || 'Full Time'}</td>
                                                <td className="px-4 py-4">
                                                    <button
                                                        onClick={() => setConfirmDelete(job)}
                                                        className="flex items-center gap-1.5 text-red-500 hover:text-red-700 text-xs font-semibold transition-colors"
                                                    >
                                                        <Trash2 size={14} /> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
