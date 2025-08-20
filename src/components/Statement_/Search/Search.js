import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import TransactionService from "../../../services/transactionService.js";
import {
  getBankColor,
  getAccountType,
  getAccountColor,
} from "../../../services/local.service";

import { useNavigate, useLocation } from "react-router";

import Moment from "moment";

const Search = ({ onSendObject }) => {
  // form
  const [form, setForm] = useState({});

  // reset form
  // form reference
  const formRef = useRef(null);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const sendObjectToParent = (searchObject) => {
     onSendObject(searchObject); // Call the parent's function with the object    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let date1 = new Date(form.startDate).getTime();
    let date2 = new Date(form.endDate).getTime();

    if (form.startDate === "" || form.startDate === undefined) {
      console.log("start-date is required!");
      // return;
    }
    if (form.endDate === "" || form.endDate === undefined) {
      console.log("end-date is required!");
      // return;
    }

    if (date1 < date2) {
      console.log(`${form.startDate} is less than ${form.endDate}`);
    } else if (date1 > date2) {
      console.log(`${form.startDate} is greater than ${form.endDate}`);
    } else {
      console.log(`Both dates are equal`);
    }

    var searchObject = {
      startDate: form.startDate,
      endDate: form.endDate,
    };

      console.log(searchObject);
      
      sendObjectToParent(searchObject);
  };

  return (
    <div>
      <Form ref={formRef}>
        <div className="searchBox">
          <div className="row ">
            <div className="col-md-4">
              <Form.Label className="searchLabel">Start Date</Form.Label>
            </div>
            <div className="col-md-6">
              <Form.Control
                className="w-30"
                type="date"
                name="startDate"
                placeholder="Start Date"
                onChange={(e) => setField("startDate", e.target.value)}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4">
              <Form.Label className="searchLabel">End Date</Form.Label>
            </div>
            <div className="col-md-6">
              <Form.Control
                className="w-30"
                type="date"
                name="endDate"
                placeholder="End Date"
                onChange={(e) => setField("endDate", e.target.value)}
              />
            </div>
          </div>
          <div className="searchBtn">
            <Button
              className="btn btn-success"
              type="button"
              onClick={(e) => handleSubmit(e)}
            >
              Search
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Search;
