import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header/Header";
import Home from "./components/Home_/Home";
import Bank from "./components/Bank_/Bank/Bank";
import Bank_Create from "./components/Bank_/Bank_Create/Bank_Create";
import Bank_Edit from "./components/Bank_/Bank_Edit/Bank_Edit";

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
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
