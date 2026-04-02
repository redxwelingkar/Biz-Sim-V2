import { useState, useEffect } from 'react';
import '../css/Footer.css';

interface FooterProps {
  onNext?: () => void;
  onNextPercent?: () => void;
  onNextsizeofSAM?: () => void;
  onNextshowCalSAMBTN?: () => void;
  onNextOPDays?: () => void;
  onNextSAMPercent?: () => void;
  onNextshowTAMIcon?: () => void;
  onNextshowSAMIcon?: () => void;
  onNextshowCSPIcon?: () => void;
  onNextshowSOMIcon?: () => void;
  CalSAMBTNclick?: boolean;
  texts: string[]; // Add texts prop
}

const Footer = ({ onNext, onNextPercent, onNextsizeofSAM, onNextOPDays, onNextSAMPercent, onNextshowCSPIcon,onNextshowSOMIcon, onNextshowCalSAMBTN, onNextshowSAMIcon, onNextshowTAMIcon, CalSAMBTNclick, texts }: FooterProps) => {
  const [textIndex, setTextIndex] = useState(0);
  const [blink, setBlink] = useState(false);
  const [down_Arrow, setdown_Arrow] = useState(CalSAMBTNclick);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBlink(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // console.log("texts.length", texts.length, "texts.length-1", texts.length - 1)
    // setdown_Arrow(CalSAMBTNclick)
    if (CalSAMBTNclick) setdown_Arrow(false)
  }, [CalSAMBTNclick])

  const handleUpArrowClick = () => {
    if (textIndex > 0) {
      setTextIndex(prevIndex => prevIndex - 1);
      console.log("Arrow Index", textIndex);
    }
  };

  const handleDownArrowClick = () => {
    console.log("Arrow Index", textIndex);
    // console.log("down_Arrow", down_Arrow);

    if (textIndex < texts.length - 1) {
      setTextIndex(prevIndex => prevIndex + 1);
      if (textIndex === 0) {
        if (onNext) {
          onNext(); // Call onNext when the first down arrow click occurs
        }
        if (onNextPercent) {
          onNextPercent(); // Call onNextPercent when dowm arrow click occurs
        }
        if(onNextSAMPercent){
          onNextSAMPercent(); //call onNextSAMPercent when down arror on index 0
        }
      }
      if (textIndex === 1) {
        if (onNextsizeofSAM) {
          onNextsizeofSAM(); // Call onNextsizeofSAM when dowm arrow click occurs on index 1
        }
        if (onNextOPDays) {
          onNextOPDays(); // Call onNextCSP when dowm arrow click occurs on index 1
        }
        
      }
      if (textIndex === 2) {
        if (onNextshowTAMIcon) {
          onNextshowTAMIcon(); // Call onNextshowTAMIcon when dowm arrow click occurs on index 2
        }
        if (onNextshowCalSAMBTN) {
          setdown_Arrow(true)
          onNextshowCalSAMBTN(); // Call onNextshowCalSAMBTN when dowm arrow click occurs on index 2
        }
        if (onNextshowSOMIcon) {
          onNextshowSOMIcon(); // Call onNextshowCalSAMBTN when dowm arrow click occurs on index 2
        }

      }
      if (textIndex === 3) {
        if (onNextshowSAMIcon) {
          onNextshowSAMIcon(); // Call onNextshowSAMIcon when dowm arrow click occurs on index 3
        }
        if (onNextshowCSPIcon) {
          onNextshowCSPIcon()// Call onNextshowCSPIcon when dowm arrow click occurs on index 3
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
          id='upArrow'
          className={`footer-icon ${textIndex === 0 ? 'disabled' : ''}`}
          onClick={handleUpArrowClick}
          disabled={textIndex === 0}
        >
          <img src="./src/assets/img/upward_arrow.png" alt="Up Arrow" className="arrow-image" />
        </button>
        <button
          id='downArrow'
          className={`footer-icon ${blink && textIndex < texts.length - 1 ? 'blink' : ''} ${down_Arrow || textIndex === texts.length - 1 ? 'disabled' : ''}`}
          onClick={handleDownArrowClick}
          disabled={down_Arrow || textIndex === texts.length - 1}
        >
          <img src="./src/assets/img/downward_arrow.png" alt="Down Arrow" className="arrow-image" />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
