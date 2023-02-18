import React, { useEffect } from 'react';

import Employers from '@/components/Landing/Employers';
import Features from '@/components/Landing/Features';
import Hero from '@/components/Landing/Hero';
import NavigationBar from '@/components/Landing/NavigationBar';
import Patients from '@/components/Landing/Patients';
import Stories from '@/components/Landing/Stories';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    }
  }, [pathname, hash, key]);

  return (
    <div className='isolate bg-white'>
      <NavigationBar></NavigationBar>
      <main>
        <Hero></Hero>

        <Features></Features>

        <Stories></Stories>

        <Patients></Patients>

        <Employers></Employers>
      </main>
    </div>
  );
};

export default Home;
