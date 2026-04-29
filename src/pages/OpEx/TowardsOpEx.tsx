import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import TransitionWrapper from "../../components/TransitionWrapper";
import Avatar from "../../components/Avatar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/TowardsOpEx.css";

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

const TowardsOpEx = () => {
    const [onNext, setOnNext] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        showNavIconIfData()
    }, [])

    const [showTAMIcon, setshowTAMIcon] = useState(false);
    const [showSAMIcon, setshowSAMIcon] = useState(false);
    const [showIntendedPricingIcon, setshowIntendedPricingIcon] = useState(false);
    const [showSOMIcon, setshowSOMIcon] = useState(false);
    const [showOpExIcon, setshowOpExIcon] = useState(false);
    const [showCapExIcon, setshowCapExIcon] = useState(false);
    const [showEBTWCIcon, setshowEBTWCIcon] = useState(false);
    const [showFundingIcon, setshowFundingIcon] = useState(false);
    const [showDashBoardIcon, setshowDashboardIcon] = useState(false);

    const handleNextClick = () => setOnNext(true);
    const handleYesClick = () => navigate("/Biz-Sim-V2/opex-calculation");
    const handleNoClick = () => navigate("/Biz-Sim-V2/towards-som");

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
        <div className="towards-opex">
            <Header />
            <Avatar />
            <NavigationIcons/>
            <div className="body-container">
                {!onNext && (
                    <TransitionWrapper delays={[1500, 3500, 5500]}>
                        {(visibleStates) => (
                            <div className="texts-container">
                                <p
                                    className={`transition-items text-two ${visibleStates[0] ? "visible" : ""}`}
                                >
                                    In the last sections we have figured out our target customers and how much revenue we are going to generate from the business, but before we can answer the question of profitability we also need to figure out an estimate for the expenses that the business is going to incur.
                                </p>
                                <p
                                    className={`transition-items text-two ${visibleStates[1] ? "visible" : ""}`}
                                >
                                    Operational Expenditure (OpEx) refers to the ongoing costs a business incurs to run its day-to-day operations. It includes expenses such as rent, utilities, salaries, marketing, and other costs necessary to keep the business functioning. Calculating OpEx is crucial for understanding the financial health of your business and for making informed decisions about budgeting and resource allocation.
                                </p>
                                <button
                                    type="button"
                                    className={`learn-more-button transition-items ${visibleStates[2] ? "visible" : ""}`}
                                    onClick={handleNextClick}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </TransitionWrapper>
                )}
                {onNext && (
                    <TransitionWrapper delays={[1200, 2400, 3600, 4800]}>
                        {(visibleStates) => (
                            <div className="texts-container">
                                <p
                                    className={`transition-items text-two ${visibleStates[0] ? "visible" : ""}`}
                                >
                                    The next section is going to be about Operational Expenditure, which refers to the ongoing costs a business incurs to run its day-to-day activities. It includes a wide range of costs that can be both fixed (e.g., rent, salaries) and variable (e.g., marketing, utilities that fluctuate with usage).
                                </p>
                                {/* <button
                                    type="button"
                                    className={`transition-items towardsOpEx-link ${visibleStates[1] ? "visible" : ""}`}
                                    onClick={()=>{}}
                                >
                                    Click here to learn more about OpEx
                                </button> */}
                                <p
                                    className={`transition-items towardsOpEx-question ${visibleStates[2] ? "visible" : ""}`}
                                >
                                    Are you ready to move on to OpEx?
                                </p>
                                <div
                                    className={`transition-items towardsOpEx-yesno-container ${visibleStates[3] ? "visible" : ""}`}
                                >
                                    <div className="towardsOpEx-option">
                                        <button type="button" className="towardsOpEx-choice" onClick={handleNoClick}>
                                            NO
                                        </button>
                                        <div className="towardsOpEx-label">Go Back to SOM</div>
                                    </div>
                                    <div className="towardsOpEx-option">
                                        <button type="button" className="towardsOpEx-choice" onClick={handleYesClick}>
                                            YES
                                        </button>
                                        <div className="towardsOpEx-label">Proceed to OpEx</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </TransitionWrapper>
                )}
            </div>
        </div>
    );
};

export default TowardsOpEx;
