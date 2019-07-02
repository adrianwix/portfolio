import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from 'react-bootstrap';

const IssueDisplay = function (props) {
	let openstatus = (props.open) ? openstatus = 'open' : openstatus = 'closed';
	return (
		<Card className="my-5">
			<Card.Body>
				<Card.Title>{props.issue_title + ' - (' + openstatus + ')'}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">ID: {props._id}</Card.Subtitle>
				<Card.Text>
					{props.issue_text}
				</Card.Text>
				<Row className="my-1">
					<Col md="6"><b>Created by: </b>{props.created_by}</Col>
					<Col md="6"><b>Assigned to: </b>{props.assigned_to}</Col>
				</Row>
				<Row className="my-1">
					<Col md="6"><b>Created on: </b>{props.created_on}</Col>
					<Col md="6"><b>Last update: </b>{props.updated_on}</Col>
				</Row>
				<Button variant="outline-warning" onClick={() => props.closeIssue(props._id)} className="mr-2">Close</Button>
				<Button variant="danger" onClick={() => props.deleteIssue(props._id)}>Delete</Button>
			</Card.Body>
		</Card>
	);
};

IssueDisplay.propTypes = {
	open: PropTypes.bool.isRequired,
	_id: PropTypes.string.isRequired,
	issue_title: PropTypes.string.isRequired,
	issue_text: PropTypes.string.isRequired,
	created_by: PropTypes.string.isRequired,
	assigned_to: PropTypes.string,
	status_text: PropTypes.string,
	created_on: PropTypes.any.isRequired,
	updated_on: PropTypes.any.isRequired,
	closeIssue: PropTypes.func.isRequired,
	deleteIssue: PropTypes.func.isRequired
};
export default IssueDisplay;