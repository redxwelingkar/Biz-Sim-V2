import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BackButton from '../../components/BackButton'
import { motion, AnimatePresence } from 'framer-motion';
import "../../css/CSP.css";

import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import Footer from '../../components/Footer';
import NumberToWords from '../../components/NumberToWords';
import CustomTextField from '../../components/CustomTextField';
import CustomButton from '../../components/CustomButton';
import { Simulate } from 'react-dom/test-utils';
import TextDisplay from '../../components/TextDisplay';

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
function CSP() {

    const [CSPValue, setCSPValue] = useState("")
    const [CSPMonthly, setCSPMonthly] = useState("")
    const [CSPYearly, setCSPYearly] = useState("")
    const [DailyExpbySAM, setDailyExpbySAM] = useState("")
    const [displayOPDays, setdisplayOPDays] = useState(false)
    const [OPDays, setOPDays] = useState("")
    const [SAM, setSAM] = useState("")
    const [showCSPIcon, setshowCSPIcon] = useState(false);
    const [showCSPIconText, setshowCSPIconText] = useState(false);


    useEffect(() => {
        let sam = localStorage.getItem("SAM")
        if (sam) {
            setSAM(sam)
        } else {
            window.alert("SAM not calulated please Complete previous step")
        }
        console.log("SAM", sam)
        console.log("displayOPDays", displayOPDays)
    }, []);

    useEffect(() => {
        if (showCSPIcon) {
            setTimeout(() => {
                setshowCSPIcon(true)
                setTimeout(() => {
                    console.log("setshowCSPIconText(true)");
                    setshowCSPIconText(true)
                    setTimeout(() => {
                        console.log("setshowCSPIconText(false)");
                        setshowCSPIconText(false)
                        setTimeout(() => {
                            console.log("setshowCSPIconText(false)");
                            // navigateToTowardsSOM() TODO
                        }, 1000 * 2);
                    }, 1000 * 2.5);
                }, 1000);
            }, 1000 * 2);
        }
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
            submitCSPBTN.hidden = true

            // Autoclick down arrow to go to next step when submitting CSPValue
            let downArrow = document.getElementById("downArrow")
            Simulate.click(downArrow)
        } else {
            window.alert("Please enter Customer Spending power Value")
        }
    }

    function showOPDays() {
        console.log("showOPDays", "exe")
        setdisplayOPDays(true)
        console.log(displayOPDays)
        // show OPdays submitBTN
        let submitOPdaysPBTN = document.getElementById("submitOPdays")
        submitOPdaysPBTN.hidden = false
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
            Simulate.click(downArrow)
        } else {
            window.alert("Please enter No. of Operational Days Value")
        }
    }

    function onNextshowCSPIcon() {
        setshowCSPIcon(true)
    }
    const footerTexts = [
        "Here in the section of Customer Spending Power (CSP), the first thing you need to mention is the the amount of money that a customer will spend on your product/ service in one instance of transaction. Now go ahead and enter the value of CSP and click on “SUBMIT” or press “Enter”.",
        "Voila! What just popped up on the screen is “Daily Expenditure by SAM”, which gets calculated automatically by multiplying the value of Customer Spending Power (CSP) with the size of Serviceable Addressable Market (SAM) obtained in earlier steps. The resultant value is the amount of money that you will be able to make, if the number of people in SAM bought your product at CSP value in one day.",
        "Now that we have our estimated earning from SAM in a day let's put in the number of days in month that we will keep our business operational and open to customers. Enter the value for the same in the field against “No. of Operational Days” and click on “SUBMIT” or press “Enter”.",
        "Great! You have successfully calculated the monthly and annual earnings from SAM for your business.",
        "Great! You have successfully calculated the monthly and annual earnings from SAM for your business. To mark this milestone an icon signifying the same will be added to the sidebar, which you can use to navigate back to CSP if you want to make any changes later.",

    ];


    return (
        <div>
            <Header />
            <BackButton topOffset='10vh' />
            <div className='indicatorIcon-container'>
                <div className='Icon-div'>
                    <img src={tamIcon} alt="TAM-Icon" className="Tam-Icon" />
                </div>
                <div className='Icon-div'>
                    <img src={samIcon} alt="SAM-Icon" className="Tam-Icon" />
                </div>
                {/* Animate the icon entry */}
                <AnimatePresence mode="wait">
                    {showCSPIcon ? (
                        <motion.img
                            key="CSP-img"
                            src={samIcon}
                            alt="Sam-Icon"
                            className="Tam-Icon"
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
            <div className="csp-container">
                <h1>Customer Spending Power</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <p>Customer Spending Power</p>
                            </td>
                            <td>
                                <CustomTextField value={CSPValue} label='per customer / product' min={1} onChange={(value) => handleCSPChange(value)} />
                            </td>
                            <td>
                                <NumberToWords value={CSPValue} />
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
                                        <TextDisplay label='per day' value={DailyExpbySAM} />
                                    </PopUp>
                                </td>
                                <td>
                                    <NumberToWords value={DailyExpbySAM} />
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
                                        <CustomTextField value={OPDays} label='days per month' min={1} max={31} onChange={(value) => handleOPDaysChange(value)} />
                                    </PopUp>
                                </td>
                                <td>
                                    <NumberToWords value={OPDays} />
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
                                        <TextDisplay value={CSPMonthly} label='per month' />
                                    </PopUp>
                                </td>
                                <td>
                                    <NumberToWords value={CSPMonthly} />
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
                                        <TextDisplay value={CSPYearly} label='per year' />
                                    </PopUp>
                                </td>
                                <td>
                                    <NumberToWords value={CSPYearly} />
                                </td>
                            </tr>}
                    </tbody>
                </table>
                <button id='submitCSP' className='SubmitBTNCSP' onClick={submitCSP}>Submit CSP</button>
                <button id='submitOPdays' className='SubmitBTNCSP' hidden onClick={submitOPdays}>Submit OP</button>
            </div>



            <Footer texts={footerTexts} onNextOPDays={showOPDays} onNextshowCSPIcon={onNextshowCSPIcon} />
        </div>
    )
}

export default CSP