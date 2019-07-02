import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { Form, Button } from 'react-bootstrap';
import BootstrapField from '../BootstrapField';
import BootstrapCheck from '../BootstrapCheck';

const initialValues = {
	_id: '',
	issue_title: '',
	issue_text: '',
	created_by: '',
	assigned_to: '',
	status_text: '',
	open: false,
	colors: '',
};

function UpdateForm(props) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, actions) => {
				// TODO: We could return a Promise
				if (values.open) {
					values.open = !values.open;
				}
				props.updateHandler(values);
				actions.setSubmitting(false);
			}}
			render={(props) => {
				// eslint-disable-next-line react/prop-types
				const { handleSubmit, isSubmitting } = props;
				return (
					<Form onSubmit={handleSubmit} id="PostForm">
						<Field className="mb-2" type="text" name="_id" placeholder="*_id" component={BootstrapField} required />
						<Field className="mb-2" type="text" name="issue_title" placeholder="(opt)Title" component={BootstrapField} />
						<Field className="mb-2" type="text" name="issue_text" as="textarea" placeholder="(opt)Text" component={BootstrapField} />
						<Field className="mb-2" type="text" name="created_by" placeholder="(opt)Created by" component={BootstrapField} />
						<Field className="mb-2" type="text" name="assigned_to" placeholder="(opt)Assigned to" component={BootstrapField} />
						<Field className="mb-2" type="text" name="status_text" placeholder="(opt)Status text" component={BootstrapField} />
						<Field className="mb-2" type="checkbox" name="open" label="Check to close issue" component={BootstrapCheck} />
						<br />
						<Button type="submit" variant="primary" disabled={isSubmitting}>Update Issue</Button>
					</Form>
				);
			}}>
		</Formik>
	);
}

UpdateForm.propTypes = {
	updateHandler: PropTypes.func
};

export default UpdateForm;