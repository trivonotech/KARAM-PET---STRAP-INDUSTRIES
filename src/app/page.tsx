import styles from './page.module.css';
import Hero from './HomePage/Hero/Hero';
import Navbar from '@/components/layout/Navbar/Navbar';
import About from './HomePage/About/About';
import Industries from './HomePage/Industries/Industries';
import Products from './HomePage/Products/Products';
import Catalogue from './HomePage/Catalogue/Catalogue';
import QualityControl from './HomePage/QualityControl/QualityControl';
import VisionMission from './HomePage/VisionMission/VisionMission';
import WhyChooseUs from './HomePage/WhyChooseUs/WhyChooseUs';
import ContactUs from '@/components/sections/ContactUs/ContactUs';

import Footer from '@/components/layout/Footer/Footer';

import ScrollAnimation from '@/components/animations/ScrollAnimation';

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className={styles.mainWrapper}>
        <Hero />

        <ScrollAnimation delay={0.1}>
          <About />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <Industries />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <Products />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <VisionMission />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <Catalogue />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <WhyChooseUs />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <ContactUs />
        </ScrollAnimation>

      </div>
      <Footer />
    </main>
  );
}
