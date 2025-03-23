import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";


const routerOptions = {
  future: { 
    v7_startTransition: true,
    v7_relativeSplatPath: true 
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter {...routerOptions}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
