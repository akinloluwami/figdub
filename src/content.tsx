import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ContentModal from "./components/ContentModal";

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ContentModal />
  </React.StrictMode>
);
