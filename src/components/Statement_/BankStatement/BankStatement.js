import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {
  getBankStyle,
  getBankStyleLocal,
  getBankColor,
  getPayeeTypeName,
  getAmountSign,
  getTransactionTypeDisplay,
} from "../../../services/local.service";

import { useNavigate, useLocation } from "react-router";

import Moment from "moment";

import Accounts from "../Accounts/Accounts";

const BankStatement = () => {
  let navigate = useNavigate();

  const { state } = useLocation();
  const { bankId, bankName, bankAccounts, totalBalance } = state || {}; // Read values passed on state

  useEffect(() => {
    if (bankId === undefined || bankName === undefined) navigate("/bank");
  }, []);

  const getBankStyle = (bankName) => {
    // return bankName;
    return getBankStyleLocal(bankName);
  };

  return (
    <div className="container">
      <div className="mainHeader">Bank-Statement</div>
      <hr />
      <div className="row">
        <div className="col-md-1 mx-auto"></div>
        <div className="col-md-10 mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-10 mx-auto">
                  <div>
                    {bankId !== undefined && bankName !== undefined ? (
                      <div className={getBankStyle(bankName)}>
                        {bankName}

                        <span className="totalBalance">
                          [ Total Balance : ${totalBalance} ]
                        </span>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
                <div className="col-md-2 mx-auto"></div>
              </div>
            </div>
            <div className="card-body">
              <Accounts myAccounts={bankAccounts} />
            </div>
          </div>
          <p></p>
        </div>
        <div className="col-md-1 mx-auto"></div>
      </div>
    </div>
  );
};

export default BankStatement;
