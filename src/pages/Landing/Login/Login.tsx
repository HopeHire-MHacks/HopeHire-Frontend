import BottomBackground from '@/components/Landing/Background/BottomBackground';
import LoginForm from '@/components/Landing/Forms/Authentication/LoginForm';
import NavigationBar from '@/components/Landing/NavigationBar';
import React from 'react';
import TopBackground from '@/components/Landing/Background/TopBackground';

const Login = () => {
  return (
    <div className='isolate bg-white'>
      <TopBackground></TopBackground>
      <NavigationBar></NavigationBar>
      <main>
        <LoginForm></LoginForm>
      </main>
    </div>
  );
};

export default Login;
