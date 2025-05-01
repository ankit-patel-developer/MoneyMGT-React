import React, { useEffect, useState, useRef } from "react";

import Moment from "moment";

import { getAccountType } from "../../../services/local.service";

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
          <span>
            {myAccount.accountNumber}
            <br />
            <span>{getAccountType(myAccount.accountType)}</span>
          </span>
        </TableCell>
        <TableCell align="right">
          {((myAccount.lastBalance * 100) / 100).toFixed(2)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <span className="title">Transactions</span>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <span className="header">Transaction #</span>
                    </TableCell>
                    <TableCell>
                      <span className="header">Current Balance</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="header">Last Balance</span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="header">Amount ($)</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myAccount.transactions.map((tr) => (
                    <TableRow key={tr.transactionId}>
                      <TableCell component="th" scope="row">
                        {tr.bankTransactionId}
                      </TableCell>
                      <TableCell>
                        {((tr.currentBalance * 100) / 100).toFixed(2)}
                      </TableCell>
                      <TableCell align="left">
                        {((tr.lastBalance * 100) / 100).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {((tr.amountPaid * 100) / 100).toFixed(2)}
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
