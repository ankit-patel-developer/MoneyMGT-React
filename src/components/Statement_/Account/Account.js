import React, { useEffect, useState, useRef } from "react";

import "./style.css";

import Moment from "moment";

import {
  getAccountType,
  getEntityName,
  getAmountSign,
} from "../../../services/local.service";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Account = ({ myAccount }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("child component : ", myAccount);
  }, [myAccount]);

  const displayDate = (cell) => {
    if (cell === null || cell === "") return "N/A";
    else {
      return Moment(cell).format("DD-MMM-YYYY");
    }
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
            {((cell * 100) / 100).toFixed(2)}
          </div>
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <TableRow
        key={myAccount.AccountId}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <span className="accountStyle">
            {myAccount.accountNumber}
            <br />
            <span>{getAccountType(myAccount.accountType)}</span>
          </span>
        </TableCell>
        <TableCell align="right">
          <span className="accountStyle">
            {((myAccount.lastBalance * 100) / 100).toFixed(2)}
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <span className="trHeader">Transactions</span>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <span className="statHeader">Date</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="statHeader">Entity</span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="statHeader">Amount ($)</span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="statHeader">Last Balance ($)</span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="statHeader">Current Balance ($)</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myAccount.transactions.map((tr) => (
                    <TableRow key={tr.transactionId}>
                      <TableCell component="th" scope="row">
                        {displayDate(tr.transactionDate)}
                      </TableCell>
                      <TableCell align="left">{getEntityName(tr)}</TableCell>
                      <TableCell align="right">
                        {displayAmount(tr.amountPaid, tr)}
                      </TableCell>
                      <TableCell align="right">
                        {((tr.lastBalance * 100) / 100).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {((tr.currentBalance * 100) / 100).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Account;
