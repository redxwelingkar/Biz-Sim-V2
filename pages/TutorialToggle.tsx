import * as React from "react";
import CButton from "../components/CButton";
import Avatar from "../components/Avatar";


const TutorialToggle = () => {
  const log = () => {
    console.log("====================================");
    console.log(`Button Click`);
    console.log("====================================");
  };
  return (
    <>
      <div className="full-screen center-column">
        <h1>Hi! Welcome to Business Simulation</h1>
        <h2>Do you want tutorials to guide you?</h2>
        <div  className="m-2">
        <CButton onClick={log}> Yes</CButton>
        <CButton onClick={log}> No</CButton>
        </div>
      <Avatar/>
      </div>
    </>
  );
};

export default TutorialToggle;
