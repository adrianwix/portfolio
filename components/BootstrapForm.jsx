import React from 'react';
import * as PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { Form, Button } from 'react-bootstrap';
import BootstrapField from './BootstrapField';
import BootstrapCheck from './BootstrapCheck';

/**
 *
 * @param className
 * @param fields
 * @param buttonValue
 * @param buttonVariant
 * @param updateHandler
 * @returns {*}
 * @constructor
 */
function BootstrapForm({
	className,
	fields,
	buttonValue,
	buttonVariant,
	updateHandler,
}) {
	const initialValues = {};

	fields.forEach(field => {
		if (typeof field.initialValue !== 'undefined') {
			initialValues[field.name] = field.initialValue;
		} else {
			initialValues[field.name] = field.type !== 'checkbox' ? '' : false;
		}
	});

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, actions) => {
				updateHandler(values);
				actions.setSubmitting(false);
			}}
			enableReinitialize={true}
			render={props => {
				// eslint-disable-next-line react/prop-types
				const { handleSubmit, isSubmitting } = props;
				return (
					<Form onSubmit={handleSubmit} className={className}>
						{fields.map((field, index) => (
							<Field
								key={index}
								className="mb-2"
								type={field.type}
								name={field.name}
								placeholder={field.placeholder}
								component={
									field.type !== 'checkbox' ? BootstrapField : BootstrapCheck
								}
								required={field.required}
							/>
						))}
						<Button
							type="submit"
							variant={buttonVariant}
							disabled={isSubmitting}
						>
							{buttonValue}
						</Button>
					</Form>
				);
			}}
		/>
	);
}

BootstrapForm.defaultProps = {
	buttonValue: 'submit',
	buttonVariant: 'success',
};

BootstrapForm.propTypes = {
	updateHandler: PropTypes.func,
	className: PropTypes.any,
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			placeholder: PropTypes.string,
			required: PropTypes.bool,
			initialValue: PropTypes.any,
		}).isRequired
	).isRequired,
	buttonValue: PropTypes.string.isRequired,
	buttonVariant: PropTypes.string.isRequired,
};

export default BootstrapForm;
