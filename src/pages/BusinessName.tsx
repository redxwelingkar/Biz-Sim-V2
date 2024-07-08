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
        <input
          type="text"
          id="businessName"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="input"
          placeholder="Enter the name of the business here"
        />
        <button
          onClick={() => handleNavigation("/Biz-Sim-V2/total-addressable-market")}
          className="button"
        >
          LOOK'S GOOD
        </button>
      </div>
      <Avatar />
    </TransitionComponent>
  );
};

export default BusinessToggle;
