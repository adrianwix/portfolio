import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

function BootstrapField({
							field,
							form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
							...props
						}) {
	return (
		<div>
			<Form.Control {...field} {...props} />
			{touched[field.name] &&
			errors[field.name] && <div className="error">{errors[field.name]}</div>}
		</div>
	)
}

BootstrapField.propTypes = {
	field: PropTypes.shape({
		name: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired,
	}),
	form: PropTypes.shape({
		touched: PropTypes.object,
		errors: PropTypes.object,
	}),
}

export default BootstrapField

