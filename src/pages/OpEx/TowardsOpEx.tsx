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
import cspIcon from "../../assets/img/csp-icon.png";
import opexIcon from "../../assets/img/OpEx-icon.png";
import capexIcon from "../../assets/img/CapEx-icon.png";
import ebtwcIcon from "../../assets/img/EBT_WC.png";
import FundingIcon from "../../assets/img/funding-icon.png";

const TowardsOpEx = () => {
    const [onNext, setOnNext] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        showNavIconIfData()
    }, [])

    const [showTAMIcon, setshowTAMIcon] = useState(false);
    const [showSAMIcon, setshowSAMIcon] = useState(false);
    const [showCSPIcon, setshowCSPIcon] = useState(false);
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
            console.error("showNavIconIfData Error", error)
        }
    }

    return (
        <div className="towards-opex">
            <Header />
            <BackButton topOffset="10vh" />
            <Avatar />
            <div className="indicatorIcon-container">
                {showDashBoardIcon && <div className="Icon-div" data-label="Dashboard" onClick={() => navigate('/Biz-Sim-V2/dashboard')}>
                    <img src={DashboardIcon} alt="Dashboard-Icon" title="Dashboard" className="Dashboard-Icon" />
                </div>}
                {showTAMIcon && <div className="Icon-div" data-label="TAM" onClick={() => navigate('/Biz-Sim-V2/tam-calculation')}>
                    <img src={tamIcon} alt="TAM-Icon" title="TAM" className="Tam-Icon" />
                </div>}
                {showSAMIcon && <div className="Icon-div" data-label="SAM" onClick={() => navigate('/Biz-Sim-V2/sam-calculation')}>
                    <img src={samIcon} alt="SAM-Icon" title="SAM" className="SAM-Icon" />
                </div>}
                {showCSPIcon && <div className="Icon-div" data-label="CSP" onClick={() => navigate('/Biz-Sim-V2/csp')}>
                    <img src={cspIcon} alt="CSP-Icon" title="CSP" className="CSP-Icon" />
                </div>}
                {showSOMIcon && <div className="Icon-div" data-label="SOM" onClick={() => navigate('/Biz-Sim-V2/som')}>
                    <img src={somIcon} alt="SOM-Icon" title="SOM" className="SOM-Icon" />
                </div>}
                {showOpExIcon && <div className="Icon-div" data-label="OpEx" onClick={() => navigate('/Biz-Sim-V2/opex-calculation')}>
                    <img src={opexIcon} alt="OpEx-Icon" title="OpEx" className="OpEx-Icon" />
                </div>}
                {showCapExIcon && <div className="Icon-div" data-label="CapEx" onClick={() => navigate('/Biz-Sim-V2/capex-calculation')}>
                    <img src={capexIcon} alt="CapEx-Icon" title="CapEx" className="CapEx-Icon" />
                </div>}
                {showEBTWCIcon && <div className="Icon-div" data-label="EBT & WC" onClick={() => navigate('/Biz-Sim-V2/EBT_WC-calculation')}>
                    <img src={ebtwcIcon} alt="EBT_WC-Icon" title="EBT & WC" className="EBTWC-Icon" />
                </div>}
                {showFundingIcon && <div className="Icon-div" data-label="Funding" onClick={() => navigate('/Biz-Sim-V2/funding')}>
                    <img src={FundingIcon} alt="Funding-Icon" title="Funding" className="Funding-Icon" />
                </div>}
            </div>
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
