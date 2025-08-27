import React, { useEffect, useState, useRef } from "react";

import "./style.css";

import Moment from "moment";

import {
  getAccountType,
  getEntityName,
  getAmountSign,
} from "../../../services/local.service";

import Search from "../Search/Search";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";
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

const Account = ({ myAccount, lastBalance, statementType }) => {
  // this is main object that holds all transactions @ beginning
  // and altered when searchObject is changed by
  // Search child-component
  const [filteredData, setFilteredData] = useState([]);

  // get object from child component [Search]
  const [searchObject, setSearchObject] = useState(null);

  // runs when searchObject is changed by Search child-component
  useEffect(() => {
    const filterData = () => {
      let tempFilteredData = myAccount.transactions;

      // date search
      if (
        searchObject !== null &&
        searchObject.startDate &&
        searchObject.endDate
      ) {
        const start = new Date(searchObject.startDate);
        const end = new Date(searchObject.endDate);

        tempFilteredData = myAccount.transactions.filter((item) => {
          const itemDate = new Date(item.transactionDate);
          return itemDate >= start && itemDate <= end;
        });
      } else if (searchObject !== null && searchObject.startDate) {
        const start = new Date(searchObject.startDate);
        tempFilteredData = myAccount.transactions.filter((item) => {
          const itemDate = new Date(item.transactionDate);
          return itemDate >= start;
        });
      } else if (searchObject !== null && searchObject.endDate) {
        const end = new Date(searchObject.endDate);
        tempFilteredData = myAccount.transactions.filter((item) => {
          const itemDate = new Date(item.transactionDate);
          return itemDate <= end;
        });
      }

      // amount search
      let tempFilteredDataAmount = tempFilteredData;
      if (
        searchObject !== null &&
        searchObject.minAmount &&
        searchObject.maxAmount
      ) {
        tempFilteredDataAmount = tempFilteredData.filter((item) => {
          return (
            item.amountPaid >= parseInt(searchObject.minAmount, 10) &&
            item.amountPaid <= parseInt(searchObject.maxAmount, 10)
          );
        });
      } else if (searchObject !== null && searchObject.minAmount) {
        tempFilteredDataAmount = tempFilteredData.filter((item) => {
          return item.amountPaid >= parseInt(searchObject.minAmount, 10);
        });
      } else if (searchObject !== null && searchObject.maxAmount) {
        tempFilteredDataAmount = tempFilteredData.filter((item) => {
          return item.amountPaid <= parseInt(searchObject.maxAmount, 10);
        });
      }

      // [sourceName / payeeName] entity search
      let tempFilteredDataEntity = tempFilteredDataAmount;
      if (searchObject !== null && searchObject.entity) {
        tempFilteredDataEntity = tempFilteredDataAmount.filter((item) => {
          return (
            item.sourceName
              .toLowerCase()
              .includes(searchObject.entity.toLowerCase()) ||
            item.payeeName
              .toLowerCase()
              .includes(searchObject.entity.toLowerCase())
          );
        });
      }

      setFilteredData(tempFilteredDataEntity);
    };
    filterData();
  }, [searchObject]);

  // event handler connects with Search child-component
  const handleObjectFromChild = (searchObject) => {
    setSearchObject(searchObject);
    console.log("Object received in Parent:", searchObject);
  };

  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState(true);

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };
  // Calculate the data to display for the current page
  const displayedRows = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    console.log(lastBalance);
    console.log("child component : ", myAccount);

    if (myAccount.transactions.length >= 1) {
      setDisplay(true);
      setFilteredData(myAccount.transactions);
    } else setDisplay(false);
  }, [myAccount]);

  const displayDate = (cell) => {
    if (cell === null || cell === "") return "N/A";
    else {
      // return Moment(cell).format("mm:ss:SSS");
      // YYYY-MM-DD
      return Moment(cell).format("YYYY-MM-DD");
    }
  };

  const displayAmount = (cell, row) => {
    return (
      <div>
        {row.transactionType === 0 && (
          <div className="plusTran">
            {getAmountSign(row.transactionType)}&nbsp;
            {((cell * 100) / 100).toFixed(2)}
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
        key={parseInt(myAccount.AccountId)}
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
          {statementType == "Account" && (
            <span className="accountStyle">
              <span>{getAccountType(myAccount.accountType)}</span>
              &nbsp;&nbsp;[{myAccount.accountNumber}]
            </span>
          )}
        </TableCell>

        {statementType == "Bank" && (
          <TableCell component="th" scope="row">
            <span className="accountStyle">
              <span>{getAccountType(myAccount.accountType)}</span>
              <br />[{myAccount.accountNumber}]
            </span>
          </TableCell>
        )}

        {lastBalance && (
          <TableCell align="right">
            <span className="accountStyle">
              ${((myAccount.lastBalance * 100) / 100).toFixed(2)}
            </span>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {!display ? (
                  <span className="trHeaderNoData">No Transactions !</span>
                ) : (
                  <div className="row">
                    <div className="col-md-12">
                      <Search onSendObject={handleObjectFromChild} />
                    </div>
                  </div>
                )}
              </Typography>
              <Table size="small">
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
                  {displayedRows.map((tr) => (
                    <TableRow>
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
              <TablePagination
                className="paginationDiv"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Account;
