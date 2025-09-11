import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const ConfirmationModal = ({
  show,
  onHide,
  onConfirm,
  ambulance,
  isLoading,
  actionType,
}) => {
  if (!ambulance) return null;

  const isBooking = actionType === "book";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          {isBooking ? (
            <FaExclamationTriangle className="text-warning me-2" />
          ) : (
            <FaTimes className="text-danger me-2" />
          )}
          {isBooking ? "Confirm Request" : "Cancel Booking"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {isBooking
            ? "Are you sure you want to request an ambulance from:"
            : "Are you sure you want to cancel your booking for an ambulance from:"}
        </p>
        <h5 className="fw-bold">{ambulance.hospital_name}?</h5>
        <p className="text-muted small mt-3">
          {isBooking
            ? "Please note: This action will dispatch the nearest available unit. Only confirm if this is a genuine emergency."
            : "This action will release the ambulance and it will become available for other patients."}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isLoading}>
          Back
        </Button>
        <Button
          variant={isBooking ? "primary" : "danger"}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Processing...
            </>
          ) : isBooking ? (
            "Yes, Confirm Request"
          ) : (
            "Yes, Cancel Booking"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
