import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 no-underline">
                    <div className="w-8 h-8 rounded-full bg-[#4640DE] flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white opacity-90"></div>
                    </div>
                    <span className="text-xl font-bold text-[#25324B]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                        QuickHire
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/jobs" className="text-[#515B6F] hover:text-[#4640DE] font-medium text-sm transition-colors">
                        Find Jobs
                    </Link>
                    <Link to="/companies" className="text-[#515B6F] hover:text-[#4640DE] font-medium text-sm transition-colors">
                        Browse Companies
                    </Link>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin')}
                        className="text-[#4640DE] font-semibold text-sm hover:text-[#3730c0] transition-colors"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/admin')}
                        className="bg-[#4640DE] text-white font-semibold text-sm px-5 py-2.5 rounded hover:bg-[#3730c0] transition-colors"
                    >
                        Sign Up
                    </button>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-[#25324B]"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
                    <Link to="/jobs" className="text-[#515B6F] font-medium text-sm" onClick={() => setMenuOpen(false)}>Find Jobs</Link>
                    <Link to="/companies" className="text-[#515B6F] font-medium text-sm" onClick={() => setMenuOpen(false)}>Browse Companies</Link>
                    <div className="flex gap-4 pt-2">
                        <button
                            onClick={() => { navigate('/admin'); setMenuOpen(false); }}
                            className="text-[#4640DE] font-semibold text-sm"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => { navigate('/admin'); setMenuOpen(false); }}
                            className="bg-[#4640DE] text-white font-semibold text-sm px-5 py-2 rounded"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
