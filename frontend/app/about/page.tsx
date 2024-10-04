import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AboutComponent from './components/AboutComponent';
import CompanyLinks from './components/CompanyLink';
import CompanyInfomation1 from './components/CompanyInfomation';
import CompanyVisionMissionValues from './components/CompanyInformation2';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <AboutComponent />
      <CompanyInfomation1 />
      <CompanyVisionMissionValues />
      <CompanyLinks />
      <Footer />
    </div>
  );
}
