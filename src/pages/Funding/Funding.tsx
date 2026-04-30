import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BackButton from '../../components/BackButton'
import { motion, AnimatePresence } from 'framer-motion';
import '../../css/Funding.css'
import Footer from '../../components/Footer';
import CustomTextField from '../../components/CustomTextField';
import { useNavigate } from 'react-router-dom';
import NumberToWords from '../../components/NumberToWords';
import TextDisplay from '../../components/TextDisplay';

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

    const [rowsFunding, setRowsFunding] = useState([
        { id: 1, SourceofFunds: '', BorrowedAmount: '', interest: '', interestPayable: '', RepaymentPeriod: '', MonthlyPrincipalPayment: '', MonthlyInterestPayment: '' },
        { id: 2, SourceofFunds: '', BorrowedAmount: '', interest: '', interestPayable: '', RepaymentPeriod: '', MonthlyPrincipalPayment: '', MonthlyInterestPayment: '' },
        { id: 3, SourceofFunds: '', BorrowedAmount: '', interest: '', interestPayable: '', RepaymentPeriod: '', MonthlyPrincipalPayment: '', MonthlyInterestPayment: '' },
    ]);

    const [rowsOpex, setRowsOpex] = useState([
        { id: 1, ExpenseName: '', TypeOfExpense: '', ValueOfExpense: '' },
        { id: 2, ExpenseName: '', TypeOfExpense: '', ValueOfExpense: '' },
        { id: 3, ExpenseName: '', TypeOfExpense: '', ValueOfExpense: '' },
    ]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showFundingIconText, setshowFundingIconText] = useState(false);
    const [isFundingSaved, setisFundingSaved] = useState(false);
    const [TotalAmountBorrowed, setTotalAmountBorrowed] = useState("");
    const [TotalMonthlyPrincipalRepayment, setTotalMonthlyPrincipalRepayment] = useState("");
    const [EMI, setEMI] = useState('');
    const [fundsToStartBusiness, setFundsToStartBusiness] = useState("");

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

    const navigate = useNavigate()

    const liveTotalAmountBorrowed = rowsFunding.reduce((total, row) => {
        const borrowedAmount = parseFloat(row.BorrowedAmount)
        return total + (Number.isFinite(borrowedAmount) ? borrowedAmount : 0)
    }, 0)

    const fundsToStartBusinessNumber = parseFloat(fundsToStartBusiness)
    const remainingAmount = (Number.isFinite(fundsToStartBusinessNumber) ? fundsToStartBusinessNumber : 0) - liveTotalAmountBorrowed

    // always run at start
    useEffect(() => {
        loadFundingRowsfromLocalStorage()
        showNavIconIfData()
    }, [])


    useEffect(() => {
        AddEMIRow()
    }, [EMI])

    useEffect(() => {
        SaveAfterEMI()
    }, [rowsOpex])



    // helper Functions

    // if data in DB overwrite rows useState
    const loadFundingRowsfromLocalStorage = () => {
        try {
            const FundingDB = localStorage.getItem('FundingDB')
            const OpExDB = localStorage.getItem('OpExDB')
            const TotalAmountBorrowed = localStorage.getItem('TotalAmountBorrowed')
            const TotalMonthlyInterest = localStorage.getItem('TotalMonthlyInterest')
            const TotalMonthlyPrincipalRepayment = localStorage.getItem('TotalMonthlyPrincipalRepayment')
            const WC = localStorage.getItem('WC')
            // console.log("FundingDB start:", FundingDB);
            // console.log("FundingTotal start:", FundingTotal);

            if (WC != null) setFundsToStartBusiness(WC)

            if (FundingDB != null
                && TotalAmountBorrowed != null
                && TotalMonthlyPrincipalRepayment != null
                && TotalMonthlyInterest != null) {
                const parsedRows = JSON.parse(FundingDB)
                if (Array.isArray(parsedRows)) {
                    setRowsFunding(parsedRows)
                }
                setTotalAmountBorrowed(TotalAmountBorrowed)
                setTotalMonthlyPrincipalRepayment(TotalMonthlyPrincipalRepayment)
            }

            if (OpExDB != null) setRowsOpex(JSON.parse(OpExDB))

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
                    // console.log("setshowIntendedPricingIconText(true)");
                    setshowFundingIconText(true)
                    setTimeout(() => {
                        // console.log("setshowIntendedPricingIconText(false)");
                        setshowFundingIconText(false)
                    }, 1000 * 2.5);
                }, 1000);
            }, 1000 * 2);
        }

    }

    // navigate to CapEx page
    const navigateToEMI = () => {
        navigate("/Biz-Sim-V2/opex-EMIdisplay")
    }

    const getInterestPlusPrincipalRepayment = (row: { MonthlyPrincipalPayment: string; MonthlyInterestPayment: string }) => {
        const principal = parseFloat(row.MonthlyPrincipalPayment || '0')
        const monthlyInterest = parseFloat(row.MonthlyInterestPayment || '0')
        return (principal + monthlyInterest).toFixed(2)
    }

    const renderFundingRequirement = () => (
        <div className="FundingRequirement-container">
            <div>
                <span className="funding-requirement-label">Funds to start the business : </span>
                <span className="funding-requirement-value">{fundsToStartBusiness || '0'}</span>
            </div>
            <div>
                <span className="funding-requirement-label">Remaining Amount: </span>
                <span className="funding-requirement-value">{remainingAmount.toFixed(2)}</span>
            </div>
        </div>
    )

    // helper Functions End

    // Table functions
    const handleDeleteRow = (id: number) => {
        if (rowsFunding.length === 1) {
            setErrorMessage('Please enter at least one segment.');
            return;
        }
        setRowsFunding(rowsFunding.filter(row => row.id !== id));
    };
    const handleAddRow = () => {
        const newRow = {
            id: rowsFunding.length ? rowsFunding[rowsFunding.length - 1].id + 1 : 1,
            SourceofFunds: '',
            BorrowedAmount: '',
            interest: '',
            interestPayable: '',
            RepaymentPeriod: '',
            MonthlyPrincipalPayment: '',
            MonthlyInterestPayment: ''
        };
        setRowsFunding([...rowsFunding, newRow]);
    };
    const handleSourceOfFundsChange = (id: number, value: string) => {
        const updatedRows = rowsFunding.map(row =>
            row.id === id ? { ...row, SourceofFunds: value } : row
        );
        setRowsFunding(updatedRows);
    };
    const handleBorrowedAmountChange = (id: number, value: string) => {
        const updatedRows = rowsFunding.map(row =>
            row.id === id ? { ...row, BorrowedAmount: value } : row
        );
        setRowsFunding(updatedRows);
    };
    const handleInterestChange = (id: number, value: string) => {
        const updatedRows = rowsFunding.map(row =>
            row.id === id ? { ...row, interest: value } : row
        );
        setRowsFunding(updatedRows);
    };
    const handleRepaymentPeriodChange = (id: number, value: string) => {
        const updatedRows = rowsFunding.map(row => {
            if (row.id === id) {
                const borrowed = parseFloat(row.BorrowedAmount || "0");
                const interest = parseFloat(row.interest || "0");
                // Interest = (P x R x T) / 100
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
                    MonthlyInterestPayment: monthlyInterest.toFixed(2)
                };
            }
            return row;
        });
        // console.log(updatedRows);

        setRowsFunding(updatedRows);
    };


    const handleSaveDetails = () => {
        const allFieldsFilled = rowsFunding.every(row => row.BorrowedAmount !== '' && row.MonthlyPrincipalPayment !== '' && row.MonthlyInterestPayment !== '' && row.RepaymentPeriod !== '' && row.SourceofFunds !== '' && row.interest !== '' && row.interestPayable !== '');
        if (!allFieldsFilled) {
            setErrorMessage('Please enter details in all cells.');
            return;
        }
        setErrorMessage('');
        //Total Amount borrowed
        const TAB = rowsFunding.reduce((total, row) => total + parseFloat(row.BorrowedAmount), 0);
        //Total Monthly interest
        const TMI = rowsFunding.reduce((total, row) => total + parseFloat(row.MonthlyInterestPayment), 0);
        //Total Interest + Principal Repayment
        const TMP = rowsFunding.reduce((total, row) => {
            return total + parseFloat(row.MonthlyPrincipalPayment) + parseFloat(row.MonthlyInterestPayment)
        }, 0);
        // Monthly EMI
        const EMI = TMP
        setTotalAmountBorrowed(TAB.toFixed(2));
        setTotalMonthlyPrincipalRepayment(TMP.toFixed(2));
        localStorage.setItem('TotalAmountBorrowed', TAB.toFixed(2));
        localStorage.setItem('TotalMonthlyInterest', TMI.toFixed(2));
        localStorage.setItem('TotalMonthlyPrincipalRepayment', TMP.toFixed(2));
        localStorage.setItem('EMI', EMI.toFixed(2));
        localStorage.setItem('FundingDB', JSON.stringify(rowsFunding));
        setEMI(EMI.toFixed(2))
        setisFundingSaved(true)
        showFundingIconAndText()
        // setTimeout(() => {
        //     navigateToOpEx();
        // }, 1000);

        // console.log("FundingDB: ", JSON.stringify(rowsFunding));
        // console.log("Funding Total: ", total.toString());

    };

    // Table functions end

    const AddEMIRow = () => {
        // console.log('AddEMIRow called');

        if (EMI && EMI != null) {
            // try updating emi row
            let IsEMI = false
            const updatedRows = rowsOpex.map(row => {
                if (row.ExpenseName === "Monthly Repayment [Auto Cal]") {
                    // console.log('AddEMIRow update', row);
                    IsEMI = true
                    return {
                        ...row,
                        ValueOfExpense: EMI
                    }
                }

                return row
            });
            setRowsOpex(updatedRows);

            if (!IsEMI) {
                // add emi row
                const newRow = {
                    id: rowsOpex.length ? rowsOpex[rowsOpex.length - 1].id + 1 : 1,
                    ExpenseName: 'Monthly Repayment [Auto Cal]',
                    TypeOfExpense: 'variable',
                    ValueOfExpense: EMI,
                };
                // console.log('AddEMIRow newRow', newRow);
                setRowsOpex([...rowsOpex, newRow]);
            }
        }

    };

    const SaveAfterEMI = () => {
        const total = rowsOpex.reduce((total, row) => total + parseFloat(row.ValueOfExpense), 0);
        // console.log("SaveAfterEMI total", rowsOpex);
        // console.log("SaveAfterEMI total", total);

        if (total > 0) {
            // console.log("OpExTotal saved", total.toString());

            localStorage.setItem('OpExTotal', total.toString());
            localStorage.setItem('OpExDB', JSON.stringify(rowsOpex));
        }

    }

    const footerTexts = [
        "You must be thinking, that's a lot or rows and columns, but don't be intimidated by them, we'll take on each column and then row, one at a time. So in the first column you have to enter the name of the source of your funds, for example, you may use your own funds, or borrow from a bank or from some friends.",
        "In the second column you have to enter the amount of funds that you will be borrowing from that source, for example, you borrow 10 lacs from a bank, mention the same in the field as a numerical value. In the third column you have to enter the annual rate of interest at which you have borrowed the money, this is required to calculate the repayment amount which will include the interest accrued.",
        "As you press \"Enter\" after entering the annual rate of interest, the simulation will automatically give you the value of the total interest payable in the fourth column. The values in this column are not editable and will only change if you change the values of the borrowed amount or the annual rate of interest.",
        "In the fifth column named \"Repayment Period\", you have to enter the number of years that you will have agreed to repay the borrowed amount along with the accrued interest. As you press \"Enter\" after entering that value the simulation will automatically calculate the monthly amount of the principal borrowed amount that you will have to repay.",
        "You can also use the \"Add a Source of Funds\" button to add another row, or click the \"-\" sign against each row to delete a row as well.",
        "When you have completed with filling all the details of funding click on \"SAVE DETAILS\" to get the total amount you have borrowed, the monthly interest payable and the monthly principal repayment",
        "When you have completed with filling all the details of funding click on \"SAVE DETAILS\" to get the total amount you have borrowed, the monthly interest payable and the monthly principal repayment. this will also create an icon in the left navigation bar, from where you can access this section and make changes later.",
        // show OpEx Emi screen when on below line
        "Now let me remind you that the combined monthly repayment value of principal amount plus interest is going to be added as a monthly EMI to your operational costs, as it is going to be a monthly expense that you'll have to incur, and it's going to be a variable expenditure.",
        "Now all this additional operational expenditure will also affect your EBT and Working Capital. We can see such changes to each of the sectional at a glance in the home dashboard, click the downward arrow to go to it, an icon will also be added in the left navigation bar for the same.  ",
        // show dashboard after above line
        // "",
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
            if (IntendedPricingMonthly && OPdays) setshowIntendedPricingIcon(true)

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
            if (EMI) { setshowFundingIcon(true); setFooterVisible(false) }

            // show dashboard ICON
            if (EMI && EBT && WC && CapExTotal && OpExTotal && SOM && IntendedPricingMonthly && OPdays && SAMtotal && TAMtotal) setshowDashboardIcon(true)

        } catch (error) {
            console.error("showNavIconIfData Error", error)
        }
    }

    return (
        <div>
            {TutorialMode ?
                // TutorialMode=True
                <div>
                    <Header />
                    <NavigationIcons />
                    <div className={FooterVisible ? "table-container" : "table-container vh-90"}>
                        <h1>Funding</h1>

                        {renderFundingRequirement()}

                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>{/* Delete row column */}
                                    <th>Source of funds</th>
                                    <th>Borrowed Amount</th>
                                    <th></th>{/* Borrowed amount in words */}
                                    <th>Interest</th>
                                    <th>Repayment Period</th>
                                    <th>Monthly Repayment with Interest</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowsFunding.map(row => (
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
                                            <NumberToWords value={row.BorrowedAmount} />
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
                                                value={getInterestPlusPrincipalRepayment(row)}
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
                                <span className="total-funding-words">Total Monthly Repayment with Interest</span>
                                <input
                                    type="text"
                                    value={TotalMonthlyPrincipalRepayment}
                                    readOnly
                                    className="total-size-field"
                                />
                            </div>
                        </div>
                    </div>
                    {FooterVisible && <Footer texts={footerTexts} FundingSaved={isFundingSaved} onNextNavtoEMI={navigateToEMI} />}
                </div>
                :
                // TutorialMode=False
                <div>
                    <Header />
                    <NavigationIcons />
                    <div className="table-container vh-90">
                        <h1>Funding</h1>

                        {renderFundingRequirement()}

                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>{/* Delete row column */}
                                    <th>Source of funds</th>
                                    <th>Borrowed Amount</th>
                                    <th></th>{/* Borrowed amount in words */}
                                    <th>Interest</th>
                                    <th>Repayment Period</th>
                                    <th>Interest + Principal Repayment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowsFunding.map(row => (
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
                                            <NumberToWords value={row.BorrowedAmount} />
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
                                                value={getInterestPlusPrincipalRepayment(row)}
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
                                <span className="total-funding-words">Total Interest + Principal Repayment</span>
                                <input
                                    type="text"
                                    value={TotalMonthlyPrincipalRepayment}
                                    readOnly
                                    className="total-size-field"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }


        </div>
    )
};

export default Funding;
