import React from 'react';
import BottomBackground from '../Background/BottomBackground';
import TopBackground from '../Background/TopBackground';
import Typewriter from 'typewriter-effect';
import { useHistory } from 'react-router-dom';
import { routes } from '@/constants/routes';
import img from '@/assets/product home.png';

const Hero = () => {
  const history = useHistory();
  return (
    <div id='heros' className='relative py-12 sm:py-32 lg:pb-40'>
      <TopBackground></TopBackground>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Revolutionizing
            <Typewriter
              options={{
                strings: ['Recruitment', 'Job Search'],
                autoStart: true,
                loop: true,
              }}
            />
            with AI
          </h1>
          <p className='mt-6 text-lg leading-8 text-gray-600'>Connecting kidney disease-affected employees with understanding employers</p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <a
              onClick={() => history.push(routes.authentication.login)}
              href='#'
              className='rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Get started
            </a>
          </div>
        </div>
        <div className='mt-16 flow-root sm:mt-24'>
          <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
            <img src={img} alt='App screenshot' width={2432} height={1442} className='rounded-md shadow-2xl ring-1 ring-gray-900/10' />
          </div>
        </div>
      </div>
      <BottomBackground></BottomBackground>
    </div>
  );
};

export default Hero;
