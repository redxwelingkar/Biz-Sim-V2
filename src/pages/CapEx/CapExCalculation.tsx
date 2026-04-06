import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BackButton from '../../components/BackButton'
import { motion, AnimatePresence } from 'framer-motion';
import '../../css/CapEx.css'



import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import cspIcon from "../../assets/img/csp-icon.png";
import somIcon from "../../assets/img/som-icon.png";
import OpExIcon from "../../assets/img/OpEx-icon.png";
import CapExIcon from "../../assets/img/CapEx-icon.png";
import Footer from '../../components/Footer';
import NumberToWords from '../../components/NumberToWords';
import CustomTextField from '../../components/CustomTextField';
import { useNavigate } from 'react-router-dom';

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
    }, [])


    const [rows, setRows] = useState([
        { id: 1, ExpenseName: '', ValueOfExpense: '' },
        { id: 2, ExpenseName: '', ValueOfExpense: '' },
        { id: 3, ExpenseName: '', ValueOfExpense: '' },
    ]);
    const [errorMessage, setErrorMessage] = useState('');
    const [TotalCapEx, setTotalCapEx] = useState('');
    const [showCapExIcon, setshowCapExIcon] = useState(false);
    const [showCapExIconText, setshowCapExIconText] = useState(false);
    const [isHoveredRow, setisHoveredRow] = useState("");

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
                    console.log("setshowCSPIconText(true)");
                    setshowCapExIconText(true)
                    setTimeout(() => {
                        console.log("setshowCSPIconText(false)");
                        setshowCapExIconText(false)
                    }, 1000 * 2.5);
                }, 1000);
            }, 1000 * 2);
        }

    }

    // navigate to working-capital page
    const navigateToCapEx=()=>{
        // todo: change to towards working-capital pages
        navigate("/Biz-Sim-V2/working-capital")
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

        console.log("CapExDB: ", JSON.stringify(rows));
        console.log("CapExTotal: ", total.toString());

    };



    // Table functions end


    /* const footerTexts = [
        "Here in this section, the system will automatically calculate your monthly Earnings Before Tax (EBT) based on the earlier data,  by subtracting monthly operational expenses (OpEx) from the monthly sales obtained from the Serviceable Obtainable Market (SOM). The field is uneditable and will only change if there's a change in the operational expenditure or sales from SOM.",
        "Now to calculate the working capital the system will use the earlier calculated data on Capital Expenditure (CapEx) and Operational Expenditure (OpEx) the you wil have to enter the number of months for which those values should be considered, this represents the assumption that your business needs to sustain itself for that duration, after which it’ll start making actual profit over the investment.",
        "Now enter the number of months in the provided field and press “Enter”, the system will immediately calculate the working capital for the entered number of months.",
        "Click on “SAVE DETAILS” to save your progress, this will create an icon in the left navigation bar, from where you can access this section and make changes later.",
        "Click on the downward arrow here to move on to the next section.",
        ""
    ]; */
    const footerTexts = [
        "Here in the section of Capital Expenditure (OpEx), similar to what we did in the section of  OpEx, you will have to list down each expense that you are going to invest in to start your business. You will first have to enter the name of the expense, and then mention a value - amount of money which is going to be spent on that particular expense.",
        "You can add more rows for adding more expenses by clicking on “ADD EXPENSE” button, you may edit each expense and its value as well or remove an expense using the [-] icon. As an when you keep adding each expense the total capital expenditure will keep getting updated at the bottom field of “Total CapEx”.",
        "When you have completed with filling all the details of capital expenditure click on “SAVE DETAILS” to save your progress, this will create an icon in the left navigation bar, from where you can access this section and make changes later.",
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
                    <img src={somIcon} alt="SOM-Icon" className="SOM-Icon" />
                </div>
                <div className='Icon-div'>
                    <img src={OpExIcon} alt="OpEx-Icon" className="SOM-Icon" />
                </div>
                {/* Animate the icon entry */}
                <div className='Icon-div'>
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
            </div>
            <div className="table-container capex-table-container">
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



            <Footer texts={footerTexts} onNextNavtoCapEx={navigateToCapEx} />
        </div>
    )
}

export default CapEx