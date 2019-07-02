import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'next/router';
import CreateForm from '../components/issueTracker/CreateForm';
import IssueDisplay from '../components/issueTracker/IssueDisplay';
import createURL from '../utils/createURL';

function project(props) {
	const [issues, setIssues] = useState(props.issues);

	async function closeIssue(id) {
		try {
			const url = createURL('/api/issues/' + props.project);
			await axios.put(url, { _id: id, open: false });
			const issuesIds = issues.map(issue => issue._id);
			const index = issuesIds.indexOf(id);
			const issuesCopy = [...issues];
			issuesCopy[index].open = false;
			setIssues(issuesCopy);

		} catch (error) {
			console.error(error);
		}
	}

	async function deleteIssue(id) {
		try {
			const url = createURL('/api/issues/' + props.project);
			await axios.delete(url, {
				data: { _id: id }
			});

			const issuesIds = issues.map(issue => issue._id);
			const index = issuesIds.indexOf(id);
			const issuesCopy = [...issues];
			issuesCopy.splice(index, 1);
			setIssues(issuesCopy);

		} catch (error) {
			console.error(error);

		}
	}

	async function updateHandler(values) {
		try {
			const url = createURL('/api/issues/' + props.project);
			const res = await axios.post(url, values);
			const issuesCopy = [...issues];
			issuesCopy.unshift(res.data);
			setIssues(issuesCopy);
		} catch (error) {
			console.error('UpdateHandler', error);
		}

	}

	return (
		<Container>
			<header>
				<h1 className="text-center">Project name: {props.project}</h1>
			</header>
			<center>
				<div id='submitNewIssue'>
					<br />
					<h3>Submit a new issue:</h3>
					<CreateForm updateHandler={updateHandler} />
				</div>

				<div className="my-5">
					{(issues.length !== 0) ? issues.map((issue, i) => <IssueDisplay closeIssue={closeIssue} deleteIssue={deleteIssue} key={i} {...issue} />) : 'There are no Issues'}
				</div>

			</center>
		</Container>
	);
}



project.propTypes = {
	project: PropTypes.string.isRequired,
	issues: PropTypes.arrayOf(PropTypes.shape({
		issue_title: PropTypes.string.isRequired,
		issue_text: PropTypes.string.isRequired,
		created_by: PropTypes.string.isRequired,
		assigned_to: PropTypes.string,
		status_text: PropTypes.string,
		open: PropTypes.bool.isRequired,
		created_on: PropTypes.string.isRequired,
		updated_on: PropTypes.string.isRequired
	}))
};

project.getInitialProps = async ({ query, req }) => {
	try {
		const res = await axios.get('http://' + req.headers.host + '/api/issues/' + query.project);
		console.log('data', res.data);
		if (res.data !== 'Project not found') {
			return { issues: res.data, project: query.project };
		} else {
			return { issues: [], project: query.project };

		}
	} catch (error) {
		console.error('error');
	}
};

export default withRouter(project);