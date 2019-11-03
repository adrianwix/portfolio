import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/Header'
import 'styles/NextBugFix.scss'
import 'styles/main.scss'

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
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
			<Container>
				<Head>
					<link
						href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700,900&display=swap&subset=latin-ext"
						rel="stylesheet"/>
					<title>Adrian Wix</title>
				</Head>
				<Header/>
				<Component {...pageProps} />
				<script
					src="https://cdnjs.cloudflare.com/ajax/libs/holder/2.9.6/holder.min.js"/>
			</Container>
		)
	}
}

export default MyApp