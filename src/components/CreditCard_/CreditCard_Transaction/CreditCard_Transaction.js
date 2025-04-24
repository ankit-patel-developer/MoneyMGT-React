import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import CCService from "../../../services/credit-cardService.js";
import { getPayeeIcon, getCCTypeColor } from "../../../services/local.service";

import { useNavigate, useLocation } from "react-router";

import Moment from "moment";
const CreditCard_Transaction = () => {
  let navigate = useNavigate();

  const { state } = useLocation();
  const { creditCardId, balance, ccAccountNumber, creditCardName } =
    state || {}; // Read values passed on state

  const [payees, setPayees] = useState([]);

  const [ccTrAddCreateResponse, setCcTrAddCreateResponse] = useState({});

  // form
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  // reset form
  // form reference
  const formRef = useRef(null);

  useEffect(() => {
    if (creditCardId === undefined || balance === undefined)
      navigate("/creditcard");

    listOfPayees();
  }, []);

  const listOfPayees = () => {
    CCService.allPayeesForCCs()
      .then((response) => {
        setPayees(response.data);
        // setPayees(response.data.filter((xx) => xx.payeeType !== 3));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const goBack = (e) => {
    navigate("/credit-card/");
  };

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
    const { payeeId, transactionAmount, transactionDate } = form;
    const newErrors = {};

    if (!payeeId || payeeId === "") newErrors.payeeId = "Payee is Required!";
    if (!transactionDate || transactionDate === "")
      newErrors.transactionDate = "Transaction Date is Required!";

    if (!transactionAmount || transactionAmount === "")
      newErrors.transactionAmount = "Transaction Amount is Required!";

    if (!(!transactionAmount || transactionAmount === "")) {
      if (!checkForNumbersOnly(transactionAmount))
        newErrors.transactionAmount = "Only Numbers are Allowed!";
    }
    return newErrors;
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setForm({});
    setCcTrAddCreateResponse({});
  };
  const renderOptionsForPayees = () => {
    return payees.map((dt, i) => {
      return (
        <option value={dt.payeeId} key={i} name={dt.payeeName}>
          {dt.payeeName}
        </option>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      var ccTransaction = {
        payeeId: Number(form.payeeId),
        transactionAmount: Number(form.transactionAmount),
        transactionDate: form.transactionDate,
        creditCardId: Number(creditCardId),
        balance: Number(balance),
        ccAccountNumber: ccAccountNumber,
      };

      console.log(ccTransaction);

      var trCreateResponse = {
        responseCode: null,
        responseMessage: null,
      };

      // api call
      CCService.payByCreditCard(ccTransaction)
        .then((response) => {
          setCcTrAddCreateResponse({});
          console.log(response.data);

          trCreateResponse = {
            responseCode: response.data.responseCode,
            responseMessage: response.data.responseMessage,
          };
          if (response.data.responseCode === 0) {
            resetForm();
            setCcTrAddCreateResponse(trCreateResponse);

            setTimeout(() => {
              navigate("/credit-card/");
            }, 3000);
          } else if (response.data.responseCode === -1) {
            setCcTrAddCreateResponse(trCreateResponse);
          }
        })
        .catch((error) => {
          if (error.response.request.status === 400) {
            trCreateResponse = {
              responseCode: -1,
              responseMessage: error.response.statusText + " !",
            };
            setCcTrAddCreateResponse(trCreateResponse);
          }
        });
    }
  };
  return (
    <div className="container">
      <div className="mainHeaderCC">Pay By Credit-Card</div>
      <hr />
      <div className="row">
        <div className="col-md-3 mx-auto"></div>
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-12 mx-auto">
                  <div className="row">
                    <div className="col-md-8 mx-auto">
                      <div className="ccHeader">
                        Credit-Card : {creditCardName}
                        <br />
                        CC A/C Number : {ccAccountNumber}
                        <br />
                        Maximum Pay :{" "}
                        <span className="maxPay">
                          ${(Math.round(balance * 100) / 100).toFixed(2)}
                        </span>
                      </div>
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
                </div>
              </div>
              <p></p>
              {ccTrAddCreateResponse &&
              ccTrAddCreateResponse.responseCode === -1 ? (
                <span className="ccTrAddCreateError">
                  {ccTrAddCreateResponse.responseMessage}
                </span>
              ) : (
                <span className="ccTrAddCreateSuccess">
                  {ccTrAddCreateResponse.responseMessage}
                </span>
              )}
            </div>
            <div className="card-body">
              <Form ref={formRef}>
                <div className="row">
                  <div className="col-md-6 mx-auto">
                    <Form.Group controlId="payeeId">
                      <Form.Label>Payee</Form.Label>
                      <Form.Control
                        as="select"
                        isInvalid={!!errors.payeeId}
                        onChange={(e) => {
                          setField("payeeId", e.target.value);
                        }}
                      >
                        <option value="">Select Payee</option>
                        {renderOptionsForPayees()}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.payeeId}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <p></p>
                    <Form.Group controlId="transactionAmount">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        className="qtyField"
                        type="text"
                        isInvalid={!!errors.transactionAmount}
                        onChange={(e) =>
                          setField("transactionAmount", e.target.value)
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.transactionAmount}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <p></p>
                    <Form.Label>Transaction Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="transactionDate"
                      placeholder="Transaction Date"
                      isInvalid={!!errors.transactionDate}
                      onChange={(e) =>
                        setField("transactionDate", e.target.value)
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.transactionDate}
                    </Form.Control.Feedback>
                  </div>
                </div>
                <p></p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    className="btn btn-success"
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Commit Transaction
                  </Button>
                  <Button
                    className="btn btn-primary"
                    type="button"
                    onClick={(e) => resetForm(e)}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-3 mx-auto"></div>
      </div>
    </div>
  );
};

export default CreditCard_Transaction;
