import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaPhone, FaTimes } from "react-icons/fa";

const BookingStatusModal = ({ show, onHide, ambulance, onCancel }) => {
  if (!ambulance) {
    return null; // Don't render if there's no ambulance data
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Ambulance Requested!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You have successfully requested an ambulance from:</p>
        <h5 className="fw-bold">{ambulance.hospital_name}</h5>
        <hr />
        <p className="mb-1">
          <strong>Driver:</strong> {ambulance.driver_name}
        </p>
        <p>
          <strong>Driver's Contact:</strong> {ambulance.driver_phone}
        </p>
        <p className="text-muted small">
          The driver will contact you shortly for confirmation.
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="danger" onClick={onCancel}>
          <FaTimes className="me-2" /> Cancel Request
        </Button>
        <a href={`tel:${ambulance.driver_phone}`} className="btn btn-success">
          <FaPhone className="me-2" /> Call Driver
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingStatusModal;
