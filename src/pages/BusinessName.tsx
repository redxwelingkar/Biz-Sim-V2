import { useState, useEffect } from "react";
import { To, useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar"; // Ensure the path is correct
import TransitionComponent from "../components/TextTransition"; // Adjust path as needed
import "./BusinessName.css"; // Import the CSS file
import BackButton from "../components/BackButton";

const BusinessToggle = () => {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedBusinessName = localStorage.getItem("businessName");
    if (storedBusinessName) {
      setBusinessName(storedBusinessName);
    }
  }, []);

  const handleBusinessNameChange = (e) => {
    const newName = e.target.value;
    setBusinessName(newName);
    localStorage.setItem("businessName", newName);
    setErrorMessage(""); // Clear error message on input change
  };

  const handleNavigation = (path: To) => {
    if (businessName.trim() === "") {
      setErrorMessage("Please enter the name of the business!");
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <BackButton />
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
            onChange={handleBusinessNameChange}
            className="input"
            placeholder="Enter the name of the business here"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button
            onClick={() => handleNavigation("/Biz-Sim-V2/total-addressable-market")}
            className="button"
          >
            LOOK'S GOOD
          </button>
        </div>
        <Avatar />
      </TransitionComponent>
    </>
  );
};

export default BusinessToggle;
