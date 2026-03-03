import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Globe, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        setEmail('');
        alert('Thank you for subscribing!');
    };

    return (
        <footer className="bg-[#202430] text-white">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] py-16">
                {/* Mobile: brand full width, then 2-col links row, then newsletter */}
                <div className="qh-footer-grid grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand column */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-[#4640DE] flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-white opacity-90"></div>
                            </div>
                            <span className="text-xl font-bold text-white" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                                QuickHire
                            </span>
                        </div>
                        <p className="text-[#9E9E9E] text-sm leading-relaxed">
                            Great platform for the job seeker that passionate about startups. Find your dream job easier.
                        </p>
                    </div>

                    {/* About + Resources — on mobile these sit side by side via qh-footer-links wrapper */}
                    <div className="qh-footer-links md:contents">
                        {/* About */}
                        <div>
                            <h4 className="font-semibold text-white text-base mb-5">About</h4>
                            <ul className="flex flex-col gap-3">
                                {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map(item => (
                                    <li key={item}>
                                        <Link to="#" className="text-[#9E9E9E] text-sm hover:text-white transition-colors no-underline">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="font-semibold text-white text-base mb-5">Resources</h4>
                            <ul className="flex flex-col gap-3">
                                {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map(item => (
                                    <li key={item}>
                                        <Link to="#" className="text-[#9E9E9E] text-sm hover:text-white transition-colors no-underline">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="qh-footer-newsletter">
                        <h4 className="font-semibold text-white text-base mb-3">Get job notifications</h4>
                        <p className="text-[#9E9E9E] text-sm mb-5 leading-relaxed">
                            The latest job news, articles, sent to your inbox weekly.
                        </p>
                        <form onSubmit={handleSubscribe} style={{ display: 'flex', alignItems: 'stretch' }}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                style={{
                                    flex: 1,
                                    background: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: 0,
                                    padding: '12px 16px',
                                    fontSize: 14,
                                    color: '#25324B',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    background: '#4640DE',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 0,
                                    padding: '12px 20px',
                                    fontSize: 14,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    fontFamily: 'inherit',
                                    transition: 'background 150ms',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#3730c0'}
                                onMouseLeave={e => e.currentTarget.style.background = '#4640DE'}
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#363A49]">
                <div
                    className="qh-footer-bottom max-w-[1440px] mx-auto px-6 lg:px-[124px] py-5"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <p className="text-[#9E9E9E] text-sm">
                        2021 @ QuickHire. All rights reserved.
                    </p>
                    {/* Social icons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {[Facebook, Instagram, Globe, Linkedin, Twitter].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    border: '1px solid #4B5263',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#9E9E9E',
                                    textDecoration: 'none',
                                    transition: 'color 150ms, border-color 150ms',
                                    flexShrink: 0,
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#fff'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = '#9E9E9E'; e.currentTarget.style.borderColor = '#4B5263'; }}
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
