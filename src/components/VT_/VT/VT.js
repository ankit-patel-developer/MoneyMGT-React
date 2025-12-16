import React, { useEffect, useState, useRef } from "react";

import "./style.css";

import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const VT = ({ bankIdVT, accountNumberVT, onSendObject }) => {
  // form
  const [form, setForm] = useState({});
  // reset form
  // form reference
  const formRef = useRef(null);

  const setField = (field, value) => {
    console.log(value);
    console.log(field);
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleVT = (e) => {
    e.preventDefault();

    console.log(form);
    console.log(form.numberOfTransactions);

    var vtObject = {
      bankId: bankIdVT,
      accountNumber: accountNumberVT,
      transactionResponse: false,
    };

    if (Number(form.numberOfTansactions) == Number("0")) {
      // no need to call api
      vtObject.transactionResponse = false;
    } else {
      // call api

      // run VT
      // react-api-sql server sp

      var apiResponse = true;
      if (apiResponse) {
        // success
        // -> display success message @ modal window
        vtObject.transactionResponse = apiResponse;
      } else {
        // fail
        // -> display error message @ modal window
        vtObject.transactionResponse = apiResponse;
      }
    }

    onSendObject(vtObject); // Call the parent's function with the object
  };
  const handleClose = () => {
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
          <Modal.Title>Virtual Transactions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body">
            <Form ref={formRef}>
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <Form.Group controlId="numberOfTransactions">
                    <Form.Label>Transactions</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => {
                        setField(
                          "numberOfTransactions",
                          Number(e.target.value)
                        );
                      }}
                    >
                      <option value="0">---Transactions---</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </Form.Control>
                  </Form.Group>
                  <p></p>
                </div>
              </div>
              <p></p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  className="btn btn-success"
                  type="button"
                  onClick={(e) => handleVT(e)}
                >
                  Run VT
                </Button>
                <Button
                  className="btn btn-primary"
                  type="button"
                  onClick={(e) => handleClose(e)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default VT;
