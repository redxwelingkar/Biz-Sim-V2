import { useState } from 'react';
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import "../../css/TamCalculation.css";
import TableComponent from '../../components/MainTable';

const TAMCalc = () => {
  const [showTable, setShowTable] = useState(false); // State to control visibility of TableComponent

  const handleNext = () => {
    setShowTable(true); // Show TableComponent
  };

  return (
    <div className="tam-calculation">
      <Header />
      <div className="back-button-container">
        <BackButton topOffset="10vh" /> {/* Adjust the value as needed */}
      </div>
      {showTable && <TableComponent />} {/* Conditionally render TableComponent */}
      <Footer onNext={handleNext} /> {/* Pass function to show TableComponent */}
    </div>
  );
};

export default TAMCalc;
