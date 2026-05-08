import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { motion, AnimatePresence } from 'framer-motion';
import "../../css/IntendedPricing.css";

import Footer from '../../components/Footer';
import NumberToWords from '../../components/NumberToWords';
import CustomTextField from '../../components/CustomTextField';
import TextDisplay from '../../components/TextDisplay';
import { useNavigate } from 'react-router-dom';
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



function SOM() {

    const [SOMValue, setSOMValue] = useState("")
    const [IntendedPricingValue, setIntendedPricingValue] = useState("")
    const [DailyRevfromSOM, setDailyRevfromSOM] = useState("")
    const [MonthlyRevfromSOM, setMonthlyRevfromSOM] = useState("")
    const [YearlyRevfromSOM, setYearlyRevfromSOM] = useState("")
    const [displayRevfromSOM, setdisplayRevfromSOM] = useState(false)
    const [OPDays, setOPDays] = useState("")
    const [SAM, setSAM] = useState("");
    const [SAMPercent, setSAMPercent] = useState("");
    const [showSAMPercentInput, setshowSAMPercentInput] = useState(false);
    const [isHoveredRow, setisHoveredRow] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const [FooterVisible, setFooterVisible] = useState(true);

    const [TutorialMode, setTutorialMode] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        showNavIconIfData()

        let opdays = localStorage.getItem("OPdays")
        if (opdays) {
            setOPDays(opdays)
        } else {
            setErrorMessage("Operational Days Not Calculated, Please Complete Previous Steps")
            // window.alert("Operational days not calulated please Complete previous step")
        }
        let IntendedPricing = localStorage.getItem("IntendedPricingValue")
        if (IntendedPricing) {
            setIntendedPricingValue(IntendedPricing)
        } else {
            setErrorMessage("IntendedPricing Not Calculated, Please Complete Previous Steps")
            // window.alert("IntendedPricing not calulated please Complete previous step")
        }


        let sam = localStorage.getItem("SAM")
        if (sam) {
            setSAM(sam)
        } else {
            setErrorMessage("SAM Not Calculated, Please Complete Previous Steps")
            // window.alert("SAM not calulated please Complete previous step")
        }
        // console.log("opdays", opdays)
        // console.log("displayOPDays", displayOPDays)


        // check if values already exist and populate them
        let SAMPercentLS = localStorage.getItem("SAMPercent")
        let SOM = localStorage.getItem("SOM")
        let OPdaysLS = localStorage.getItem("OPdays")
        let SOMDaily = localStorage.getItem("SOMDaily")
        let SOMMonthlyLS = localStorage.getItem("SOMMonthly")
        let SOMYearlyLS = localStorage.getItem("SOMYearly")

        if (SAMPercentLS != null) {
            setSAMPercent(SAMPercentLS)
            setshowSAMPercentInput(true)
        }


        if (OPdaysLS != null) setOPDays(OPdaysLS)
        if (SOM != null) setSOMValue(SOM)
        if (SOMDaily != null) setDailyRevfromSOM(SOMDaily)
        if (SOMMonthlyLS != null) setMonthlyRevfromSOM(SOMMonthlyLS)
        if (SOMYearlyLS != null) setYearlyRevfromSOM(SOMYearlyLS)
        if (SOM && SOMDaily && SOMMonthlyLS && SOMYearlyLS) setdisplayRevfromSOM(true)


    }, []);

    function navigateToTowardsOpEx() {
        navigate("/Biz-Sim-V2/towards-opex");
    }

    function handleSAMPercentChange(value: string) {
        setSAMPercent(value)
    }

    // const savetoLocalStorage=()=>{
    //     try {
    //         console.log("savetoLocalStorage SOMValue",SOMValue);

    //         localStorage.setItem("SOM",SOMValue)
    //         localStorage.setItem("SOMDaily",DailyRevfromSOM)
    //         localStorage.setItem("SOMMonthly",MonthlyRevfromSOM)
    //         localStorage.setItem("SOMYearly",YearlyRevfromSOM)
    //     } catch (error) {
    //         console.error("SOM - savetoLocalStorage",error);

    //     }
    // }

    function submitSAMPercent() {
        if (SAMPercent || parseFloat(SAMPercent) > 0) {
            localStorage.setItem("SAMPercent", SAMPercent)

            // Calculate SOM values
            let IntendedPricing = parseFloat(IntendedPricingValue)
            let SOM = (parseFloat(SAMPercent) / 100) * parseFloat(SAM)
            setSOMValue(SOM.toFixed(2))
            localStorage.setItem("SOM", SOM.toFixed(2))

            let DailyRevfromSOM = (SOM * IntendedPricing).toFixed(2)
            setDailyRevfromSOM(DailyRevfromSOM)
            localStorage.setItem("SOMDaily", DailyRevfromSOM)

            let MonthlyRevfromSOM = (SOM * IntendedPricing * parseFloat(OPDays)).toFixed(2)
            setMonthlyRevfromSOM(MonthlyRevfromSOM)
            localStorage.setItem("SOMMonthly", MonthlyRevfromSOM)

            let YearlyRevfromSOM = (SOM * IntendedPricing * parseFloat(OPDays) * 12).toFixed(2)
            setYearlyRevfromSOM(YearlyRevfromSOM)
            localStorage.setItem("SOMYearly", YearlyRevfromSOM)

            setdisplayRevfromSOM(true)

            syncAllData("SAMPercent")

            // Autoclick down arrow to go to next step when submitting IntendedPricingValue
            // let downArrow = document.getElementById("downArrow")
            // if (downArrow) Simulate.click(downArrow)

        } else {
            window.alert("Please enter Percentage of SAM Captured by the business")
        }
    }


    function SAMPercentInput() {
        setshowSAMPercentInput(true)
    }
    const footerTexts = [
        "Here in the section of Serviceable Obtainable Market (SOM), the first thing you will see is that we have displayed the value of SAM which we had calculated in the earlier section. Now remember this is an estimate of customers that will be catered by your business without any competition and other market barriers.",
        "Now, based on what you have learned about Serviceable Addressable Market, Serviceable Obtainable Market, the general ratio between the two, and on what kind of competitors and other market barriers you may face in your business, enter an educated estimate value in the field and click on \"SUBMIT\".",
        "Now three values regarding the daily, monthly and yearly expenditure by customer has come up on the screen, which looks similar to what we had in the SAM section. The difference here is that the values presented above are a practical estimation of revenue generated by your business. So do you think with this revenue your business will be profitable?",
        "Great! You have successfully defined and calculated the size of the Serviceable Obtainable Market (SOM) for your business and a practical estimate of the revenue generated. To mark this milestone an icon signifying the same will be added to the side navigation bar, which you can use to navigate back to SOM if you want to make any changes later.",
        "Click on the “Blinking down arrow” here to move on to the next section.",
        "",
    ];
    const showNavIconIfData = () => {
        try {
            // TutorialMode
            const Tutorialmode = localStorage.getItem('TutorialMode')
            if (Tutorialmode == "true") setTutorialMode(true)

            // show SOM ICON
            const SOM = localStorage.getItem('SOM')
            if (SOM) {
                setFooterVisible(false)
            }
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
                                {displayRevfromSOM &&
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
                                {displayRevfromSOM &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='DailySOMHeader'>
                                                <p>Daily Revenue from SOM</p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='DailySOMValue'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("DailyRevfromSOMWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <TextDisplay label='per day' value={DailyRevfromSOM} />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "DailyRevfromSOMWords" &&
                                                <Slide keyName='DailyRevfromSOMWords'>
                                                    <NumberToWords value={DailyRevfromSOM} />
                                                </Slide>}
                                        </td>
                                    </tr>}
                                {displayRevfromSOM &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='MonthlySOMHeader'>
                                                <p>Monthly Revenue from SOM</p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='MonthlySOMValue'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("MonthlyRevfromSOMWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <TextDisplay label='per month' value={MonthlyRevfromSOM} />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "MonthlyRevfromSOMWords" &&
                                                <Slide keyName='MonthlyRevfromSOMWords'>
                                                    <NumberToWords value={MonthlyRevfromSOM} />
                                                </Slide>}
                                        </td>
                                    </tr>}
                                {displayRevfromSOM &&
                                    <tr>
                                        <td>
                                            <PopUp keyName='YearlySOMHeader'>
                                                <p>Yearly Revenue from SOM</p>
                                            </PopUp>
                                        </td>
                                        <td>
                                            <PopUp keyName='YearlySOMValue'>
                                                <div
                                                    onMouseEnter={() => setisHoveredRow("YearlyRevfromSOMWords")}
                                                    onMouseLeave={() => setisHoveredRow("")}
                                                >
                                                    <TextDisplay label='per year' value={YearlyRevfromSOM} />
                                                </div>
                                            </PopUp>
                                        </td>
                                        <td>
                                            {isHoveredRow === "YearlyRevfromSOMWords" &&
                                                <Slide keyName='YearlyRevfromSOMWords'>
                                                    <NumberToWords value={YearlyRevfromSOM} />
                                                </Slide>
                                            }
                                        </td>
                                    </tr>}
                            </tbody>
                        </table>
                        {showSAMPercentInput &&
                            <button id='submitIntendedPricing' className='SubmitBTNIntendedPricing' onClick={submitSAMPercent}>Submit SAM %</button>}
                        <div className='bottom-margin'></div>
                    </div>
                    {FooterVisible &&
                        <Footer texts={footerTexts} onNextNavtoOpEx={() => navigateToTowardsOpEx()} onNextSAMPercent={SAMPercentInput} />
                    }
                </div>
                :
                // TutorialMode=False
                <div>
                    <Header />
                    <NavigationIcons />
                    <div className="IntendedPricing-container vh-90">
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
                                </tr>

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
                                </tr>

                                <tr>
                                    <td>
                                        <PopUp keyName='DailySOMHeader'>
                                            <p>Daily Revenue from SOM</p>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='DailySOMValue'>
                                            <div
                                                onMouseEnter={() => setisHoveredRow("DailyRevfromSOMWords")}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <TextDisplay label='per day' value={DailyRevfromSOM} />
                                            </div>
                                        </PopUp>
                                    </td>
                                    <td>
                                        {isHoveredRow === "DailyRevfromSOMWords" &&
                                            <Slide keyName='DailyRevfromSOMWords'>
                                                <NumberToWords value={DailyRevfromSOM} />
                                            </Slide>}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <PopUp keyName='MonthlySOMHeader'>
                                            <p>Monthly Revenue from SOM</p>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='MonthlySOMValue'>
                                            <div
                                                onMouseEnter={() => setisHoveredRow("MonthlyRevfromSOMWords")}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <TextDisplay label='per month' value={MonthlyRevfromSOM} />
                                            </div>
                                        </PopUp>
                                    </td>
                                    <td>
                                        {isHoveredRow === "MonthlyRevfromSOMWords" &&
                                            <Slide keyName='MonthlyRevfromSOMWords'>
                                                <NumberToWords value={MonthlyRevfromSOM} />
                                            </Slide>}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <PopUp keyName='YearlySOMHeader'>
                                            <p>Yearly Revenue from SOM</p>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='YearlySOMValue'>
                                            <div
                                                onMouseEnter={() => setisHoveredRow("YearlyRevfromSOMWords")}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <TextDisplay label='per year' value={YearlyRevfromSOM} />
                                            </div>
                                        </PopUp>
                                    </td>
                                    <td>
                                        {isHoveredRow === "YearlyRevfromSOMWords" &&
                                            <Slide keyName='YearlyRevfromSOMWords'>
                                                <NumberToWords value={YearlyRevfromSOM} />
                                            </Slide>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <button id='submitIntendedPricing' className='SubmitBTNIntendedPricing' onClick={submitSAMPercent}>Submit SAM %</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default SOM
