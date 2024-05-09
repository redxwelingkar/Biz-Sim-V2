import * as React from "react";
import {useNavigate} from "react-router-dom";

import Avatar from "../components/Avatar";


const TutorialToggle = () => {
  const navigate= useNavigate()

  const BusinessName = () => {
      navigate("/Biz-Sim-V2/business-name");
  };
  const Home = () => {
      navigate("/Biz-Sim-V2/Home");
  };

  return (
    <>
      <div className="full-screen center-column">
        <h1>Hi! Welcome to Business Simulation</h1>
        <h2>Do you want tutorials to guide you?</h2>
        <div  className="m-2">
        <button onClick={BusinessName}> Yes</button>
        <button onClick={Home}> No</button>
        </div>
      <Avatar/>
      </div>
    </>
  );
};

export default TutorialToggle;
