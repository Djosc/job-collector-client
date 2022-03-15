import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = (props) => {
	const removeAndHide = () => {
		props.rmvJob();
		props.onHide();
	};

	return (
		<>
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Are you sure you want to remove the current job?
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					{/* <Button variant="danger" className="mx-2" onClick={props.rmvJob}> */}
					<Button variant="danger" className="mx-2" onClick={() => removeAndHide()}>
						Remove
					</Button>
					<Button variant="primary" className="mx-2" onClick={props.onHide}>
						Cancel
					</Button>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ConfirmModal;
