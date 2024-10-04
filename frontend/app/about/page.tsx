import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AboutComponent from './components/AboutComponent';
import CompanyLinks from './components/CompanyLink';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <AboutComponent/>
      <CompanyLinks/>
      <Footer />
    </div>
  );
}
