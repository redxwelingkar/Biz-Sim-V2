import React, { useState } from 'react'
import Header from '../../components/Header'
import BackButton from '../../components/BackButton'
import "../../css/CSP.css";

import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import Footer from '../../components/Footer';
import NumberToWords from '../../components/NumberToWords';
import CustomTextField from '../../components/CustomTextField';
import CustomButton from '../../components/CustomButton';

function CSP() {

    const [CSPValue, setCSPValue] = useState("")

    function handleCSPChange(value: string) {
        setCSPValue(value)
    }

    function submitCSP() {
        localStorage.setItem("CSPValue", CSPValue)
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
                                <CustomTextField label='per customer/product' onChange={(value) => handleCSPChange(value)} />
                            </td>
                            <td>
                                <NumberToWords value={CSPValue} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Daily Expenditure by SAM</p>
                            </td>
                            <td>
                                <CustomTextField label='per day' onChange={(value) => handleCSPChange(value)} />
                            </td>
                            <td>
                                <NumberToWords value={CSPValue} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>No of Operational Days</p>
                            </td>
                            <td>
                                <CustomTextField label='days per month' onChange={(value) => handleCSPChange(value)} />
                            </td>
                            <td>
                                <NumberToWords value={CSPValue} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Monthly Expenditure by SAM</p>
                            </td>
                            <td>
                                <CustomTextField label='per month' onChange={(value) => handleCSPChange(value)} />
                            </td>
                            <td>
                                <NumberToWords value={CSPValue} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Yearly Expenditure by SAM </p>
                            </td>
                            <td>
                                <CustomTextField label='per year' onChange={(value) => handleCSPChange(value)} />
                            </td>
                            <td>
                                <NumberToWords value={CSPValue} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className='SubmitBTNCSP' onClick={submitCSP}>Submit</button>

            </div>



            <Footer texts={footerTexts} />
        </div>
    )
}

export default CSP