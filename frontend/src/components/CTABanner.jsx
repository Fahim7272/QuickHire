import { useNavigate } from 'react-router-dom';
import rectangleBg from '../assets/Rectangle.png';
import dashboardImg from '../assets/Dashboard Company.png';

export default function CTABanner() {
    const navigate = useNavigate();

    return (
        <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="relative flex items-center">

                    {/* Rectangle.png IS the banner background shape */}
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: `url(${rectangleBg})`,
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                    />

                    {/* Content row */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center w-full min-h-64">

                        {/* Left: Text */}
                        <div className="flex-1 p-10 md:p-14">
                            <h2
                                className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-3"
                                style={{ fontFamily: "'Clash Display', sans-serif" }}
                            >
                                Start posting <br />jobs today
                            </h2>
                            <p className="text-white/80 text-base mb-8">
                                Start posting jobs for only $10.
                            </p>
                            <button
                                onClick={() => navigate('/admin')}
                                className="border-2 border-white text-white font-semibold px-7 py-3 rounded hover:bg-white hover:text-[#4640DE] transition-all text-sm"
                            >
                                Sign Up For Free
                            </button>
                        </div>

                        {/* Right: Dashboard image — floats to the right edge */}
                        <div className="flex-1 flex justify-end items-center self-stretch pr-0">
                            <img
                                src={dashboardImg}
                                alt="QuickHire employer dashboard"
                                className="w-full max-w-lg xl:max-w-xl object-contain drop-shadow-2xl"
                                style={{ marginTop: '16px' }}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
