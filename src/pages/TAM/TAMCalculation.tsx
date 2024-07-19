import React from 'react';
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import "../../css/TamCalculation.css";
import { useNavigate } from "react-router-dom";
import TableComponent from '../../components/MainTable';

const TAMCalc: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {};
  const TowardsSAM = () => {
    navigate("/Biz-Sim-V2/towards-sam");
  };

  return (
    <div className="tam-calculation">
      <Header />
      <div className="back-button-container">
        <BackButton topOffset="10vh" /> {/* Adjust the value as needed */}
      </div>
      <TableComponent/>
      {/* <div className="">
        <button className="btns" onClick={TowardsSAM}>next</button>
      </div> */}
      <Footer onNext={handleNext} />
    </div>
  );
};

export default TAMCalc;
