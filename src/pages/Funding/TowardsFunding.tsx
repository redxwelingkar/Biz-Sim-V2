import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import TransitionWrapper from "../../components/TransitionWrapper";
import Avatar from "../../components/Avatar";
import { useNavigate } from "react-router-dom";
import "../../css/TowardsFunding.css";
import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import cspIcon from "../../assets/img/csp-icon.png";
import somIcon from "../../assets/img/som-icon.png";
import opexIcon from "../../assets/img/OpEx-icon.png";
import capexIcon from "../../assets/img/CapEx-icon.png";
import ebtwcIcon from "../../assets/img/EBT_WC.png";

const TowardsFunding = () => {
    const navigate = useNavigate();

    const handleYesClick = () => navigate("/Biz-Sim-V2/funding");
    const handleNoClick = () => navigate("/Biz-Sim-V2/towards-ebt-wc");

    return (
        <div className="towards-funding">
            <Header />
            <BackButton topOffset="10vh" />
            <Avatar />
            <div className="indicatorIcon-container">
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
            </div>
            <div className="body-container">
                <TransitionWrapper delays={[1000, 1800, 2200, 3000]}>
                    {(visibleStates) => (
                        <div className="texts-container">
                            <p
                                className={`transition-items text-two ${visibleStates[0] ? "visible" : ""}`}
                            >
                                Since in the last section we calculated how much money we will require to start the business, so, in this section we will figure out where to get the “Funding” from.
                                And we will also look at how those sources of funding might incur some monthly EMIs, if they are loans
                            </p>
                            <p
                                className={`transition-items towardsFunding-question ${visibleStates[1] ? "visible" : ""}`}
                            >
                                Are you ready to move on to the section of Funding?
                            </p>
                            <div
                                className={`transition-items towardsFunding-yesno-container ${visibleStates[2] ? "visible" : ""}`}
                            >
                                <div className="towardsFunding-option">
                                    <button type="button" className="towardsFunding-choice" onClick={handleNoClick}>
                                        NO
                                    </button>
                                    <div className="towardsFunding-label">Go Back to Working Capital</div>
                                </div>
                                <div className="towardsFunding-option">
                                    <button type="button" className="towardsFunding-choice" onClick={handleYesClick}>
                                        YES
                                    </button>
                                    <div className="towardsFunding-label">Proceed to Funding</div>
                                </div>
                            </div>
                            <button
                                type="button"
                                className={`transition-items towardsFunding-link ${visibleStates[3] ? "visible" : ""}`}
                                onClick={handleYesClick}
                            >
                                Click here to learn more about Funding
                            </button>
                        </div>
                    )}
                </TransitionWrapper>
            </div>
        </div>
    );
};

export default TowardsFunding;