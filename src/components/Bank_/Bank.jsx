import React from "react";

import { useState, useEffect } from "react";
import "./style.css";
import BankService from "../../services/bankService.js";
import { getBankColor } from "../../services/local.service";
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
    return bankName;
  };

  const displayBankId = (cell, row) => {
    return (
      <div>
        <span>
          <i className="bi bi-bank">
            {" "}
            <b>{cell}</b>{" "}
          </i>
        </span>
      </div>
    );
  };

  const displayBank = (cell, row) => {
    return (
      <div>
        <span className={getBankStyle(cell)}>
          <i className="bi bi-bank">
            {" "}
            <b>{cell}</b>{" "}
          </i>
        </span>
      </div>
    );
  };
  const displayActionBtn = (cell, row) => {
    // console.log(row);
    return (
      <div>
        {" "}
        <Button
          className="btn btn-info"
          type="button"
          onClick={(e) => editBank(e, row.bankId)}
        >
          <i className="bi bi-pencil-square"></i>
        </Button>{" "}
        <Button
          className="btn btn-danger"
          type="button"
          onClick={(e) => removeBank(e, row.bankId)}
        >
          <i className="bi bi-trash"></i>
        </Button>{" "}
        <Button
          className="btn btn-success"
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
      dataField: "bankId",
      text: "#",
      sort: true,
      formatter: (cell, row) => displayBankId(cell, row),
    },
    {
      dataField: "bankName",
      text: "Bank Name",
      sort: true,
      formatter: (cell, row) => displayBank(cell, row),
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => displayActionBtn(cell, row),
    },
  ];

  const createNewBank = () => {
    navigate("/bank-create");
  };
  const editBank = (e, bankId) => {
    console.log("edit bank : ", bankId);
    navigate("/bank-edit/" + bankId);
  };
  const removeBank = (e, bankId) => {
    console.log("remove bank : ", bankId);
    navigate("/bank-remove/" + bankId);
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
        <div className="col-md-2 mx-auto"></div>
        <div className="col-md-8 mx-auto">
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
            />
          ) : (
            <div className="noBanks">No Banks!</div>
          )}
        </div>
        <div className="col-md-2 mx-auto"></div>
      </div>
    </div>
  );
};

export default Bank;
