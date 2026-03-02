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
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
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

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-white text-base mb-3">Get job notifications</h4>
                        <p className="text-[#9E9E9E] text-sm mb-5 leading-relaxed">
                            The latest job news, articles, sent to your inbox weekly.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="flex-1 bg-transparent border border-[#6B7280] rounded-l px-4 py-2.5 text-sm text-white placeholder-[#6B7280] outline-none focus:border-[#4640DE] transition-colors"
                            />
                            <button
                                type="submit"
                                className="bg-[#4640DE] hover:bg-[#3730c0] text-white font-semibold px-5 py-2.5 rounded-r text-sm transition-colors whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#363A49]">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[#9E9E9E] text-sm">
                        2021 @ QuickHire. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {[Facebook, Instagram, Globe, Linkedin, Twitter].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="w-9 h-9 rounded-full border border-[#4B5263] flex items-center justify-center text-[#9E9E9E] hover:text-white hover:border-white transition-colors"
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
