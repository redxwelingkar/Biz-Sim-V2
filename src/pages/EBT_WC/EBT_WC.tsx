import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BackButton from '../../components/BackButton'
import { motion, AnimatePresence } from 'framer-motion';
import '../../css/EBT_WC.css'



import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import cspIcon from "../../assets/img/csp-icon.png";
import somIcon from "../../assets/img/som-icon.png";
import OpExIcon from "../../assets/img/OpEx-icon.png";
import CapExIcon from "../../assets/img/CapEx-icon.png";
import EBTWCIcon from "../../assets/img/EBT_WC.png";
import Footer from '../../components/Footer';
import NumberToWords from '../../components/NumberToWords';
import CustomTextField from '../../components/CustomTextField';
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
            style={{ overflowX: "auto", }}
        >
            {children}
        </motion.div>
    </AnimatePresence>
);

function EBT_WC() {
    const [OpExrows, setOpExrows] = useState([
        { id: 1, ExpenseName: '', TypeOfExpense: "", ValueOfExpense: '' }
    ]);
    // const [errorMessage, setErrorMessage] = useState('');
    const [EBT, setEBT] = useState('');
    const [SOMMonthly, setSOMMonthly] = useState('');
    const [WCMonths, setWCMonths] = useState('');
    const [WC, setWC] = useState('');
    const [showEBTWC, setshowEBTWC] = useState(false);
    const [showEBTWCText, setshowEBTWCText] = useState(false);
    const [showWorkingCapital, setshowWorkingCapital] = useState(false);
    const [isHoveredRow, setisHoveredRow] = useState("");
    const [successloadDataFromLocalStorage, setsuccessloadDataFromLocalStorage] = useState(false);

    const navigate = useNavigate()

    // always run at start
    useEffect(() => {
        loadDataFromLocalStorage()
    }, [])
    useEffect(() => {
        if (successloadDataFromLocalStorage) calculateEBT()
    }, [successloadDataFromLocalStorage])



    // helper Functions

    const loadDataFromLocalStorage = () => {
        try {
            let SOMMonthly = localStorage.getItem('SOMMonthly')
            let OpExDB = localStorage.getItem('OpExDB')
            // console.log("SOMMonthly start:", SOMMonthly);
            // console.log("OpExDB start:", OpExDB);

            if (SOMMonthly && OpExDB && SOMMonthly != null && OpExDB != null) {
                setOpExrows(JSON.parse(OpExDB))
                setSOMMonthly(SOMMonthly)
                setsuccessloadDataFromLocalStorage(true)
            } else {
                setsuccessloadDataFromLocalStorage(false)
                window.alert("SOM or Operational Expenses Not Calculated, Please complete those steps")
            }

        } catch (error) {
            console.error("loadDataFromLocalStorage", error);
            setsuccessloadDataFromLocalStorage(false)
            window.alert("SOM or Operational Expenses Not Calculated, Please complete those steps")
        }
    }

    const getOpExVariableTotal = () => {
        let data = OpExrows
        // console.log("data 1", data);
        let res = 0
        data.forEach((row) => {
            if (row.TypeOfExpense == "variable") {
                res += parseFloat(row.ValueOfExpense)
            }
        })
        return res
    }
    const getOpExFixedTotal = () => {
        let data = OpExrows
        console.log("data 1", data);
        let res = 0
        data.forEach((row) => {
            if (row.TypeOfExpense == "fixed") {
                res += parseFloat(row.ValueOfExpense)
            }
        })
        return res
    }

    const calculateEBT = () => {
        // find total variable OpEx and subtract it with SOMMonthly
        let OpExVariableTotal = getOpExVariableTotal()
        let ebt = parseFloat(SOMMonthly) - OpExVariableTotal
        setEBT(ebt.toString())
        localStorage.setItem("ebt", ebt.toString())
        // console.log("OpExVariableTotal", OpExVariableTotal);
        // console.log("ebt", ebt);

    }

    const calculateWC = (value: string) => {
        // Calculate Working capital
        // WC = CapEx Total + OpEx Fixed + (OpEx Variable x3)
        let CapExT, OpExF, OpExV, WC
        try {
            CapExT = localStorage.getItem("CapExTotal")
        } catch (error) {
            console.error("Error getting CapExTotal", error)
            window.alert("Complete CapEX Step first")
        }

        OpExF = getOpExFixedTotal()
        OpExV = getOpExVariableTotal()

        if (CapExT != null && CapExT != undefined) {
            console.log("WC: ", "CapExT", CapExT, "OpExF", OpExF, "OpExV", OpExV, "value", value);

            WC = (parseInt(CapExT) + OpExF) + (OpExV * parseInt(value))
            setWC(WC.toString())
        }
    }

    // show CapEx indicator Icon and Text
    const showEBT_WCIcon = () => {
        setTimeout(() => {
            setshowEBTWC(true)
            setTimeout(() => {
                console.log("setshowCSPIconText(true)");
                setshowEBTWCText(true)
                setTimeout(() => {
                    console.log("setshowCSPIconText(false)");
                    setshowEBTWCText(false)
                }, 1000 * 2.5);
            }, 1000);
        }, 1000 * 2);
    }

    // navigate to working-capital page
    const onNextNavtowardsFunding = () => {
        navigate("/Biz-Sim-V2/towards-funding")
    }

    const handleWCMonthsChange = (value: string) => {
        setWCMonths(value)
        if (parseInt(value) > 0) calculateWC(value)
    }

    const handleSaveWC = () => {
        // save no. of months and WC 
        localStorage.setItem("WC", WC)
        localStorage.setItem("WCMonths", WCMonths)
        showEBT_WCIcon()
    }
    // helper Functions End



    const footerTexts = [
        "Here in this section, the system will automatically calculate your monthly Earnings Before Tax (EBT) based on the earlier data,  by subtracting monthly operational expenses (OpEx) from the monthly sales obtained from the Serviceable Obtainable Market (SOM). The field is uneditable and will only change if there's a change in the operational expenditure or sales from SOM.",
        "Now to calculate the working capital the system will use the earlier calculated data on Capital Expenditure (CapEx) and Operational Expenditure (OpEx) the you wil have to enter the number of months for which those values should be considered, this represents the assumption that your business needs to sustain itself for that duration, after which it’ll start making actual profit over the investment.",
        "Now enter the number of months in the provided field and press “Enter”, the system will immediately calculate the working capital for the entered number of months.",
        "Click on “SAVE DETAILS” to save your progress, this will create an icon in the left navigation bar, from where you can access this section and make changes later.",
        "Click on the downward arrow here to move on to the next section.",
        ""
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
                <div className='Icon-div'>
                    <img src={somIcon} alt="SOM-Icon" className="Tam-Icon" />
                </div>
                <div className='Icon-div'>
                    <img src={OpExIcon} alt="OpEx-Icon" className="EBT-Icon" />
                </div>
                <div className='Icon-div'>
                    <img src={CapExIcon} alt="CapEx-Icon" className="SOM-Icon" />
                </div>
                {/* Animate the icon entry */}
                <div className='Icon-div'>
                    <AnimatePresence mode="wait">
                        {showEBTWC ? (

                            <motion.img
                                key="EBTWCIcon-img"
                                src={EBTWCIcon}
                                alt="CapEx-Icon"
                                className="EBT-Icon"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 1 }}
                            />

                        ) : <div></div>}
                    </AnimatePresence>
                    {/* Animate the text entry/exit */}
                    <AnimatePresence mode="wait">
                        {showEBTWCText && (
                            <motion.span
                                key="EBTWC-Icon-Text"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 1 }}
                            >
                                EBT & Working Capital
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="csp-container">
                <h1>Earnings Before Tax</h1>

                <table>
                    <tbody>
                        <tr>
                            <td>
                                <PopUp keyName='EBTHeader'>
                                    <p>Earnings Before Tax</p>
                                </PopUp>
                            </td>
                            <td>
                                <PopUp keyName='EBT'>
                                    <div
                                        onMouseEnter={() => setisHoveredRow("EBTwords")}
                                        onMouseLeave={() => setisHoveredRow("")}
                                    >
                                        <TextDisplay label='per month' value={EBT} />
                                    </div>
                                </PopUp>
                            </td>
                            <td >
                                {isHoveredRow === "EBTwords" &&
                                    <Slide keyName='EBTwords'>
                                        <NumberToWords value={EBT} />
                                    </Slide>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>

                {showWorkingCapital &&
                    <div className="csp-container" >
                        <PopUp keyName='WCHeader'>
                            <h1>Working Capital</h1>
                        </PopUp>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <PopUp keyName='WCMonthsHeader'>
                                            <p>Number of months</p>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='WCMonths'>
                                            <div
                                                onMouseEnter={() => setisHoveredRow("WCMonthsWords")}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <CustomTextField
                                                    value={WCMonths}
                                                    type='number'
                                                    placeholder='Enter No. of Months'
                                                    min={1}
                                                    onChange={(value) => handleWCMonthsChange(value)} />
                                            </div>
                                        </PopUp>
                                    </td>
                                    <td>
                                        {isHoveredRow === "WCMonthsWords" &&
                                            <Slide keyName='WCMonthsWords'>
                                                <NumberToWords value={WCMonths} />
                                            </Slide>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <PopUp keyName='WC'>
                            <div>
                                <h1>To Start the Business</h1>
                                <input
                                    type="text"
                                    value={WC}
                                    readOnly
                                    className="total-size-field"
                                />
                                <div className='WC-words'>
                                    <NumberToWords value={WC} />
                                </div>
                            </div>
                        </PopUp>
                        <button className="save-button" onClick={handleSaveWC}>SAVE DETAILS</button>
                    </div>

                }
            </div>

            <div className="button-container">

                { }
            </div>

            <Footer texts={footerTexts} onNextShowWC={() => setshowWorkingCapital(true)} onNextNavtowardsFunding={onNextNavtowardsFunding} />
        </div>
    )
}

export default EBT_WC