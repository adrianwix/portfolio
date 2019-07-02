import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import CreateForm from '../components/issueTracker/CreateForm';
import UpdateForm from '../components/issueTracker/UpdateForm';
import DeleteForm from '../components/issueTracker/DeleteForm';
import IssueTrackerUserStory from '../components/issueTracker/IssueTrackerUserStory';

function IssueTracker() {
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
					// TODO: change href after creating the page
					<Link href="/">
						<a>EXAMPLE: Go to <i>/apitest/</i> project issues</a>
					</Link>
				</h2>
			</div>
			<hr style={{ margin: '50px' }} />
			<div id="testui">
				<h2>API Tests:</h2>
				<Row>
					<Col md={6}>

						<h3>Submit issue on <i>apitest</i></h3><br />
						<CreateForm />
						<br />

						<h3>Update issue on <i>apitest</i> (Change any or all to update issue on the _id supplied)</h3><br />
						<UpdateForm />
						<br />

						<h3>Delete issue on <i>apitest</i></h3><br />
						<DeleteForm />
						<br />

						<h3>JSON Result</h3>
						<code className="my-4" id='jsonResult'></code>
					</Col>
				</Row>
			</div>
		</Container>
	);
}

export default IssueTracker;
