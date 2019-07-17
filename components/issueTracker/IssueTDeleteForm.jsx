import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field } from 'formik'
import { Form, Button } from 'react-bootstrap'
import BootstrapField from '../BootstrapField'

const initialValues = {
	_id: '',
}

function IssueTDeleteForm(props) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, actions) => {
				props.updateHandler(values)
				actions.setSubmitting(false)

			}}
			render={(props) => {
				// eslint-disable-next-line react/prop-types
				const { handleSubmit, isSubmitting } = props
				return (
					<Form onSubmit={handleSubmit} id="DeleteForm">
						<Field className="mb-2" type="text" name="_id" placeholder="*_id" component={BootstrapField}
							   required/>
						<br/>
						<Button type="submit" variant="danger" disabled={isSubmitting}>Delete Issue</Button>
					</Form>
				)
			}}>
		</Formik>
	)
}

IssueTDeleteForm.propTypes = {
	updateHandler: PropTypes.func,
}

export default IssueTDeleteForm