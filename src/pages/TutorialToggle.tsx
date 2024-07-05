import { To, useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar"; // Ensure the path is correct
import TransitionComponent from "../components/TextTransition"; // Adjust path as needed

const TutorialToggle = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  return (
    <TransitionComponent
      initialText="Hi! Welcome to Business Simulation"
      mainText="Do you want tutorials to guide you?"
    >
      <div className="m-2">
        <button onClick={() => handleNavigation("/Biz-Sim-V2/business-name")}>
          Yes
        </button>
        <button onClick={() => handleNavigation("/Biz-Sim-V2/Home")}>
          No
        </button>
      </div>
      <Avatar />
    </TransitionComponent>
  );
};

export default TutorialToggle;
