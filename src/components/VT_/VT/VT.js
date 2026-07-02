import React, { useEffect, useState, useRef } from "react";

import "./style.css";

import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import vtService from "../../../services/vtService.js";

const VT = ({ bankIdVT, accountNumberVT, bankNameVT, onSendObject }) => {
  const [vtObject, setVtObject] = useState({});

  // form
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  // reset form
  // form reference
  const formRef = useRef(null);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };
  const findFormErrors = () => {
    const { transactionType, numberOfTransactions } = form;
    const newErrors = {};

    if (!transactionType || transactionType === "")
      newErrors.transactionType = "Error!";
    if (!numberOfTransactions || numberOfTransactions === "")
      newErrors.numberOfTransactions = "Error!";

    return newErrors;
  };

  const handleVTDeposit = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    setVtObject({});

    var vtObject_ = {
      bankId: Number(bankIdVT),
      accountNumber: accountNumberVT,
      transactionResponse: false,
      numberOfTransactions: "",
      transactionType: "",
    };

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // no need to call api
      vtObject_.bankId = null;
      vtObject_.accountNumber = null;
      vtObject_.transactionResponse = false;
      vtObject_.numberOfTransactions = "";
      vtObject_.transactionType = "";

      setVtObject({
        transactionResponse: false,
        apiResponse: "BAD REQUEST !",
      });
    } else {
      // call api

      // run VT
      // react-api-sql server sp
      // api call
      vtObject_.numberOfTransactions = Number(form.numberOfTransactions);
      vtObject_.transactionType = Number(form.transactionType);

      if (vtObject_.transactionType <= 1) {
        // deposit
        vtService
          .depositVT(vtObject_)
          .then((response) => {
            if (response.data.transactionResponse === true) {
              vtObject_.transactionResponse = true;

              setVtObject({
                transactionResponse: true,
                apiResponse: "SUCCESS !",
              });

              // 2 seconds delay
              setTimeout(() => {
                onSendObject(vtObject_);
                // Call the parent's function with the object
              }, 2000);
            } else {
              setVtObject({
                transactionResponse: false,
                apiResponse: "SERVER ERROR !",
              });
            }
          })
          .catch((error) => {
            if (error.response.request.status === 400) {
              setVtObject({
                transactionResponse: false,
                apiResponse: "BAD REQUEST !",
              });
              vtObject_.transactionResponse = false;
            }
          });
      } else {
        // withdraw
        vtService
          .withdrawVT(vtObject_)
          .then((response) => {
            if (response.data.transactionResponse === true) {
              vtObject_.transactionResponse = true;

              setVtObject({
                transactionResponse: true,
                apiResponse: "SUCCESS !",
              });

              // 2 seconds delay
              setTimeout(() => {
                onSendObject(vtObject_);
                // Call the parent's function with the object
              }, 2000);
            } else {
              setVtObject({
                transactionResponse: false,
                apiResponse: "SERVER ERROR !",
              });
            }
          })
          .catch((error) => {
            if (error.response.request.status === 400) {
              setVtObject({
                transactionResponse: false,
                apiResponse: "BAD REQUEST !",
              });
              vtObject_.transactionResponse = false;
            }
          });
      }
    }
  };
  const handleClose = () => {
    setErrors({});
    setForm({});
    setVtObject({});
    var vtObject = {
      bankId: null,
      accountNumber: null,
      numberOfTransactions: "",
      transactionType: "",
      transactionResponse: false,
    };
    onSendObject(vtObject); // Call the parent's function with the object
  };

  return (
    <div>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="vtModelWindow">
              <u>Virtual Transactions</u>
              <p></p>
              <span>
                {bankNameVT} ({accountNumberVT})
              </span>
            </div>
            <p></p>
            {vtObject !== null && !vtObject.transactionResponse ? (
              <div className="errorApiResponse">
                <span>{vtObject.apiResponse}</span>
              </div>
            ) : (
              <div className="successApiResponse">
                <span>{vtObject.apiResponse}</span>
              </div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body">
            <Form ref={formRef}>
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <Form.Group controlId="transactionType">
                    <Form.Label>Transaction Type</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => {
                        setField("transactionType", e.target.value);
                      }}
                    >
                      <option value="">---Transaction Type---</option>
                      <option value="1">Deposit</option>
                      <option value="2">Withdraw</option>
                    </Form.Control>
                  </Form.Group>
                  <p></p>
                  <Form.Group controlId="numberOfTransactions">
                    <Form.Label>Transactions</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => {
                        setField("numberOfTransactions", e.target.value);
                      }}
                    >
                      <option value="">---Transactions---</option>
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
                  onClick={(e) => handleVTDeposit(e)}
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
