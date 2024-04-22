import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter} from 'react-router-dom'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.scss';

const queryClient = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
   </QueryClientProvider>
,document.getElementById('root'));

