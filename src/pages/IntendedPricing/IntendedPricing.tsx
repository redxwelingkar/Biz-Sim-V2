import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BackButton from '../../components/BackButton'
import { motion, AnimatePresence } from 'framer-motion';
import "../../css/IntendedPricing.css";

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
import IntendedPricingIcon from "../../assets/img/IntendedPricing-icon.png";
import opexIcon from "../../assets/img/OpEx-icon.png";
import capexIcon from "../../assets/img/CapEx-icon.png";
import ebtwcIcon from "../../assets/img/EBT_WC.png";
import FundingIcon from "../../assets/img/funding-icon.png";
import NavigationIcons from '../../components/NavigationIcons';
import syncAllData from '../../components/SyncData';


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


function IntendedPricing() {

    const [IntendedPricingValue, setIntendedPricingValue] = useState("")
    const [IntendedPricingMonthly, setIntendedPricingMonthly] = useState("")
    const [IntendedPricingYearly, setIntendedPricingYearly] = useState("")
    const [DailyRevfromSAM, setDailyRevfromSAM] = useState("")
    const [displayOPDays, setdisplayOPDays] = useState(false)
    const [showOPDaysSubmitBTN, setshowOPDaysSubmitBTN] = useState(false)
    const [showIntendedPriceSubmitBTN, setshowIntendedPriceSubmitBTN] = useState(true)
    const [OPDays, setOPDays] = useState("")
    const [SAM, setSAM] = useState("")
    const [showIntendedPricingIconText, setshowIntendedPricingIconText] = useState(false);
    const [isHoveredRow, setisHoveredRow] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate()

    const [showTAMIcon, setshowTAMIcon] = useState(false);
    const [showSAMIcon, setshowSAMIcon] = useState(false);
    const [showIntendedPricingIcon, setshowIntendedPricingIcon] = useState(false);
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
            setErrorMessage("SAM Not Calculated, Please Complete Previous Steps")
            // window.alert("SAM not calulated please Complete previous step")
            // navigate(-1)
        }
        // console.log("SAM", sam)
        // console.log("displayOPDays", displayOPDays)

        // check if values already exist and populate them
        let IntendedPricingValueLS = localStorage.getItem("IntendedPricingValue")
        let OPdaysLS = localStorage.getItem("OPdays")
        let IntendedPricingMonthlyLS = localStorage.getItem("IntendedPricingMonthly")
        let IntendedPricingYearlyLS = localStorage.getItem("IntendedPricingYearly")

        if (IntendedPricingValueLS != null) {
            setIntendedPricingValue(IntendedPricingValueLS)
            if (sam) setDailyRevfromSAM((parseFloat(sam) * parseFloat(IntendedPricingValueLS)).toFixed(2))
        }
        if (OPdaysLS != null) {
            setOPDays(OPdaysLS)
            setdisplayOPDays(true)
        }
        if (IntendedPricingMonthlyLS != null) setIntendedPricingMonthly(IntendedPricingMonthlyLS)
        if (IntendedPricingYearlyLS != null) setIntendedPricingYearly(IntendedPricingYearlyLS)

        // show both submit buttons if OPdays and intendedPricing values are saved
        // if (OPdaysLS != null && IntendedPricingValueLS != null) {
        //     let submitIntendedPricingBTN = document.getElementById("submitIntendedPricing")
        //     if (submitIntendedPricingBTN) submitIntendedPricingBTN.hidden = false

        //     let submitOPdaysPBTN = document.getElementById("submitOPdays")
        //     if (submitOPdaysPBTN) submitOPdaysPBTN.hidden = false
        // }

    }, []);

    function navigateToTowardsSOM() {
        navigate("/Biz-Sim-V2/towards-som");
    }

    useEffect(() => {

    }, [showIntendedPricingIcon])

    function handleIntendedPricingChange(value: string) {
        setIntendedPricingValue(value)
    }

    function handleOPDaysChange(value: string) {
        setOPDays(value)
    }

    function submitIntendedPricing() {
        // Save / set IntendedPricingvalue in local storage
        if (IntendedPricingValue || parseFloat(IntendedPricingValue) > 0) {
            // hide submitIntendedPricing BTN only in Tutorial mode if value not in Local Storage
            let IntendedPricingValueLS = localStorage.getItem("IntendedPricingValue")
            if(TutorialMode && IntendedPricingValueLS == null) setshowIntendedPriceSubmitBTN(false)


            localStorage.setItem("IntendedPricingValue", IntendedPricingValue)

            // get SAM from localstorage and multiply it with IntendedPricingValue to get Daily Revenue from SAM Value
            let DailyRevenuefromSAM = (parseFloat(SAM) * parseFloat(IntendedPricingValue)).toFixed(2)
            localStorage.setItem('DailyRevenuefromSAM', DailyRevenuefromSAM)
            setDailyRevfromSAM(DailyRevenuefromSAM)



            let submitIntendedPricingBTN = document.getElementById("submitIntendedPricing")
            if (submitIntendedPricingBTN) submitIntendedPricingBTN.hidden = true

            setshowOPDaysSubmitBTN(true)

            syncAllData("IntendedPricing")
            // Autoclick down arrow to go to next step when submitting IntendedPricingValue
            // let downArrow = document.getElementById("downArrow")
            // if (downArrow) Simulate.click(downArrow)
        } else {
            window.alert("Please enter Intended Pricing Value")
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

            // calculate and save monthly revenue by SAM
            let SAMmonthlyRev = parseFloat(OPDays) * parseFloat(DailyRevfromSAM)
            setIntendedPricingMonthly(SAMmonthlyRev.toFixed(2))
            localStorage.setItem("IntendedPricingMonthly", SAMmonthlyRev.toFixed(2))

            // calculate and save Yearly revenue by SAM
            let SAMYearlyRev = SAMmonthlyRev * 12
            setIntendedPricingYearly(SAMYearlyRev.toFixed(2))
            localStorage.setItem("IntendedPricingYearly", SAMYearlyRev.toFixed(2))

            syncAllData("OPdays")
            setshowIntendedPriceSubmitBTN(true)
            // Autoclick down arrow to go to next step when submitting OPdays Value
            // let downArrow = document.getElementById("downArrow")
            // if (downArrow) Simulate.click(downArrow)
        } else {
            window.alert("Please enter No. of Operational Days Value")
        }
    }

    function onNextshowIntendedPricingIcon() {
        // console.log("onNextshowIntendedPricingIcon called");
        setTimeout(() => {
            setshowIntendedPricingIcon(true)
            setTimeout(() => {
                // console.log("setshowIntendedPricingIconText(true)");
                setshowIntendedPricingIconText(true)
                setTimeout(() => {
                    // console.log("setshowIntendedPricingIconText(false)");
                    setshowIntendedPricingIconText(false)
                    // setTimeout(() => {
                    //     // console.log("setshowIntendedPricingIconText(false)");
                    //     navigateToTowardsSOM()
                    // }, 1000 * 2);
                }, 1000 * 2.5);
            }, 1000);
        }, 1000 * 2);

    }
    const footerTexts = [
        "Here in the section of Intended Pricing, the first thing you need to mention is the the amount of money that a customer will spend on your product/ service in one instance of transaction. Now go ahead and enter the value of Intended Pricing and click on \"SUBMIT\".",
        "Voila! What just popped up on the screen is \"Daily Revenue from SAM\", which gets calculated automatically by multiplying the value of Intended Pricing with the size of Serviceable Addressable Market (SAM) obtained in earlier steps. The resultant value is the amount of money that you will be able to make, if the number of people in SAM bought your product at Intended Pricing value in one day.",
        "Now that we have our estimated earning from SAM in a day let's put in the number of days in month that we will keep our business operational and open to customers. Enter the value for the same in the field against \"No. of Operational Days\" and click on \"SUBMIT\".",
        "Great! You have successfully calculated the monthly and annual earnings from SAM for your business.",
        "Great! You have successfully calculated the monthly and annual earnings from SAM for your business. To mark this milestone the icon for Intended pricing will be highlighted in the side navigation bar, which you can use to navigate back to Intended Pricing if you want to make any changes later.",
        "Click on the “Blinking down arrow” here to move on to the next section.",
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

            // show IntendedPricing ICON
            const IntendedPricingMonthly = localStorage.getItem('IntendedPricingMonthly')
            const OPdays = localStorage.getItem('OPdays')
            if (IntendedPricingMonthly && OPdays) {
                setshowIntendedPricingIcon(true)
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
            if (EMI && EBT && WC && CapExTotal && OpExTotal && SOM && IntendedPricingMonthly && OPdays && SAMtotal && TAMtotal) setshowDashboardIcon(true)

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
                    <NavigationIcons />
                    <div className={FooterVisible ? "IntendedPricing-container" : "IntendedPricing-container vh-90"}>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <h1>Intended Pricing</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Intended Pricing</p>
                                    </td>
                                    <td>
                                        <div
                                            onMouseEnter={() => setisHoveredRow("IntendedPricingValueWords")}
                                            onMouseLeave={() => setisHoveredRow("")}
                                        >
                                            <CustomTextField
                                                value={IntendedPricingValue}
                                                type='number'
                                                placeholder='Enter Value'
                                                min={0}
                                                label='per customer / product'
                                                onChange={(value) => handleIntendedPricingChange(value)} />
                                        </div>
                                    </td>
                                    <td>
                                        {isHoveredRow === "IntendedPricingValueWords" &&
                                            <Slide keyName='IntendedPricingValueWords'>
                                                <NumberToWords value={IntendedPricingValue} />
                                            </Slide>
                                        }
                                    </td>
                                </tr>
                                {DailyRevfromSAM &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='DailyRevfromSAMHeader'>
                                                <p>Daily Revenue from SAM</p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='DailyRevfromSAM'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("DailyRevfromSAMWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <TextDisplay label='per day' value={DailyRevfromSAM} />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "DailyRevfromSAMWords" &&
                                                <Slide keyName='DailyRevfromSAMWords'>
                                                    <NumberToWords value={DailyRevfromSAM} />
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
                                {IntendedPricingMonthly &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='IntendedPricingMonthlyHeader'>
                                                <p>Monthly Revenue from SAM</p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='IntendedPricingMonthly'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("IntendedPricingMonthlyWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <TextDisplay value={IntendedPricingMonthly} label='per month' />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "IntendedPricingMonthlyWords" &&
                                                <Slide keyName='IntendedPricingMonthlyWords'>
                                                    <NumberToWords value={IntendedPricingMonthly} />
                                                </Slide>}
                                        </td>
                                    </tr>}
                                {IntendedPricingYearly &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='IntendedPricingYearlyHeader'>
                                                <p>Yearly Revenue from SAM </p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='IntendedPricingYearly'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("IntendedPricingYearlyWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <TextDisplay value={IntendedPricingYearly} label='per year' />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "IntendedPricingYearlyWords" &&
                                                <Slide keyName='IntendedPricingYearlyWords'>
                                                    <NumberToWords value={IntendedPricingYearly} />
                                                </Slide>}
                                        </td>
                                    </tr>}
                            </tbody>
                        </table>
                        {showIntendedPriceSubmitBTN && <button id='submitIntendedPricing' className='SubmitBTNIntendedPricing' onClick={submitIntendedPricing}>Submit Intended Pricing</button>}
                        {/* {DailyExpbySAM && displayOPDays && IntendedPricingMonthly && IntendedPricingYearly &&
                            <button id='submitOPdays' className='SubmitBTNIntendedPricing' onClick={submitOPdays}>Submit OP</button>
                        } */}
                        {showOPDaysSubmitBTN && <button id='submitOPdays' className='SubmitBTNIntendedPricing' onClick={submitOPdays}>Submit OP</button>}
                        <div className='bottom-margin'></div>
                    </div>
                    {FooterVisible &&
                        <Footer texts={footerTexts} onNextOPDays={showOPDays} onNextshowIntendedPricingIcon={onNextshowIntendedPricingIcon} onNextNavtoSOM={navigateToTowardsSOM} />}
                </div>
                :
                // TutorialMode=False
                <div>
                    <Header />
                    <NavigationIcons />
                    <div className="IntendedPricing-container vh-90">
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <h1>Intended Pricing</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Intended Pricing</p>
                                    </td>
                                    <td>
                                        <div
                                            onMouseEnter={() => setisHoveredRow("IntendedPricingValueWords")}
                                            onMouseLeave={() => setisHoveredRow("")}
                                        >
                                            <CustomTextField
                                                value={IntendedPricingValue}
                                                type='number'
                                                placeholder='Enter Value'
                                                min={0}
                                                label='per customer / product'
                                                onChange={(value) => handleIntendedPricingChange(value)} />
                                        </div>
                                    </td>
                                    <td>
                                        {isHoveredRow === "IntendedPricingValueWords" &&
                                            <Slide keyName='IntendedPricingValueWords'>
                                                <NumberToWords value={IntendedPricingValue} />
                                            </Slide>
                                        }
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <PopUp keyName='DailyRevfromSAMHeader'>
                                            <p>Daily Revenue from SAM</p>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='DailyRevfromSAM'>
                                            <div
                                                onMouseEnter={() => setisHoveredRow("DailyRevfromSAMWords")}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <TextDisplay label='per day' value={DailyRevfromSAM} />
                                            </div>
                                        </PopUp>
                                    </td>
                                    <td>
                                        {isHoveredRow === "DailyRevfromSAMWords" &&
                                            <Slide keyName='DailyRevfromSAMWords'>
                                                <NumberToWords value={DailyRevfromSAM} />
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
                                        <PopUp keyName='IntendedPricingMonthlyHeader'>
                                            <p>Monthly Revenue from SAM</p>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='IntendedPricingMonthly'>
                                            <div
                                                onMouseEnter={() => setisHoveredRow("IntendedPricingMonthlyWords")}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <TextDisplay value={IntendedPricingMonthly} label='per month' />
                                            </div>
                                        </PopUp>
                                    </td>
                                    <td>
                                        {isHoveredRow === "IntendedPricingMonthlyWords" &&
                                            <Slide keyName='IntendedPricingMonthlyWords'>
                                                <NumberToWords value={IntendedPricingMonthly} />
                                            </Slide>}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <PopUp keyName='IntendedPricingYearlyHeader'>
                                            <p>Yearly Revenue from SAM </p>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='IntendedPricingYearly'>
                                            <div
                                                onMouseEnter={() => setisHoveredRow("IntendedPricingYearlyWords")}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <TextDisplay value={IntendedPricingYearly} label='per year' />
                                            </div>
                                        </PopUp>
                                    </td>
                                    <td>
                                        {isHoveredRow === "IntendedPricingYearlyWords" &&
                                            <Slide keyName='IntendedPricingYearlyWords'>
                                                <NumberToWords value={IntendedPricingYearly} />
                                            </Slide>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button id='submitIntendedPricing' className='SubmitBTNIntendedPricing' onClick={submitIntendedPricing}>Submit Intended Pricing</button>
                        <button id='submitOPdays' className='SubmitBTNIntendedPricing' onClick={submitOPdays}>Submit OP</button>
                        <div className='bottom-margin'></div>
                    </div>
                </div>
            }
        </div>

    )
}

export default IntendedPricing