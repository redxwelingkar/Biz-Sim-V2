import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import TransitionWrapper from "../../components/TransitionWrapper";
import "../../css/TowardsSAM.css";

import Avatar from "../../components/Avatar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "../../assets/img/DashB-Icon.png";
import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import somIcon from "../../assets/img/som-icon.png";
import IntendedPricingIcon from "../../assets/img/IntendedPricing-icon.png";
import opexIcon from "../../assets/img/OpEx-icon.png";
import capexIcon from "../../assets/img/CapEx-icon.png";
import ebtwcIcon from "../../assets/img/EBT_WC.png";
import FundingIcon from "../../assets/img/funding-icon.png";
import NavigationIcons from "../../components/NavigationIcons";


const TowardsSAM = () => {
  const [extraContentVisible, setExtraContentVisible] = useState(false);
  const navigate = useNavigate();

  const [showTAMIcon, setshowTAMIcon] = useState(false);
  const [showSAMIcon, setshowSAMIcon] = useState(false);
  const [showIntendedPricingIcon, setshowIntendedPricingIcon] = useState(false);
  const [showSOMIcon, setshowSOMIcon] = useState(false);
  const [showOpExIcon, setshowOpExIcon] = useState(false);
  const [showCapExIcon, setshowCapExIcon] = useState(false);
  const [showEBTWCIcon, setshowEBTWCIcon] = useState(false);
  const [showFundingIcon, setshowFundingIcon] = useState(false);
  const [showDashBoardIcon, setshowDashboardIcon] = useState(false);


  useEffect(() => {
    showNavIconIfData()
  }, [])

  const showNavIconIfData = () => {
    try {
      // show TAM ICON
      const TAMtotal = localStorage.getItem('TAM');
      if (TAMtotal) setshowTAMIcon(true)

      // show SAM ICON
      const SAMtotal = localStorage.getItem('SAM');
      if (SAMtotal) setshowSAMIcon(true)

      // show IntendedPricing ICON
      const IntendedPricingMonthly = localStorage.getItem('IntendedPricingMonthly')
      const OPdays = localStorage.getItem('OPdays')
      if (IntendedPricingMonthly && OPdays) setshowIntendedPricingIcon(true)

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
      if (EMI && EBT && WC && CapExTotal && OpExTotal && SOM && IntendedPricingMonthly && OPdays && SAMtotal && TAMtotal) setshowDashboardIcon(true)

    } catch (error) {
      console.error("showNavIconIfData Error", error)
    }
  }

  const handleLearnMoreClick = () =>
    setExtraContentVisible(!extraContentVisible);
  const handleYesClick = () => navigate("/Biz-Sim-V2/sam-calculation");
  const handleNoClick = () => {
    if (showTAMIcon) navigate("/Biz-Sim-V2/tam-calculation")
    else navigate("/Biz-Sim-V2/towards-tam");
  }

  return (
    <div className="towards-sam">
      <Header />
      <NavigationIcons/>
      <Avatar />
      <div className="body-container">
        <TransitionWrapper delays={[100, 1000, 2000]}>
          {(visibleStates) => (
            <div className="texts-container">
              <p
                className={`transition-items text-one ${visibleStates[0] ? "visible" : ""
                  }`}
              >
                Now let's move on to the next step of defining and calculating
                the
              </p>
              <p
                className={`transition-items sam-heading ${visibleStates[0] ? "visible" : ""
                  }`}
              >
                Serviceable Addressable Market (SAM)
              </p>
              <p
                className={`transition-items ${visibleStates[1] ? "visible" : ""
                  }`}
              >
                A business can't capture 100% of a given market. In the real
                business world, a business targets a specific customer base,
                which is the serviceable addressable market. The SAM represents
                a fraction of the whole market a business can reach with its
                limited resources.
              </p>
              <button
                className={`transition-items action-button ${visibleStates[1] ? "visible" : ""
                  }`}
                onClick={handleLearnMoreClick}
              >
                {extraContentVisible ? "Read Less" : "Learn More"}
              </button>
              {extraContentVisible && (
                <div className="extra-text">
                  The SAM represents a fraction of the whole market a business
                  can reach with its limited resources.
                </div>
              )}
              <p
                className={`transition-items ${visibleStates[2] ? "visible" : ""
                  }`}
              >
                Are you ready to move on to SAM?
              </p>
              <div className="buttons-container">
                <div className={`button-wrapper transition-items ${visibleStates[2] ? "visible" : ""
                  }`}>
                  <button
                    onClick={handleNoClick}
                  >
                    NO
                  </button>
                  <p className="button-description">Go back to TAM</p>
                </div>
                <div className={`button-wrapper transition-items ${visibleStates[2] ? "visible" : ""
                  }`}>
                  <button
                    onClick={handleYesClick}
                  >
                    YES
                  </button>
                  <p className="button-description">Proceed to SAM</p>
                </div>
              </div>
            </div>
          )}
        </TransitionWrapper>
      </div>
    </div>
  );
};

export default TowardsSAM;

