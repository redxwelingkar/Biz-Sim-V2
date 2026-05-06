import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import TransitionWrapper from "../../components/TransitionWrapper";
import Avatar from "../../components/Avatar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/TowardsCapEx.css";

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

const TowardsCapEx = () => {
    const [showIntro, setShowIntro] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
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

    const handleYesClick = () => navigate("/Biz-Sim-V2/capex-calculation");
    const handleNoClick = () => navigate("/Biz-Sim-V2/towards-opex");
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

    useEffect(() => {
        showNavIconIfData()
        const fadeIntroTimer = window.setTimeout(() => {
            setShowIntro(false);
        }, 2600);

        const showDetailsTimer = window.setTimeout(() => {
            setShowDetails(true);
        }, 3300);

        return () => {
            window.clearTimeout(fadeIntroTimer);
            window.clearTimeout(showDetailsTimer);
        };
    }, []);

    return (
        <div className="towards-capex">
            <Header />
            <Avatar />
            <NavigationIcons/>
            <div className="body-container">
                <TransitionWrapper delays={[200]}>
                    {(visibleStates) => (
                        <div className={`texts-container towardsCapEx-intro ${!showIntro ? "fade-away" : ""}`}>
                            <p
                                className={`transition-items text-two ${visibleStates[0] ? "visible" : ""}`}
                            >
                                In the last section we listed out all the expenses that your business is going to incur while in operation but your business will incur more expenses for just setting it up, this is going to be a one time investment, and  is referred to as
                            </p>
                        </div>
                    )}
                </TransitionWrapper>
                {showDetails && (
                    <TransitionWrapper delays={[300, 1200, 2400, 3600, 4800, 6000]}>
                        {(visibleStates) => (
                            <div className="texts-container" style={{ top: "10vh" }}>
                                <p
                                    className={`transition-items text-two header-name ${visibleStates[0] ? "visible" : ""}`}
                                >
                                    Capital Expenditure (CapEx)
                                </p>
                                <p
                                    className={`transition-items text-two ${visibleStates[1] ? "visible" : ""}`}
                                >
                                    Capital expenditure (CapEx) is the money a business spends to acquire, upgrade, or maintain long-term physical assets such as buildings, equipment, vehicles, land, or technology.
                                </p>
                                <p
                                    className={`transition-items text-two ${visibleStates[2] ? "visible" : ""}`}
                                >
                                    CapEx differs from operating expenses (OpEx), which are the day-to-day costs required to run a business.
                                </p>
                                <p
                                    className={`transition-items towardsCapEx-question ${visibleStates[3] ? "visible" : ""}`}
                                >
                                    Are you ready to move on to CapEx?
                                </p>
                                <div
                                    className={`transition-items towardsCapEx-yesno-container ${visibleStates[4] ? "visible" : ""}`}
                                >
                                    <div className="towardsCapEx-option">
                                        <button type="button" className="towardsCapEx-choice" onClick={handleNoClick}>
                                            NO
                                        </button>
                                        <div className="towardsCapEx-label">Go Back to OpEx</div>
                                    </div>
                                    <div className="towardsCapEx-option">
                                        <button type="button" className="towardsCapEx-choice" onClick={handleYesClick}>
                                            YES
                                        </button>
                                        <div className="towardsCapEx-label">Proceed to CapEx</div>
                                    </div>
                                </div>
                                {/* <button
                                    type="button"
                                    className={`transition-items towardsCapEx-link ${visibleStates[5] ? "visible" : ""}`}
                                    onClick={handleYesClick}
                                >
                                    Click here to learn more about CapEx
                                </button> */}
                            </div>
                        )}
                    </TransitionWrapper>
                )}
            </div>
        </div>
    );
};

export default TowardsCapEx;


