import styles from './page.module.css';
import Hero from '@/components/sections/Hero/Hero';
import Navbar from '@/components/layout/Navbar/Navbar';
import About from '@/components/sections/About/About';
import Industries from '@/components/sections/Industries/Industries';
import Products from '@/components/sections/Products/Products';
import Catalogue from '@/components/sections/Catalogue/Catalogue';
import QualityControl from '@/components/sections/QualityControl/QualityControl';
import VisionMission from '@/components/sections/VisionMission/VisionMission';
import WhyChooseUs from '@/components/sections/WhyChooseUs/WhyChooseUs';
import ContactUs from '@/components/sections/ContactUs/ContactUs';

import Footer from '@/components/layout/Footer/Footer';

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
