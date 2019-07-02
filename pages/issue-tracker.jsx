import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import CreateForm from '../components/issueTracker/CreateForm';
import UpdateForm from '../components/issueTracker/UpdateForm';
import DeleteForm from '../components/issueTracker/DeleteForm';
import IssueTrackerUserStory from '../components/issueTracker/IssueTrackerUserStory';
import createURL from '../utils/createURL';

function IssueTracker() {
	const [response, setResponse] = useState(null);

	function updateHandler(method) {
		return async (values) => {
			try {
				const url = createURL('/api/issues/apitest');
				const res = await axios({
					url,
					data: values,
					method,
				});
				setResponse(res.data);

			} catch (error) {
				console.error(error);
			}
		};

	}
	return (
		<Container>
			<header className="my-4">
				<h1>
					ISQA_4 - Issue Tracker
				</h1>
			</header>
			<div id="userstories">
				<IssueTrackerUserStory />

				<h3>Example get usage:</h3>
				<code>/api/issues/{'{project}'}</code><br />
				<code>/api/issues/{'{project}'}?open=true&amp;assigned_to=Joe</code><br />

				<h3>Example return:</h3>
				<code>{'[{"_id": "5871dda29faedc3491ff93bb","issue_title":"Fix error in posting data","issue_text":"When we post data it has an error.","created_on":"2017-01-08T06:35:14.240Z","updated_on":"2017-01-08T06:35:14.240Z","created_by":"Joe","assigned_to":"Joe","open":true,"status_text":"In QA"},...]'}</code>
				<br /><br />

				<h2>
					<Link href="/project/apitest">
						<a>EXAMPLE: Go to <i>/project/apitest</i> project issues</a>
					</Link>
				</h2>
			</div>
			<hr style={{ margin: '50px' }} />
			<div id="testui">
				<h2>API Tests:</h2>
				<Row>
					<Col md={6}>

						<h3>Submit issue on <i>apitest</i></h3><br />
						<CreateForm updateHandler={updateHandler('post')} />
						<br />

						<h3>Update issue on <i>apitest</i> (Change any or all to update issue on the _id supplied)</h3><br />
						<UpdateForm updateHandler={updateHandler('put')} />
						<br />

						<h3>Delete issue on <i>apitest</i></h3><br />
						<DeleteForm updateHandler={updateHandler('delete')} />
						<br />

						<h3>JSON Result</h3>
						<code className="my-5" id='jsonResult'>{response && JSON.stringify(response)}</code>
					</Col>
				</Row>
			</div>
		</Container>
	);
}

export default IssueTracker;
