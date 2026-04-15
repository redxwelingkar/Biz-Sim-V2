import { useState, useEffect } from 'react';
import '../css/Footer.css';
import avatar from '../assets/img/avatar.png'
import upArrow from '../assets/img/upward_arrow.png'
import downArrow from '../assets/img/downward_arrow.png'

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
  onNextNavtoCapEx?: () => void;
  onNextNavtoOpEx?: () => void;
  onNextNavtoDashboard?: () => void;
  onNextNavtowardsEBT_WC?: () => void;
  onNextNavtowardsFunding?: () => void;
  onNextShowWC?: () => void;
  CalSAMBTNclick?: boolean;
  SaveFundingSaved?: boolean;
  texts: string[]; // Add texts prop
}

const Footer = ({ onNext,
  onNextPercent,
  onNextsizeofSAM,
  onNextOPDays,
  onNextSAMPercent,
  onNextshowCSPIcon,
  onNextshowSOMIcon,
  onNextshowCalSAMBTN,
  onNextshowSAMIcon,
  onNextshowTAMIcon,
  onNextNavtoCapEx,
  onNextShowWC,
  onNextNavtowardsEBT_WC,
  onNextNavtowardsFunding,
  onNextNavtoOpEx,
  onNextNavtoDashboard,
  CalSAMBTNclick,
  SaveFundingSaved,
  texts }: FooterProps) => {


  const [textIndex, setTextIndex] = useState(0);
  const [blink, setBlink] = useState(false);
  const [down_Arrow, setdown_Arrow] = useState(CalSAMBTNclick || SaveFundingSaved);

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
    // if (SaveFundingSaved) setdown_Arrow(false)
  }, [CalSAMBTNclick])

  const handleUpArrowClick = () => {
    if (textIndex > 0) {
      setTextIndex(prevIndex => prevIndex - 1);
      // console.log("Arrow Index", textIndex);
    }
  };

  const handleDownArrowClick = () => {
    // console.log("Arrow Index:", textIndex);
    // console.log("Index Text:", texts[textIndex]);
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
        if (onNextSAMPercent) {
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
        if (onNextShowWC) {
          onNextShowWC(); // Call onNextShowWC when dowm arrow click occurs on index 1
        }
        if(onNextNavtoDashboard){
          onNextNavtoDashboard()
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
        // move to Towards EBT_WC
        if (onNextNavtowardsEBT_WC) {
          onNextNavtowardsEBT_WC()
        }
      }
      if (textIndex === 4) {
        // move to CapEx
        if (onNextNavtoCapEx) {
          onNextNavtoCapEx()
        }

        // move towards funding
        if (onNextNavtowardsFunding) {
          onNextNavtowardsFunding()
        }

      }

      if (textIndex === 6) {
        // move to OpEx
        if (onNextNavtoOpEx) {
          onNextNavtoOpEx()
        }
      }

    }
    setBlink(false); // Stop blinking when the button is clicked
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={avatar} alt="Image" className="footer-image" />
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
          <img src={upArrow} alt="Up Arrow" className="arrow-image" />
        </button>
        <button
          id='downArrow'
          className={`footer-icon ${blink && textIndex < texts.length - 1 ? 'blink' : ''} ${down_Arrow || textIndex === texts.length - 1 ? 'disabled' : ''}`}
          onClick={handleDownArrowClick}
          disabled={down_Arrow || textIndex === texts.length - 1}
        >
          <img src={downArrow} alt="Down Arrow" className="arrow-image" />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
