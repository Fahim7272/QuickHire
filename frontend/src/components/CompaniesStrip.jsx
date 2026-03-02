import vodafoneLogo from '../assets/vodafone-logo.png';
import intelLogo from '../assets/intel-logo.png';
import teslaLogo from '../assets/tesla-logo.png';
import amdLogo from '../assets/amd-logo.png';
import talkitLogo from '../assets/talkit-logo.png';

const companies = [
    { name: 'Vodafone', logo: vodafoneLogo },
    { name: 'Intel', logo: intelLogo },
    { name: 'Tesla', logo: teslaLogo },
    { name: 'AMD', logo: amdLogo },
    { name: 'Talkit', logo: talkitLogo },
];

export default function CompaniesStrip() {
    return (
        <section className="bg-white border-b border-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-[#9199A3] text-sm mb-6" style={{ fontFamily: "'Epilogue', sans-serif" }}>
                    Companies we helped grow
                </p>
                <div className="flex flex-wrap items-center gap-10 md:gap-16">
                    {companies.map((c) => (
                        <div
                            key={c.name}
                            className="flex items-center grayscale opacity-60 hover:opacity-90 hover:grayscale-0 transition-all duration-300 cursor-pointer"
                        >
                            <img
                                src={c.logo}
                                alt={c.name}
                                className="h-7 object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
