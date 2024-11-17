import React from "react";
import "./MainApplication.css"; // Import the CSS file
import Terminal from "./Terminal/Terminal";

const MainApplication = () => {
  return (
    // <Terminal></Terminal>
    <div className="container">
      <div className="box top-left">
        <p>Hello</p>
      </div>
      <div className="box top-right">
        <p>Hello</p>
      </div>
      <div className="box bottom-left">
        <Terminal/>
      </div>
      <div className="box bottom-right">
        <p>Hello</p>
      </div>
    </div>
  );
};

export default MainApplication;

