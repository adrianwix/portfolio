import React from 'react';
import { ListGroup, ListGroupItem, Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import CreateForm from '../components/issueTracker/CreateForm';
import UpdateForm from '../components/issueTracker/UpdateForm';
import DeleteForm from '../components/issueTracker/DeleteForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const userStories = [
	'Prevent cross site scripting(XSS attack).',
	'I can <b>POST</b> <code>/api/issues/{\'{projectname}\'}</code> with form data containing required <i>issue_title</i>, <i>issue_text</i>, <i>created_by</i>, and optional <i>assigned_to</i> and <i>status_text</i>.',
	'The object saved (and returned) will include all of those fields (blank for optional no input) and also include < i > created_on</i > (date / time), <i>updated_on</i>(date / time), <i>open</i>(boolean, true for open, false for closed), and < i > _id</i >.',
	'I can <b>PUT</b> <code>/api/issues/{\'{projectname}\'}</code> with a <i>_id</i> and any fields in the object with a	value to object said object. Returned will be \'successfully updated\' or \'could not update \'+_id. This should always update <i>updated_on</i>. If no fields are sent return \'no updated field sent\'.',
	'I can <b>DELETE</b> <code>/api/issues/{\'{projectname}\'}</code> with a <i>_id</i> to completely delete an issue. If no _id is sent return \'_id error\', success: \'deleted \'+_id, failed: \'could not delete \'+_id.',
	'I can <b>DELETE</b> <code>/api/issues/{\'{projectname}\'}</code> with a <i>_id</i> to completely delete an issue. If no _id is sent return \'_id error\', success: \'deleted \' + _id, failed: \'could not delete \' + _id.',
	'I can <b>GET</b> <code>/api/issues/{\'{projectname}\'}</code> for an array of all issues on that specific project with all the information for each issue as was returned when posted.',
	'I can filter my get request by also passing along any field and value in the query(ie. <code>/api/issues/{\'{project}\'}?open=false</code>).	I can pass along as many fields/values as I want.',
	'All 11 functional tests are complete and passing'
];

function IssueTracker() {
	return (
		<Container>
			<header className="my-4">
				<h1>
					ISQA_4 - Issue Tracker
				</h1>
			</header>
			<div id="userstories">
				<h3>User Stories</h3>
				<ListGroup>
					{userStories.map((story, i) => <ListGroupItem key={i} dangerouslySetInnerHTML={{ __html: story }} />)}
				</ListGroup>
				<br />

				<h3>Example get usage:</h3>
				<code>/api/issues/{'{project}'}</code><br />
				<code>/api/issues/{'{project}'}?open=true&amp;assigned_to=Joe</code><br />

				<h3>Example return:</h3>
				<code>{'[{"_id": "5871dda29faedc3491ff93bb","issue_title":"Fix error in posting data","issue_text":"When we post data it has an error.","created_on":"2017-01-08T06:35:14.240Z","updated_on":"2017-01-08T06:35:14.240Z","created_by":"Joe","assigned_to":"Joe","open":true,"status_text":"In QA"},...]'}</code>
				<br /><br />

				<h2>
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

						<h3>Update issue on <i>apitest</i> (Change any or all to update issue on the _id supplied)</h3><br/>
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
