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
  const { bankId, bankName, accountId, accountNumber, balance } = state || {}; // Read values passed on state

  const [sources, setSources] = useState([]); // $ INPUT from
  const [modelErrors, setModelErrors] = useState([]);
  const [bankTrAddCreateResponse, setBankTrAddCreateResponse] = useState({});

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

  return (
    <div className="container">
      <div className="mainHeader">Bank-Accounts</div>
      <hr />
      <div className="row">
        <div className="col-md-2 mx-auto"></div>
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-header {getBankStyle(bankName)}">
              <div className="row">
                <div className="col-md-12 mx-auto">
                  <h4 className="title">TRANSACTION : DEPOSIT</h4>
                  <div className="bankHeader">
                    Bank : {bankName}
                    <br />
                    Account Number : {accountNumber}
                    <br />
                    Current Balance : {balance}
                  </div>
                </div>
                <div className="col-md-2 mx-auto"></div>
              </div>
              <p></p>
            </div>
            <div className="card-body"></div>
          </div>
        </div>
        <div className="col-md-2 mx-auto"></div>
      </div>
    </div>
  );
};

export default DepositTransaction;
