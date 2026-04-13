import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BackButton from '../../components/BackButton'
import { motion, AnimatePresence } from 'framer-motion';
import '../../css/OpEx.css'



import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import cspIcon from "../../assets/img/csp-icon.png";
import somIcon from "../../assets/img/som-icon.png";
import OpExIcon from "../../assets/img/OpEx-icon.png";
import Footer from '../../components/Footer';
import NumberToWords from '../../components/NumberToWords';
import CustomTextField from '../../components/CustomTextField';
import { useNavigate } from 'react-router-dom';
import TextDisplay from '../../components/TextDisplay';

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

function OpEx() {
    // always run at start
    useEffect(() => {
        loadOpExRowsfromLocalStorage()
    }, [])



    const [rows, setRows] = useState([
        { id: 1, ExpenseName: '', TypeOfExpense: '', ValueOfExpense: '' },
        { id: 2, ExpenseName: '', TypeOfExpense: '', ValueOfExpense: '' },
        { id: 3, ExpenseName: '', TypeOfExpense: '', ValueOfExpense: '' },
    ]);
    const [errorMessage, setErrorMessage] = useState('');
    const [TotalOpEx, setTotalOpEx] = useState('');
    const [EMI, setEMI] = useState('');
    const [showOpExIcon, setshowOpExIcon] = useState(false);
    const [showOpExIconText, setshowOpExIconText] = useState(false);
    const [isHoveredRow, setisHoveredRow] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        AddEMIRow()
    }, [EMI])


    // helper Functions

    // if data in DB overwrite rows useState
    const loadOpExRowsfromLocalStorage = () => {
        try {
            let OpExDB = localStorage.getItem('OpExDB')
            let OpExTotal = localStorage.getItem('OpExTotal')
            let EMI = localStorage.getItem('EMI')
            // console.log("OpExDB start:", OpExDB);
            // console.log("OpExTotal start:", OpExTotal);

            if (OpExDB && OpExTotal) {
                setRows(JSON.parse(OpExDB))
                setTotalOpEx(OpExTotal)
            }

            if (EMI && EMI != null) {
                // console.log('emi start',EMI);

                setEMI(EMI)
            }

        } catch (error) {
            console.error("loadOpExRowsfromLocalStorage", error);

        }
    }

    // show OpEx indicator Icon and Text
    const showOpExIconAndText = () => {
        if (!showOpExIcon) {

            setTimeout(() => {
                setshowOpExIcon(true)
                setTimeout(() => {
                    console.log("setshowCSPIconText(true)");
                    setshowOpExIconText(true)
                    setTimeout(() => {
                        console.log("setshowCSPIconText(false)");
                        setshowOpExIconText(false)
                    }, 1000 * 2.5);
                }, 1000);
            }, 1000 * 2);
        }

    }

    // navigate to CapEx page
    const navigateToCapEx = () => {
        // todo: change to towards capex pages
        navigate("/Biz-Sim-V2/capex-calculation")
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

    const handleExpenseTypeChange = (id: number, value: string) => {
        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, TypeOfExpense: value } : row
        );
        setRows(updatedRows);
    }

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

    const AddEMIRow = () => {
        console.log('AddEMIRow called');

        if (EMI && EMI != null) {
            // try updating emi row
            let IsEMI = false
            const updatedRows = rows.map(row => {
                if (row.ExpenseName === "Monthly Repayment [Auto Cal]") {
                    console.log('AddEMIRow update', row);
                    IsEMI = true
                    return {
                        ...row,
                        ValueOfExpense: EMI
                    }
                }

                return row
            });
            setRows(updatedRows);

            if (!IsEMI) {
                // add emi row
                const newRow = {
                    id: rows.length ? rows[rows.length - 1].id + 1 : 1,
                    ExpenseName: 'Monthly Repayment [Auto Cal]',
                    TypeOfExpense: 'variable',
                    ValueOfExpense: EMI,
                };
                console.log('AddEMIRow newRow', newRow);
                setRows([newRow, ...rows]);
            }
        }
    };

    const handleSaveDetails = () => {
        const allFieldsFilled = rows.every(row => row.ExpenseName !== '' && row.ValueOfExpense !== '' && row.TypeOfExpense !== '');
        if (!allFieldsFilled) {
            setErrorMessage('Please enter details in all cells.');
            return;
        }
        setErrorMessage('');
        const total = rows.reduce((total, row) => total + parseInt(row.ValueOfExpense), 0);
        setTotalOpEx(total.toString());
        localStorage.setItem('OpExTotal', total.toString());
        localStorage.setItem('OpExDB', JSON.stringify(rows));
        showOpExIconAndText()

        // console.log("OpexDB: ", JSON.stringify(rows));
        // console.log("OpEx Total: ", total.toString());

    };



    // Table functions end


    const footerTexts = [
        "Here in the section of Operational Expenditure (OpEx), you will have to list down each expense that your business is going to incur while in operation. You will first have to enter the name of the expense, then select its type, whether it is fixed or variable, and then mention a value - amount of money which is going to be spent on that particular expense.",
        "Fixed operating expenses are those which remain constant regardless of business activity (e.g., rent, insurance, salaried wages), while variable operating expenses are those that fluctuate with business activity (e.g., raw materials, commissions, utilities). It is ideal to be thorough when listing down the expenses and an estimate value for them.",
        "You can add more rows for adding more expenses by clicking on “ADD EXPENSE” button, you may edit each expense, their type and value as well or remove an expense using the [-] icon. As an when you keep adding each expense the total operational expenditure will keep getting updated at the bottom field of “Total OpEx”.",
        "When you have completed with filling all the details of operational expenditure click on “SAVE DETAILS” to save your progress, this will create an icon in the left navigation bar, from where you can access this section and make changes later.",
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
                {/* Animate the icon entry */}
                <div className='Icon-div'>
                    <AnimatePresence mode="wait">
                        {showOpExIcon ? (

                            <motion.img
                                key="OpEx-img"
                                src={OpExIcon}
                                alt="OpEx-Icon"
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
                        {showOpExIconText && (
                            <motion.span
                                key="OpEx-Icon-Text"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 1 }}
                            >
                                Operational Expenditure
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="table-container opex-table-container">
                <h1>Operational Expenditure</h1>
                <table className="table">
                    <thead>
                        <tr>

                            <th></th>{/* Delete row column */}
                            <th>Name of the Expense</th>
                            <th>Type of Expense</th>
                            <th>Value of the Expense</th>
                            {<th></th>}{/* NumberToWords header */}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row => (
                            row.ExpenseName === "Monthly Repayment [Auto Cal]" ? (
                                <tr key={row.id} id="MonthlyRepaymentRow">
                                    <td>
                                        <PopUp keyName='EMI-delete'>
                                            <button className="delete-button" onClick={() => handleDeleteRow(row.id)}>-</button>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='EMI-ExpenseName'>
                                            <TextDisplay
                                                value={row.ExpenseName}
                                            />
                                        </PopUp>
                                        {/* <CustomTextField
                                            value={row.ExpenseName}
                                            type='text'
                                            placeholder='Enter Name'
                                            onChange={(value) => handleExpenseNameChange(row.id, value)}
                                        /> */}
                                    </td>
                                    <td>
                                        {/* Expense type toggle */}
                                        <PopUp keyName='EMI-expense-type-toggle'>
                                            <div className="expense-type-toggle">
                                                <button
                                                    // type="button"
                                                    className={`expense-type-btn left ${row.TypeOfExpense === 'fixed' ? 'selected' : ''}`}
                                                // onClick={() => {}}
                                                >
                                                    Fixed
                                                </button>

                                                <button
                                                    // type="button"
                                                    className={`expense-type-btn right ${row.TypeOfExpense === 'variable' ? 'selected' : ''}`}
                                                // onClick={() => {}}
                                                >
                                                    Variable
                                                </button>
                                            </div>
                                        </PopUp>
                                    </td>
                                    <td>
                                        <PopUp keyName='EMI-ExpenseName'>
                                            <div
                                                onMouseEnter={() => setisHoveredRow(`${row.id}`)}
                                                onMouseLeave={() => setisHoveredRow("")}
                                            >
                                                <TextDisplay
                                                    value={row.ValueOfExpense}
                                                />
                                                {/* <CustomTextField
                                                value={row.ValueOfExpense}
                                                type='number'
                                                placeholder='Enter Value'
                                                onChange={(value) => handleExpenseValueChange(row.id, value)}
                                            /> */}
                                            </div>
                                        </PopUp>
                                    </td>

                                    <td className='NumberToWords-opex'>
                                        {isHoveredRow == `${row.id}` &&
                                            <Slide keyName={"NumberToWords-row:" + row.id}                                    >
                                                <NumberToWords value={row.ValueOfExpense} />
                                            </Slide>
                                        }
                                    </td>
                                </tr>
                            ) : (
                                // regular OpEx table rows
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
                                        {/* Expense type toggle */}
                                        <div className="expense-type-toggle">
                                            <button
                                                // type="button"
                                                className={`expense-type-btn left ${row.TypeOfExpense === 'fixed' ? 'selected' : ''}`}
                                                onClick={() => handleExpenseTypeChange(row.id, 'fixed')}
                                            >
                                                Fixed
                                            </button>

                                            <button
                                                // type="button"
                                                className={`expense-type-btn right ${row.TypeOfExpense === 'variable' ? 'selected' : ''}`}
                                                onClick={() => handleExpenseTypeChange(row.id, 'variable')}
                                            >
                                                Variable
                                            </button>
                                        </div>
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

                                    <td className='NumberToWords-opex'>
                                        {isHoveredRow == `${row.id}` &&
                                            <Slide keyName={"NumberToWords-row:" + row.id}                                    >
                                                <NumberToWords value={row.ValueOfExpense} />
                                            </Slide>
                                        }
                                    </td>
                                </tr>)
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
                    <span className="total-size-words">Total OpEx</span>
                    <span className="total-size-words"><NumberToWords value={TotalOpEx.toString()} /></span>
                    <input
                        type="text"
                        value={TotalOpEx}
                        readOnly
                        className="total-size-field"
                    />
                </div>

            </div>



            <Footer texts={footerTexts} onNextNavtoCapEx={navigateToCapEx} />
        </div>
    )
}

export default OpEx