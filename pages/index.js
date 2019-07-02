import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

// eslint-disable-next-line react/display-name
export default () => (
	<Container>
		<Jumbotron className="my-3">
			<h1>Hello, world!</h1>
			<b>const name = "Adrian Wix"</b>
			<p>
				My name is {'{name}'} and this is my Portfolio.
			</p>
			<p>
				Ich heiße {'{name}'} und dieses ist mein Portfolio.
			</p>
			<p>
				Me llamo {'{name}'} y este es mi portafolio.
			</p>
		</Jumbotron>
	</Container>
);
