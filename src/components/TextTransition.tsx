import { useState, useEffect } from "react";
import "./TextTransition.css"; // Import CSS for styles

const TransitionComponent = ({ initialText, mainText, children }) => {
  const [showInitialText, setShowInitialText] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [initialTextPosition, setInitialTextPosition] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setInitialTextPosition(true); // Move text to the heading position
    }, 1000); // 2 seconds for initial text

    const timer2 = setTimeout(() => {
      setShowInitialText(false);
      setShowMainContent(true); // Show main content
    }, 1500); // 0.5 seconds delay for smooth transition

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="transition-container">
      <div className={`welcome-text ${initialTextPosition ? "move-up" : ""}`}>
        <h1 className="text-center" style={{ color: "white" }}>
          {initialText}
        </h1>
      </div>
      {showMainContent && (
        <div className="main-content">
          <h1 className="text-center" style={{ color: "white" }}>
            {mainText}
          </h1>
          {children}
        </div>
      )}
    </div>
  );
};

export default TransitionComponent;
