import React from 'react';
import { Formik, Field } from 'formik';
import { Form, Button } from 'react-bootstrap';
import BootstrapField from '../BootstrapField';

const initialValues = {
	_id: ''
};

function DeleteForm() {
	return(
		<Formik
			initialValues={initialValues}
			onSubmit={(values, actions) => {
				console.log(values);
				setTimeout(() => {
					actions.setSubmitting(false);
				}, 3000);
			}}
			render={(props) => {
			// eslint-disable-next-line react/prop-types
				const { handleSubmit, isSubmitting } = props;
				return (
					<Form onSubmit={handleSubmit} id="DeleteForm">
						<Field className="mb-2" type="text" name="_id" placeholder="*_id" component={BootstrapField} required />
						<br />
						<Button type="submit" variant="danger" disabled={isSubmitting}>Delete Issue</Button>
					</Form>
				);
			}}>
		</Formik>
	);
}

export default DeleteForm;