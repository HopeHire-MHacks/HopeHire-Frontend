import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Toaster from '@components/Toaster/Toaster';
import BaseRouter from '@components/Routers/BaseRouter';
import Modal from '@components/Modal';

function App() {
  return (
    <RecoilRoot>
      <Toaster />
      <Modal />
      <BrowserRouter>
        <BaseRouter />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
