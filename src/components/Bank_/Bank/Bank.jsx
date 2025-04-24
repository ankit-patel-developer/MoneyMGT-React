import React from "react";

import { useState, useEffect } from "react";
import "./style.css";
import BankService from "../../../services/bankService.js";
import {
  getBankColor,
  getBankStyleLocal,
} from "../../../services/local.service";
import { useNavigate } from "react-router-dom";

// React Bootstrap Table/Pagination
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import Button from "react-bootstrap/Button";

const Bank = () => {
  let navigate = useNavigate();

  const [banks, setBanks] = useState([]);

  useEffect(() => {
    getAllBanks();
  }, []);

  const getAllBanks = () => {
    BankService.allBanks()
      .then((response) => {
        setBanks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getBankStyle = (bankName) => {
    // return bankName;
    return getBankStyleLocal(bankName);
  };

  const displayBank = (cell, row) => {
    return (
      <div>
        &nbsp;
        <Button
          className="btn btn-info"
          type="button"
          onClick={(e) => editBank(e, row.bankId)}
        >
          <i className="bi bi-pencil-square"></i>
        </Button>
        &nbsp;&nbsp;
        <span className={getBankStyle(cell)}>
          <i className="bi bi-bank">
            {" "}
            <b>{cell}</b>{" "}
          </i>
        </span>
        <Button
          className="btn btn-success rightAlign"
          type="button"
          onClick={(e) => getAccounts(e, row.bankId)}
        >
          <i className="bi bi-arrow-bar-right"></i> Accounts
        </Button>
      </div>
    );
  };

  const columns = [
    {
      dataField: "bankName",
      text: "Bank",
      sort: true,
      formatter: (cell, row) => displayBank(cell, row),
    },
  ];

  const createNewBank = () => {
    navigate("/bank-create");
  };
  const editBank = (e, bankId) => {
    console.log("edit bank : ", bankId);
    navigate("/bank-edit/" + bankId);
  };
  const getAccounts = (e, bankId) => {
    console.log("getting accounts for bank : ", bankId);
    navigate("/bank-account-list/" + bankId);
  };

  return (
    <div className="container">
      <div className="mainHeader">Banks</div>
      <hr />
      <div className="row">
        <div className="col-md-3 mx-auto"></div>
        <div className="col-md-6 mx-auto">
          <Button
            className="btn btn-primary"
            type="button"
            onClick={(e) => createNewBank(e)}
          >
            <i className="bi bi-plus-circle"></i> Bank
          </Button>
          <p></p>
          {banks && banks.length > 0 ? (
            <BootstrapTable
              bootstrap4
              keyField="bankId"
              data={banks}
              columns={columns}
              pagination={paginationFactory({ sizePerPage: 5 })}
            ></BootstrapTable>
          ) : (
            <div className="noBanks">No Banks!</div>
          )}
        </div>
        <div className="col-md-3 mx-auto"></div>
      </div>
    </div>
  );
};

export default Bank;
