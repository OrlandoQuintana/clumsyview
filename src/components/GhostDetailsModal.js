// GhostDetailsModal.js

import React from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";

const GhostDetailsModal = ({ show, closeModal, ghostDetails, svgURL }) => {
    return (
        <Modal className="custom-modal" show={show} onHide={closeModal} size="lg" centered>
            <Modal.Header>
                <Modal.Title>Ghost Details</Modal.Title>
                <CloseButton variant="white" onClick={closeModal}></CloseButton>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-body-content">
                    <object type="image/svg+xml" data={svgURL} className="modal-svg" />
                    <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{JSON.stringify(ghostDetails, null, 2)}</pre>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GhostDetailsModal;

