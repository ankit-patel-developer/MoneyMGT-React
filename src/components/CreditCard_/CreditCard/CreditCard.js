import React, { useState, useEffect } from "react";
import "./style.css";

import CCService from "../../../services/credit-cardService.js";
import { getPayeeIcon, getCCTypeColor } from "../../../services/local.service";

import { useNavigate } from "react-router-dom";

// React Bootstrap Table/Pagination
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

const CreditCard = () => {
  let navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };

  const [creditcards, setCreditcards] = useState([]);

  const allCCs = () => {
    CCService.allCCs()
      .then((response) => {
        console.log(response.data);
        setCreditcards(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    allCCs();
  }, []);

  const displayCreditCardName = (cell, row) => {
    return (
      <div className="ccStyle">
        <Button
          className="btn btn-info"
          type="button"
          onClick={(e) => ccTransactionBegin(e, row)}
        >
          <span className="payByBtnText">PAY BY</span>&nbsp;
          <i className="bi bi-credit-card"></i>
        </Button>
        &nbsp;
        <span>
          <i className={getPayeeIcon(row.payeeType)}></i> {cell}
        </span>
        <div>A/C # {row.creditCardNumber}</div>
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
                <b>${(Math.round(cell * 100) / 100).toFixed(2)}</b>
              </span>
            ) : (
              <span style={{ color: "red" }}>
                <b>${(Math.round(cell * 100) / 100).toFixed(2)}</b>
              </span>
            )}
          </span>
        ) : (
          <span>${(Math.round(cell * 100) / 100).toFixed(2)}</span>
        )}
      </div>
    );
  };

  const columns = [
    {
      dataField: "creditCardName",
      text: "Credit-Card",
      sort: true,
      formatter: (cell, row) => displayCreditCardName(cell, row),
    },
    {
      dataField: "balance",
      text: "Balance",
      sort: true,
      formatter: (cell, row) => displayBalance(cell, row),
    },
  ];

  const ccTransactionBegin = (e, cc) => {
    // if balance is 0
    if (cc.balance <= 0) {
      console.log("balance is zero!");
      showModal();
    } else {
      var ccTransaction = {
        creditCardId: cc.creditCardId,
        balance: cc.balance,
        ccAccountNumber: cc.creditCardNumber,
        creditCardName: cc.creditCardName,
      };
      console.log(ccTransaction);

      navigate("/credit-card-transaction", {
        state: ccTransaction,
      });
    }
  };
  return (
    <div className="container">
      <div className="mainHeader">PAY BY... Credit-Cards</div>
      <hr />
      <div className="row">
        <div className="col-md-12 mx-auto">
          {creditcards && creditcards.length > 0 ? (
            <BootstrapTable
              bootstrap4
              keyField="creditCardId"
              data={creditcards}
              columns={columns}
              // rowStyle={getRowStyle}
              pagination={paginationFactory({ sizePerPage: 5 })}
            />
          ) : (
            <div className="noCCs">No Credit-Cards!</div>
          )}
        </div>
        <p></p>
        <Modal className="modelWindow" show={isOpen} onHide={hideModal}>
          <Modal.Header>
            <Modal.Title>Warning !!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>You can not pay by this Credit-Card !</h4>
            <p></p>
            <h5>Balance is $0.00 !</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-warning"
              type="button"
              onClick={hideModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CreditCard;
