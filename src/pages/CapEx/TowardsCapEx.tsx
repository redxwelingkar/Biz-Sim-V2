import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import TransitionWrapper from "../../components/TransitionWrapper";
import Avatar from "../../components/Avatar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/TowardsCapEx.css";
import tamIcon from "../../assets/img/tam-icon.png";
import samIcon from "../../assets/img/sam-icon.png";
import cspIcon from "../../assets/img/csp-icon.png";
import somIcon from "../../assets/img/som-icon.png";
import opexIcon from "../../assets/img/OpEx-icon.png";

const TowardsCapEx = () => {
    const [showIntro, setShowIntro] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    const handleYesClick = () => navigate("/Biz-Sim-V2/capex-calculation");
    const handleNoClick = () => navigate("/Biz-Sim-V2/towards-opex");

    useEffect(() => {
        const fadeIntroTimer = window.setTimeout(() => {
            setShowIntro(false);
        }, 2600);

        const showDetailsTimer = window.setTimeout(() => {
            setShowDetails(true);
        }, 3300);

        return () => {
            window.clearTimeout(fadeIntroTimer);
            window.clearTimeout(showDetailsTimer);
        };
    }, []);

    return (
        <div className="towards-capex">
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
            </div>
            <div className="body-container">
                <TransitionWrapper delays={[1500]}>
                    {(visibleStates) => (
                        <div className={`texts-container towardsCapEx-intro ${!showIntro ? "fade-away" : ""}`}>
                            <p
                                className={`transition-items text-two ${visibleStates[0] ? "visible" : ""}`}
                            >
                                In the last section we listed out all the expenses that your business is going to incur while in operation but your business will incur more expenses for just setting it up, this is going to be a one time investment, and  is referred to as
                            </p>
                        </div>
                    )}
                </TransitionWrapper>
                {showDetails && (
                    <TransitionWrapper delays={[600, 1200, 2400, 3600, 4800, 6000]}>
                        {(visibleStates) => (
                            <div className="texts-container" style={{ top: "10vh" }}>
                                <p
                                    className={`transition-items text-two header-name ${visibleStates[0] ? "visible" : ""}`}
                                >
                                    Capital Expenditure (CapEx)
                                </p>
                                <p
                                    className={`transition-items text-two ${visibleStates[1] ? "visible" : ""}`}
                                >
                                    Capital expenditure (CapEx) is the money a business spends to acquire, upgrade, or maintain long-term physical assets such as buildings, equipment, vehicles, land, or technology.
                                </p>
                                <p
                                    className={`transition-items text-two ${visibleStates[2] ? "visible" : ""}`}
                                >
                                    CapEx differs from operating expenses (OpEx), which are the day-to-day costs required to run a business.
                                </p>
                                <p
                                    className={`transition-items towardsCapEx-question ${visibleStates[3] ? "visible" : ""}`}
                                >
                                    Are you ready to move on to CapEx?
                                </p>
                                <div
                                    className={`transition-items towardsCapEx-yesno-container ${visibleStates[4] ? "visible" : ""}`}
                                >
                                    <div className="towardsCapEx-option">
                                        <button type="button" className="towardsCapEx-choice" onClick={handleNoClick}>
                                            NO
                                        </button>
                                        <div className="towardsCapEx-label">Go Back to OpEx</div>
                                    </div>
                                    <div className="towardsCapEx-option">
                                        <button type="button" className="towardsCapEx-choice" onClick={handleYesClick}>
                                            YES
                                        </button>
                                        <div className="towardsCapEx-label">Proceed to CapEx</div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className={`transition-items towardsCapEx-link ${visibleStates[5] ? "visible" : ""}`}
                                    onClick={handleYesClick}
                                >
                                    Click here to learn more about CapEx
                                </button>
                            </div>
                        )}
                    </TransitionWrapper>
                )}
            </div>
        </div>
    );
};

export default TowardsCapEx;

