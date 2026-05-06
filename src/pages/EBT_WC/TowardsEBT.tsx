import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import TransitionWrapper from "../../components/TransitionWrapper";
import Avatar from "../../components/Avatar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/TowardsEBT.css";

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

const TowardsEBT = () => {
    const navigate = useNavigate();

    const handleYesClick = () => navigate("/Biz-Sim-V2/EBT_WC-calculation");
    const handleNoClick = () => navigate("/Biz-Sim-V2/towards-capex");

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

    return (
        <div className="towards-ebt">
            <Header />
            <Avatar />
            <NavigationIcons/>
            <div className="body-container">
                <TransitionWrapper delays={[200, 600, 1100, 1600, 2100, 2600]}>
                    {(visibleStates) => (
                        <div className="texts-container">
                            <p
                                className={`transition-items text-two ${visibleStates[0] ? "visible" : ""}`}
                            >
                                Now that we've estimated the revenue and expenses, the simulation can automatically calculate the business's Earnings Before Tax (EBT) by subtracting monthly operational expenses (OpEx) from the monthly sales (SOM).
                            </p>
                            <p
                                className={`transition-items text-two ${visibleStates[1] ? "visible" : ""}`}
                            >
                                Once the simulation gives us an approx EBT, we will then calculate the funds needed to start the business and sustain it for the initial months - this is what we call "Working Capital."
                            </p>
                            <p
                                className={`transition-items towardsEBT-question ${visibleStates[2] ? "visible" : ""}`}
                            >
                                Are you ready to move on to the next section?
                            </p>
                            <div
                                className={`transition-items towardsEBT-yesno-container ${visibleStates[4] ? "visible" : ""}`}
                            >
                                <div className="towardsEBT-option">
                                    <button type="button" className="towardsEBT-choice" onClick={handleNoClick}>
                                        NO
                                    </button>
                                    <div className="towardsEBT-label">Go Back to CapEx</div>
                                </div>
                                <div className="towardsEBT-option">
                                    <button type="button" className="towardsEBT-choice" onClick={handleYesClick}>
                                        YES
                                    </button>
                                    <div className="towardsEBT-label">Proceed to EBT</div>
                                </div>
                            </div>
                            {/* <button
                                type="button"
                                className={`transition-items towardsEBT-link ${visibleStates[5] ? "visible" : ""}`}
                                onClick={handleYesClick}
                            >
                                Click here to learn more about EBT and Working Capital
                            </button> */}
                        </div>
                    )}
                </TransitionWrapper>
            </div>
        </div>
    );
};

export default TowardsEBT;
