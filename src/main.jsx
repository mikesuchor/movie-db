import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./styles.css";

createRoot(document.querySelector("#root")).render(<App />);
