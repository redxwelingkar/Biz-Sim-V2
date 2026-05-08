import Header from "../../components/Header";
import TransitionWrapper from "../../components/TransitionWrapper";
import Avatar from "../../components/Avatar";
import { useNavigate } from "react-router-dom";
import "../../css/TowardsEBT.css";

import NavigationIcons from "../../components/NavigationIcons";

const TowardsEBT = () => {
    const navigate = useNavigate();

    const handleYesClick = () => navigate("/Biz-Sim-V2/EBT_WC-calculation");
    const handleNoClick = () => navigate("/Biz-Sim-V2/towards-capex");


    return (
        <div className="towards-ebt">
            <Header />
            <Avatar />
            <NavigationIcons/>
            <div className="body-container">
                <TransitionWrapper delays={[200, 600, 1100, 1600, 2100, 2600]}>
                    {(visibleStates) => (
                        <div className="texts-container">
                            <p
                                className={`transition-items text-two ${visibleStates[0] ? "visible" : ""}`}
                            >
                                Now that we've estimated the revenue and expenses, the simulation can automatically calculate the business's Earnings Before Tax (EBT) by subtracting monthly operational expenses (OpEx) from the monthly sales (SOM).
                            </p>
                            <p
                                className={`transition-items text-two ${visibleStates[1] ? "visible" : ""}`}
                            >
                                Once the simulation gives us an approx EBT, we will then calculate the funds needed to start the business and sustain it for the initial months - this is what we call "Working Capital."
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
                            {/* <button
                                type="button"
                                className={`transition-items towardsEBT-link ${visibleStates[5] ? "visible" : ""}`}
                                onClick={handleYesClick}
                            >
                                Click here to learn more about EBT and Working Capital
                            </button> */}
                        </div>
                    )}
                </TransitionWrapper>
            </div>
        </div>
    );
};

export default TowardsEBT;
