import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import BankService from "../../../services/bankService.js";
import {
  getBankColor,
  getAccountType,
  getAccountColor,
  getBankStyleLocal,
} from "../../../services/local.service";
import AccountService from "../../../services/accountService.js";
import StatementService from "../../../services/statementService.js";

import { useNavigate } from "react-router";

import Moment from "moment";

// react-bootstrap-table-2
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const Bank_Account_List = () => {
  let navigate = useNavigate();

  let { id } = useParams();

  const [bankAccounts, setBankAccounts] = useState([]);
  const [bankName, setBankName] = useState("");
  const [bankAcResponse, setBankAcResponse] = useState("");
  const [responseColor, setResponseColor] = useState("");

  // state var passing to bank-statement component
  // { bankId, bankName, [] bankAccounts-> {,,, [] transactions} }

  const checkForNumbersOnly = (newVal) => {
    const re = /^\d*\.?\d*$/;
    if (re.test(newVal)) return true;
    else return false;
  };

  const getBankStyle = (bankName) => {
    // return bankName;
    return getBankStyleLocal(bankName);
  };

  const getBankAccounts = (id) => {
    console.log("getting accounts for bank : ", id);
    if (checkForNumbersOnly(id)) {
      setBankAcResponse("");
      setResponseColor("");
      AccountService.getBankAccounts(id)
        .then((response) => {
          console.log(response.data);
          if (response.data.bankName === null) {
            setBankAcResponse("Bank Not Found !");
            setResponseColor("red");
          } else {
            setBankAccounts(response.data.accounts);
            setBankName(response.data.bankName);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    getBankAccounts(id);
  }, []);

  const displayAcType = (cell, row) => {
    return (
      <div>
        <b>
          <span style={{ color: `${getAccountColor(cell)}` }}>
            {getAccountType(cell)}
          </span>
        </b>
      </div>
    );
  };

  const displayAccountNumber = (cell, row) => {
    return (
      <div>
        <span>
          <Button
            className="btn btn-warning"
            type="button"
            onClick={(e) => editBankAccount(e, id, cell)}
          >
            <i className="bi bi-pencil-square"></i>
          </Button>
          &nbsp;
          <i className="bi bi-bag"></i> <b>{cell}</b>
        </span>
      </div>
    );
  };
  const displayActionBtn = (cell, row) => {
    return (
      <div>
        {" "}
        <div className="marginBtwnBtns">
          <Button
            className="btn btn-danger"
            type="button"
            onClick={(e) => doWithdraw(e, row)}
          >
            Withdraw
          </Button>
        </div>
        <div className="marginBtwnBtns">
          <Button
            className="btn btn-success"
            type="button"
            onClick={(e) => doDeposit(e, row)}
          >
            Deposit
          </Button>
        </div>
        <div className="marginBtwnBtns">
          <Button
            className="btn btn-info"
            type="button"
            // onClick={(e) => getAccountStatementAll(e, row)}
          >
            Statement
          </Button>
        </div>{" "}
      </div>
    );
  };

  const displayBalance = (cell, row) => {
    return (
      <div>
        <span>
          <h5>${(Math.round(cell * 100) / 100).toFixed(2)}</h5>
        </span>
      </div>
    );
  };
  const columns = [
    {
      dataField: "accountNumber",
      text: "Account Number",
      sort: true,
      formatter: (cell, row) => displayAccountNumber(cell, row),
    },
    {
      dataField: "accountType",
      text: "Account Type",
      sort: true,
      formatter: (cell, row) => displayAcType(cell, row),
    },
    {
      dataField: "balance",
      text: "Balance",
      sort: true,
      formatter: (cell, row) => displayBalance(cell, row),
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => displayActionBtn(cell, row),
    },
  ];

  const goBack = (e) => {
    navigate("/bank");
  };

  // deposit
  const doDeposit = (e, account) => {
    var depositTransactionObj = {
      bankId: id,
      bankName: bankName,
      accountId: account.accountId,
      accountNumber: account.accountNumber,
      balance: account.balance,
      accountType: getAccountType(account.accountType),
    };
    console.log(depositTransactionObj);

    navigate("/deposit-transaction", {
      state: depositTransactionObj,
    });
  };

  // withdraw
  const doWithdraw = (e, account) => {
    var bankTransaction = {
      bankId: id,
      bankName: bankName,
      accountId: account.accountId,
      accountNumber: account.accountNumber,
      balance: account.balance,
      accountType: getAccountType(account.accountType),
    };
    console.log(bankTransaction);

    navigate("/withdraw-transaction", {
      state: bankTransaction,
    });
  };

  // wip
  const createNewAccount = (e, bankId) => {
    console.log(bankId);
  };

  // wip
  const editBankAccount = (e, bankId, accountId) => {
    console.log(bankId, accountId);
  };

  // wip
  const getBankStatement = () => {
    var bank = {
      bankId: parseInt(id),
      bankName: bankName,
    };
    console.log(bank);

    // api call
    StatementService.getBankStatement(bank)
      .then((response) => {
        if (response.data.responseCode === -1) {
          // server error
          // bank has no a/c yet
          console.log(response.data.responseMessage);
        } else {
          // bank statement data
          console.log(response.data);

          // state var passing to bank-statement component
          // { bankId, bankName, [] bankAccounts-> {,,, [] transactions} }
          navigate("/bank-statement", {
            state: {
              bankId: response.data.bankId,
              bankName: response.data.bankName,
              bankAccounts: response.data.bankAccounts,
              totalBalance: (
                Math.round(
                  bankAccounts.reduce(
                    (accum, item) => accum + item.balance,
                    0
                  ) * 100
                ) / 100
              ).toFixed(2),
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 400) console.log(error.response.statusText);
      });
  };

  return (
    <div className="container">
      <div className="mainHeader">Bank-Accounts</div>
      <hr />
      <div className="row">
        <div className="col-md-1 mx-auto"></div>
        <div className="col-md-10 mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-10 mx-auto">
                  {bankAcResponse ? (
                    <h4 style={{ color: responseColor }}>{bankAcResponse}</h4>
                  ) : (
                    <div>
                      <div className={getBankStyle(bankName)}>
                        {bankName}

                        <span className="totalBalance">
                          [ Total Balance : $
                          {(
                            Math.round(
                              bankAccounts.reduce(
                                (accum, item) => accum + item.balance,
                                0
                              ) * 100
                            ) / 100
                          ).toFixed(2)}{" "}
                          ]
                        </span>
                        <div>
                          <Button
                            className="btn btn-warning"
                            type="button"
                            onClick={(e) => createNewAccount(e, id)}
                          >
                            <i className="bi bi-person-plus-fill"></i>{" "}
                            <span className="newAccount">
                              Create New Account!
                            </span>
                          </Button>
                          &nbsp;
                          <Button
                            className="btn btn-info"
                            type="button"
                            onClick={(e) => getBankStatement()}
                          >
                            <i className="bi bi-list-columns"></i>{" "}
                            <span className="newAccount">Bank Statement</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md-2 mx-auto">
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
          <p></p>
          {bankAccounts && bankAccounts.length > 0 ? (
            <BootstrapTable
              bootstrap4
              keyField="accountId"
              data={bankAccounts}
              columns={columns}
              pagination={paginationFactory({ sizePerPage: 5 })}
              // filter={filterFactory()}
            />
          ) : (
            <div className="noBanks">No Accounts!</div>
          )}
        </div>
        <div className="col-md-1 mx-auto"></div>
      </div>
    </div>
  );
};

export default Bank_Account_List;
