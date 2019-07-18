import React from 'react'
import App, { Container } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/Header'
import 'styles/NextBugFix.scss'

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		return { pageProps }
	}

	render() {
		const { Component, pageProps } = this.props

		return (
			<Container>
				<Header/>
				<Component {...pageProps} />
			</Container>
		)
	}
}

export default MyApp