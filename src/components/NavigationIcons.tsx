import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import DashboardIcon from "../assets/img/DashB-Icon.png";
import tamIcon from "../assets/img/tam-icon.png";
import samIcon from "../assets/img/sam-icon.png";
import somIcon from "../assets/img/som-icon.png";
import IntendedPricingIcon from "../assets/img/IntendedPricing-icon.png";
import opexIcon from "../assets/img/OpEx-icon.png";
import capexIcon from "../assets/img/CapEx-icon.png";
import ebtwcIcon from "../assets/img/EBT_WC.png";
import FundingIcon from "../assets/img/funding-icon.png";


function NavigationIcons() {
    const [showTAMIcon1, setshowTAMIcon] = useState(false);
    const [showSAMIcon1, setshowSAMIcon] = useState(false);
    const [showIntendedPricingIcon, setshowIntendedPricingIcon] = useState(false);
    const [showSOMIcon, setshowSOMIcon] = useState(false);
    const [showOpExIcon, setshowOpExIcon] = useState(false);
    const [showCapExIcon, setshowCapExIcon] = useState(false);
    const [showEBTWCIcon, setshowEBTWCIcon] = useState(false);
    const [showFundingIcon, setshowFundingIcon] = useState(false);
    const [showDashBoardIcon, setshowDashboardIcon] = useState(false);

    const navigate = useNavigate();

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
    })

    return (
        <div className="indicatorIcon-container">
            <div className="Icon-div" data-label="Dashboard" onClick={() => navigate('/Biz-Sim-V2/dashboard')}>
                <div className={showDashBoardIcon ? "bar" : "bar opacity-0"}></div>
                <img src={DashboardIcon} alt="Dashboard-Icon" className="Dashboard-Icon" />
                <span className="icon-hover-label">Dashboard</span>
            </div>
            <div className="Icon-div" data-label="TAM" onClick={() => navigate('/Biz-Sim-V2/tam-calculation')}>
                <div className={showTAMIcon1 ? "bar" : "bar opacity-0"}></div>
                <img src={tamIcon} alt="TAM-Icon" className="Tam-Icon" />
                <span className="icon-hover-label">TAM</span>
            </div>
            <div className="Icon-div" data-label="SAM" onClick={() => navigate('/Biz-Sim-V2/sam-calculation')}>
                <div className={showSAMIcon1 ? "bar" : "bar opacity-0"}></div>
                <img src={samIcon} alt="SAM-Icon" className="SAM-Icon" />
                <span className="icon-hover-label">SAM</span>
            </div>
            <div className="Icon-div" data-label="IntendedPricing" onClick={() => navigate('/Biz-Sim-V2/IntendedPricing')}>
                <div className={showIntendedPricingIcon ? "bar" : "bar opacity-0"}></div>
                <img src={IntendedPricingIcon} alt="IntendedPricing-Icon" className="IntendedPricing-Icon" />
                <span className="icon-hover-label">Intended Pricing</span>
            </div>
            <div className="Icon-div" data-label="SOM" onClick={() => navigate('/Biz-Sim-V2/som')}>
                <div className={showSOMIcon ? "bar" : "bar opacity-0"}></div>
                <img src={somIcon} alt="SOM-Icon" className="SOM-Icon" />
                <span className="icon-hover-label">SOM</span>
            </div>
            <div className="Icon-div" data-label="OpEx" onClick={() => navigate('/Biz-Sim-V2/opex-calculation')}>
                <div className={showOpExIcon ? "bar" : "bar opacity-0"}></div>
                <img src={opexIcon} alt="OpEx-Icon" className="OpEx-Icon" />
                <span className="icon-hover-label">OpEx</span>
            </div>
            <div className="Icon-div" data-label="CapEx" onClick={() => navigate('/Biz-Sim-V2/capex-calculation')}>
                <div className={showCapExIcon ? "bar" : "bar opacity-0"}></div>
                <img src={capexIcon} alt="CapEx-Icon" className="CapEx-Icon" />
                <span className="icon-hover-label">CapEx</span>
            </div>
            <div className="Icon-div" data-label="EBT & WC" onClick={() => navigate('/Biz-Sim-V2/EBT_WC-calculation')}>
                <div className={showEBTWCIcon ? "bar" : "bar opacity-0"}></div>
                <img src={ebtwcIcon} alt="EBT_WC-Icon" className="EBTWC-Icon" />
                <span className="icon-hover-label">EBT &amp; WC</span>
            </div>
            <div className="Icon-div" data-label="Funding" onClick={() => navigate('/Biz-Sim-V2/funding')}>
                <div className={showFundingIcon ? "bar" : "bar opacity-0"}></div>
                <img src={FundingIcon} alt="Funding-Icon" className="Funding-Icon" />
                <span className="icon-hover-label">Funding</span>
            </div>
        </div>
    )
}

export default NavigationIcons