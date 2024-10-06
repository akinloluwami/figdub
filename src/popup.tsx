import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Popup from "./components/Popup";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
