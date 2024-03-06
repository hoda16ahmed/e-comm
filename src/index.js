import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import reportWebVitals from './reportWebVitals';
import CounterContextProvider from './Context/Counter';
import TokenContextProvider from './Context/Token';
import CartContentProvider from './Context/Cartcontext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
let query = new QueryClient()
root.render(
  <CartContentProvider>
     <QueryClientProvider client={query}>
     <React.StrictMode>
    <CounterContextProvider>
      <TokenContextProvider>
        <App />
      </TokenContextProvider>
          
    </CounterContextProvider>
  </React.StrictMode>

  </QueryClientProvider>
  </CartContentProvider>
 
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
