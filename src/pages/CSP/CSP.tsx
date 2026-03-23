import React, { useState } from 'react'
import Header from '../../components/Header'
import BackButton from '../../components/BackButton'
import "../../css/CSP.css";

import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import Footer from '../../components/Footer';
import NumberToWords from '../../components/NumberToWords';
import CustomTextField from '../../components/CustomTextField';

function CSP() {

    const [CSPValue, setCSPValue] = useState("")

    function handleCSPChange(value: string) {
        setCSPValue(value)
        localStorage.setItem("CSPValue", value)
    }

    const footerTexts = [
        "Here in the section of Customer Spending Power (CSP), the first thing you need to mention is the the amount of money that a customer will spend on your product/ service in one instance of transaction. Now go ahead and enter the value of CSP and click on “SUBMIT” or press “Enter”.",
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
                                <CustomTextField label='no. of customers' onChange={(value) => handleCSPChange(value)} />
                            </td>
                            <td>
                                <NumberToWords value={CSPValue} />
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>



            <Footer texts={footerTexts} />
        </div>
    )
}

export default CSP