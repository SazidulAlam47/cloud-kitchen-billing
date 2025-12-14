import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as  ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './redux/store';
import router from './routes/router';
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </ReduxProvider>
  </React.StrictMode>,
);
