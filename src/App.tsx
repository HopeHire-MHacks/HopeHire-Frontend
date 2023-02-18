import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import BaseRouter from '@components/Routers/BaseRouter';

function App() {
  return (
    <BrowserRouter>
      <BaseRouter />
    </BrowserRouter>
  );
}

export default App;
