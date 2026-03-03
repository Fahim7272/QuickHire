import { useNavigate } from 'react-router-dom';
import rectangleBg from '../assets/Rectangle.png';
import dashboardImg from '../assets/Dashboard Company.png';

export default function CTABanner() {
    const navigate = useNavigate();

    return (
        <section className="bg-white py-12">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px]">
                {/* Outer wrapper: relative so dashboard can be absolutely positioned */}
                <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: '320px' }}>

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

                    {/* Left: Text — sits on the indigo side */}
                    <div className="relative z-10 flex flex-col justify-center h-full p-10 md:p-14 md:w-1/2" style={{ minHeight: '320px' }}>
                        <h2
                            className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-3"
                            style={{ fontFamily: "'Clash Display', sans-serif" }}
                        >
                            Start posting <br />jobs today
                        </h2>
                        <p className="text-white/80 text-base mb-8">
                            Start posting jobs for only $10.
                        </p>
                        <div>
                            <button
                                onClick={() => navigate('/admin')}
                                className="border-2 border-white text-white font-semibold px-7 py-3 rounded hover:bg-white hover:text-[#4640DE] transition-all text-sm"
                            >
                                Sign Up For Free
                            </button>
                        </div>
                    </div>

                    {/* Dashboard image — absolutely positioned to show full image within banner */}
                    <div
                        className="absolute z-10"
                        style={{ left: '46%', right: '0', top: '16px', bottom: '0' }}
                    >
                        <img
                            src={dashboardImg}
                            alt="QuickHire employer dashboard"
                            className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
