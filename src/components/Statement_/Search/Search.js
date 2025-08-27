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

    let dateStart = new Date(form.startDate).getTime();
    let dateEnd = new Date(form.endDate).getTime();

    if (form.startDate === "" || form.startDate === undefined) {
      console.log("start-date is required!");
      // return;
    }
    if (form.endDate === "" || form.endDate === undefined) {
      console.log("end-date is required!");
      // return;
    }

    if (dateStart < dateEnd) {
      console.log(`${form.startDate} is less than ${form.endDate}`);
    } else if (dateStart > dateEnd) {
      console.log(`${form.startDate} is greater than ${form.endDate}`);
    } else {
      console.log(`Both dates are equal`);
    }

    var searchObject = {
      startDate: form.startDate,
      endDate: form.endDate,
      minAmount: form.minAmount,
      maxAmount: form.maxAmount,
      entity: form.entity,
    };

    console.log(searchObject);

    sendObjectToParent(searchObject);
  };

  return (
    <div>
      <Form ref={formRef}>
        <div className="searchBox">
          <div className="row ">
            <div className="col-md-2">
              <Form.Label className="searchLabel">Start Date</Form.Label>
            </div>
            <div className="col-md-3">
              <Form.Control
                className="w-30"
                type="date"
                name="startDate"
                placeholder="Start Date"
                onChange={(e) => setField("startDate", e.target.value)}
              />
            </div>
            <div className="col-md-1">
              <Form.Label className="searchLabel">MIN</Form.Label>
            </div>
            <div className="col-md-2">
              <Form.Control
                type="number"
                className="w-30"
                name="minAmount"
                placeholder="00.00"
                onChange={(e) => setField("minAmount", e.target.value)}
              />
            </div>
            <div className="col-md-1">
              <Form.Label className="searchLabel">MAX</Form.Label>
            </div>
            <div className="col-md-2">
              <Form.Control
                type="number"
                className="w-30"
                name="maxAmount"
                placeholder="00.00"
                onChange={(e) => setField("maxAmount", e.target.value)}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-2">
              <Form.Label className="searchLabel">End Date</Form.Label>
            </div>
            <div className="col-md-3">
              <Form.Control
                className="w-30"
                type="date"
                name="endDate"
                placeholder="End Date"
                onChange={(e) => setField("endDate", e.target.value)}
              />
            </div>
            <div className="col-md-1">
              <Form.Label className="searchLabel">TEXT</Form.Label>
            </div>
            <div className="col-md-5">
              <Form.Control
                className="w-30"
                name="entity"
                placeholder="Search Text / Entity"
                onChange={(e) => setField("entity", e.target.value)}
              />
            </div>
          </div>
          <div className="searchBtn">
            <Button
              className="btn btn-light"
              type="button"
              onClick={(e) => handleSubmit(e)}
            >
              <i className="bi bi-search searchIcon"></i>
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Search;
