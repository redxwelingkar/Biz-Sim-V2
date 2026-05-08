import Header from "../../components/Header";
import TransitionWrapper from "../../components/TransitionWrapper";
import Avatar from "../../components/Avatar";
import { useNavigate } from "react-router-dom";
import "../../css/TowardsFunding.css";

import NavigationIcons from '../../components/NavigationIcons';

const TowardsFunding = () => {
    const navigate = useNavigate();

    const handleYesClick = () => navigate("/Biz-Sim-V2/funding");
    const handleNoClick = () => navigate("/Biz-Sim-V2/towards-ebt-wc");

    return (
        <div className="towards-funding">
            <Header />
            <Avatar />
            <NavigationIcons/>
            <div className="body-container">
                <TransitionWrapper delays={[200, 600, 1100, 1600]}>
                    {(visibleStates) => (
                        <div className="texts-container">
                            <p
                                className={`transition-items text-two ${visibleStates[0] ? "visible" : ""}`}
                            >
                                Since in the last section we calculated how much money we will require to start the business, so, in this section we will figure out where to get the "Funding" from.
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
                            {/* <button
                                type="button"
                                className={`transition-items towardsFunding-link ${visibleStates[3] ? "visible" : ""}`}
                                onClick={handleYesClick}
                            >
                                Click here to learn more about Funding
                            </button> */}
                        </div>
                    )}
                </TransitionWrapper>
            </div>
        </div>
    );
};

export default TowardsFunding;
