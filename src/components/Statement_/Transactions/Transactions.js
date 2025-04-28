import React, { useEffect, useState, useRef } from "react";

// react-bootstrap-table-2
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


import "./style.css";

import Moment from "moment";

import {
  getBankColor,
  getPayeeTypeName,
  getAmountSign,
  getTransactionTypeDisplay,
} from "../../../services/local.service";

const Transactions = ({ myTransactions }) => {
  useEffect(() => {
    console.log("child component : ", myTransactions);
  }, [myTransactions]);

  const displayEntity = (cell, row) => {
    return (
      <div>
        <span>
          {row.transactionType === 0 && row.sourceId && row.payeeId === 0 ? (
            <span>{row.sourceName}</span>
          ) : (
            <span>
              {cell} - [{getPayeeTypeName(row.payeeType)}]
            </span>
          )}
        </span>
      </div>
    );
  };
  const displayAmount = (cell, row) => {
    return (
      <div>
        {row.transactionType === 0 && (
          <div className="plusTran">
            {getAmountSign(row.transactionType)}&nbsp;
            {cell}
          </div>
        )}

        {row.transactionType === 1 && (
          <div className="minusTran">
            {getAmountSign(row.transactionType)}&nbsp;
            {cell}
          </div>
        )}
      </div>
    );
  };
  const displayDate = (cell) => {
    if (cell === null || cell === "") return "N/A";
    else {
      return Moment(cell).format("DD-MMM-YYYY");
    }
  };
  const displayTransactionType = (cell, row) => {
    return getTransactionTypeDisplay(row.transactionType);
  };

  const columns = [
    {
      dataField: "bankTransactionId",
      text: "#",
      sort: true,
    },
    {
      dataField: "transactionTypeDisplay",
      text: "Type",
      sort: true,
      formatter: (cell, row) => displayTransactionType(cell, row),
    },
    {
      dataField: "payeeName",
      text: "Entity",
      sort: true,
      formatter: (cell, row) => displayEntity(cell, row),
    },
    {
      dataField: "amountPaid",
      text: "$Amount$",
      sort: true,
      formatter: (cell, row) => displayAmount(cell, row),
    },
    {
      dataField: "currentBalance",
      text: "$Current$",
      sort: true,
    },
    {
      dataField: "lastBalance",
      text: "$Last$",
      sort: true,
    },
    {
      dataField: "transactionDate",
      text: "Date",
      sort: true,
      formatter: (cell, row) => displayDate(cell, row),
    },
  ];
  return (
    <div>
      {myTransactions && myTransactions.length > 0 ? (
        <BootstrapTable
          bootstrap4
          keyField="bankTransactionId"
          data={myTransactions}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 50 })}
          // filter={filterFactory()}
        />
      ) : (
        <div className="noTrans">No Transactions!</div>
      )}
    </div>
  );
};

export default Transactions;
