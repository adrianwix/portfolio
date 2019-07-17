import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field } from 'formik'
import { Form, Button } from 'react-bootstrap'
import BootstrapField from '../BootstrapField'

const initialValues = {
	issue_title: '',
	issue_text: '',
	created_by: '',
	assigned_to: '',
	status_text: '',
}

function IssueTCreateForm(props) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, actions) => {
				// TODO: We could return a Promise
				props.updateHandler(values)
				actions.setSubmitting(false)

			}}
			render={(props) => {
				// eslint-disable-next-line react/prop-types
				const { handleSubmit, isSubmitting } = props
				return (
					<Form onSubmit={handleSubmit} id="CreateForm">
						<Field className="mb-2" type="text" name="issue_title" placeholder="Title"
							   component={BootstrapField}/>
						<Field className="mb-2" type="text" name="issue_text" as="textarea" placeholder="Text"
							   component={BootstrapField}/>
						<Field className="mb-2" type="text" name="created_by" placeholder="Created by"
							   component={BootstrapField}/>
						<Field className="mb-2" type="text" name="assigned_to" placeholder="(opt)Assigned to"
							   component={BootstrapField}/>
						<Field className="mb-2" type="text" name="status_text" placeholder="(opt)Status text"
							   component={BootstrapField}/>
						<br/>
						<Button type="submit" variant="success" disabled={isSubmitting}>Create Issue</Button>
					</Form>
				)
			}}>
		</Formik>
	)
}

IssueTCreateForm.propTypes = {
	updateHandler: PropTypes.func,
}

export default IssueTCreateForm