import React from 'react';
import * as PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

const ResponseModal = props => {
	return (
		<Modal show={props.show} onHide={() => props.setShow(false)}>
			<Modal.Header closeButton>
				<Modal.Title>JSON response</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<pre>{props.response && JSON.stringify(props.response, null, 2)}</pre>
			</Modal.Body>
		</Modal>
	);
};

ResponseModal.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
	response: PropTypes.any,
};

export default ResponseModal;
