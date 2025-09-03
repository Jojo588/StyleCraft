import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App>
      {/* Example children */}
      <h1 style={{ fontFamily: "var(--font-playfair)" }}>
        Fashion Customizer - Unleash Your Style
      </h1>
      <p>
        Create outfits that express your personality with our interactive mannequin and fashion customizer.
      </p>
    </App>
  </React.StrictMode>
);
