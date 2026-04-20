import { useState, useEffect } from 'react';
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import Avatar from '../../components/Avatar';
import "../../css/TowardsCSP.css";
import { useNavigate } from 'react-router-dom';


import DashboardIcon from "../../assets/img/DashB-Icon.png";
import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import somIcon from "../../assets/img/som-icon.png";
import cspIcon from "../../assets/img/csp-icon.png";
import opexIcon from "../../assets/img/OpEx-icon.png";
import capexIcon from "../../assets/img/CapEx-icon.png";
import ebtwcIcon from "../../assets/img/EBT_WC.png";
import FundingIcon from "../../assets/img/funding-icon.png";

const TowardsCSP = () => {
  const [showFirstText, setShowFirstText] = useState(true);
  const [slideSecondText, setSlideSecondText] = useState(false);
  const [showThirdText, setShowThirdText] = useState(false);
  const [showFourthText, setShowFourthText] = useState(false);

  const [showTAMIcon, setshowTAMIcon] = useState(false);
  const [showSAMIcon, setshowSAMIcon] = useState(false);
  const [showCSPIcon, setshowCSPIcon] = useState(false);
  const [showSOMIcon, setshowSOMIcon] = useState(false);
  const [showOpExIcon, setshowOpExIcon] = useState(false);
  const [showCapExIcon, setshowCapExIcon] = useState(false);
  const [showEBTWCIcon, setshowEBTWCIcon] = useState(false);
  const [showFundingIcon, setshowFundingIcon] = useState(false);
  const [showDashBoardIcon, setshowDashboardIcon] = useState(false);
  const [TutorialMode, setTutorialMode] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    showNavIconIfData()
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

  const showNavIconIfData = () => {
    // console.log("showNavIconIfData");
    // console.log("showNavIconIfData", window.location.href.split("/").includes("sam-calculation"));

    try {
      // show TAM ICON
      const TAMtotal = localStorage.getItem('TAM');
      if (TAMtotal) setshowTAMIcon(true)

      // show SAM ICON
      const SAMtotal = localStorage.getItem('SAM');
      if (SAMtotal) setshowSAMIcon(true)
      // if SAM Calculated show all col in TutorialMode

      // show CSP ICON
      const CSPMonthly = localStorage.getItem('CSPMonthly')
      const OPdays = localStorage.getItem('OPdays')
      if (CSPMonthly && OPdays) setshowCSPIcon(true)

      // show SOM ICON
      const SOM = localStorage.getItem('SOM')
      if (SOM) setshowSOMIcon(true)

      // show OpEx ICON
      const OpExTotal = localStorage.getItem('OpExTotal')
      if (OpExTotal) setshowOpExIcon(true)

      // show CapEx ICON
      const CapExTotal = localStorage.getItem('CapExTotal')
      if (CapExTotal) setshowCapExIcon(true)

      // show EBT_WC ICON
      const EBT = localStorage.getItem('ebt')
      const WC = localStorage.getItem('WC')
      if (EBT && WC) setshowEBTWCIcon(true)

      // show Funding ICON
      const EMI = localStorage.getItem('EMI')
      if (EMI) setshowFundingIcon(true)

      // show dashboard ICON
      if (EMI && EBT && WC && CapExTotal && OpExTotal && SOM && CSPMonthly && OPdays && SAMtotal && TAMtotal) setshowDashboardIcon(true)


    } catch (error) {
      console.log("showNavIconIfData Error", error)
    }
  }

  const handleYesClick = () => {
    navigate('/Biz-Sim-V2/csp');
  };
  const handleNoClick = () => {
    navigate('/Biz-Sim-V2/sam-calculation');
  };

  return (
    <div className='bg'>
      <Header />
      <BackButton topOffset="10vh" />
      <div className='indicatorIcon-container'>
        {showDashBoardIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/dashboard')}>
          <img src={DashboardIcon} alt="Dashboard-Icon" className="Dashboard-Icon" />
        </div>}
        {showTAMIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/tam-calculation')}>
          <img src={tamIcon} alt="TAM-Icon" className="Tam-Icon" />
        </div>}
        {showSAMIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/sam-calculation')}>
          <img src={samIcon} alt="SAM-Icon" className="SAM-Icon" />
        </div>}
        {showCSPIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/csp')}>
          <img src={cspIcon} alt="CSP-Icon" className="CSP-Icon" />
        </div>}
        {showSOMIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/som')}>
          <img src={somIcon} alt="SOM-Icon" className="SOM-Icon" />
        </div>}
        {showOpExIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/opex-calculation')}>
          <img src={opexIcon} alt="OpEx-Icon" className="OpEx-Icon" />
        </div>}
        {showCapExIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/capex-calculation')}>
          <img src={capexIcon} alt="CapEx-Icon" className="CapEx-Icon" />
        </div>}
        {showEBTWCIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/EBT_WC-calculation')}>
          <img src={ebtwcIcon} alt="EBT_WC-Icon" className="EBTWC-Icon" />
        </div>}
        {showFundingIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/funding')}>
          <img src={FundingIcon} alt="Funding-Icon" className="Funding-Icon" />
        </div>}
      </div>


      {/* <TamIcon /> */}
      {/* <SamIcon /> */}
      <Avatar />
      <div>
        <div className="towards-csp-container">
          <div className={`first-txt ${!showFirstText ? 'slide-up-out' : ''}`}>
            Now let's move on to the next step finding out how much money the customers in our Serviceable Addressable Market (SAM) are going to spend on our offering which we'll call as
          </div>
          <div className={`second-txt ${slideSecondText ? 'slide-up' : ''}`}>
            Customer Spending Power
          </div>
          <div className={`third-txt ${showThirdText ? 'fade-in slide-up' : ''}`}>
            <p>Here you'll have to make an informed, near accurate guess, as to how much money an individual customer is going to spend, on an average, on your offering, in a day.</p>
            <p>That may be a lot of things to consider simultaneously so let's take a breather here and you can continue when you are ready for this next step</p>
          </div>
          <div className={`fourth-txt ${showFourthText ? 'fade-in slide-up' : ''}`}>
            Are you ready to move on to CSP?
          </div>
          {showFourthText && (
            <div className="btn">
              <div className="btn-section">
                <button onClick={handleNoClick}>NO</button>
                <p className="btn-description">Go Back to SAM</p>
              </div>
              <div className="btn-section">
                <button onClick={handleYesClick} >YES</button>
                <p className="btn-description">Proceed to CSP</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TowardsCSP;
