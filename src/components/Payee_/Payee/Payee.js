import React, { useState, useEffect } from "react";
import "./style.css";

import PayeeService from "../../../services/payeeService.js";
import {
  getPayeeIcon,
  getPayeeTypeName,
} from "../../../services/local.service";

import { useNavigate } from "react-router-dom";

// React Bootstrap Table/Pagination
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import Button from "react-bootstrap/Button";

const Payee = () => {
  let navigate = useNavigate();

  const [payees, setPayees] = useState([]);
  const [payeeClass, setPayeeClass] = useState("");

  const getAllPayees = () => {
    PayeeService.allPayees()
      .then((response) => {
        setPayees(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllPayees();
  }, []);

  const displayPayee = (cell, row) => {
    return (
      <div className={displayPayeeTypeStyle(row.payeeType)}>
        <span>
          <i className={getPayeeIcon(row.payeeType)}></i> {row.payeeName}
        </span>

        <div>A/C # {row.payeeACNumber}</div>
      </div>
    );
  };
  const displayPayeeType = (cell, row) => {
    return (
      <div className={displayPayeeTypeStyle(cell)}>
        <span>{getPayeeTypeName(cell)}</span>
      </div>
    );
  };
  const displayBalance = (cell, row) => {
    return (
      <div>
        {row.payeeType === 3 ? (
          <span>
            {Number(cell) > 0 ? (
              <span style={{ color: "green" }}>
                <b>{cell}</b>
              </span>
            ) : (
              <span style={{ color: "red" }}>
                <b>{cell}</b>
              </span>
            )}
          </span>
        ) : (
          <span>{cell}</span>
        )}
      </div>
    );
  };

  const displayPayeeTypeStyle = (cell) => {
    console.log(cell);
    if (cell === 3) return "ccPayeeStyle";
    else return "notCCPayeeStyle";
  };

  const displayActionBtn = (cell, row) => {
    return (
      <div>
        {" "}
        <Button
          className="btn btn-info"
          type="button"
          onClick={(e) => editPayee(e, row.payeeId)}
        >
          <i className="bi bi-pencil-square"></i>
        </Button>
      </div>
    );
  };
  const editPayee = (e, payeeId) => {
    console.log("edit payee : ", payeeId);
    navigate("/payee-edit/" + payeeId);
  };
  const columns = [
    {
      dataField: "payeeId",
      text: "Payee",
      sort: true,
      formatter: (cell, row) => displayPayee(cell, row),
    },
    {
      dataField: "payeeType",
      text: "Type",
      sort: true,
      formatter: (cell, row) => displayPayeeType(cell, row),
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

  const createNewPayee = () => {
    navigate("/payee-create");
  };

  return (
    <div className="container">
      <div className="mainHeader">Payees</div>
      <hr />
      <div className="row">
        <div className="col-md-12 mx-auto">
          <Button
            className="btn btn-primary"
            type="button"
            onClick={(e) => createNewPayee(e)}
          >
            <i className="bi bi-plus-circle"></i> Payee
          </Button>
          <p></p>
          {payees && payees.length > 0 ? (
            <BootstrapTable
              bootstrap4
              keyField="payeeId"
              data={payees}
              columns={columns}
              // rowStyle={getRowStyle}
              pagination={paginationFactory({ sizePerPage: 5 })}
            />
          ) : (
            <div className="noPayees">No Payees!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payee;
