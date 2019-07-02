import React from 'react';
import Link from 'next/link';

// eslint-disable-next-line react/display-name
export default () => (
	<ul>
		<li>
			<Link href="/a" as="/a">
				<a title="title">a</a>
			</Link>
		</li>
		<li>
			<Link href="/b" as="/b">
				<a>b</a>
			</Link>
		</li>
	</ul>
);
