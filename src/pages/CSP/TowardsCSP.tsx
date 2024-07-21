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
  const [showFirstPara, setShowFirstPara] = useState(false);
  const [showSecondPara, setShowSecondPara] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowFirstText(false);
    }, 2800);

    const timer2 = setTimeout(() => {
      setSlideSecondText(true);
    }, 3000);

    const timer3 = setTimeout(() => {
      setShowFirstPara(true);
    }, 6000);

    const timer4 = setTimeout(() => {
      setShowSecondPara(true);
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div>
      <Header />
      <BackButton topOffset="10vh" />
      <TamIcon />
      <SamIcon />
      <div className="csp-container">
        <div className={`first-txt ${!showFirstText ? 'hide' : ''}`}>
          Now let’s move on to the next step finding out how much money the customers in our Serviceable Addressable Market (SAM) are going to spend on our offering which we’ll call as
        </div>
        <div className={`second-txt ${slideSecondText ? 'slide-up' : ''}`}>
          Customer Spending Power
        </div>
        <div className={`paragraphs ${showFirstPara ? 'show' : ''}`}>
          <p className={`first-para ${showFirstPara ? 'appear' : ''}`}>
            Here you’ll have to make an informed, near accurate guess, as to how much money an individual customer is going to spend, on an average, on your offering, in a day. 
            <br />
            That may be a lot of things to consider simultaneously so let’s take a breather here and you can continue when you are ready for this next step
          </p>
          <p className={`second-para ${showSecondPara ? 'appear' : ''}`}>Are you ready to move on to CSP?</p>
        </div>
      </div>
      {showSecondPara && (
          <div className="bts-container">
            <div className="button-wrapper">
              <button className="no-button">NO</button>
              <p className="button-description">Go back to SAM</p>
            </div>
            
            <div className="button-wrapper">
              <button className="yes-button">YES</button>
              <p className="button-description">Proceed to CSP</p>
            </div>
          </div>
        )}
      <Avatar />
    </div>
  );
};

export default TowardsCSP;
