import React, { useState, useEffect } from 'react';
// Koristimo direktnu putanju od src foldera (ako tvoj projekt to dozvoljava)
import Navbar from 'src/components/Navbar';
import Footer from 'src/components/Footer';
import Button from 'src/components/ui/Button';
import FeatureCard from 'src/components/ui/FeatureCard';

const HomePage = () => {
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    setJobCount(150); // Simulacija podataka
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-5xl font-bold text-[#1e3a8a] mb-4">
          Career <span className="text-[#2dbbb4]">Hub</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Trenutno dostupno {jobCount} otvorenih pozicija.
        </p>
        <div className="flex gap-4">
          <Button text="Pregledaj oglase" />
          <Button text="O nama" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;