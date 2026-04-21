import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BackButton from '../../components/BackButton'
import { motion, AnimatePresence } from 'framer-motion';
import '../../css/CapEx.css'

import CapExIcon from "../../assets/img/CapEx-icon.png";
import Footer from '../../components/Footer';
import NumberToWords from '../../components/NumberToWords';
import CustomTextField from '../../components/CustomTextField';
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


const Slide = ({ children, keyName }: { children: React.ReactNode; keyName: string }) => (
    <AnimatePresence mode="wait">
        <motion.div
            key={keyName}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
            {children}
        </motion.div>
    </AnimatePresence>
);

function CapEx() {
    // always run at start
    useEffect(() => {
        loadCapExRowsfromLocalStorage()
        showNavIconIfData()
    }, [])


    const [rows, setRows] = useState([
        { id: 1, ExpenseName: '', ValueOfExpense: '' },
        { id: 2, ExpenseName: '', ValueOfExpense: '' },
        { id: 3, ExpenseName: '', ValueOfExpense: '' },
    ]);
    const [errorMessage, setErrorMessage] = useState('');
    const [TotalCapEx, setTotalCapEx] = useState('');
    const [showCapExIconText, setshowCapExIconText] = useState(false);
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



    // helper Functions

    // if data in DB overwrite rows useState
    const loadCapExRowsfromLocalStorage = () => {
        try {
            let CapExDB = localStorage.getItem('CapExDB')
            let CapExTotal = localStorage.getItem('CapExTotal')
            // console.log("CapExDB start:", CapExDB);
            // console.log("CapExTotal start:", CapExTotal);

            if (CapExDB && CapExTotal) {
                setRows(JSON.parse(CapExDB))
                setTotalCapEx(CapExTotal)
            }

        } catch (error) {
            console.error("loadCapExRowsfromLocalStorage", error);

        }
    }

    // show CapEx indicator Icon and Text
    const showCapExIconAndText = () => {
        if (!showCapExIcon) {

            setTimeout(() => {
                setshowCapExIcon(true)
                setTimeout(() => {
                    // console.log("setshowCSPIconText(true)");
                    setshowCapExIconText(true)
                    setTimeout(() => {
                        // console.log("setshowCSPIconText(false)");
                        setshowCapExIconText(false)
                    }, 1000 * 2.5);
                }, 1000);
            }, 1000 * 2);
        }

    }

    // navigate to working-capital page
    const navigateTowardsEBT_WC = () => {
        navigate("/Biz-Sim-V2/towards-ebt-wc")
    }
    // helper Functions End

    // Table functions
    const handleDeleteRow = (id: number) => {
        if (rows.length === 1) {
            setErrorMessage('Please enter at least one segment.');
            return;
        }
        setRows(rows.filter(row => row.id !== id));
    };

    const handleExpenseNameChange = (id: number, value: string) => {
        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, ExpenseName: value } : row
        );
        setRows(updatedRows);
    };

    const handleExpenseValueChange = (id: number, value: string) => {
        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, ValueOfExpense: value } : row
        );
        setRows(updatedRows);
    };

    const handleAddRow = () => {
        const newRow = {
            id: rows.length ? rows[rows.length - 1].id + 1 : 1,
            ExpenseName: '',
            TypeOfExpense: '',
            ValueOfExpense: '',
        };
        setRows([...rows, newRow]);
    };

    const handleSaveDetails = () => {
        const allFieldsFilled = rows.every(row => row.ExpenseName !== '' && row.ValueOfExpense !== '');
        if (!allFieldsFilled) {
            setErrorMessage('Please enter details in all cells.');
            return;
        }
        setErrorMessage('');
        const total = rows.reduce((total, row) => total + parseInt(row.ValueOfExpense), 0);
        setTotalCapEx(total.toString());
        localStorage.setItem('CapExTotal', total.toString());
        localStorage.setItem('CapExDB', JSON.stringify(rows));
        showCapExIconAndText()

        // console.log("CapExDB: ", JSON.stringify(rows));
        // console.log("CapExTotal: ", total.toString());

    };

    // Table functions end

    const footerTexts = [
        "Here in the section of Capital Expenditure (OpEx), similar to what we did in the section of  OpEx, you will have to list down each expense that you are going to invest in to start your business. You will first have to enter the name of the expense, and then mention a value - amount of money which is going to be spent on that particular expense.",
        "You can add more rows for adding more expenses by clicking on “ADD EXPENSE” button, you may edit each expense and its value as well or remove an expense using the [-] icon. As an when you keep adding each expense the total capital expenditure will keep getting updated at the bottom field of “Total CapEx”.",
        "When you have completed with filling all the details of capital expenditure click on “SAVE DETAILS” to save your progress, this will create an icon in the left navigation bar, from where you can access this section and make changes later.",
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
            if (CSPMonthly && OPdays) setshowCSPIcon(true)

            // show SOM ICON
            const SOM = localStorage.getItem('SOM')
            if (SOM) setshowSOMIcon(true)

            // show OpEx ICON
            const OpExTotal = localStorage.getItem('OpExTotal')
            if (OpExTotal) setshowOpExIcon(true)

            // show CapEx ICON
            const CapExTotal = localStorage.getItem('CapExTotal')
            if (CapExTotal) { setshowCapExIcon(true); setFooterVisible(false) }

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
                        {showSOMIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/som')}>
                            <img src={somIcon} alt="SOM-Icon" className="SOM-Icon" />
                        </div>}
                        {showOpExIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/opex-calculation')}>
                            <img src={opexIcon} alt="OpEx-Icon" className="OpEx-Icon" />
                        </div>}
                        {/* Animate the icon entry */}
                        <div className='Icon-div' onClick={() => navigate('/Biz-Sim-V2/capex-calculation')}>
                            <AnimatePresence mode="wait">
                                {showCapExIcon ? (

                                    <motion.img
                                        key="CapEx-img"
                                        src={CapExIcon}
                                        alt="CapEx-Icon"
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
                                {showCapExIconText && (
                                    <motion.span
                                        key="CapEx-Icon-Text"
                                        initial={{ opacity: 0, x: -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 1 }}
                                    >
                                        Capital Expenditure
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                        {showEBTWCIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/EBT_WC-calculation')}>
                            <img src={ebtwcIcon} alt="EBT_WC-Icon" className="EBTWC-Icon" />
                        </div>}
                        {showFundingIcon && <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/funding')}>
                            <img src={FundingIcon} alt="Funding-Icon" className="Funding-Icon" />
                        </div>}
                    </div>
                    <div className={FooterVisible ? "table-container capex-table-container" : "table-container capex-table-container vh-90"}>
                        <h1>Capital Expenditure</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>{/* Delete row column */}
                                    <th>Name of the Expense</th>
                                    <th>Value of the Expense</th>
                                    {<th></th>}{/* NumberToWords header */}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map(row => (
                                    <tr key={row.id}>
                                        <td>
                                            <button className="delete-button" onClick={() => handleDeleteRow(row.id)}>-</button>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                value={row.ExpenseName}
                                                type='text'
                                                placeholder='Enter Name'
                                                onChange={(value) => handleExpenseNameChange(row.id, value)}
                                            />
                                        </td>
                                        <td>
                                            <div
                                                onMouseEnter={() => setisHoveredRow(`${row.id}`)}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <CustomTextField
                                                    value={row.ValueOfExpense}
                                                    type='number'
                                                    placeholder='Enter Value'
                                                    onChange={(value) => handleExpenseValueChange(row.id, value)}
                                                />
                                            </div>
                                        </td>

                                        <td className='NumberToWords-capex'>
                                            {isHoveredRow == `${row.id}` &&
                                                <Slide keyName={"NumberToWords-row:" + row.id}                                    >
                                                    <NumberToWords value={row.ValueOfExpense} />
                                                </Slide>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <div className="button-container">
                            <button className="add-button" onClick={handleAddRow}>ADD EXPENSE</button>
                            {<button className="save-button" onClick={handleSaveDetails}>SAVE DETAILS</button>}
                        </div>


                        <div className="total-size-container">
                            {/* <span className="total-size-clear-icon" onClick={handleClearTotal}>x</span> */}
                            <span className="total-size-words">Total CapEx</span>
                            <span className="total-size-words"><NumberToWords value={TotalCapEx.toString()} /></span>
                            <input
                                type="text"
                                value={TotalCapEx}
                                readOnly
                                className="total-size-field"
                            />
                        </div>

                    </div>
                    {FooterVisible &&
                        <Footer texts={footerTexts} onNextNavtowardsEBT_WC={navigateTowardsEBT_WC} />
                    }
                </div>
                :
                // TutorialMode=False
                <div>
                    <Header />
                    <BackButton topOffset='10vh' />
                    <div className="indicatorIcon-container">
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
                    <div className="table-container capex-table-container vh-90">
                        <h1>Capital Expenditure</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>{/* Delete row column */}
                                    <th>Name of the Expense</th>
                                    <th>Value of the Expense</th>
                                    {<th></th>}{/* NumberToWords header */}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map(row => (
                                    <tr key={row.id}>
                                        <td>
                                            <button className="delete-button" onClick={() => handleDeleteRow(row.id)}>-</button>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                value={row.ExpenseName}
                                                type='text'
                                                placeholder='Enter Name'
                                                onChange={(value) => handleExpenseNameChange(row.id, value)}
                                            />
                                        </td>
                                        <td>
                                            <div
                                                onMouseEnter={() => setisHoveredRow(`${row.id}`)}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <CustomTextField
                                                    value={row.ValueOfExpense}
                                                    type='number'
                                                    placeholder='Enter Value'
                                                    onChange={(value) => handleExpenseValueChange(row.id, value)}
                                                />
                                            </div>
                                        </td>

                                        <td className='NumberToWords-capex'>
                                            {isHoveredRow == `${row.id}` &&
                                                <Slide keyName={"NumberToWords-row:" + row.id}                                    >
                                                    <NumberToWords value={row.ValueOfExpense} />
                                                </Slide>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <div className="button-container">
                            <button className="add-button" onClick={handleAddRow}>ADD EXPENSE</button>
                            {<button className="save-button" onClick={handleSaveDetails}>SAVE DETAILS</button>}
                        </div>
                        <div className="total-size-container">
                            {/* <span className="total-size-clear-icon" onClick={handleClearTotal}>x</span> */}
                            <span className="total-size-words">Total CapEx</span>
                            <span className="total-size-words"><NumberToWords value={TotalCapEx.toString()} /></span>
                            <input
                                type="text"
                                value={TotalCapEx}
                                readOnly
                                className="total-size-field"
                            />
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default CapEx