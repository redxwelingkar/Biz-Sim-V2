import { useState } from "react";
import { To, useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar"; // Ensure the path is correct
import TransitionComponent from "../components/TextTransition"; // Adjust path as needed
import "./BusinessName.css"; // Import the CSS file

const BusinessToggle = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [mainTextVisible, setMainTextVisible] = useState(true); // State to track main text visibility

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setMainTextVisible(false); // Hide main text when "Learn more" is clicked
  };

  return (
    <TransitionComponent
      initialText="Alright! Lets build your business"
      mainText={
        mainTextVisible ? (
          <span className="main-text">
            We’ll start with defining and calculating the Total Addressable Market (TAM)
          </span>
        ) : null
      }
      initialTextHeight="320px" // Adjust this value as needed
    >
      <div className="container">
        <p>
          It refers to the maximum size of the opportunity for a particular product or solution.
          In other words, if every single person who could potentially find value in a product or
          solution purchased/started using it (i.e. 100% market share), how big would that market be?
        </p>
        <button onClick={toggleShowMore} className="learn-more-button">
          Learn more
        </button>
        {showMore && (
          <p className="more-text">
            It refers to the maximum size of the opportunity
            for a particular product or solution.
          </p>
        )}
        <button
          onClick={() => handleNavigation("/Biz-Sim-V2/tam-calculation")}
          className="button"
        >
          LET'S START
        </button>
      </div>
      <Avatar />
    </TransitionComponent>
  );
};

export default BusinessToggle;
