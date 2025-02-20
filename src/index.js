import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { createRoot } from "react-dom/client";

import "./index.css";

// bootstrap, bootstrap-icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// react-bootstrap-table-2
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

// react - new version
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
