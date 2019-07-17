import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import axios from 'axios'
import IssueTCreateForm from '../components/issueTracker/IssueTCreateForm'
import IssueTUpdateForm from '../components/issueTracker/IssueTUpdateForm'
import IssueTDeleteForm from '../components/issueTracker/IssueTDeleteForm'
import IssueTrackerUserStory from '../components/issueTracker/IssueTrackerUserStory'
import createURL from '../utils/createURL'
import ResponseModal from '../components/messageBoard/ResponseModal'

function IssueTracker() {
	const [show, setShow] = useState(false)
	const [response, setResponse] = useState(undefined)

	function updateHandler(method) {
		return async values => {
			try {
				const url = createURL('/api/issues/apitest')
				const res = await axios({
					url,
					data: values,
					method,
				})
				setResponse(res.data)
				setShow(true)
			} catch (error) {
				console.error(error)
			}
		}
	}

	return (
		<Container>
			<ResponseModal show={show} setShow={setShow} response={response}/>
			<h1 className={'mt-3'}>ISQA_4 - Issue Tracker</h1>

			<div id="userstories">
				{/*TODO: Use BootstrapForm*/}
				<IssueTrackerUserStory/>

				<h3>Example get usage:</h3>
				<code>/api/issues/{'{project}'}</code>
				<br/>
				<code>/api/issues/{'{project}'}?open=true&amp;assigned_to=Joe</code>
				<br/>

				<h3>Example return:</h3>
				<code>
					{
						'[{"_id": "5871dda29faedc3491ff93bb","issue_title":"Fix error in posting data","issue_text":"When we post data it has an error.","created_on":"2017-01-08T06:35:14.240Z","updated_on":"2017-01-08T06:35:14.240Z","created_by":"Joe","assigned_to":"Joe","open":true,"status_text":"In QA"},...]'
					}
				</code>
				<br/>
				<br/>

				<h2>
					<Link href="/project/apitest">
						<a>
							EXAMPLE: Go to <i>/project/apitest</i> project issues
						</a>
					</Link>
				</h2>
			</div>
			<hr style={{ margin: '50px' }}/>
			<div id="testui">
				<h2>API Tests:</h2>
				<Row>
					<Col md={6}>
						<h3>
							Submit issue on <i>apitest</i>
						</h3>
						<br/>
						{/*TODO: Use BootstrapForm*/}
						<IssueTCreateForm updateHandler={updateHandler('post')}/>
						<br/>

						<h3>
							Update issue on <i>apitest</i> (Change any or all to update issue
							on the _id supplied)
						</h3>
						<br/>
						{/*TODO: Use BootstrapForm*/}
						<IssueTUpdateForm updateHandler={updateHandler('put')}/>
						<br/>

						<h3>
							Delete issue on <i>apitest</i>
						</h3>
						<br/>
						{/*TODO: Use BootstrapForm*/}
						<IssueTDeleteForm updateHandler={updateHandler('delete')}/>
						<br/>

					</Col>
				</Row>
			</div>
		</Container>
	)
}

export default IssueTracker
