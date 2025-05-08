import { useState, useEffect } from 'react';
import '../css/Footer.css';

interface FooterProps {
  onNext?: () => void;
  onNextPercent?: () => void;
  onNextsizeofSAM?: () => void;
  onNextshowCalSAMBTN?: () => void;
  texts: string[]; // Add texts prop
}

const Footer = ({ onNext,onNextPercent,onNextsizeofSAM,onNextshowCalSAMBTN, texts }: FooterProps) => {
  const [textIndex, setTextIndex] = useState(0);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBlink(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleUpArrowClick = () => {
    if (textIndex > 0) {
      setTextIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleDownArrowClick = () => {
    console.log("Arrow Index",textIndex);
    
    if (textIndex < texts.length - 1) {
      setTextIndex(prevIndex => prevIndex + 1);
      if (textIndex === 0) {
        if (onNext) {
          onNext(); // Call onNext when the first down arrow click occurs
        }
        if (onNextPercent) {
          onNextPercent(); // Call onNextPercent when dowm arrow click occurs
        }
      }
      if (textIndex === 1) {
        if (onNextsizeofSAM) {
          onNextsizeofSAM(); // Call onNextsizeofSAM when dowm arrow click occurs on index 1
        }
      }
      if (textIndex === 2) {
        if (onNextshowCalSAMBTN) {
          onNextshowCalSAMBTN(); // Call onNextshowCalSAMBTN when dowm arrow click occurs on index 2
        }
      }
    }
    setBlink(false); // Stop blinking when the button is clicked
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <img src="./src/assets/img/avatar.png" alt="Image" className="footer-image" />
      </div>
      <div className="footer-middle">
        <p className="footer-text">{texts[textIndex]}</p>
      </div>
      <div className="footer-right">
        <button
          className={`footer-icon ${textIndex === 0 ? 'disabled' : ''}`}
          onClick={handleUpArrowClick}
          disabled={textIndex === 0}
        >
          <img src="./src/assets/img/upward_arrow.png" alt="Up Arrow" className="arrow-image" />
        </button>
        <button
          className={`footer-icon ${blink && textIndex < texts.length - 1 ? 'blink' : ''} ${textIndex === texts.length - 1 ? 'disabled' : ''}`}
          onClick={handleDownArrowClick}
          disabled={textIndex === texts.length - 1}
        >
          <img src="./src/assets/img/downward_arrow.png" alt="Down Arrow" className="arrow-image" />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
