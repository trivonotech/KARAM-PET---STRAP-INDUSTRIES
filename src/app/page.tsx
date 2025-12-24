import styles from './page.module.css';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Industries from '@/components/Industries';
import Products from '@/components/Products';
import QualityControl from '@/components/QualityControl';
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
        <QualityControl />
        <WhyChooseUs />
        <ContactUs />

      </div>
      <Footer />
    </main>
  );
}
