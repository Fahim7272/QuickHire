import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CompaniesStrip from '../components/CompaniesStrip';
import CategorySection from '../components/CategorySection';
import CTABanner from '../components/CTABanner';
import FeaturedJobs from '../components/FeaturedJobs';
import LatestJobs from '../components/LatestJobs';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <CompaniesStrip />
                <CategorySection />
                <CTABanner />
                <FeaturedJobs />
                <LatestJobs />
            </main>
            <Footer />
        </>
    );
}
