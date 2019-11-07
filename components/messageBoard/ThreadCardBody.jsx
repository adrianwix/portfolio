import Card from 'react-bootstrap/Card'
import BootstrapForm from '../BootstrapForm'
import formSubmitHandler from '../../utils/formSubmitHandler'
import * as PropTypes from 'prop-types'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

function ThreadCardBody(props) {
	return (
		<>
			<Row>
				<Col className="d-flex align-items-center" md={10}>
					<p className="text-muted h6 mb-2">
						id: {props.message._id} - created on: (
						{props.message.created_on})
					</p>
				</Col>
				<Col md={2}>
					<BootstrapForm
						fields={[
							{
								name: 'report_id',
								type: 'hidden',
								initialValue: props.message._id,
							},
							{
								name: 'board',
								type: 'hidden',
								initialValue: props.board,
							},
						]}
						updateHandler={formSubmitHandler('put', props.pathname)}
						buttonValue="Report"
						buttonVariant="warning"
					/>
				</Col>
			</Row>

			<Card.Title className={'my-3'}>{props.message.text}</Card.Title>
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
		</>
	)
}

ThreadCardBody.propTypes = {
	message: PropTypes.any,
	board: PropTypes.string.isRequired,
	pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	callback: PropTypes.func,
}

export default ThreadCardBody
