import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "/components/ui/dialog";
import { Button } from "/components/ui/button";

const GhostDetailsModal = ({ show, closeModal, ghostDetails, svgURL }) => {
    if (!show) return null;
    return (
        <Dialog
            open={show}
            onOpenChange={closeModal}
            className="flex items-center justify-center min-h-full" // Ensuring that the Dialog's parent has a full height
        >
            <DialogContent
                className="relative mx-auto my-8 p-4 w-full sm:w-3/5 bg-gray-800 rounded-lg flex flex-col items-center justify-center max-h-[60vh] max-w-[60vw] overflow-auto"
                style={{ // These styles will help override default styles that might interfere
                    maxHeight: '80vh', // Same as max-h-[60vh]
                    maxWidth: '80vw', // Same as max-w-[60vw]
                    width: '100%', // Same as w-full
                    height: 'auto', // Allows height to be determined by content, up to the maximum
                }}
            >
                <DialogHeader>
                    <DialogTitle>Ghost Metadata</DialogTitle>
                </DialogHeader>
                <div className="overflow-auto flex-grow p-2">
                    <div className="p-4">
                        <object type="image/svg+xml" data={svgURL} className="modal-svg" />
                        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                            {JSON.stringify(ghostDetails, null, 2)}
                        </pre>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={closeModal}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default GhostDetailsModal;





















/*
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

*/