import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * NotFound — Law of Least Surprise + Error Recovery
 * Clear message, friendly tone, single recovery CTA (Fitts's Law — prominent target).
 */
export default function NotFound() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#F1F2F4] flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    {/* Large visual number — Von Restorff Effect (make it memorable) */}
                    <div
                        className="text-[120px] font-extrabold leading-none text-[#4640DE]/10 select-none mb-2"
                        aria-hidden="true"
                    >
                        404
                    </div>
                    <h1
                        className="text-3xl font-extrabold text-[#25324B] mb-3"
                        style={{ fontFamily: 'Epilogue, sans-serif' }}
                    >
                        Page not found
                    </h1>
                    <p className="text-[#515B6F] mb-8 leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.
                        Let's get you back on track.
                    </p>
                    {/* Primary CTA — Fitts's Law: large, high-contrast, easy target */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-[#4640DE] hover:bg-[#3730c0] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm"
                    >
                        ← Back to Home
                    </Link>
                    <div className="mt-4">
                        <Link
                            to="/jobs"
                            className="text-[#4640DE] hover:underline text-sm font-medium"
                        >
                            Or browse all jobs →
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
