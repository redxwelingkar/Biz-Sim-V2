import { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Avatar from '../../components/Avatar';
import "../../css/TowardsIntendedPricing.css";
import { useNavigate } from 'react-router-dom';


import NavigationIcons from '../../components/NavigationIcons';

const TowardsIntendedPricing = () => {
  const [showFirstText, setShowFirstText] = useState(true);
  const [slideSecondText, setSlideSecondText] = useState(false);
  const [showThirdText, setShowThirdText] = useState(false);
  const [showFourthText, setShowFourthText] = useState(false);


  const navigate = useNavigate();

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


  const handleYesClick = () => {
    navigate('/Biz-Sim-V2/IntendedPricing');
  };
  const handleNoClick = () => {
    navigate('/Biz-Sim-V2/sam-calculation');
  };

  return (
    <div className='bg'>
      <Header />
      <NavigationIcons/>

      <Avatar />
      <div>
        <div className="towards-IntendedPricing-container">
          <div className={`first-txt ${!showFirstText ? 'slide-up-out' : ''}`}>
            Now let's move on to the next step finding out how much money the customers in our Serviceable Addressable Market (SAM) are going to spend on our offering which we'll call as
          </div>
          <div className={`second-txt ${slideSecondText ? 'slide-up' : ''}`}>
            Intended Pricing
          </div>
          <div className={`third-txt ${showThirdText ? 'fade-in slide-up' : ''}`}>
            <p>Here you'll have to make an informed, near accurate guess, as to how much money an individual customer is going to spend, on an average, on your offering, in a day.</p>
            <p>That may be a lot of things to consider simultaneously so let's take a breather here and you can continue when you are ready for this next step</p>
          </div>
          <div className={`fourth-txt ${showFourthText ? 'fade-in slide-up' : ''}`}>
            Are you ready to move on to Intended Pricing?
          </div>
          {showFourthText && (
            <div className="btn">
              <div className="btn-section">
                <button onClick={handleNoClick}>NO</button>
                <p className="btn-description">Go Back to SAM</p>
              </div>
              <div className="btn-section">
                <button onClick={handleYesClick} >YES</button>
                <p className="btn-description">Proceed to Intended Pricing</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TowardsIntendedPricing;

