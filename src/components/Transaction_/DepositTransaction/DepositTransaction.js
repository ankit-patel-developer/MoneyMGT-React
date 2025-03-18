import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import TransactionService from "../../../services/transactionService.js";
import {
  getBankColor,
  getAccountType,
  getAccountColor,
} from "../../../services/local.service";

import { useNavigate, useLocation } from "react-router";

import Moment from "moment";

const DepositTransaction = () => {
  let navigate = useNavigate();

  const { state } = useLocation();
  const { bankId, bankName, accountId, accountNumber, balance, accountType } =
    state || {}; // Read values passed on state

  const [sources, setSources] = useState([]); // $ DEPOSIT from
  const [modelErrors, setModelErrors] = useState([]);
  const [depositCreateResponse, setDepositCreateResponse] = useState({});

  // form
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  // reset form
  // form reference
  const formRef = useRef(null);

  useEffect(() => {
    if (accountId === undefined || balance === undefined)
      navigate("/bank-account-list" + bankId);

    allSources();
  }, []);

  const allSources = () => {
    TransactionService.allSources()
      .then((response) => {
        setSources(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getBankStyle = (bankName) => {
    return bankName;
  };
  const goBack = (e) => {
    navigate("/bank-account-list/" + bankId);
  };

  const resetForm = (e) => {
    formRef.current.reset();
    setErrors({});
    setForm({});
    setDepositCreateResponse({});
    setModelErrors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      var bankTransaction = {
        sourceId: Number(form.sourceId),
        transactionAmount: Number(form.transactionAmount),
        transactionDate: form.transactionDate,
        bankId: Number(bankId),
        accountId: accountId,
        balance: Number(balance),
      };

      console.log(bankTransaction);

      var trCreateResponse = {
        responseCode: null,
        responseMessage: null,
      };

      // api call
      TransactionService.depositFromSource(bankTransaction)
        .then((response) => {
          setModelErrors([]);
          setDepositCreateResponse({});
          console.log(response.data);

          trCreateResponse = {
            responseCode: response.data.responseCode,
            responseMessage: response.data.responseMessage,
          };
          if (response.data.responseCode === 0) {
            resetForm();
            setDepositCreateResponse(trCreateResponse);

            setTimeout(() => {
              navigate("/bank-account-list/" + bankId);
            }, 3000);
          } else if (response.data.responseCode === -1) {
            setDepositCreateResponse(trCreateResponse);
          }
        })
        .catch((error) => {
          if (error.response.request.status === 400) {
            trCreateResponse = {
              responseCode: -1,
              responseMessage: error.response.statusText + " !",
            };
            setDepositCreateResponse(trCreateResponse);
          }
        });
    }
  };

  const findFormErrors = () => {
    const { sourceId, transactionAmount, transactionDate } = form;
    const newErrors = {};

    if (!sourceId || sourceId === "")
      newErrors.sourceId = "Deposit From is Required!";
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

  const renderOptionsForSources = () => {
    return sources.map((dt, i) => {
      return (
        <option value={dt.sourceId} key={i} name={dt.sourceName}>
          {dt.sourceName}
        </option>
      );
    });
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
    <div className="container">
      <div className="mainHeader">Transaction-Deposit</div>
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
                      <div className="bankName">{bankName}</div>
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

                  <div></div>

                  <div className="bankHeader">
                    Account : {accountNumber} [{accountType}]
                    <br />
                    Current Balance :{" "}
                    {(Math.round(balance * 100) / 100).toFixed(2)}
                  </div>
                </div>
                <div className="col-md-2 mx-auto"></div>
              </div>
              <p></p>
              {depositCreateResponse &&
              depositCreateResponse.responseCode === -1 ? (
                <span className="depositCreateError">
                  {depositCreateResponse.responseMessage}
                </span>
              ) : (
                <span className="depositCreateSuccess">
                  {depositCreateResponse.responseMessage}
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
                    <Form.Group controlId="sourceId">
                      <Form.Label>Deposit From</Form.Label>
                      <Form.Control
                        as="select"
                        isInvalid={!!errors.sourceId}
                        onChange={(e) => {
                          setField("sourceId", e.target.value);
                        }}
                      >
                        <option value="">---Deposit From---</option>
                        {renderOptionsForSources()}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.sourceId}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <p></p>
                    <Form.Group controlId="transactionAmount">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        className="qtyField w-50"
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
                      className="w-80"
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

export default DepositTransaction;
