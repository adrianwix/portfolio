import Card from 'react-bootstrap/Card';
import BootstrapForm from '../BootstrapForm';
import formSubmitHandler from '../../utils/formSubmitHandler';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

function ReplyCard(props) {
	return (
		<Card className={'my-3 ml-3'}>
			<Card.Body>
				<div className="d-flex justify-content-between">
					<Row>
						<Col className="d-flex align-items-center" md={10}>
							<p className="mb-2 h6 text-muted">
								id: {props.message._id} - created on: (
								{props.message.created_on})
							</p>
						</Col>

						<Col md={2}>
							{/*Report Button*/}
							<BootstrapForm
								fields={[
									{
										name: 'thread_id',
										type: 'hidden',
										initialValue: props.thread_id,
									},
									{
										name: 'reply_id',
										type: 'hidden',
										initialValue: props.message._id,
									},
								]}
								updateHandler={formSubmitHandler('put', props.pathname)}
								buttonValue="Report"
								buttonVariant="warning"
							/>
						</Col>
					</Row>
				</div>
				<Card.Title className={'my-3'}>{props.message.text}</Card.Title>

				{/*Delete form*/}
				<BootstrapForm
					className={'mb-4'}
					fields={[
						{
							name: 'delete_password',
							type: 'password',
							placeholder: 'password',
							required: true,
						},
						{
							name: 'thread_id',
							type: 'hidden',
							initialValue: props.thread_id,
						},
						{
							name: 'reply_id',
							type: 'hidden',
							initialValue: props.message._id,
						},
					]}
					updateHandler={formSubmitHandler(
						'delete',
						props.pathname,
						props.callback
					)}
					buttonValue="Delete"
					buttonVariant="danger"
				/>
			</Card.Body>
		</Card>
	);
}

ReplyCard.propTypes = {
	message: PropTypes.any,
	pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	callback: PropTypes.func,
	thread_id: PropTypes.string.isRequired,
};

export default ReplyCard;
