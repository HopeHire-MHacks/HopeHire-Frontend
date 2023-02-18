import NavigationBar from '@/components/Landing/NavigationBar';
import React from 'react';
import SignUpForm from '@/components/Landing/Forms/Authentication/SignUpForm';
import TopBackground from '@/components/Landing/Background/TopBackground';
import BottomBackground from '@/components/Landing/Background/BottomBackground';

const SignUp = () => {
  return (
    <div className='isolate bg-white'>
      <TopBackground></TopBackground>
      <NavigationBar></NavigationBar>
      <BottomBackground />
      <main>
        <SignUpForm></SignUpForm>
      </main>
    </div>
  );
};

export default SignUp;
