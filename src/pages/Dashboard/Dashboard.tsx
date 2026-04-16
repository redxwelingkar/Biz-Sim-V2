import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import "../../css/Dashboard.css";
import { useState } from "react";
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
import SalesIcon from "../../assets/img/Sales-icon.png";

const Dashboard = () => {
    const [isMonthly, setIsMonthly] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    // Get values from localStorage
    const tam = parseFloat(localStorage.getItem("TAM") || "0");
    const sam = parseFloat(localStorage.getItem("SAM") || "0");
    const som = parseFloat(localStorage.getItem("SOM") || "0");
    const cspValue = parseFloat(localStorage.getItem("CSPValue") || "0");
    const somMonthly = parseFloat(localStorage.getItem("SOMMonthly") || "0");
    const somYearly = parseFloat(localStorage.getItem("SOMYearly") || "0");
    // const cspMonthly = parseFloat(localStorage.getItem("CSPMonthly") || "0");
    const opExTotal = parseFloat(localStorage.getItem("OpExTotal") || "0");
    const capExTotal = parseFloat(localStorage.getItem("CapExTotal") || "0");
    const ebt = parseFloat(localStorage.getItem("ebt") || "0");
    const totalAmountBorrowed = parseFloat(localStorage.getItem("TotalAmountBorrowed") || "0");

    // Calculate monthly values
    const opExMonthly = opExTotal;
    const opExYearly = opExMonthly * 12;
    const ebtMonthly = ebt;
    const ebtYearly = ebtMonthly * 12;
    const workingCapital = totalAmountBorrowed;

    // Select values based on monthly or yearly
    const salesValue = isMonthly ? somMonthly : somYearly;
    const opExValue = isMonthly ? opExMonthly : opExYearly;
    const ebtValue = isMonthly ? ebtMonthly : ebtYearly;

    // Format numbers for display
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
        }).format(num);
    };

    const formatDecimal = (num: number, decimals: number = 2) => {
        return new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals,
        }).format(num);
    };

    // Calculate max value for chart scaling
    const chartValues = [salesValue, opExValue, ebtValue];
    const maxChartValue = Math.max(...chartValues);
    const chartScale = maxChartValue > 0 ? maxChartValue : 100;

    const footerTexts = [
        "Now all this additional operational expenditure will also affect your EBT and Working Capital. We can see such changes to each of the sectional at a glance in the home dashboard, click the downward arrow to go to it, an icon will also be added in the left navigation bar for the same.",
        "Now after looking at the dashboard you can ask yourself the question if you will be able to run your business with such an overview of your revenue and expenses. If you feel so, then you can go back to each of the sections and adjust the values to see how the dashboard changes. Have fun...",
        // "You can also download the whole simulation as an excel sheet by clicking on the excel download button at the top right corner",
        "This is the end of the simulation, we hope you had fun and learned a lot. We will be soon adding more features to the simulation, so stay tuned for that. If you have any feedback or suggestions, please feel free to reach out to us."
    ];

    return (
        <div className="dashboard-page">
            <Header />
            <BackButton topOffset="10vh" />

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

            <main className="dashboard-content">
                <h1 className="dashboard-title">Dashboard</h1>

                <section className="dashboard-top-cards" aria-label="Market summary">
                    <article className="dash-card summary-card" onClick={() => navigate('/Biz-Sim-V2/tam-calculation')}>
                        <div>
                            <p className="card-label">TAM</p>
                            <p className="card-value">{formatNumber(tam)}</p>
                            <p className="card-meta">No. of People</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={tamIcon} alt="TAM icon" className="Tam-Icon" />
                        </div>
                    </article>

                    <article className="dash-card summary-card" onClick={() => navigate('/Biz-Sim-V2/sam-calculation')}>
                        <div>
                            <p className="card-label">SAM</p>
                            <p className="card-value">{formatNumber(sam)}</p>
                            <p className="card-meta">No. of People</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={samIcon} alt="SAM icon" className="SAM-Icon" />
                        </div>
                    </article>

                    <article className="dash-card summary-card" onClick={() => navigate('/Biz-Sim-V2/som')}>
                        <div>
                            <p className="card-label">SOM</p>
                            <p className="card-value">{formatDecimal(som)}</p>
                            <p className="card-meta">No. of People</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={somIcon} alt="SOM icon" className="SOM-Icon" />
                        </div>
                    </article>

                    <article className="dash-card summary-card" onClick={() => navigate('/Biz-Sim-V2/csp')}>
                        <div>
                            <p className="card-label">CSP</p>
                            <p className="card-value">Rs {formatNumber(cspValue)}</p>
                            <p className="card-meta">per customer</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={cspIcon} alt="CSP icon" className="CSP-Icon" />
                        </div>
                    </article>
                </section>

                <section className="dashboard-middle-grid" aria-label="Performance overview">
                    <article className="dash-card chart-card">
                        <div className="chart-header-row">
                            <div>
                                <p className="chart-subtitle">Statistics</p>
                            </div>
                            <div className="chart-tabs" role="tablist" aria-label="Time period">
                                <button
                                    type="button"
                                    className={`chart-tab ${!isMonthly ? 'active' : ''}`}
                                    onClick={() => setIsMonthly(false)}
                                >
                                    Annually
                                </button>
                                <button
                                    type="button"
                                    className={`chart-tab ${isMonthly ? 'active' : ''}`}
                                    onClick={() => setIsMonthly(true)}
                                >
                                    Monthly
                                </button>
                            </div>
                        </div>

                        <div className="chart-plot">

                            <div className="chart-row">
                                <div className="chart-row-head">
                                    <span className="chart-name">Sales</span>
                                    <span className="chart-amount">{formatNumber(salesValue)}</span>
                                </div>
                                <div className="chart-track"><div className="chart-fill fill-sales" style={{ width: `${(salesValue / chartScale) * 100}%` }} /></div>
                            </div>

                            <div className="chart-row">
                                <div className="chart-row-head">
                                    <span className="chart-name">OpEx</span>
                                    <span className="chart-amount">{formatNumber(opExValue)}</span>
                                </div>
                                <div className="chart-track"><div className="chart-fill fill-opex" style={{ width: `${(opExValue / chartScale) * 100}%` }} /></div>
                            </div>

                            <div className="chart-row">
                                <div className="chart-row-head">
                                    <span className="chart-name">EBT</span>
                                    <span className="chart-amount">{formatNumber(ebtValue)}</span>
                                </div>
                                <div className="chart-track"><div className="chart-fill fill-ebt" style={{ width: `${(ebtValue / chartScale) * 100}%` }} /></div>
                            </div>
                        </div>

                        <div className="chart-axis">
                            <span>0</span>
                            <span>{formatNumber(chartScale * 0.25)}</span>
                            <span>{formatNumber(chartScale * 0.5)}</span>
                            <span>{formatNumber(chartScale * 0.75)}</span>
                            <span>{formatNumber(chartScale)}</span>
                        </div>
                    </article>

                    <div className="dashboard-right-column">
                        <article className="dash-card metric-card" onClick={() => navigate('/Biz-Sim-V2/opex-calculation')}>
                            <div>
                                <p className="card-label">Operational Expenditure</p>
                                <p className="card-value">Rs {formatNumber(opExValue)}</p>
                                <p className="card-meta">per {isMonthly ? 'month' : 'year'}</p>
                            </div>
                            <div className="card-icon-shell">
                                <img src={opexIcon} alt="Operational expenditure" className="OpEx-Icon" />
                            </div>
                        </article>

                        <article className="dash-card metric-card" onClick={() => navigate('/Biz-Sim-V2/capex-calculation')}>
                            <div>
                                <p className="card-label">Capital Expenditure</p>
                                <p className="card-value">Rs {formatNumber(capExTotal)}</p>
                                <p className="card-meta">one time cost</p>
                            </div>
                            <div className="card-icon-shell">
                                <img src={capexIcon} alt="Capital expenditure" className="CapEx-Icon" />
                            </div>
                        </article>
                    </div>
                </section>

                <section className="dashboard-bottom-cards" aria-label="Financial summary">
                    <article className="dash-card metric-card" onClick={() => navigate('/Biz-Sim-V2/som')}>
                        <div>
                            <p className="card-label">Sales</p>
                            <p className="card-value">Rs {formatNumber(salesValue)}</p>
                            <p className="card-meta">per {isMonthly ? 'month' : 'year'}</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={SalesIcon} alt="Sales" className="Sales-Icon" />
                        </div>
                    </article>

                    <article className="dash-card metric-card" onClick={() => navigate('/Biz-Sim-V2/EBT_WC-calculation')}>
                        <div>
                            <p className="card-label">Earnings Before Tax</p>
                            <p className="card-value">Rs {formatNumber(ebtValue)}</p>
                            <p className="card-meta">per {isMonthly ? 'month' : 'year'}</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={ebtwcIcon} alt="Earnings before tax" className="EBTWC-Icon" />
                        </div>
                    </article>

                    <article className="dash-card metric-card" onClick={() => navigate('/Biz-Sim-V2/funding')}>
                        <div>
                            <p className="card-label">Working Capital</p>
                            <p className="card-value">Rs {formatNumber(workingCapital)}</p>
                            <p className="card-meta">to start the business</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={FundingIcon} alt="Working capital" />
                        </div>
                    </article>
                </section>

            </main>

            <Footer texts={footerTexts} />
        </div>
    );
};

export default Dashboard;
