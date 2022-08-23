import '../styles/globals.css'
import '../src/assets/font/style.css'
import React from 'react'
import { wrapper } from '../redux/store/store'
import AppProvider from '../context/AppProvider'
import { EmptyLayout } from '../components/layout'
import { AppPropsWithLayout } from '../models'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// return <Component {...pageProps} />
	const Layout = Component.Layout ?? EmptyLayout
	return (
		<AppProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AppProvider>
	)
}

export default wrapper.withRedux(MyApp)
