import React from "react";
import ReactDOM from "react-dom/client";
// Importing styles
import "normalize.css";
import "./index.css";
import App from "./App";
// Context
import { AppProvider } from "./context/appContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
