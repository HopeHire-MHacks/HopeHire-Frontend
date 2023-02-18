import BottomBackground from '@/components/Landing/Background/BottomBackground';
import NavigationBar from '@/components/Landing/NavigationBar';
import React from 'react';
import SignUpForm from '@/components/Landing/Forms/Authentication/SignUpForm';
import TopBackground from '@/components/Landing/Background/TopBackground';

const SignUp = () => {
  return (
    <div className='isolate bg-white'>
      <TopBackground></TopBackground>
      <NavigationBar></NavigationBar>
      <main>
        <SignUpForm></SignUpForm>
        <BottomBackground></BottomBackground>
      </main>
    </div>
  );
};

export default SignUp;
