import React, { useEffect, useState, useRef } from "react";

import "./style.css";

import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const VT = ({ bankIdVT, accountNumberVT, onSendObject }) => {
  const handleClose = () => {
    // run VT
    // react-api-sql server sp
    // success
    // -> display success message @ modal window

    // fail
    // -> display error message @ modal window

    var vtObject = {
      bankId: bankIdVT,
      accountNumber: accountNumberVT,
      transactionResponse: true,
    };
    onSendObject(vtObject); // Call the parent's function with the object
  };

  return (
    <div>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VT;
