import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import TransitionWrapper from "../../components/TransitionWrapper";
import Avatar from "../../components/Avatar";
import { useNavigate } from "react-router-dom";
import "../../css/TowardsEBT.css";
import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import cspIcon from "../../assets/img/csp-icon.png";
import somIcon from "../../assets/img/som-icon.png";
import opexIcon from "../../assets/img/OpEx-icon.png";
import capexIcon from "../../assets/img/CapEx-icon.png";

const TowardsEBT = () => {
    const navigate = useNavigate();

    const handleYesClick = () => navigate("/Biz-Sim-V2/EBT_WC-calculation");
    const handleNoClick = () => navigate("/Biz-Sim-V2/towards-capex");

    return (
        <div className="towards-ebt">
            <Header />
            <BackButton topOffset="10vh" />
            <Avatar />
            <div className="indicatorIcon-container">
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
            </div>
            <div className="body-container">
                <TransitionWrapper delays={[1000, 1800, 2400, 3000, 3800, 4400]}>
                    {(visibleStates) => (
                        <div className="texts-container">
                            <p
                                className={`transition-items text-two ${visibleStates[0] ? "visible" : ""}`}
                            >
                                Now that we’ve estimated the revenue and expenses, the system can automatically calculate the business’s Earnings Before Tax (EBT) by subtracting monthly operational expenses (OpEx) from the monthly sales (SOM).
                            </p>
                            <p
                                className={`transition-items text-two ${visibleStates[1] ? "visible" : ""}`}
                            >
                                Once the system gives us an approx EBT, we will then calculate the funds needed to start the business and sustain it for the initial months—this is what we call “Working Capital.”
                            </p>
                            <p
                                className={`transition-items towardsEBT-question ${visibleStates[2] ? "visible" : ""}`}
                            >
                                Are you ready to move on to the next section?
                            </p>
                            <div
                                className={`transition-items towardsEBT-yesno-container ${visibleStates[4] ? "visible" : ""}`}
                            >
                                <div className="towardsEBT-option">
                                    <button type="button" className="towardsEBT-choice" onClick={handleNoClick}>
                                        NO
                                    </button>
                                    <div className="towardsEBT-label">Go Back to CapEx</div>
                                </div>
                                <div className="towardsEBT-option">
                                    <button type="button" className="towardsEBT-choice" onClick={handleYesClick}>
                                        YES
                                    </button>
                                    <div className="towardsEBT-label">Proceed to EBT</div>
                                </div>
                            </div>
                            <button
                                type="button"
                                className={`transition-items towardsEBT-link ${visibleStates[5] ? "visible" : ""}`}
                                onClick={handleYesClick}
                            >
                                Click here to learn more about EBT and Working Capital
                            </button>
                        </div>
                    )}
                </TransitionWrapper>
            </div>
        </div>
    );
};

export default TowardsEBT;