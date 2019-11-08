import React from 'react'
import * as App from 'next/app'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/Header'
import 'styles/NextBugFix.scss'
import 'styles/main.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

class MyApp extends App.default {
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
				<Header />
				<Component {...pageProps} />
			</div>
		)
	}
}

export default MyApp
