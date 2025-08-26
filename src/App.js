import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header_/Header";
import Home from "./components/Home_/Home";
import Bank from "./components/Bank_/Bank/Bank";
import Bank_Create from "./components/Bank_/Bank_Create/Bank_Create";
import Bank_Edit from "./components/Bank_/Bank_Edit/Bank_Edit";
import Bank_Account_List from "./components/Bank_/Bank_Account_List/Bank_Account_List";
import Deposit_Transaction from "./components/Transaction_/DepositTransaction/DepositTransaction";
import Withdraw_Transaction from "./components/Transaction_/WithdrawTransaction/WithdrawTransaction";
import Payee from "./components/Payee_/Payee/Payee";
import Payee_Create from "./components/Payee_/Payee_Create/Payee_Create";
import Payee_Edit from "./components/Payee_/Payee_Edit/Payee_Edit";
import CreditCard from "./components/CreditCard_/CreditCard/CreditCard";
import CreditCard_Transaction from "./components/CreditCard_/CreditCard_Transaction/CreditCard_Transaction";
import BankStatement from "./components/Statement_/BankStatement/BankStatement";
import AccountStatement from "./components/Statement_/AccountStatement/AccountStatement";
import VirstualTransactions from "./components/VT_/Virtual_Transactions";

import NotFound from "./components/NotFound_/NotFound";
import Virtual_Transactions from "./components/VT_/Virtual_Transactions";

function App() {
  return (
    <div className="App">
      <div className="main-wrapper">
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bank" element={<Bank />} />
            <Route path="/bank-create" element={<Bank_Create />} />
            <Route path="/bank-edit/:id" element={<Bank_Edit />} />
            <Route
              path="/bank-account-list/:id"
              element={<Bank_Account_List />}
            />

            <Route
              path="/deposit-transaction"
              element={<Deposit_Transaction />}
            />
            <Route
              path="/withdraw-transaction"
              element={<Withdraw_Transaction />}
            />
            <Route path="/payee" element={<Payee />} />
            <Route path="/payee-create" element={<Payee_Create />} />
            <Route path="/payee-edit/:id" element={<Payee_Edit />} />

            <Route path="/credit-card" element={<CreditCard />} />
            <Route
              path="/credit-card-transaction"
              element={<CreditCard_Transaction />}
            />

            <Route path="/bank-statement" element={<BankStatement />} />

            <Route path="/account-statement" element={<AccountStatement />} />

            <Route path="/virtual-transactions" element={<Virtual_Transactions />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
