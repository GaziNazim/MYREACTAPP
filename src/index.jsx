import React from "react";
import ReactDOM from "react-dom/client"
import App from "./tic-tac-toi";
import "./../style.css"

let element = document.getElementById("root");

let root = ReactDOM.createRoot(element);

root.render(<App />)