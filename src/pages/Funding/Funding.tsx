import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BackButton from '../../components/BackButton'
import { motion, AnimatePresence } from 'framer-motion';

import '../../css/Funding.css'

import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import cspIcon from "../../assets/img/csp-icon.png";
import somIcon from "../../assets/img/som-icon.png";
import OpExIcon from "../../assets/img/OpEx-icon.png";
import CapExIcon from "../../assets/img/CapEx-icon.png";
import EBTWCIcon from "../../assets/img/EBT_WC.png";
import FundingIcon from "../../assets/img/funding-icon.png";
import Footer from '../../components/Footer';
// import NumberToWords from '../../components/NumberToWords';
import CustomTextField from '../../components/CustomTextField';
import { useNavigate } from 'react-router-dom';
import TextDisplay from '../../components/TextDisplay';


// const Slide = ({ children, keyName }: { children: React.ReactNode; keyName: string }) => (
//     <AnimatePresence mode="wait">
//         <motion.div
//             key={keyName}
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             // exit={{ opacity: 0, x: -20 }}
//             transition={{ duration: 0.5 }}
//             style={{ overflowX: "auto", whiteSpace: "nowrap" }}
//         >
//             {children}
//         </motion.div>
//     </AnimatePresence>
// );

const Funding = () => {
    const [showTable, setShowTable] = useState(false);
    const [TutorialMode, setTutorialMode] = useState(false);

    // always run at start
    useEffect(() => {
        try {
            const tutorialMode = localStorage.getItem('TutorialMode');
            setTutorialMode(tutorialMode === 'true');
            setShowTable(tutorialMode !== 'true');
        } catch (error) {
            console.error('Error reading TutorialMode from localStorage:', error);
            setTutorialMode(false);
            setShowTable(true);
        }

        loadFundingRowsfromLocalStorage()
    }, [])


    const [rows, setRows] = useState([
        { id: 1, SourceofFunds: '', BorrowedAmount: '', interest: '', interestPayable: '', RepaymentPeriod: '', MonthlyPrincipalPayment: '', MonthlyInterestPayment: '' },
        { id: 2, SourceofFunds: '', BorrowedAmount: '', interest: '', interestPayable: '', RepaymentPeriod: '', MonthlyPrincipalPayment: '', MonthlyInterestPayment: '' },
        { id: 3, SourceofFunds: '', BorrowedAmount: '', interest: '', interestPayable: '', RepaymentPeriod: '', MonthlyPrincipalPayment: '', MonthlyInterestPayment: '' },
    ]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showFundingIcon, setshowFundingIcon] = useState(false);
    const [showFundingIconText, setshowFundingIconText] = useState(false);
    const [isSaveFundingSaved, setisSaveFundingSaved] = useState(false);
    const [TotalAmountBorrowed, setTotalAmountBorrowed] = useState("");
    const [TotalMonthlyInterest, setTotalMonthlyInterest] = useState("");
    const [TotalMonthlyPrincipalRepayment, setTotalMonthlyPrincipalRepayment] = useState("");

    const navigate = useNavigate()



    // helper Functions

    // if data in DB overwrite rows useState
    const loadFundingRowsfromLocalStorage = () => {
        try {
            const FundingDB = localStorage.getItem('FundingDB')
            const TotalAmountBorrowed = localStorage.getItem('TotalAmountBorrowed')
            const TotalMonthlyInterest = localStorage.getItem('TotalMonthlyInterest')
            const TotalMonthlyPrincipalRepayment = localStorage.getItem('TotalMonthlyPrincipalRepayment')
            // console.log("FundingDB start:", FundingDB);
            // console.log("FundingTotal start:", FundingTotal);

            if (FundingDB !=null 
                && TotalAmountBorrowed!= null 
                && TotalMonthlyPrincipalRepayment!= null 
                && TotalMonthlyInterest!= null) {
                const parsedRows = JSON.parse(FundingDB)
                if (Array.isArray(parsedRows)) {
                    setRows(parsedRows)
                }
                setTotalAmountBorrowed(TotalAmountBorrowed)
                setTotalMonthlyInterest(TotalMonthlyInterest)
                setTotalMonthlyPrincipalRepayment(TotalMonthlyPrincipalRepayment)
            }

        } catch (error) {
            console.error("loadFundingRowsfromLocalStorage", error);

        }
    }

    // show Funding indicator Icon and Text
    const showFundingIconAndText = () => {
        if (!showFundingIcon) {

            setTimeout(() => {
                setshowFundingIcon(true)
                setTimeout(() => {
                    // console.log("setshowCSPIconText(true)");
                    setshowFundingIconText(true)
                    setTimeout(() => {
                        // console.log("setshowCSPIconText(false)");
                        setshowFundingIconText(false)
                    }, 1000 * 2.5);
                }, 1000);
            }, 1000 * 2);
        }

    }

    // navigate to CapEx page
    const navigateToOpEx = () => {
        navigate("/Biz-Sim-V2/opex-EMIdisplay")
    }

    const handleNext = () => {
        setShowTable(true);
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
    const handleAddRow = () => {
        const newRow = {
            id: rows.length ? rows[rows.length - 1].id + 1 : 1,
            SourceofFunds: '',
            BorrowedAmount: '',
            interest: '',
            interestPayable: '',
            RepaymentPeriod: '',
            MonthlyPrincipalPayment: '',
            MonthlyInterestPayment:''
        };
        setRows([...rows, newRow]);
    };
    const handleSourceOfFundsChange = (id: number, value: string) => {
        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, SourceofFunds: value } : row
        );
        setRows(updatedRows);
    };
    const handleBorrowedAmountChange = (id: number, value: string) => {
        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, BorrowedAmount: value } : row
        );
        setRows(updatedRows);
    };
    const handleInterestChange = (id: number, value: string) => {
        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, interest: value } : row
        );
        setRows(updatedRows);
    };
    const handleRepaymentPeriodChange = (id: number, value: string) => {
        const updatedRows = rows.map(row => {
            if (row.id === id) {
                const borrowed = parseFloat(row.BorrowedAmount || "0");
                const interest = parseFloat(row.interest || "0");
                // Interest = (P × R × T) / 100
                const interestPayable = (borrowed * interest * parseFloat(value)) / 100;

                const monthlyPrincipal = borrowed / (parseFloat(value) * 12);
                
                const totalMonths = parseFloat(value) * 12;
                const monthlyInterest = interestPayable / totalMonths
                // console.log("borrowed", borrowed, "interest", interest, "period", parseFloat(value));
                // console.log("row", row);

                return {
                    ...row,
                    RepaymentPeriod: value,
                    interestPayable: interestPayable.toFixed(2),
                    MonthlyPrincipalPayment: monthlyPrincipal.toFixed(2),
                    MonthlyInterestPayment:monthlyInterest.toFixed(2)
                };
            }
            return row;
        });
        // console.log(updatedRows);

        setRows(updatedRows);
    };


    const handleSaveDetails = () => {
        const allFieldsFilled = rows.every(row => row.BorrowedAmount !== '' && row.MonthlyPrincipalPayment !== '' && row.RepaymentPeriod !== '' && row.SourceofFunds !== '' && row.interest !== '' && row.interestPayable !== '');
        if (!allFieldsFilled) {
            setErrorMessage('Please enter details in all cells.');
            return;
        }
        setErrorMessage('');
        //Total Amount borrowed
        const TAB = rows.reduce((total, row) => total + parseFloat(row.BorrowedAmount), 0);
        //Total Monthly interest
        const TMI = rows.reduce((total, row) => total + parseFloat(row.MonthlyInterestPayment), 0);
        //Total Monthly Principal
        const TMP = rows.reduce((total, row) => total + parseFloat(row.MonthlyPrincipalPayment), 0);
        // Monthly EMI 
        const EMI = TMP + TMI
        setTotalAmountBorrowed(TAB.toFixed(2));
        setTotalMonthlyInterest(TMI.toFixed(2));
        setTotalMonthlyPrincipalRepayment(TMP.toFixed(2));
        localStorage.setItem('TotalAmountBorrowed', TAB.toFixed(2));
        localStorage.setItem('TotalMonthlyInterest', TMI.toFixed(2));
        localStorage.setItem('TotalMonthlyPrincipalRepayment', TMP.toFixed(2));
        localStorage.setItem('EMI', EMI.toFixed(2));
        localStorage.setItem('FundingDB', JSON.stringify(rows));
        setisSaveFundingSaved(true)
        showFundingIconAndText()
        setTimeout(() => {
            navigateToOpEx();
        }, 1000);

        // console.log("FundingDB: ", JSON.stringify(rows));
        // console.log("Funding Total: ", total.toString());

    };



    // Table functions end


    const footerTexts = [
        "You must be thinking, that's a lot or rows and columns, but don't be intimidated by them, we'll take on each column and then row, one at a time. So in the first column you have to enter the name of the source of your funds, for example, you may use your own funds, or borrow from a bank or from some friends.",
        "In the second column you have to enter the amount of funds that you will be borrowing from that source, for example, you borrow 10 lacs from a bank, mention the same in the field as a numerical value. In the third column you have to enter the annual rate of interest at which you have borrowed the money, this is required to calculate the repayment amount which will include the interest accrued.",
        "As you press “Enter” after entering the annual rate of interest, the system will automatically give you the value of the total interest payable in the fourth column. The values in this column are not editable and will only change if you change the values of the borrowed amount or the annual rate of interest.",
        "In the fifth column named “Repayment Period”, you have to enter the number of years that you will have agreed to repay the borrowed amount along with the accrued interest. As you press “Enter” after entering that value the system will automatically calculate the monthly amount of the principal borrowed amount that you will have to repay.",
        "You can also use the “Add a Source of Funds” button to add another row, or click the “-” sign against each row to delete a row as well.",
        "When you have completed with filling all the details of funding click on “SAVE DETAILS” to get the total amount you have borrowed, the monthly interest payable and the monthly principal repayment",
        "When you have completed with filling all the details of funding click on “SAVE DETAILS” to get the total amount you have borrowed, the monthly interest payable and the monthly principal repayment. this will also create an icon in the left navigation bar, from where you can access this section and make changes later.",
        // show OpEx Emi screen when on below line
        "Now let me remind you that the combined monthly repayment value of principal amount plus interest is going to be added as a monthly EMI to your operational costs, as it is going to be a monthly expense that you'll have to incur, and it's going to be a variable expenditure.",
        "Now all this additional operational expenditure will also affect your EBT and Working Capital. We can see such changes to each of the sectional at a glance in the home dashboard, click the downward arrow to go to it, an icon will also be added in the left navigation bar for the same.  ",
        // show dashboard after above line
        // "",
    ];


    return (
        <div>
            <Header />
            <BackButton topOffset='10vh' />
            <div className='indicatorIcon-container'>
                <div className='Icon-div' onClick={() => navigate('/Biz-Sim-V2/tam-calculation')}>
                    <img src={tamIcon} alt="TAM-Icon" className="Tam-Icon" />
                </div>
                <div className='Icon-div' onClick={() => navigate('/Biz-Sim-V2/sam-calculation')}>
                    <img src={samIcon} alt="SAM-Icon" className="Tam-Icon" />
                </div>
                <div className='Icon-div' onClick={() => navigate('/Biz-Sim-V2/csp')}>
                    <img src={cspIcon} alt="CSP-Icon" className="CSP-Icon" />
                </div>
                <div className='Icon-div' onClick={() => navigate('/Biz-Sim-V2/som')}>
                    <img src={somIcon} alt="SOM-Icon" className="Tam-Icon" />
                </div>
                <div className='Icon-div' onClick={() => navigate('/Biz-Sim-V2/opex-calculation')}>
                    <img src={OpExIcon} alt="OpEx-Icon" className="EBT-Icon" />
                </div>
                <div className='Icon-div' onClick={() => navigate('/Biz-Sim-V2/capex-calculation')}>
                    <img src={CapExIcon} alt="CapEx-Icon" className="SOM-Icon" />
                </div>
                <div className='Icon-div' onClick={() => navigate('/Biz-Sim-V2/EBT_WC-calculation')}>
                    <img src={EBTWCIcon} alt="CapEx-Icon" className="EBT-Icon" />
                </div>
                {/* Animate the icon entry */}
                <div className='Icon-div'>
                    <AnimatePresence mode="wait">
                        {showFundingIcon ? (

                            <motion.img
                                key="Funding-img"
                                src={FundingIcon}
                                alt="Funding-Icon"
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
                        {showFundingIconText && (
                            <motion.span
                                key="Funding-Icon-Text"
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
            {showTable && <div className="table-container height">
                <h1>Funding</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>{/* Delete row column */}
                            <th>Source of funds</th>
                            <th>Borrowed Amount</th>
                            <th>Interest</th>
                            <th>Repayment Period</th>
                            <th>Interest Payable</th>
                            <th>Monthly Principal Repayment</th>
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
                                        value={row.SourceofFunds}
                                        type='text'
                                        placeholder='Enter Name'
                                        onChange={(value) => handleSourceOfFundsChange(row.id, value)}
                                    />
                                </td>
                                <td>
                                    <CustomTextField
                                        value={row.BorrowedAmount}
                                        type='number'
                                        min={0}
                                        placeholder='Enter Value'
                                        onChange={(value) => handleBorrowedAmountChange(row.id, value)}
                                    />
                                </td>
                                <td>
                                    <CustomTextField
                                        value={row.interest}
                                        type='number'
                                        min={0}
                                        placeholder='Enter %'
                                        onChange={(value) => handleInterestChange(row.id, value)}
                                    />
                                </td>
                                <td>
                                    <CustomTextField
                                        value={row.RepaymentPeriod}
                                        type='number'
                                        min={0}
                                        placeholder='Enter No. of Years'
                                        onChange={(value) => handleRepaymentPeriodChange(row.id, value)}
                                    />
                                </td>
                                <td>
                                    <TextDisplay
                                        value={row.interestPayable}
                                    />
                                </td>

                                <td>
                                    <TextDisplay
                                        value={row.MonthlyPrincipalPayment}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="button-container">
                    <button className="add-button" onClick={handleAddRow}>ADD A SOURCE OF FUNDS</button>
                    {<button className="save-button" onClick={handleSaveDetails}>SAVE DETAILS</button>}
                </div>

                <div className="FundingTotals-container">
                    <div>
                        <span className="total-funding-words">Total Amount Borrowed</span>
                        <input
                            type="text"
                            value={TotalAmountBorrowed}
                            readOnly
                            className="total-size-field"
                        />
                    </div>
                    <div>
                        <span className="total-funding-words">Monthly Interest</span>
                        <input
                            type="text"
                            value={TotalMonthlyInterest}
                            readOnly
                            className="total-size-field"
                        />
                    </div>
                    <div>
                        <span className="total-funding-words">Total Monthly Principal Repayment</span>
                        <input
                            type="text"
                            value={TotalMonthlyPrincipalRepayment}
                            readOnly
                            className="total-size-field"
                        />
                    </div>
                </div>
            </div>}



            {TutorialMode && <Footer onNext={handleNext} texts={footerTexts} SaveFundingSaved={isSaveFundingSaved} onNextNavtoOpEx={navigateToOpEx} />}
        </div>
    )
};

export default Funding;