import { useState, useEffect } from "react";
import { To, useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar"; // Ensure the path is correct
import BackButton from "../components/BackButton";
import "../css/GreetingsPage.css"; // Import CSS for styles

const TutorialToggle = () => {
  const navigate = useNavigate();
  const [showInitialText, setShowInitialText] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [initialTextPosition, setInitialTextPosition] = useState(false);

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setInitialTextPosition(true); // Move text to the heading position
    }, 1000); // 1 second for initial text

    const timer2 = setTimeout(() => {
      setShowInitialText(true);
      setShowMainContent(true); // Show main content
    }, 2000); // 2 seconds delay for smooth transition

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <div className="transition-container">
      <BackButton />
        {showInitialText && (
          <div className={`welcome-text ${initialTextPosition ? "move-up" : ""}`} >
            <h1 className="text-center" style={{ color: "white" }}>
              Hi! Welcome to Business Simulation
            </h1>
          </div>
        )}
        {showMainContent && (
          <div className="main-content">
            <h1 className="main-text text-center" style={{ color: "white" }}>
              Do you want tutorials to guide you?
            </h1>
            <div className="m-2">
              <button className="btns" onClick={() => handleNavigation("/Biz-Sim-V2/business-name")}>
                YES
              </button>
              <button className="btns" onClick={() => handleNavigation("/Biz-Sim-V2/Home")}>
                NO
              </button>
            </div>
            <Avatar />
          </div>
        )}
      </div>
    </>
  );
};

export default TutorialToggle;
