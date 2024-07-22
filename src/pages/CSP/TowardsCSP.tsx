import { useState, useEffect } from 'react';
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import TamIcon from "../../components/TamIcon";
import SamIcon from "../../components/SamIcon";
import Avatar from '../../components/Avatar';
import "../../css/TowardsCSP.css";

const TowardsCSP = () => {
  const [showFirstText, setShowFirstText] = useState(true);
  const [slideSecondText, setSlideSecondText] = useState(false);
  const [showThirdText, setShowThirdText] = useState(false);
  const [showFourthText, setShowFourthText] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowFirstText(false);
    }, 2800);

    const timer2 = setTimeout(() => {
      setSlideSecondText(true);
    }, 3000);

    const timer3 = setTimeout(() => {
      setShowThirdText(true);
    }, 5000);

    const timer4 = setTimeout(() => {
      setShowFourthText(true);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className='bg'>
      <Header />
      <BackButton topOffset="10vh" />
      <TamIcon />
      <SamIcon />
      <Avatar />
      <div>
        <div className="csp-container">
          <div className={`first-txt ${!showFirstText ? 'slide-up-out' : ''}`}>
            Now let’s move on to the next step finding out how much money the customers in our Serviceable Addressable Market (SAM) are going to spend on our offering which we’ll call as
          </div>
          <div className={`second-txt ${slideSecondText ? 'slide-up' : ''}`}>
            Customer Spending Power
          </div>
          <div className={`third-txt ${showThirdText ? 'fade-in slide-up' : ''}`}>
            <p>Here you’ll have to make an informed, near accurate guess, as to how much money an individual customer is going to spend, on an average, on your offering, in a day.</p>
            <p>That may be a lot of things to consider simultaneously so let’s take a breather here and you can continue when you are ready for this next step</p>
          </div>
          <div className={`fourth-txt ${showFourthText ? 'fade-in slide-up' : ''}`}>
            Are you ready to move on to CSP?
          </div>
        </div>
        {showFourthText && (
          <div className="btn">
            <div className="btn-section">
              <button >NO</button>
              <p className="btn-description">Go Back to SAM</p>
            </div>
            <div className="btn-section">
              <button >YES</button>
              <p className="btn-description">Proceed to CSP</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TowardsCSP;
