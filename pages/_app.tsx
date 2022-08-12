import '../styles/globals.css';
import '../src/assets/font/style.css'
import React from 'react';
import { wrapper } from '../redux/store/store';
import AppProvider from '../context/AppProvider';

function MyApp({ Component, pageProps }: any) {
  // return <Component {...pageProps} />
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default wrapper.withRedux(MyApp);
