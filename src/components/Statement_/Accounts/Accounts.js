import React, { useEffect, useState, useRef } from "react";

// react-bootstrap-table-2
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import "./style.css";

import Moment from "moment";

import {
  getAccountType,
  getAccountColor,
} from "../../../services/local.service";

import Transactions from "../Transactions/Transactions";

const Accounts = ({ myAccounts }) => {
  useEffect(() => {
    console.log("child component : ", myAccounts);
  }, [myAccounts]);

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
  const displayLastBalance = (cell, row) => {
    return (
      <div>
        <span>
          <h5>${(Math.round(cell * 100) / 100).toFixed(2)}</h5>
        </span>
      </div>
    );
  };
  const displayAccountNumber = (cell, row) => {
    return (
      <div>
        <span>
          <i className="bi bi-bag"></i> <b>{cell}</b>
        </span>
      </div>
    );
  };

  const columns = [
    {
      dataField: "accountNumber",
      text: "A/C #",
      sort: true,
      formatter: (cell, row) => displayAccountNumber(cell, row),
    },
    {
      dataField: "accountType",
      text: "A/C-Type",
      sort: true,
      formatter: (cell, row) => displayAcType(cell, row),
    },
    {
      dataField: "lastBalance",
      text: "Last-Balance",
      sort: true,
      formatter: (cell, row) => displayLastBalance(cell, row),
    },
  ];
  return (
    <div>
      {myAccounts && myAccounts.length > 0 ? (
        <BootstrapTable
          bootstrap4
          keyField="accountNumber"
          data={myAccounts}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 50 })}
          // filter={filterFactory()}
        />
      ) : (
        <div className="noTrans">No Accounts!</div>
      )}
    </div>
  );
};

export default Accounts;
