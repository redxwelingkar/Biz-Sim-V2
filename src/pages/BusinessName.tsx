import { useState } from "react";
import { To, useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar"; // Ensure the path is correct
import TransitionComponent from "../components/TextTransition"; // Adjust path as needed
import "./BusinessName.css"; // Import the CSS file

const BusinessToggle = () => {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("");

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  return (
    <TransitionComponent
      initialText="Alright! I’ll be your guide through the simulation"
      mainText={
        <span className="main-text">
          Let’s start by naming your business
        </span>
      }
    >
      <div className="container">
        <label htmlFor="businessName" className="label">
          Enter the name of your business here:
        </label>
        <input
          type="text"
          id="businessName"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="input"
        />
        <button
          onClick={() => handleNavigation("/Biz-Sim-V2/business-name")}
          className="button"
        >
          Looks good
        </button>
      </div>
      <Avatar />
    </TransitionComponent>
  );
};

export default BusinessToggle;
