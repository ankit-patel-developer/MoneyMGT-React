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

import Account from "../Account/Account";

const Accounts = ({ myAccounts }) => {
  useEffect(() => {
    console.log("child component : ", myAccounts);
  }, [myAccounts]);

  return (
    <div>
      {myAccounts && myAccounts.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <span className="statHeader">Account</span>
                </TableCell>
                <TableCell align="right">
                  <span className="statHeader">Last Balance ($)</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myAccounts.map((myAccount) => (
                <Account key={myAccount.accountId} myAccount={myAccount} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="noTrans">No Accounts!</div>
      )}
    </div>
  );
};

export default Accounts;
