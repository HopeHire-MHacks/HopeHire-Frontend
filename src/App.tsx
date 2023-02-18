import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Toaster from '@components/Toaster/Toaster';
import BaseRouter from '@components/Routers/BaseRouter';
import Modal from '@components/Modal';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
  return (
    <GoogleOAuthProvider clientId={client_id}>
      <RecoilRoot>
        <Toaster />
        <Modal />
        <BrowserRouter>
          <BaseRouter />
        </BrowserRouter>
      </RecoilRoot>
    </GoogleOAuthProvider>
  );
}

export default App;
