import styles from './page.module.css';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Industries from '@/components/Industries';
import Products from '@/components/Products';
import Catalogue from '@/components/Catalogue';
import QualityControl from '@/components/QualityControl';
import VisionMission from '@/components/VisionMission';
import WhyChooseUs from '@/components/WhyChooseUs';
import ContactUs from '@/components/ContactUs';

import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className={styles.mainWrapper}>
        <Hero />
        <About />
        <Industries />
        <Products />

        <VisionMission />
        <Catalogue />
        <WhyChooseUs />
        <ContactUs />

      </div>
      <Footer />
    </main>
  );
}
