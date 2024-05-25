import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const rootElement = document.getElementById('root');
const appRoot = createRoot(rootElement);

appRoot.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />

        <ToastContainer />

    </Provider>
    </React.StrictMode>
);
