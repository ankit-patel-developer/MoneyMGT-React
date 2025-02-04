import React from "react";

import { useState, useEffect } from "react";
import "./style.css";
import BankService from "../../services/bank.service";
import { getBankColor } from "../../services/local.service";
import { useNavigate } from "react-router-dom";

// react-bootstrap-table-2
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

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
    return { backgroundColor: bankColor };
  };
  const displayBankId = (cell, row) => {
    return (
      <div>
        <span>
          <i className="bi bi-bank"></i> {cell}
        </span>
      </div>
    );
  };
  const displayActionBtn = (cell, row) => {
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
              rowStyle={getBankStyle}
              columns={columns}
              pagination={paginationFactory({ sizePerPage: 5 })}
              filter={filterFactory()}
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
