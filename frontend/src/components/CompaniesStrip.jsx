export default function CompaniesStrip() {
    const companies = [
        {
            name: 'vodafone',
            svg: (
                <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#9199A3">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" fill="white" />
                        <circle cx="12" cy="12" r="3" fill="#9199A3" />
                    </svg>
                    <span className="text-[#9199A3] font-semibold text-lg tracking-wide">vodafone</span>
                </div>
            ),
        },
        {
            name: 'intel',
            svg: (
                <span className="text-[#9199A3] font-bold text-xl tracking-tight" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
                    intel<span className="text-[#9199A3]">.</span>
                </span>
            ),
        },
        {
            name: 'tesla',
            svg: (
                <span className="text-[#9199A3] font-bold text-xl tracking-[0.25em]">
                    T ≡ S L Ʌ
                </span>
            ),
        },
        {
            name: 'amd',
            svg: (
                <span className="text-[#9199A3] font-black text-xl tracking-wider">
                    AMD<span style={{ fontSize: '0.9em' }}>⌐</span>
                </span>
            ),
        },
        {
            name: 'talkit',
            svg: (
                <span className="text-[#9199A3] font-bold text-xl italic tracking-wide">
                    Talkit
                </span>
            ),
        },
    ];

    return (
        <section className="bg-white border-b border-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-[#9199A3] text-sm mb-6">Companies we helped grow</p>
                <div className="flex flex-wrap items-center gap-8 md:gap-16">
                    {companies.map((c) => (
                        <div key={c.name} className="flex items-center grayscale opacity-60 hover:opacity-80 transition-opacity cursor-pointer">
                            {c.svg}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
