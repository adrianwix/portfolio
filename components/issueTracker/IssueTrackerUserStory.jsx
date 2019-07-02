import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

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

export default function IssueTrackerUserStory() {
	return (
		<React.Fragment>
			<h3>User Stories</h3>
			<ListGroup>
				{userStories.map((story, i) => <ListGroupItem key={i} dangerouslySetInnerHTML={{ __html: story }} />)}
			</ListGroup>
			<br />
		</React.Fragment>
	);
}
