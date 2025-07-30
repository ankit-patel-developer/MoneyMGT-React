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

import Account from "../Account/Account";

const AccountStatement = ({ myAccount }) => {
  let navigate = useNavigate();

  const { state } = useLocation();
  const {
    bankId,
    bankName,
    accountId,
    accountNumber,
    accountType,
    lastBalance,
    transactions,
  } = state || {}; // Read values passed on state

  var myAccount = {
    bankId: state.bankId,
    bankName: state.bankName,
    accountId: state.accountId,
    accountNumber : state.accountNumber,
    accountType : state.accountType,
    lastBalance : state.lastBalance,
    transactions : state.transactions,
  };

  useEffect(() => {
    if (
      bankId === undefined ||
      bankName === undefined ||
      accountId === undefined ||
      accountNumber === undefined
    )
      navigate("/bank");    
  }, []);
 

  const getBankStyle = (bankName) => {
    // return bankName;
    return getBankStyleLocal(bankName);
  };

  return (
    <div className="container">
      <div className="mainHeader">Account-Statement</div>
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
                          [ Last Balance : ${((lastBalance*100)/100).toFixed(2)} ]
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
              <Account myAccount={myAccount} />
            </div>
          </div>
          <p></p>
        </div>
        <div className="col-md-1 mx-auto"></div>
      </div>
    </div>
  );
};

export default AccountStatement;
