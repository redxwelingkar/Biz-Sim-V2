import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import TransitionWrapper from "../../components/TransitionWrapper";
import "../../css/TowardsSAM.css";
import TamIcon from "../../components/TamIcon";
import Avatar from "../../components/Avatar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TowardsSAM = () => {
  const [extraContentVisible, setExtraContentVisible] = useState(false);
  const navigate = useNavigate();

  const handleLearnMoreClick = () =>
    setExtraContentVisible(!extraContentVisible);
  const handleYesClick = () => navigate("/Biz-Sim-V2/sam-calculation");
  const handleNoClick = () => navigate("/Biz-Sim-V2/towards-tam");

  return (
    <div className="towards-sam">
      <Header />
      <BackButton topOffset="10vh" showtam={true} />
      {/* <TamIcon /> */}
      <Avatar />
      <div className="body-container">
        <TransitionWrapper delays={[1500, 3500, 5500]}>
          {(visibleStates) => (
            <div className="texts-container">
              <p
                className={`transition-items text-one ${visibleStates[0] ? "visible" : ""
                  }`}
              >
                Now let’s move on to the next step of defining and calculating
                the
              </p>
              <p
                className={`transition-items sam-heading ${visibleStates[0] ? "visible" : ""
                  }`}
              >
                Serviceable Addressable Market (SAM)
              </p>
              <p
                className={`transition-items ${visibleStates[1] ? "visible" : ""
                  }`}
              >
                A business can't capture 100% of a given market. In the real
                business world, a business targets a specific customer base,
                which is the serviceable addressable market. The SAM represents
                a fraction of the whole market a business can reach with its
                limited resources.
              </p>
              <button
                className={`transition-items action-button ${visibleStates[1] ? "visible" : ""
                  }`}
                onClick={handleLearnMoreClick}
              >
                {extraContentVisible ? "Read Less" : "Learn More"}
              </button>
              {extraContentVisible && (
                <div className="extra-text">
                  The SAM represents a fraction of the whole market a business
                  can reach with its limited resources.
                </div>
              )}
              <p
                className={`transition-items ${visibleStates[2] ? "visible" : ""
                  }`}
              >
                Are you ready to move on to SAM?
              </p>
              <div className="buttons-container">
                <div className={`button-wrapper transition-items ${visibleStates[2] ? "visible" : ""
                  }`}>
                  <button
                    onClick={handleNoClick}
                  >
                    NO
                  </button>
                  <p className="button-description">Go back to TAM</p>
                </div>
                <div className={`button-wrapper transition-items ${visibleStates[2] ? "visible" : ""
                  }`}>
                  <button
                    onClick={handleYesClick}
                  >
                    YES
                  </button>
                  <p className="button-description">Proceed to SAM</p>
                </div>
              </div>
            </div>
          )}
        </TransitionWrapper>
      </div>
    </div>
  );
};

export default TowardsSAM;
