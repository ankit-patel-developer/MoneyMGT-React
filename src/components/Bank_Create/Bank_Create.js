import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import BankService from "../../services/bankService.js";

import { useNavigate } from "react-router";

import Moment from "moment";
const Bank_Create = () => {
  let navigate = useNavigate();

  const [modelErrors, setModelErrors] = useState([]);

  const [bankCreateResponse, setBankCreateResponse] = useState({});

  // form
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {}, []);

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
    const { bankName } = form;
    const newErrors = {};

    if (!bankName || bankName === "")
      newErrors.bankName = "Bank Name is Required!";

    return newErrors;
  };

  const handleModelState = (error) => {
    var errors = [];
    if (error.response.status === 400) {
      if (error.response.data.error !== undefined) {
        // model state
        for (let prop in error.response.data.error) {
          errors.push(error.response.data.error[prop]);
        }
      } else {
        // 400
        errors.push(error.response.statusText);
      }
    } else {
      console.log(error);
    }
    return errors;
  };

  const goBack = (e) => {
    navigate("/bank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      var bankModel = {
        bankName: form.bankName,
      };

      // api call

      BankService.createBank(bankModel)
        .then((response) => {
          setModelErrors([]);
          setBankCreateResponse({});
          console.log(response.data);

          var bankCreateResponse = {
            responseCode: response.data.responseCode,
            responseMessage: response.data.responseMessage,
          };
          if (response.data.responseCode === 0) {
            resetForm();
            setBankCreateResponse(bankCreateResponse);

            setTimeout(() => {
              navigate("/bank");
            }, 3000);
          } else if (response.data.responseCode === -1) {
            setBankCreateResponse(bankCreateResponse);
          }
        })
        .catch((error) => {
          console.log(error);
          setModelErrors([]);
          setBankCreateResponse({});
          // 400
          // ModelState
          if (error.response.status === 400) {
            var modelErrors = handleModelState(error);
            setModelErrors(modelErrors);
          }
        });
    }
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setForm({});
    setBankCreateResponse({});
    setModelErrors([]);
  };

  let modelErrorList =
    modelErrors.length > 0 &&
    modelErrors.map((item, i) => {
      return (
        <ul key={i} value={item}>
          <li style={{ marginTop: -20 }}>{item}</li>
        </ul>
      );
    }, this);

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-header header">
                <div className="row">
                  <div className="col-md-8 mx-auto">
                    <h3>Create New Bank</h3>
                  </div>
                  <div className="col-md-4 mx-auto">
                    <Button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => goBack(e)}
                    >
                      <i className="bi bi-arrow-return-left"></i> Back
                    </Button>
                  </div>
                </div>
                <p></p>{" "}
                {bankCreateResponse &&
                bankCreateResponse.responseCode === -1 ? (
                  <span className="bankCreateError">
                    {bankCreateResponse.responseMessage}
                  </span>
                ) : (
                  <span className="bankCreateSuccess">
                    {bankCreateResponse.responseMessage}
                  </span>
                )}
                {modelErrors.length > 0 ? (
                  <div className="modelError">{modelErrorList}</div>
                ) : (
                  <span></span>
                )}
              </div>
              <div className="card-body">
                <Form ref={formRef}>
                  <div className="row">
                    <div className="col-md-6 mx-auto">
                      <Form.Group controlId="bankName">
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control
                          type="text"
                          isInvalid={!!errors.bankName}
                          onChange={(e) => setField("bankName", e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.bankName}
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
                      Create Bank
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
    </div>
  );
};

export default Bank_Create;
