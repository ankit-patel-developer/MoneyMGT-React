import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import PayeeService from "../../../services/payeeService.js";

import { useNavigate } from "react-router";

import Moment from "moment";
const Payee_Create = () => {
  let navigate = useNavigate();

  const [modelErrors, setModelErrors] = useState([]);
  const [payeeTypes, setPayeeTypes] = useState([]);
  const [payeeCreateResponse, setPayeeCreateResponse] = useState({});

  // form
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const getPayeeTypes = () => {
    PayeeService.allPayeeTypes()
      .then((response) => {
        console.log(response.data);
        setPayeeTypes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPayeeTypes();
  }, []);

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

  const checkForNumbersOnly = (newVal) => {
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal)) return true;
    else return false;
  };

  const findFormErrors = () => {
    const { payeeName, description, payeeACNumber, payeeType, balance } = form;
    const newErrors = {};

    if (!payeeName || payeeName === "")
      newErrors.payeeName = "Payee Name is Required!";
    if (!description || description === "")
      newErrors.description = "Description is Required!";
    if (!payeeACNumber || payeeACNumber === "")
      newErrors.payeeACNumber = "Payee A/C No is Required!";
    if (!payeeType || payeeType === "")
      newErrors.payeeType = "Payee Type is Required!";

    if (!balance || balance === "") newErrors.balance = "Balance is Required!";
    if (!(!balance || balance === "")) {
      if (!checkForNumbersOnly(balance))
        newErrors.balance = "Only Numbers are Allowed!";
    }
    return newErrors;
  };

  const goBack = (e) => {
    navigate("/payee");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      var payeeModel = {
        payeeName: form.payeeName,
        description: form.description,
        payeeACNumber: form.payeeACNumber,
        payeeType: Number(form.payeeType),
        balance: Number(form.balance),
      };

      console.log(payeeModel);

      var payeeCreateResponse = {
        responseCode: null,
        responseMessage: null,
      };

      // api call
      PayeeService.createPayee(payeeModel)
        .then((response) => {
          setModelErrors([]);
          setPayeeCreateResponse({});
          console.log(response.data);

          payeeCreateResponse = {
            responseCode: response.data.responseCode,
            responseMessage: response.data.responseMessage,
          };
          if (response.data.responseCode === 0) {
            resetForm();
            setPayeeCreateResponse(payeeCreateResponse);

            setTimeout(() => {
              navigate("/payee");
            }, 3000);
          } else if (response.data.responseCode === -1) {
            setPayeeCreateResponse(payeeCreateResponse);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.request.status === 400) {
            payeeCreateResponse = {
              responseCode: -1,
              responseMessage: error.response.statusText + " !",
            };
            setPayeeCreateResponse(payeeCreateResponse);
          }
        });
    }
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setForm({});
    setPayeeCreateResponse({});
    setModelErrors([]);
  };

  const renderOptionsForPayeeTypes = () => {
    return payeeTypes.map((dt, i) => {
      return (
        <option value={i} key={i} name={dt}>
          {dt}
        </option>
      );
    });
  };

  return (
    <div className="container">
      <div className="mainHeader">Payees</div>
      <hr />
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-header header">
              <div className="row">
                <div className="col-md-8 mx-auto">
                  <h3>Create New Payee</h3>
                </div>
                <div className="col-md-4 ml-auto">
                  <div className="d-flex justify-content-end">
                    <Button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => goBack(e)}
                    >
                      <i className="bi bi-arrow-return-left"></i> Back
                    </Button>
                  </div>
                </div>
              </div>
              <p></p>{" "}
              {payeeCreateResponse &&
              payeeCreateResponse.responseCode === -1 ? (
                <span className="payeeCreateError">
                  {payeeCreateResponse.responseMessage}
                </span>
              ) : (
                <span className="payeeCreateSuccess">
                  {payeeCreateResponse.responseMessage}
                </span>
              )}
            </div>
            <div className="card-body">
              <Form ref={formRef}>
                <div className="row">
                  <div className="col-md-6 mx-auto">
                    <Form.Group controlId="payeeName">
                      <Form.Label>Payee Name</Form.Label>
                      <Form.Control
                        type="text"
                        isInvalid={!!errors.payeeName}
                        onChange={(e) => setField("payeeName", e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.payeeName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <p></p>
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="5"
                        isInvalid={!!errors.description}
                        onChange={(e) =>
                          setField("description", e.target.value)
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mx-auto">
                    <Form.Group controlId="payeeType">
                      <Form.Label>Payee Type</Form.Label>
                      <Form.Control
                        as="select"
                        isInvalid={!!errors.payeeType}
                        onChange={(e) => {
                          setField("payeeType", e.target.value);
                        }}
                      >
                        <option value="">Select Payee Type</option>
                        {renderOptionsForPayeeTypes()}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.payeeType}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <p></p>
                    <Form.Group controlId="payeeACNumber">
                      <Form.Label>A/C Number</Form.Label>
                      <Form.Control
                        type="text"
                        isInvalid={!!errors.payeeACNumber}
                        onChange={(e) =>
                          setField("payeeACNumber", e.target.value)
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.payeeACNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <p></p>
                    <Form.Group controlId="balance">
                      <Form.Label>Balance</Form.Label>
                      <Form.Control
                        className="qtyField"
                        type="text"
                        isInvalid={!!errors.balance}
                        onChange={(e) => setField("balance", e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.balance}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>

                <p></p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    className="btn btn-success"
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Create Payee
                  </Button>
                  <Button
                    className="btn btn-primary"
                    type="button"
                    onClick={(e) => resetForm(e)}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payee_Create;
