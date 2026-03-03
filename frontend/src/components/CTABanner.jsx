import { useNavigate } from 'react-router-dom';
import rectangleBg from '../assets/Rectangle.png';
import dashboardImg from '../assets/Dashboard Company.png';

export default function CTABanner() {
    const navigate = useNavigate();

    return (
        <section className="bg-white py-12">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px]">
                {/* Outer wrapper */}
                <div className="qh-cta-inner relative overflow-hidden" style={{ minHeight: '320px' }}>

                    {/* Rectangle.png background */}
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: `url(${rectangleBg})`,
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                    />

                    {/* Left: Text */}
                    <div className="qh-cta-text relative z-10 flex flex-col justify-center h-full p-10 md:p-14 md:w-1/2" style={{ minHeight: '320px' }}>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
                            Start posting <br />jobs today
                        </h2>
                        <p className="text-white/80 text-base mb-8">
                            Start posting jobs for only $10.
                        </p>
                        <div>
                            <button
                                onClick={() => navigate('/signup')}
                                style={{
                                    background: '#FFFFFF',
                                    color: '#4640DE',
                                    border: 'none',
                                    borderRadius: 0,
                                    cursor: 'pointer',
                                    fontFamily: "'Epilogue', sans-serif",
                                    fontWeight: 700,
                                    fontSize: 14,
                                    padding: '14px 28px',
                                    transition: 'opacity 150ms',
                                    width: '100%',
                                    maxWidth: 240,
                                    textAlign: 'center',
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >
                                Sign Up For Free
                            </button>
                        </div>
                    </div>

                    {/* Dashboard image */}
                    <div
                        className="qh-cta-dashboard absolute z-10"
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
