import { useNavigate } from 'react-router-dom';

export default function CTABanner() {
    const navigate = useNavigate();

    return (
        <section className="bg-white py-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-[#4640DE] rounded-2xl overflow-hidden flex flex-col md:flex-row items-center relative">
                    {/* Left Text */}
                    <div className="flex-1 p-10 md:p-14 z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                            Start posting <br />jobs today
                        </h2>
                        <p className="text-white/70 text-base mb-8">
                            Start posting jobs for only $10<span className="text-white">.</span>
                        </p>
                        <button
                            onClick={() => navigate('/admin')}
                            className="border-2 border-white text-white font-semibold px-7 py-3 rounded hover:bg-white hover:text-[#4640DE] transition-all text-sm"
                        >
                            Sign Up For Free
                        </button>
                    </div>

                    {/* Right: Dashboard mockup */}
                    <div className="flex-1 flex justify-end items-end relative min-h-48 md:min-h-72">
                        <div className="bg-white rounded-tl-2xl shadow-2xl m-6 p-4 w-full max-w-xs md:max-w-sm">
                            {/* Mock Dashboard UI */}
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-5 h-5 rounded-full bg-[#4640DE] flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                                </div>
                                <span className="text-[10px] font-bold text-[#25324B]">QuickHire</span>
                                <div className="ml-auto flex items-center gap-1">
                                    <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    </div>
                                    <span className="text-[9px] text-gray-400">Nomad</span>
                                </div>
                            </div>

                            <div className="text-[9px] text-gray-500 mb-3">Good morning, Maria</div>

                            {/* Stats row */}
                            <div className="flex gap-2 mb-3">
                                <div className="flex-1 bg-[#4640DE] rounded p-2">
                                    <div className="text-white font-bold text-sm">76</div>
                                    <div className="text-white/70 text-[8px]">New candidates to review</div>
                                </div>
                                <div className="flex-1 bg-green-400 rounded p-2">
                                    <div className="text-white font-bold text-sm">3</div>
                                    <div className="text-white/70 text-[8px]">Schedule for today</div>
                                </div>
                                <div className="flex-1 bg-orange-400 rounded p-2">
                                    <div className="text-white font-bold text-sm">24</div>
                                    <div className="text-white/70 text-[8px]">Messages received</div>
                                </div>
                            </div>

                            {/* Mini chart */}
                            <div className="bg-gray-50 rounded p-2 mb-2">
                                <div className="text-[8px] text-gray-400 mb-1">Job statistics</div>
                                <div className="flex items-end gap-1 h-10">
                                    {[3, 5, 4, 6, 8, 7, 5].map((h, i) => (
                                        <div key={i} className="flex gap-0.5 items-end">
                                            <div className="bg-[#4640DE] w-1.5 rounded-sm" style={{ height: `${h * 4}px` }}></div>
                                            <div className="bg-orange-300 w-1.5 rounded-sm" style={{ height: `${(h - 1) * 4}px` }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div>
                                    <div className="text-[8px] text-gray-400">Job Views</div>
                                    <div className="text-xs font-bold text-[#25324B]">2,342</div>
                                </div>
                                <div>
                                    <div className="text-[8px] text-gray-400">Job Open</div>
                                    <div className="text-xs font-bold text-[#25324B]">12</div>
                                </div>
                                <div>
                                    <div className="text-[8px] text-gray-400">Applicants</div>
                                    <div className="text-xs font-bold text-[#25324B]">67</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
