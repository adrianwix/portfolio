import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function BootstrapCheck({
	field,
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) {
	return (
		<div>
			{console.log('Field', field)}
			<Form.Check {...field} {...props} />
			{touched[field.name] &&
				errors[field.name] && <div className="error">{errors[field.name]}</div>}
		</div>
	);
}

BootstrapCheck.propTypes = {
	field: PropTypes.shape({
		name: PropTypes.any.isRequired,
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired
	}),
	form: PropTypes.shape({
		touched: PropTypes.object,
		errors: PropTypes.object
	}),
};

export default BootstrapCheck;

