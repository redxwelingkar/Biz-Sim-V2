import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BackButton from '../../components/BackButton'
import { motion, AnimatePresence } from 'framer-motion';
import "../../css/CSP.css";

import Footer from '../../components/Footer';
import NumberToWords from '../../components/NumberToWords';
import CustomTextField from '../../components/CustomTextField';
import { Simulate } from 'react-dom/test-utils';
import TextDisplay from '../../components/TextDisplay';
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


const PopUp = ({ children, keyName }: { children: React.ReactNode; keyName: string }) => (
    <AnimatePresence mode="wait">
        <motion.div
            key={keyName}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    </AnimatePresence>
);
const Slide = ({ children, keyName }: { children: React.ReactNode; keyName: string }) => (
    <AnimatePresence mode="wait">
        <motion.div
            key={keyName}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    </AnimatePresence>
);


function CSP() {

    const [CSPValue, setCSPValue] = useState("")
    const [CSPMonthly, setCSPMonthly] = useState("")
    const [CSPYearly, setCSPYearly] = useState("")
    const [DailyExpbySAM, setDailyExpbySAM] = useState("")
    const [displayOPDays, setdisplayOPDays] = useState(false)
    const [OPDays, setOPDays] = useState("")
    const [SAM, setSAM] = useState("")
    const [showCSPIconText, setshowCSPIconText] = useState(false);
    const [isHoveredRow, setisHoveredRow] = useState("");

    const navigate = useNavigate()

    const [showTAMIcon, setshowTAMIcon] = useState(false);
    const [showSAMIcon, setshowSAMIcon] = useState(false);
    const [showCSPIcon, setshowCSPIcon] = useState(false);
    const [showSOMIcon, setshowSOMIcon] = useState(false);
    const [showOpExIcon, setshowOpExIcon] = useState(false);
    const [showCapExIcon, setshowCapExIcon] = useState(false);
    const [showEBTWCIcon, setshowEBTWCIcon] = useState(false);
    const [showFundingIcon, setshowFundingIcon] = useState(false);
    const [showDashBoardIcon, setshowDashboardIcon] = useState(false);
    const [FooterVisible, setFooterVisible] = useState(true);
    const [TutorialMode, setTutorialMode] = useState(false);

    useEffect(() => {
        showNavIconIfData()
        let sam = localStorage.getItem("SAM")
        if (sam) {
            setSAM(sam)
        } else {
            window.alert("SAM not calulated please Complete previous step")
        }
        // console.log("SAM", sam)
        // console.log("displayOPDays", displayOPDays)

        // check if values already exist and populate them
        let CSPValueLS = localStorage.getItem("CSPValue")
        let OPdaysLS = localStorage.getItem("OPdays")
        let CSPMonthlyLS = localStorage.getItem("CSPMonthly")
        let CSPYearlyLS = localStorage.getItem("CSPYearly")

        if (CSPValueLS != null) {
            setCSPValue(CSPValueLS)
            if (sam) setDailyExpbySAM((parseFloat(sam) * parseFloat(CSPValueLS)).toString())
        }
        if (OPdaysLS != null) {
            setOPDays(OPdaysLS)
            setdisplayOPDays(true)
        }
        if (CSPMonthlyLS != null) setCSPMonthly(CSPMonthlyLS)
        if (CSPYearlyLS != null) setCSPYearly(CSPYearlyLS)

    }, []);

    function navigateToTowardsSOM() {
        navigate("/Biz-Sim-V2/towards-som");
    }

    useEffect(() => {

    }, [showCSPIcon])

    function handleCSPChange(value: string) {
        setCSPValue(value)
    }

    function handleOPDaysChange(value: string) {
        setOPDays(value)
    }

    function submitCSP() {
        // Save / set CSPvalue in local storage
        if (CSPValue || parseFloat(CSPValue) > 0) {
            localStorage.setItem("CSPValue", CSPValue)

            // get SAM from localstorage and multiply it with CSPValue to get Daily Expenditure by SAM Value
            setDailyExpbySAM((parseFloat(SAM) * parseFloat(CSPValue)).toString())

            // hide submitCSP BTN
            let submitCSPBTN = document.getElementById("submitCSP")
            if (submitCSPBTN) submitCSPBTN.hidden = true

            // Autoclick down arrow to go to next step when submitting CSPValue
            let downArrow = document.getElementById("downArrow")
            if (downArrow) Simulate.click(downArrow)
        } else {
            window.alert("Please enter Customer Spending power Value")
        }

        if (!TutorialMode) showOPDays()
    }

    function showOPDays() {
        // console.log("showOPDays", "exe")
        setdisplayOPDays(true)
        // console.log(displayOPDays)
        // show OPdays submitBTN
        let submitOPdaysPBTN = document.getElementById("submitOPdays")
        if (submitOPdaysPBTN) submitOPdaysPBTN.hidden = false
    }

    function submitOPdays() {
        if (OPDays || parseFloat(OPDays) > 0) {
            localStorage.setItem("OPdays", OPDays)

            // calculate and save monthly expenditure by SAM
            let SAMmonthlyExp = parseFloat(OPDays) * parseFloat(DailyExpbySAM)
            setCSPMonthly(SAMmonthlyExp.toString())
            localStorage.setItem("CSPMonthly", SAMmonthlyExp.toString())

            // calculate and save Yearly expenditure by SAM
            let SAMYearlyExp = SAMmonthlyExp * 12
            setCSPYearly(SAMYearlyExp.toString())
            localStorage.setItem("CSPYearly", SAMmonthlyExp.toString())

            // Autoclick down arrow to go to next step when submitting OPdays Value
            let downArrow = document.getElementById("downArrow")
            if (downArrow) Simulate.click(downArrow)
        } else {
            window.alert("Please enter No. of Operational Days Value")
        }
    }

    function onNextshowCSPIcon() {
        console.log("onNextshowCSPIcon called");
        setTimeout(() => {
            setshowCSPIcon(true)
            setTimeout(() => {
                // console.log("setshowCSPIconText(true)");
                setshowCSPIconText(true)
                setTimeout(() => {
                    // console.log("setshowCSPIconText(false)");
                    setshowCSPIconText(false)
                    // setTimeout(() => {
                    //     // console.log("setshowCSPIconText(false)");
                    //     navigateToTowardsSOM()
                    // }, 1000 * 2);
                }, 1000 * 2.5);
            }, 1000);
        }, 1000 * 2);

    }
    const footerTexts = [
        "Here in the section of Customer Spending Power (CSP), the first thing you need to mention is the the amount of money that a customer will spend on your product/ service in one instance of transaction. Now go ahead and enter the value of CSP and click on “SUBMIT” or press “Enter”.",
        "Voila! What just popped up on the screen is “Daily Expenditure by SAM”, which gets calculated automatically by multiplying the value of Customer Spending Power (CSP) with the size of Serviceable Addressable Market (SAM) obtained in earlier steps. The resultant value is the amount of money that you will be able to make, if the number of people in SAM bought your product at CSP value in one day.",
        "Now that we have our estimated earning from SAM in a day let's put in the number of days in month that we will keep our business operational and open to customers. Enter the value for the same in the field against “No. of Operational Days” and click on “SUBMIT” or press “Enter”.",
        "Great! You have successfully calculated the monthly and annual earnings from SAM for your business.",
        "Great! You have successfully calculated the monthly and annual earnings from SAM for your business. To mark this milestone an icon signifying the same will be added to the sidebar, which you can use to navigate back to CSP if you want to make any changes later.",
        "Click on the downward arrow here to move on to the next section.",
        ""

    ];

    const showNavIconIfData = () => {
        try {
            // TutorialMode
            const Tutorialmode = localStorage.getItem('TutorialMode')
            if (Tutorialmode == "true") setTutorialMode(true)

            // show TAM ICON
            const TAMtotal = localStorage.getItem('TAM');
            if (TAMtotal) setshowTAMIcon(true)

            // show SAM ICON
            const SAMtotal = localStorage.getItem('SAM');
            if (SAMtotal) setshowSAMIcon(true)

            // show CSP ICON
            const CSPMonthly = localStorage.getItem('CSPMonthly')
            const OPdays = localStorage.getItem('OPdays')
            if (CSPMonthly && OPdays) {
                setshowCSPIcon(true)
                setFooterVisible(false)

            }

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

    return (
        <div>
            {TutorialMode ?
                // TutorialMode=True
                <div>
                    <Header />
                    <BackButton topOffset='10vh' />
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
                        {/* Animate the icon entry */}
                        <div className='Icon-div'>
                            <AnimatePresence mode="wait">
                                {showCSPIcon ? (

                                    <motion.img
                                        key="CSP-img"
                                        src={cspIcon}
                                        alt="CSP-Icon"
                                        className="CSP-Icon"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 1 }}
                                    />

                                ) : <div></div>}
                            </AnimatePresence>
                            {/* Animate the text entry/exit */}
                            <AnimatePresence mode="wait">
                                {showCSPIconText && (
                                    <motion.span
                                        key="CSP-Icon-Text"
                                        initial={{ opacity: 0, x: -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 1 }}
                                    >
                                        Customer Spending Power
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

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
                    <div className="csp-container">
                        <h1>Customer Spending Power</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Customer Spending Power</p>
                                    </td>
                                    <td>
                                        <div
                                            onMouseEnter={() => setisHoveredRow("CSPValueWords")}
                                            onMouseLeave={() => setisHoveredRow("")}
                                        >
                                            <CustomTextField
                                                value={CSPValue}
                                                type='number'
                                                placeholder='Enter Value'
                                                min={0}
                                                label='per customer / product'
                                                onChange={(value) => handleCSPChange(value)} />
                                        </div>
                                    </td>
                                    <td>
                                        {isHoveredRow === "CSPValueWords" &&
                                            <Slide keyName='CSPValueWords'>
                                                <NumberToWords value={CSPValue} />
                                            </Slide>
                                        }
                                    </td>
                                </tr>
                                {DailyExpbySAM &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='DailyExpbySAMHeader'>
                                                <p>Daily Expenditure by SAM</p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='DailyExpbySAM'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("DailyExpbySAMWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <TextDisplay label='per day' value={DailyExpbySAM} />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "DailyExpbySAMWords" &&
                                                <Slide keyName='DailyExpbySAMWords'>
                                                    <NumberToWords value={DailyExpbySAM} />
                                                </Slide>}
                                        </td>
                                    </tr>}
                                {displayOPDays &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='OPDaysHeader'>
                                                <p>No of Operational Days</p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='OPDays'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("OPDaysWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <CustomTextField
                                                        value={OPDays}
                                                        type='number'
                                                        placeholder='Enter Value'
                                                        min={1}
                                                        max={31}
                                                        label='days per month'
                                                        onChange={(value) => handleOPDaysChange(value)} />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "OPDaysWords" &&
                                                <Slide keyName='OPDaysWords'>
                                                    <NumberToWords value={OPDays} />
                                                </Slide>}
                                        </td>
                                    </tr>}
                                {CSPMonthly &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='CSPMonthlyHeader'>
                                                <p>Monthly Expenditure by SAM</p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='CSPMonthly'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("CSPMonthlyWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <TextDisplay value={CSPMonthly} label='per month' />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "CSPMonthlyWords" &&
                                                <Slide keyName='CSPMonthlyWords'>
                                                    <NumberToWords value={CSPMonthly} />
                                                </Slide>}
                                        </td>
                                    </tr>}
                                {CSPYearly &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='CSPYearlyHeader'>
                                                <p>Yearly Expenditure by SAM </p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='CSPYearly'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("CSPYearlyWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <TextDisplay value={CSPYearly} label='per year' />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "CSPYearlyWords" &&
                                                <Slide keyName='CSPYearlyWords'>
                                                    <NumberToWords value={CSPYearly} />
                                                </Slide>}
                                        </td>
                                    </tr>}
                            </tbody>
                        </table>
                        <button id='submitCSP' className='SubmitBTNCSP' onClick={submitCSP}>Submit CSP</button>
                        {/* {DailyExpbySAM && displayOPDays && CSPMonthly && CSPYearly &&
                            <button id='submitOPdays' className='SubmitBTNCSP' onClick={submitOPdays}>Submit OP</button>
                        } */}
                        <button id='submitOPdays' className='SubmitBTNCSP' hidden onClick={submitOPdays}>Submit OP</button>
                    </div>
                    {FooterVisible &&
                        <Footer texts={footerTexts} onNextOPDays={showOPDays} onNextshowCSPIcon={onNextshowCSPIcon} onNextNavtoSOM={navigateToTowardsSOM} />}
                </div>
                :
                // TutorialMode=False
                <div>
                    <Header />
                    <BackButton topOffset='10vh' />
                    <div className="indicatorIcon-container ">
                        <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/dashboard')}>
                            <img src={DashboardIcon} alt="Dashboard-Icon" className="Dashboard-Icon" />
                        </div>
                        <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/tam-calculation')}>
                            <img src={tamIcon} alt="TAM-Icon" className="Tam-Icon" />
                        </div>
                        <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/sam-calculation')}>
                            <img src={samIcon} alt="SAM-Icon" className="SAM-Icon" />
                        </div>
                        <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/csp')}>
                            <img src={cspIcon} alt="CSP-Icon" className="CSP-Icon" />
                        </div>
                        <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/som')}>
                            <img src={somIcon} alt="SOM-Icon" className="SOM-Icon" />
                        </div>
                        <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/opex-calculation')}>
                            <img src={opexIcon} alt="OpEx-Icon" className="OpEx-Icon" />
                        </div>
                        <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/capex-calculation')}>
                            <img src={capexIcon} alt="CapEx-Icon" className="CapEx-Icon" />
                        </div>
                        <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/EBT_WC-calculation')}>
                            <img src={ebtwcIcon} alt="EBT_WC-Icon" className="EBTWC-Icon" />
                        </div>
                        <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/funding')}>
                            <img src={FundingIcon} alt="Funding-Icon" className="Funding-Icon" />
                        </div>
                    </div>
                    <div className="csp-container vh-90">
                        <h1>Customer Spending Power</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Customer Spending Power</p>
                                    </td>
                                    <td>
                                        <div
                                            onMouseEnter={() => setisHoveredRow("CSPValueWords")}
                                            onMouseLeave={() => setisHoveredRow("")}
                                        >
                                            <CustomTextField
                                                value={CSPValue}
                                                type='number'
                                                placeholder='Enter Value'
                                                min={0}
                                                label='per customer / product'
                                                onChange={(value) => handleCSPChange(value)} />
                                        </div>
                                    </td>
                                    <td>
                                        {isHoveredRow === "CSPValueWords" &&
                                            <Slide keyName='CSPValueWords'>
                                                <NumberToWords value={CSPValue} />
                                            </Slide>
                                        }
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <PopUp keyName='DailyExpbySAMHeader'>
                                            <p>Daily Expenditure by SAM</p>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='DailyExpbySAM'>
                                            <div
                                                onMouseEnter={() => setisHoveredRow("DailyExpbySAMWords")}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <TextDisplay label='per day' value={DailyExpbySAM} />
                                            </div>
                                        </PopUp>
                                    </td>
                                    <td>
                                        {isHoveredRow === "DailyExpbySAMWords" &&
                                            <Slide keyName='DailyExpbySAMWords'>
                                                <NumberToWords value={DailyExpbySAM} />
                                            </Slide>}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <PopUp keyName='OPDaysHeader'>
                                            <p>No of Operational Days</p>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='OPDays'>
                                            <div
                                                onMouseEnter={() => setisHoveredRow("OPDaysWords")}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <CustomTextField
                                                    value={OPDays}
                                                    type='number'
                                                    placeholder='Enter Value'
                                                    min={1}
                                                    max={31}
                                                    label='days per month'
                                                    onChange={(value) => handleOPDaysChange(value)} />
                                            </div>
                                        </PopUp>
                                    </td>
                                    <td>
                                        {isHoveredRow === "OPDaysWords" &&
                                            <Slide keyName='OPDaysWords'>
                                                <NumberToWords value={OPDays} />
                                            </Slide>}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <PopUp keyName='CSPMonthlyHeader'>
                                            <p>Monthly Expenditure by SAM</p>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='CSPMonthly'>
                                            <div
                                                onMouseEnter={() => setisHoveredRow("CSPMonthlyWords")}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <TextDisplay value={CSPMonthly} label='per month' />
                                            </div>
                                        </PopUp>
                                    </td>
                                    <td>
                                        {isHoveredRow === "CSPMonthlyWords" &&
                                            <Slide keyName='CSPMonthlyWords'>
                                                <NumberToWords value={CSPMonthly} />
                                            </Slide>}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <PopUp keyName='CSPYearlyHeader'>
                                            <p>Yearly Expenditure by SAM </p>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='CSPYearly'>
                                            <div
                                                onMouseEnter={() => setisHoveredRow("CSPYearlyWords")}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <TextDisplay value={CSPYearly} label='per year' />
                                            </div>
                                        </PopUp>
                                    </td>
                                    <td>
                                        {isHoveredRow === "CSPYearlyWords" &&
                                            <Slide keyName='CSPYearlyWords'>
                                                <NumberToWords value={CSPYearly} />
                                            </Slide>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button id='submitCSP' className='SubmitBTNCSP' onClick={submitCSP}>Submit CSP</button>
                        <button id='submitOPdays' className='SubmitBTNCSP' onClick={submitOPdays}>Submit OP</button>
                    </div>
                </div>
            }
        </div>

    )
}

export default CSP