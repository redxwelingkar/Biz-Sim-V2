import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import "../../css/Dashboard.css";

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
    const footerTexts = [
        "Now all this additional operational expenditure will also affect your EBT and Working Capital. We can see such changes to each of the sectional at a glance in the home dashboard, click the downward arrow to go to it, an icon will also be added in the left navigation bar for the same.",
        "Now after looking at the dashboard you can ask yourself the question if you will be able to run your business with such an overview of your revenue and expenses. If you feel so, then you can go back to each of the sections and adjust the values to see how the dashboard changes. Have fun...",
        "You can also download the whole simulation as an excel sheet by clicking on the excel download button at the top right corner",
        "This is the end of the simulation, we hope you had fun and learned a lot. We will be soon adding more features to the simulation, so stay tuned for that. If you have any feedback or suggestions, please feel free to reach out to us."
    ];

    return (
        <div className="dashboard-page">
            <Header />
            <BackButton topOffset="10vh" />

            <div className="indicatorIcon-container">
                <div className="Icon-div">
                    <img src={DashboardIcon} alt="Dashboard-Icon" className="Dashboard-Icon" />
                </div>
                <div className="Icon-div">
                    <img src={tamIcon} alt="TAM-Icon" className="Tam-Icon" />
                </div>
                <div className="Icon-div">
                    <img src={samIcon} alt="SAM-Icon" className="SAM-Icon" />
                </div>
                <div className="Icon-div">
                    <img src={cspIcon} alt="CSP-Icon" className="CSP-Icon" />
                </div>
                <div className="Icon-div">
                    <img src={somIcon} alt="SOM-Icon" className="SOM-Icon" />
                </div>
                <div className="Icon-div">
                    <img src={opexIcon} alt="OpEx-Icon" className="OpEx-Icon" />
                </div>
                <div className="Icon-div">
                    <img src={capexIcon} alt="CapEx-Icon" className="CapEx-Icon" />
                </div>
                <div className="Icon-div">
                    <img src={ebtwcIcon} alt="EBT_WC-Icon" className="EBTWC-Icon" />
                </div>
                <div className="Icon-div">
                    <img src={FundingIcon} alt="Funding-Icon" className="Funding-Icon" />
                </div>
            </div>

            <main className="dashboard-content">
                <h1 className="dashboard-title">Dashboard</h1>

                <section className="dashboard-top-cards" aria-label="Market summary">
                    <article className="dash-card summary-card">
                        <div>
                            <p className="card-label">TAM</p>
                            <p className="card-value">4,41,000</p>
                            <p className="card-meta">No. of People</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={tamIcon} alt="TAM icon" className="Tam-Icon" />
                        </div>
                    </article>

                    <article className="dash-card summary-card">
                        <div>
                            <p className="card-label">SAM</p>
                            <p className="card-value">24,050</p>
                            <p className="card-meta">No. of People</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={samIcon} alt="SAM icon" className="SAM-Icon" />
                        </div>
                    </article>

                    <article className="dash-card summary-card">
                        <div>
                            <p className="card-label">SOM</p>
                            <p className="card-value">241</p>
                            <p className="card-meta">No. of People</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={somIcon} alt="SOM icon" className="SOM-Icon" />
                        </div>
                    </article>

                    <article className="dash-card summary-card">
                        <div>
                            <p className="card-label">CSP</p>
                            <p className="card-value">Rs 100</p>
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
                                <button type="button" className="chart-tab">Annually</button>
                                <button type="button" className="chart-tab active">Monthly</button>
                            </div>
                        </div>

                        <div className="chart-plot">
                            {/* <div className="chart-guides" aria-hidden="true">
                                <span />
                                <span />
                                <span />
                            </div> */}

                            <div className="chart-row">
                                <div className="chart-row-head">
                                    <span className="chart-name">Sales</span>
                                    <span className="chart-amount">121,799</span>
                                </div>
                                <div className="chart-track"><div className="chart-fill fill-sales" /></div>
                            </div>

                            <div className="chart-row">
                                <div className="chart-row-head">
                                    <span className="chart-name">OpEx</span>
                                    <span className="chart-amount">50,799</span>
                                </div>
                                <div className="chart-track"><div className="chart-fill fill-opex" /></div>
                            </div>

                            <div className="chart-row">
                                <div className="chart-row-head">
                                    <span className="chart-name">EBT</span>
                                    <span className="chart-amount">25,567</span>
                                </div>
                                <div className="chart-track"><div className="chart-fill fill-ebt" /></div>
                            </div>
                        </div>

                        <div className="chart-axis">
                            <span>0</span>
                            <span>25k</span>
                            <span>50k</span>
                            <span>75k</span>
                            <span>150k</span>
                        </div>
                    </article>

                    <div className="dashboard-right-column">
                        <article className="dash-card metric-card">
                            <div>
                                <p className="card-label">Operational Expenditure</p>
                                <p className="card-value">Rs 4,52,713</p>
                                <p className="card-meta">per month</p>
                            </div>
                            <div className="card-icon-shell">
                                <img src={opexIcon} alt="Operational expenditure" className="OpEx-Icon" />
                            </div>
                        </article>

                        <article className="dash-card metric-card">
                            <div>
                                <p className="card-label">Capital Expenditure</p>
                                <p className="card-value">Rs 13,00,000</p>
                                <p className="card-meta">one time cost</p>
                            </div>
                            <div className="card-icon-shell">
                                <img src={capexIcon} alt="Capital expenditure" className="CapEx-Icon" />
                            </div>
                        </article>
                    </div>
                </section>

                <section className="dashboard-bottom-cards" aria-label="Financial summary">
                    <article className="dash-card metric-card">
                        <div>
                            <p className="card-label">Sales</p>
                            <p className="card-value">Rs 6,01,250</p>
                            <p className="card-meta">per month</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={SalesIcon} alt="Sales" className="Sales-Icon" />
                        </div>
                    </article>

                    <article className="dash-card metric-card">
                        <div>
                            <p className="card-label">Earnings Before Tax</p>
                            <p className="card-value">Rs 1,48,538</p>
                            <p className="card-meta">per month</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={ebtwcIcon} alt="Earnings before tax" className="EBTWC-Icon" />
                        </div>
                    </article>

                    <article className="dash-card metric-card">
                        <div>
                            <p className="card-label">Working Capital</p>
                            <p className="card-value">Rs 26,58,138</p>
                            <p className="card-meta">to start the business</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={FundingIcon} alt="Working capital" />
                        </div>
                    </article>
                </section>

            </main>


            {/* <div className="dashboard-content">
                <h1 className="dashboard-title">Dashboard</h1>

                <section className="dashboard-top-cards" aria-label="Market summary">
                    <article className="dash-card summary-card">
                        <div>
                            <p className="card-label">TAM</p>
                            <p className="card-value">4,41,000</p>
                            <p className="card-meta">No. of People</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={tamIcon} alt="TAM icon" className="Tam-Icon" />
                        </div>
                    </article>

                    <article className="dash-card summary-card">
                        <div>
                            <p className="card-label">SAM</p>
                            <p className="card-value">24,050</p>
                            <p className="card-meta">No. of People</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={samIcon} alt="SAM icon" className="SAM-Icon" />
                        </div>
                    </article>

                    <article className="dash-card summary-card">
                        <div>
                            <p className="card-label">SOM</p>
                            <p className="card-value">241</p>
                            <p className="card-meta">No. of People</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={somIcon} alt="SOM icon" className="SOM-Icon" />
                        </div>
                    </article>

                    <article className="dash-card summary-card">
                        <div>
                            <p className="card-label">CSP</p>
                            <p className="card-value">Rs 100</p>
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
                                <h2 className="chart-title">Browser usage</h2>
                            </div>
                            <div className="chart-tabs" role="tablist" aria-label="Time period">
                                <button type="button" className="chart-tab">Annually</button>
                                <button type="button" className="chart-tab active">Monthly</button>
                            </div>
                        </div>

                        <div className="chart-row">
                            <span>Sales</span>
                            <div className="chart-track"><div className="chart-fill fill-sales" /></div>
                            <span>121,799</span>
                        </div>
                        <div className="chart-row">
                            <span>OpEx</span>
                            <div className="chart-track"><div className="chart-fill fill-opex" /></div>
                            <span>50,799</span>
                        </div>
                        <div className="chart-row">
                            <span>EBT</span>
                            <div className="chart-track"><div className="chart-fill fill-ebt" /></div>
                            <span>25,567</span>
                        </div>

                        <div className="chart-axis">
                            <span>0</span>
                            <span>25k</span>
                            <span>50k</span>
                            <span>75k</span>
                            <span>150k</span>
                        </div>
                    </article>

                    <div className="dashboard-right-column">
                        <article className="dash-card metric-card">
                            <div>
                                <p className="card-label">Operational Expenditure</p>
                                <p className="card-value">Rs 4,52,713</p>
                                <p className="card-meta">per month</p>
                            </div>
                            <div className="card-icon-shell">
                                <img src={opexIcon} alt="Operational expenditure" className="OpEx-Icon" />
                            </div>
                        </article>

                        <article className="dash-card metric-card">
                            <div>
                                <p className="card-label">Capital Expenditure</p>
                                <p className="card-value">Rs 13,00,000</p>
                                <p className="card-meta">one time cost</p>
                            </div>
                            <div className="card-icon-shell">
                                <img src={capexIcon} alt="Capital expenditure" className="CapEx-Icon" />
                            </div>
                        </article>
                    </div>
                </section>

                <section className="dashboard-bottom-cards" aria-label="Financial summary">
                    <article className="dash-card metric-card compact">
                        <div>
                            <p className="card-label">Sales</p>
                            <p className="card-value">Rs 6,01,250</p>
                            <p className="card-meta">per month</p>
                        </div>
                    </article>

                    <article className="dash-card metric-card compact">
                        <div>
                            <p className="card-label">Earnings Before Tax</p>
                            <p className="card-value">Rs 1,48,538</p>
                            <p className="card-meta">per month</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={ebtwcIcon} alt="Earnings before tax" className="EBTWC-Icon" />
                        </div>
                    </article>

                    <article className="dash-card metric-card compact">
                        <div>
                            <p className="card-label">Working Capital</p>
                            <p className="card-value">Rs 26,58,138</p>
                            <p className="card-meta">to start the business</p>
                        </div>
                        <div className="card-icon-shell">
                            <img src={ebtwcIcon} alt="Working capital" className="EBTWC-Icon" />
                        </div>
                    </article>
                </section>
            </div> */}

            <Footer texts={footerTexts} />
        </div>
    );
};

export default Dashboard;
