import Header from "../../components/Header"; 
import BackButton from "../../components/BackButton";
import "../../css/TamCalculation.css";

const TAMCalc = () => {
  return (
    <div className="tam-calculation">
      <Header />
      <div className="back-button-container">
        <BackButton />
      </div>
    </div>
  );
};

export default TAMCalc;
