import React from 'react'
import * as App from 'next/app'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/Header'
import 'styles/NextBugFix.scss'
import 'styles/main.scss'
import { createGlobalStyle } from 'styled-components'
import { config, dom } from '@fortawesome/fontawesome-svg-core'
import { AppInitialProps } from 'next/app'
import { AppContextType } from 'next/dist/next-server/lib/utils'

config.autoAddCss = false
const GlobalStyles = createGlobalStyle`
    ${dom.css()}
`

class MyApp extends App.default {
	static async getInitialProps(
		appContext: AppContextType
	): Promise<AppInitialProps> {
		const { Component, ctx } = appContext

		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		return { pageProps }
	}

	/*TODO: Styles are not being rendered in client side navigation*/
	render() {
		const { Component, pageProps } = this.props

		return (
			<div>
				<Head>
					<link
						href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700,900&display=swap&subset=latin-ext"
						rel="stylesheet"
					/>
					<title>Adrian Wix</title>
				</Head>
				<GlobalStyles />
				<Header />
				<Component {...pageProps} />
			</div>
		)
	}
}

export default MyApp
