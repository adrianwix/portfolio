import React from 'react';
import { Formik, Field } from 'formik';
import { Form, Button } from 'react-bootstrap';
import BootstrapField from '../BootstrapField';

const initialValues = {
	_id: '',
	issue_title: '',
	issue_text: '',
	created_by: '',
	assigned_to: '',
	status_text: ''
};

function CreateForm() {
	return (
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
					<Form onSubmit={handleSubmit} id="CreateForm">
						<Field className="mb-2" type="text" name="_id" placeholder="*_id" component={BootstrapField} required />
						<Field className="mb-2" type="text" name="issue_title" placeholder="(opt)Title" component={BootstrapField} />
						<Field className="mb-2" type="text" name="issue_text" as="textarea" placeholder="(opt)Text" component={BootstrapField} />
						<Field className="mb-2" type="text" name="created_by" placeholder="(opt)Created by" component={BootstrapField} />
						<Field className="mb-2" type="text" name="assigned_to" placeholder="(opt)Assigned to" component={BootstrapField} />
						<Field className="mb-2" type="text" name="status_text" placeholder="(opt)Status text" component={BootstrapField} />
						<br />
						<Button type="submit" variant="success" disabled={isSubmitting}>Create Issue</Button>
					</Form>
				);
			}}>
		</Formik>
	);
}

export default CreateForm;