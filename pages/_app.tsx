import '../styles/globals.css';
import '../src/assets/font/style.css'
// import type { AppProps } from 'next/app'
import React from 'react';
// import React from 'react'

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />
}

export default MyApp
