import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Toaster from '@components/Toaster/Toaster';
import BaseRouter from '@components/Routers/BaseRouter';

function App() {
  return (
    <RecoilRoot>
      <Toaster />
      <BrowserRouter>
        <BaseRouter />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
