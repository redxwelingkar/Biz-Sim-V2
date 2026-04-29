import { useState, useEffect } from 'react'
import Header from '../../components/Header';
import Avatar from '../../components/Avatar';
import BackButton from '../../components/BackButton';

import "../../css/TowardsSOM.css";

import DashboardIcon from "../../assets/img/DashB-Icon.png";
import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import somIcon from "../../assets/img/som-icon.png";
import IntendedPricingIcon from "../../assets/img/IntendedPricing-icon.png";
import opexIcon from "../../assets/img/OpEx-icon.png";
import capexIcon from "../../assets/img/CapEx-icon.png";
import ebtwcIcon from "../../assets/img/EBT_WC.png";
import FundingIcon from "../../assets/img/funding-icon.png";

import { useNavigate } from 'react-router-dom';
import NavigationIcons from '../../components/NavigationIcons';

function TowardsSOM() {

    const [onNext, setOnNext] = useState(false)

    const [showTAMIcon, setshowTAMIcon] = useState(false);
    const [showSAMIcon, setshowSAMIcon] = useState(false);
    const [showIntendedPricingIcon, setshowIntendedPricingIcon] = useState(false);
    const [showSOMIcon, setshowSOMIcon] = useState(false);
    const [showOpExIcon, setshowOpExIcon] = useState(false);
    const [showCapExIcon, setshowCapExIcon] = useState(false);
    const [showEBTWCIcon, setshowEBTWCIcon] = useState(false);
    const [showFundingIcon, setshowFundingIcon] = useState(false);
    const [showDashBoardIcon, setshowDashboardIcon] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        showNavIconIfData()
    }, [])

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

    function Next() {
        setOnNext(true)
    }

    function handleNoClick() {
        navigate("/Biz-Sim-V2/IntendedPricing")
    }
    function handleYesClick() {
        navigate("/Biz-Sim-V2/SOM")
    }
    return (
        <div>

            <Header />
            <Avatar />
            <NavigationIcons/>
            <div className='towards-som-container'>
                {/* TODO: Add missing text from design */}
                {!onNext &&
                    <div className='towardsSOMHeaders'>
                        <div className=''>
                            Now, Serviceable Addressable Market is that portion of the Total addressable market (TAM) that your business can target and serve with its current products, services, and geographic reach based on your business model and capabilities, but it does not consider competition or market barriers
                        </div>
                        <br />
                        <div className=''>
                            Which means that the Yearly Expenditure by SAM value that we calculated in the last section might not be a realistic value of the revenue that you generate from your business
                        </div>
                        <br />
                        <button className='towardsSOM-NextBTN' onClick={Next}>NEXT</button>
                    </div>}
                {onNext &&
                    <div className='towardsSOMHeaders'>
                        <div >
                            So how do we get a realistic estimate of the revenue generated by your business?
                        </div>
                        <br />
                        <div >
                            The answer to that question is Serviceable Obtainable Market (SOM), in which we assume an estimate percentage of the SAM value, which gives us an assumed subset population that your business will be able to cater to considering competition or other market barriers

                            In short, SAM is the reachable market segment, while SOM is the realistically achievable share within that segment.
                        </div>
                        <br />
                        <div className='towardsSOMready' >
                            Are you ready to move on to SOM?
                        </div>
                        <div className='towardsSOM-yesno-container'>
                            <div className="no-div">
                                <button className='' onClick={handleNoClick}>NO</button>
                                <div className='towardsSOMready'>Go Back to Intended Pricing</div>
                            </div>
                            <div className="no-div">
                                <button className='' onClick={handleYesClick}>YES</button>
                                <div className='towardsSOMready'>Proceed to SOM</div>
                            </div>
                        </div>
                        {/* <div>Click here to learn more about SOM</div> */}

                    </div>}
            </div>


        </div>
    )
}

export default TowardsSOM;
