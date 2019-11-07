import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field } from 'formik'
import { Form, Button } from 'react-bootstrap'
import BootstrapField from '../BootstrapField'

const initialValues = {
	_id: '',
	comment: '',
}

function LibraryCommentForm(props) {
	const { className } = props
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, actions) => {
				props.updateHandler(values)
				actions.setSubmitting(false)
			}}
			render={props => {
				// eslint-disable-next-line react/prop-types
				const { handleSubmit, isSubmitting } = props
				return (
					<Form
						onSubmit={handleSubmit}
						id="CreateForm"
						className={className}
					>
						<h4>Test post to /api/books/{'{bookid}'}</h4>
						BookId to comment on:
						<br />
						<Field
							className="mb-2"
							type="text"
							name="_id"
							placeholder="Book's ID"
							component={BootstrapField}
						/>
						Comment:
						<br />
						<Field
							className="mb-2"
							type="text"
							name="comment"
							placeholder="Comment"
							component={BootstrapField}
						/>
						<Button
							type="submit"
							variant="success"
							disabled={isSubmitting}
						>
							Comment
						</Button>
					</Form>
				)
			}}
		/>
	)
}

LibraryCommentForm.propTypes = {
	updateHandler: PropTypes.func,
	className: PropTypes.any,
}

export default LibraryCommentForm
