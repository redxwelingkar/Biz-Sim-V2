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

  const footerTexts = [
    "Here in TAM, the first thing you need to mention are the different customer segments in the field given under the column of “Customer Segments”, and mention a near accurate approximation of the number of people in that customer segment in the field next to the specified customer segment under the column of 'Size'.",
    "You can add more customer segments by clicking on the “ADD CUSTOMER SEGMENT” button. You can also edit an entry by hovering over it or you can completely remove a row of customer segment by clicking on the “[ - ]” icon before the start of every row.",
    "Once you have completed filling the details for all possible customer segments and their sizes for your business, please click the “SAVE DETAILS” button to get the overall sum value for your Total Addressable Market.",
    "Great! You have successfully defined and calculated your Total Addressable Market. To mark this milestone we have added an icon on your right side bar, you can use to to come back to TAM later if you need to make any changes.",
  ];

  return (
    <div className="tam-calculation">
      <Header />
      <BackButton topOffset="10vh" /> {/* Adjust the value as needed */}
      {!showTable && <div className='table-placeholder'></div>}
      {showTable && <TableComponent headingText="Total Addressable Market" />} {/* Conditionally render TableComponent */}
      <Footer onNext={handleNext} texts={footerTexts} /> {/* Pass function to show TableComponent */}
    </div>
  );
};

export default TAMCalc;
