import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '80px', paddingBottom: '2rem' }}>
        <Hero />
      </div>
    </main>
  );
}
