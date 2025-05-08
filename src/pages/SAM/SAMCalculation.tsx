import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import "../../css/SamCalculation.css";
import TableComponent from "../../components/MainTable";
import TamIcon from "../../components/TamIcon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SAMCalc = () => {
  const navigate = useNavigate();

  const [showpercent, setShowpercent] = useState(false);
  const [showsizeofSAM, setShowsizeofSAM] = useState(false);
  const [showCalSAMBTN, setshowCalSAMBTN] = useState(false);

  const navigateNext = () => {
    navigate("/Biz-Sim-V2/towards-csp"); // Navigate to the next page after transitions
  };

  const footerTexts = [
    "Here in SAM, you must be seeing the same details that you just submitted in TAM. Confused? Why are they back? Don’t worry... For calculating the Serviceable Addressable Market, we need the TAM data. ",
    "And the only action required from you to calculate SAM is to fill the value of the “Percentage Conversion” for each of your customer segment and then press “Down Arrow Key”, and, Voila! The “Size of SAM” for each customer segment will be displayed in the fourth column. ",
    "You can still add more customer segments here, by clicking on the “ADD CUSTOMER SEGMENT” button and adding their names and vales for TAM and then their Percentage Conversion values. Go ahead try and try adding one, you can always delete it later... ",
    "Alright! Now that you have calculated the SAM for each customer segment, it is time to calculate the total value of SAM. For this, just click on the “CALCULATE SAM” button and the total size of SAM will be calculated and displayed.",
    "Great! You have successfully defined and calculated the size of the Serviceable Addressable Market (SAM) for your business. To mark this milestone an icon signifying the same will be added to the sidebar, which you can use to navigate back to SAM if you want to make any changes later.",
  ];

  const onNextPercent=()=>{
    setShowpercent(true);
  }
  const onNextsizeofSAM=()=>{
    setShowsizeofSAM(true);
  }
  const onNextshowCalSAMBTN=()=>{
    setshowCalSAMBTN(true);
  }  
  return (
    <div className="sam-calculation">
      <Header />
      <BackButton topOffset="10vh" showtam={true} showsam={true}/>
      {/* <TamIcon /> */}
      <TableComponent
        hideTotalSum={true}
        headingText="Serviceable Addressable Market"
        hideSaveDetailsButton={true}
        NumbertoWordsCOL={false}
        PercentageConvCOL={showpercent}
        SizeofSAMCOL={showsizeofSAM}
        showCalSAMBTN={showCalSAMBTN}
      />
      <Footer onNextPercent={onNextPercent} onNextsizeofSAM={onNextsizeofSAM} onNextshowCalSAMBTN={onNextshowCalSAMBTN} texts={footerTexts} />
      {/* <button onClick={navigateNext}>NEXT</button> */}
    </div>
  );
};

export default SAMCalc;
