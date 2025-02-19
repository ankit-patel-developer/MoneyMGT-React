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
  const getBankStyle = (row, rowIdx) => {
    var bankColor = getBankColor(row.bankName);
    console.log(bankColor);
    // return { backgroundColor: bankColor };
    return { backgroundColor: "green" };
  };

  const displayBankId = (cell, row) => {
    return (
      <div>
        <span>
          <i className="bi bi-bank"></i>
          {cell}
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
      <h3>Banks!</h3>
      <p></p>
      {banks && banks.length > 0 ? (
        <BootstrapTable
          bootstrap4
          keyField="bankId"
          data={banks}
          // rowStyle={getBankStyle}
          rowStyle={{ backgroundColor: "red" }}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 5 })}
        />
      ) : (
        <div className="noBanks">No Banks!</div>
      )}
    </div>
  );
};

export default Bank;
