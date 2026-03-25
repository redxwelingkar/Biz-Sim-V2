import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BackButton from '../../components/BackButton'
import { motion, AnimatePresence } from 'framer-motion';
import "../../css/CSP.css";

import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import cspIcon from "../../assets/img/csp-icon.png";
import Footer from '../../components/Footer';
import NumberToWords from '../../components/NumberToWords';
import CustomTextField from '../../components/CustomTextField';
import CustomButton from '../../components/CustomButton';
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
function SOM() {

    const [SOMValue, setSOMValue] = useState("")
    const [CSPMonthly, setCSPMonthly] = useState("")
    const [CSPYearly, setCSPYearly] = useState("")
    const [DailyExpbySAM, setDailyExpbySAM] = useState("")
    const [displayOPDays, setdisplayOPDays] = useState(false)
    const [OPDays, setOPDays] = useState("")
    const [SAM, setSAM] = useState("");
    const [SAMPercent, setSAMPercent] = useState("");
    const [showCSPIcon, setshowCSPIcon] = useState(false);
    const [showCSPIconText, setshowCSPIconText] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        let sam = localStorage.getItem("SAM")
        if (sam) {
            setSAM(sam)
        } else {
            window.alert("SAM not calulated please Complete previous step")
        }
        // console.log("SAM", sam)
        // console.log("displayOPDays", displayOPDays)
    }, []);

    function navigateToTowardsSOM() {
        navigate("/Biz-Sim-V2/towardsSOM");
    }

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
                            navigateToTowardsSOM()
                        }, 1000 * 2);
                    }, 1000 * 2.5);
                }, 1000);
            }, 1000 * 2);
        }
    }, [showCSPIcon])

    function handleSOMChange(value: string) {
        setSOMValue(value)
    }

    function handleOPDaysChange(value: string) {
        setOPDays(value)
    }
    function handleSAMPercentChange(value: string) {
        setSAMPercent(value)
    }

    function submitCSP() {
        // Save / set SOMValue in local storage
        if (SOMValue || parseFloat(SOMValue) > 0) {
            localStorage.setItem("SOMValue", SOMValue)

            // get SAM from localstorage and multiply it with SOMValue to get Daily Expenditure by SAM Value
            setDailyExpbySAM((parseFloat(SAM) * parseFloat(SOMValue)).toString())

            // hide submitCSP BTN
            let submitCSPBTN = document.getElementById("submitCSP")
            submitCSPBTN.hidden = true

            // Autoclick down arrow to go to next step when submitting SOMValue
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
        "Here in the section of Serviceable Obtainable Market (SOM), the first thing you will see is that we have displayed the value of SAM which we had calculated in the earlier section. Now remember this is an estimate of customers that will be catered by your business without any competition and other market barriers.",
        "Now, based on what you have learned about Serviceable Addressable Market, Serviceable Obtainable Market, the general ratio between the two, and on what kind of competitors and other market barriers you may face in your business, enter an educated estimate value in the field and press “Enter” or click on “SUBMIT”.",
        "Now three values regarding the daily, monthly and yearly expenditure by customer has come up on the screen, which looks similar to what we had in the SAM section. The difference here is that the values presented above are a practical estimation of revenue generated by your business. So do you think with this revenue your business will be profitable?",
        "Great! You have successfully defined and calculated the size of the Serviceable Obtainable Market (SOM) for your business and a practical estimate of the revenue generated. To mark this milestone an icon signifying the same will be added to the sidebar, which you can use to navigate back to SOM if you want to make any changes later.",
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
                <div className='Icon-div'>
                    <img src={cspIcon} alt="CSP-Icon" className="CSP-Icon" />
                </div>
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
                                    <TextDisplay label='per day' value={SAM} />
                                </PopUp>
                            </td>
                            <td>
                                <NumberToWords value={SAM} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <PopUp keyName='SAMPercentHeader'>
                                    <p>Percentage of SAM Captured by the business</p>
                                </PopUp>
                            </td>
                            <td>
                                <PopUp keyName='SAMPercent'>
                                    <CustomTextField value={SAMPercent} label='percent' min={1} max={100} onChange={(value) => handleSAMPercentChange(value)} />
                                </PopUp>
                            </td>
                            <td>
                                <NumberToWords value={SAMPercent} />
                            </td>
                        </tr>
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

export default SOM