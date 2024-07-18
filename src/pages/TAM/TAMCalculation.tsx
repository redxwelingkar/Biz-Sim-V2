import React from 'react';
import Header from "../../components/Header"; 
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import "../../css/TamCalculation.css";
import MainTable from '../../components/MainTable';

const TAMCalc: React.FC = () => {
  const handleNext = () => {
    console.log("Next button clicked");
  };

  return (
    <div className="tam-calculation">
      <Header />
      <div className="back-button-container">
        <BackButton topOffset="90px" /> {/* Adjust the value as needed */}
      </div>
      <MainTable />
      <Footer onNext={handleNext} />
    </div>
  );
};

export default TAMCalc;
