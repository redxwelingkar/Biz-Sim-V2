import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BackButton from '../../components/BackButton'
import { motion, AnimatePresence } from 'framer-motion';
import "../../css/CSP.css";

import DashboardIcon from "../../assets/img/DashB-Icon.png";
import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import somIcon from "../../assets/img/som-icon.png";
import cspIcon from "../../assets/img/csp-icon.png";
import opexIcon from "../../assets/img/OpEx-icon.png";
import capexIcon from "../../assets/img/CapEx-icon.png";
import ebtwcIcon from "../../assets/img/EBT_WC.png";
import FundingIcon from "../../assets/img/funding-icon.png";

import Footer from '../../components/Footer';
import NumberToWords from '../../components/NumberToWords';
import CustomTextField from '../../components/CustomTextField';
import { Simulate } from 'react-dom/test-utils';
import TextDisplay from '../../components/TextDisplay';
import { useNavigate } from 'react-router-dom';

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



function SOM() {

    const [SOMValue, setSOMValue] = useState("")
    const [CSPValue, setCSPValue] = useState("")
    const [DailyExpbySOM, setDailyExpbySOM] = useState("")
    const [MonthlyExpbySOM, setMonthlyExpbySOM] = useState("")
    const [YearlyExpbySOM, setYearlyExpbySOM] = useState("")
    const [displayExpbySOM, setdisplayExpbySOM] = useState(false)
    const [OPDays, setOPDays] = useState("")
    const [SAM, setSAM] = useState("");
    const [SAMPercent, setSAMPercent] = useState("");
    const [showSOMIconText, setshowSOMIconText] = useState(false);
    const [showSAMPercentInput, setshowSAMPercentInput] = useState(false);
    const [isHoveredRow, setisHoveredRow] = useState("");

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

    const navigate = useNavigate()

    useEffect(() => {
        showNavIconIfData()
        let sam = localStorage.getItem("SAM")
        if (sam) {
            setSAM(sam)
        } else {
            window.alert("SAM not calulated please Complete previous step")
        }
        let csp = localStorage.getItem("CSPValue")
        if (csp) {
            setCSPValue(csp)
        } else {
            window.alert("CSP not calulated please Complete previous step")
        }
        let opdays = localStorage.getItem("OPdays")
        if (opdays) {
            setOPDays(opdays)
        } else {
            window.alert("Operational days not calulated please Complete previous step")
        }
        // console.log("opdays", opdays)
        // console.log("displayOPDays", displayOPDays)


        // check if values already exist and populate them
        let SAMPercentLS = localStorage.getItem("SAMPercent")
        let SOM = localStorage.getItem("SOM")
        let OPdaysLS = localStorage.getItem("OPdays")
        let SOMDaily = localStorage.getItem("SOMDaily")
        let CSPMonthlyLS = localStorage.getItem("CSPMonthly")
        let CSPYearlyLS = localStorage.getItem("CSPYearly")

        if (SAMPercentLS != null) {
            setSAMPercent(SAMPercentLS)
            setshowSAMPercentInput(true)
        }


        if (OPdaysLS != null) setOPDays(OPdaysLS)
        if (SOM != null) setSOMValue(SOM)
        if (SOMDaily != null) setDailyExpbySOM(SOMDaily)
        if (CSPMonthlyLS != null) setMonthlyExpbySOM(CSPMonthlyLS)
        if (CSPYearlyLS != null) setYearlyExpbySOM(CSPYearlyLS)
        if (SOM && SOMDaily && CSPMonthlyLS && CSPYearlyLS) setdisplayExpbySOM(true)


    }, []);

    function navigateToTowardsSOM() {
        navigate("/Biz-Sim-V2/towards-opex");
    }

    function handleSAMPercentChange(value: string) {
        setSAMPercent(value)
    }

    // const savetoLocalStorage=()=>{
    //     try {
    //         console.log("savetoLocalStorage SOMValue",SOMValue);

    //         localStorage.setItem("SOM",SOMValue)
    //         localStorage.setItem("SOMDaily",DailyExpbySOM)
    //         localStorage.setItem("SOMMonthly",MonthlyExpbySOM)
    //         localStorage.setItem("SOMYearly",YearlyExpbySOM)
    //     } catch (error) {
    //         console.error("SOM - savetoLocalStorage",error);

    //     }
    // }

    function submitSAMPercent() {
        if (SAMPercent || parseFloat(SAMPercent) > 0) {
            localStorage.setItem("SAMPercent", SAMPercent)

            // Calculate SOM values
            let CSP = parseFloat(CSPValue)
            let SOM = (parseFloat(SAMPercent) / 100) * parseFloat(SAM)
            setSOMValue(SOM.toFixed(2))
            localStorage.setItem("SOM", SOM.toFixed(2))

            let DailyExpSOM = (SOM * CSP).toFixed(2)
            setDailyExpbySOM(DailyExpSOM.toString())
            localStorage.setItem("SOMDaily", DailyExpSOM)

            let MonthlyExpSOM = (SOM * CSP * parseFloat(OPDays)).toFixed(2)
            setMonthlyExpbySOM(MonthlyExpSOM.toString())
            localStorage.setItem("SOMMonthly", MonthlyExpSOM)

            let YearlyExpSOM = (SOM * CSP * parseFloat(OPDays) * 12).toFixed(2)
            setYearlyExpbySOM(YearlyExpSOM.toString())
            localStorage.setItem("SOMYearly", YearlyExpSOM)

            setdisplayExpbySOM(true)
            // savetoLocalStorage()

            // Autoclick down arrow to go to next step when submitting CSPValue
            let downArrow = document.getElementById("downArrow")
            if (downArrow) Simulate.click(downArrow)

        } else {
            window.alert("Please enter Percentage of SAM Captured by the business")
        }
    }


    function onNextshowSOMIcon() {
        setTimeout(() => {
            setshowSOMIcon(true)
            setTimeout(() => {
                // console.log("setshowSOMIconText(true)");
                setshowSOMIconText(true)
                setTimeout(() => {
                    // console.log("setshowSOMIconText(false)");
                    setshowSOMIconText(false)
                }, 1000 * 2.5);
            }, 1000);
        }, 1000 * 2);
    }
    function SAMPercentInput() {
        setshowSAMPercentInput(true)
    }
    const footerTexts = [
        "Here in the section of Serviceable Obtainable Market (SOM), the first thing you will see is that we have displayed the value of SAM which we had calculated in the earlier section. Now remember this is an estimate of customers that will be catered by your business without any competition and other market barriers.",
        "Now, based on what you have learned about Serviceable Addressable Market, Serviceable Obtainable Market, the general ratio between the two, and on what kind of competitors and other market barriers you may face in your business, enter an educated estimate value in the field and press “Enter” or click on “SUBMIT”.",
        "Now three values regarding the daily, monthly and yearly expenditure by customer has come up on the screen, which looks similar to what we had in the SAM section. The difference here is that the values presented above are a practical estimation of revenue generated by your business. So do you think with this revenue your business will be profitable?",
        "Great! You have successfully defined and calculated the size of the Serviceable Obtainable Market (SOM) for your business and a practical estimate of the revenue generated. To mark this milestone an icon signifying the same will be added to the sidebar, which you can use to navigate back to SOM if you want to make any changes later.",
        "Click on the downward arrow here to move on to the next section.",
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
                        {showCSPIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/csp')}>
                            <img src={cspIcon} alt="CSP-Icon" className="CSP-Icon" />
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
                        {/* Animate the icon entry */}
                        <div className='Icon-div'>
                            <AnimatePresence mode="wait">
                                {showSOMIcon ? (

                                    <motion.img
                                        key="SOM-img"
                                        src={somIcon}
                                        alt="SOM-Icon"
                                        className="SOM-Icon"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 1 }}
                                    />

                                ) : <div></div>}
                            </AnimatePresence>
                            {/* Animate the text entry/exit */}
                            <AnimatePresence mode="wait">
                                {showSOMIconText && (
                                    <motion.span
                                        key="SOM-Icon-Text"
                                        initial={{ opacity: 0, x: -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 1 }}
                                    >
                                        Serviceable Obtainable Market
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="csp-container">
                        <h1>Serviceable Obtainable Market</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <PopUp keyName='SAMHeader'>
                                            <p>Serviceable Addressable Market</p>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='SAM'>
                                            <div
                                                onMouseEnter={() => setisHoveredRow("SAMWords")}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <TextDisplay label='per day' value={SAM} />
                                            </div>
                                        </PopUp>
                                    </td>
                                    <td>
                                        {isHoveredRow === "SAMWords" &&
                                            <Slide keyName='SAMWords'>
                                                <NumberToWords value={SAM} />
                                            </Slide>
                                        }
                                    </td>
                                </tr>

                                {showSAMPercentInput &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='SAMPercentHeader'>
                                                <p>Percentage of SAM <br /> Captured by the business</p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='SAMPercent'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("SAMPercentWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <CustomTextField
                                                        value={SAMPercent}
                                                        type='number'
                                                        placeholder='Enter Value'
                                                        label='percent'
                                                        min={0}
                                                        max={100}
                                                        onChange={(value) => handleSAMPercentChange(value)} />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "SAMPercentWords" &&
                                                <Slide keyName='SAMPercentWords'>
                                                    <NumberToWords value={SAMPercent} />
                                                </Slide>}
                                        </td>
                                    </tr>}
                                {displayExpbySOM &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='SOMHeader'>
                                                <p>Serviceable Obtainable Market</p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='SOMValue'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("SOMValueWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <TextDisplay label='no. of Customers' value={SOMValue} />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "SOMValueWords" &&
                                                <Slide keyName='SOMValueWords'>
                                                    <NumberToWords value={SOMValue} />
                                                </Slide>}
                                        </td>
                                    </tr>}
                                {displayExpbySOM &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='DailySOMHeader'>
                                                <p>Daily Expenditure by SOM</p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='DailySOMValue'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("DailyExpSOMWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <TextDisplay label='per day' value={DailyExpbySOM} />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "DailyExpSOMWords" &&
                                                <Slide keyName='DailyExpSOMWords'>
                                                    <NumberToWords value={DailyExpbySOM} />
                                                </Slide>}
                                        </td>
                                    </tr>}
                                {displayExpbySOM &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='MonthlySOMHeader'>
                                                <p>Monthly Expenditure by SOM</p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='MonthlySOMValue'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("MonthlyExpSOMWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <TextDisplay label='per month' value={MonthlyExpbySOM} />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "MonthlyExpSOMWords" &&
                                                <Slide keyName='MonthlyExpSOMWords'>
                                                    <NumberToWords value={MonthlyExpbySOM} />
                                                </Slide>}
                                        </td>
                                    </tr>}
                                {displayExpbySOM &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='YearlySOMHeader'>
                                                <p>Monthly Expenditure by SOM</p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='YearlySOMValue'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("YearlyExpSOMWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <TextDisplay label='per year' value={YearlyExpbySOM} />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "YearlyExpSOMWords" &&
                                                <Slide keyName='YearlyExpSOMWords'>
                                                    <NumberToWords value={YearlyExpbySOM} />
                                                </Slide>
                                            }
                                        </td>
                                    </tr>}
                            </tbody>
                        </table>
                        {showSAMPercentInput &&
                            <button id='submitCSP' className='SubmitBTNCSP' onClick={submitSAMPercent}>Submit SAM %</button>}
                    </div>
                    <Footer texts={footerTexts} onNextSAMPercent={SAMPercentInput} onNextshowSOMIcon={onNextshowSOMIcon} />
                </div>
                :
                // TutorialMode=False
                <div></div>}


        </div>
    )
}

export default SOM