import { useState, useEffect } from 'react';
import '../css/flowImage.css';

const FlowImage = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show text after a delay
    setTimeout(() => {
      setShowText(true);
    }, 1000); // Adjust delay as needed
  }, []);

  return (
    <div className="flow-image-container">
      <img src="./src/assets/img/flowImage.svg" alt="Flow Image" className="flow-image" />
      {showText && (
        <div className="text-overlay">
          <p className="slide-text">Text sliding from left to right</p>
        </div>
      )}
    </div>
  );
};

export default FlowImage;
