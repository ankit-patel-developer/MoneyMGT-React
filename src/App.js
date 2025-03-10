import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header/Header";
import Home from "./components/Home_/Home";
import Bank from "./components/Bank_/Bank/Bank";
import Bank_Create from "./components/Bank_/Bank_Create/Bank_Create";
import Bank_Edit from "./components/Bank_/Bank_Edit/Bank_Edit";
import Bank_Account_List from "./components/Bank_/Bank_Account_List/Bank_Account_List";
import Deposit_Transaction from "./components/Transaction_/DepositTransaction/DepositTransaction";
import NotFound from "./components/NotFound_/NotFound";
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
