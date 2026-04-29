import { useEffect, useState } from 'react'
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import TransitionWrapper from "../../components/TransitionWrapper";
import Avatar from "../../components/Avatar";
import { useNavigate } from "react-router-dom";
import "../../css/TowardsFunding.css";

import DashboardIcon from "../../assets/img/DashB-Icon.png";
import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import somIcon from "../../assets/img/som-icon.png";
import IntendedPricingIcon from "../../assets/img/IntendedPricing-icon.png";
import opexIcon from "../../assets/img/OpEx-icon.png";
import capexIcon from "../../assets/img/CapEx-icon.png";
import ebtwcIcon from "../../assets/img/EBT_WC.png";
import FundingIcon from "../../assets/img/funding-icon.png";
import NavigationIcons from '../../components/NavigationIcons';

const TowardsFunding = () => {
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
            if (EBT && WC) setshowEBTWCIcon(true);

            // show Funding ICON
            const EMI = localStorage.getItem('EMI')
            if (EMI) setshowFundingIcon(true)

            // show dashboard ICON
            if (EMI && EBT && WC && CapExTotal && OpExTotal && SOM && IntendedPricingMonthly && OPdays && SAMtotal && TAMtotal) setshowDashboardIcon(true)

        } catch (error) {
            console.error("showNavIconIfData Error", error)
        }
    }

    const handleYesClick = () => navigate("/Biz-Sim-V2/funding");
    const handleNoClick = () => navigate("/Biz-Sim-V2/towards-ebt-wc");

    return (
        <div className="towards-funding">
            <Header />
            <Avatar />
            <NavigationIcons/>
            <div className="body-container">
                <TransitionWrapper delays={[1000, 1800, 2200, 3000]}>
                    {(visibleStates) => (
                        <div className="texts-container">
                            <p
                                className={`transition-items text-two ${visibleStates[0] ? "visible" : ""}`}
                            >
                                Since in the last section we calculated how much money we will require to start the business, so, in this section we will figure out where to get the "Funding" from.
                                And we will also look at how those sources of funding might incur some monthly EMIs, if they are loans
                            </p>
                            <p
                                className={`transition-items towardsFunding-question ${visibleStates[1] ? "visible" : ""}`}
                            >
                                Are you ready to move on to the section of Funding?
                            </p>
                            <div
                                className={`transition-items towardsFunding-yesno-container ${visibleStates[2] ? "visible" : ""}`}
                            >
                                <div className="towardsFunding-option">
                                    <button type="button" className="towardsFunding-choice" onClick={handleNoClick}>
                                        NO
                                    </button>
                                    <div className="towardsFunding-label">Go Back to Working Capital</div>
                                </div>
                                <div className="towardsFunding-option">
                                    <button type="button" className="towardsFunding-choice" onClick={handleYesClick}>
                                        YES
                                    </button>
                                    <div className="towardsFunding-label">Proceed to Funding</div>
                                </div>
                            </div>
                            {/* <button
                                type="button"
                                className={`transition-items towardsFunding-link ${visibleStates[3] ? "visible" : ""}`}
                                onClick={handleYesClick}
                            >
                                Click here to learn more about Funding
                            </button> */}
                        </div>
                    )}
                </TransitionWrapper>
            </div>
        </div>
    );
};

export default TowardsFunding;
