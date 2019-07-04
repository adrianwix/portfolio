import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { Form, Button } from 'react-bootstrap';
import BootstrapField from '../BootstrapField';

const initialValues = {
	title: '',
};

function LibraryCreateForm(props) {
	const { className } = props;
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, actions) => {
				props.updateHandler(values);
				actions.setSubmitting(false);
			}}
			render={props => {
				// eslint-disable-next-line react/prop-types
				const { handleSubmit, isSubmitting } = props;
				return (
					<Form onSubmit={handleSubmit} id="CreateForm" className={className}>
						<h4>Test post to /api/books</h4>
						Book Title:
						<br />
						<Field
							className="mb-2"
							type="text"
							name="title"
							placeholder="Title"
							component={BootstrapField}
						/>
						<Button type="submit" variant="success" disabled={isSubmitting}>
							Create Book
						</Button>
					</Form>
				);
			}}
		/>
	);
}

LibraryCreateForm.propTypes = {
	updateHandler: PropTypes.func,
	className: PropTypes.any,
};

export default LibraryCreateForm;
