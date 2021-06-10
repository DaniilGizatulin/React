import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalConfirm = ({ show, handleClose, remove, label }) => {


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>{label} 🧐 </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose()
                    }}>
                        No
    </Button>
                    <Button variant="primary" onClick={() => {
                        remove()
                        handleClose()
                    }}>
                        Yes, sure!
    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm;