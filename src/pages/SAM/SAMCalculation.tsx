import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import "../../css/SamCalculation.css";
import TableComponent from "../../components/MainTable";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SAMCalc = () => {
  const navigate = useNavigate();

  const [showpercent, setShowpercent] = useState(false);
  const [showsizeofSAM, setShowsizeofSAM] = useState(false);
  const [showCalSAMBTN, setshowCalSAMBTN] = useState(false);
  const [CalSAMBTNclick, setCalSAMBTNclick] = useState(false);
  const [showSAMIcon, setshowSAMIcon] = useState(false);
  const [TutorialMode, setTutorialMode] = useState(false);
  const [FooterVisible, setFooterVisible] = useState(true);


  useEffect(() => {
    try {
      let TutorialMode = localStorage.getItem("TutorialMode")
      if (TutorialMode === 'true') setTutorialMode(true)
      else setTutorialMode(false)
      console.log("samCal TutorialMode", TutorialMode);

      // if SAMTotal calculated remove footer, show all col
      const SAMTotal = localStorage.getItem('SAM');
      if (SAMTotal) {
        setFooterVisible(false)
        setShowpercent(true)
        setShowsizeofSAM(true)
        setshowCalSAMBTN(true)
        // onSAMCalBTNclick()
      }




      // if (storedRows && storedTotalSize) {
      //   setShowTable(true)
      // }
    } catch (error) {
      console.log("Business Name Error", error);
    }
  }, [])

  const handleNavToCSP = () =>{
    let CSPMonthly = localStorage.getItem("CSPMonthly")
    if (CSPMonthly) navigate('/Biz-Sim-V2/csp');
    else navigate('/Biz-Sim-V2/towards-csp');
  }

  const footerTexts = [
    "Here in SAM, you must be seeing the same details that you just submitted in TAM. Confused? Why are they back? Don't worry... For calculating the Serviceable Addressable Market, we need the TAM data. ",
    "And the only action required from you to calculate SAM is to fill the value of the “Percentage Conversion” for each of your customer segment and then press “Down Arrow Key”, and, Voila! The “Size of SAM” for each customer segment will be displayed in the fourth column. ",
    "You can still add more customer segments here, by clicking on the “ADD CUSTOMER SEGMENT” button and adding their names and vales for TAM and then their Percentage Conversion values. Go ahead try and try adding one, you can always delete it later... ",
    "Alright! Now that you have calculated the SAM for each customer segment, it is time to calculate the total value of SAM. For this, just click on the “CALCULATE SAM” button and the total size of SAM will be calculated and displayed.",
    "Great! You have successfully defined and calculated the size of the Serviceable Addressable Market (SAM) for your business. To mark this milestone an icon signifying the same will be added to the sidebar, which you can use to navigate back to SAM if you want to make any changes later.",
    "Click on the downward arrow here to move on to the next section.",
    "",
  ];

  const onNextPercent = () => {
    setShowpercent(true);
  }
  const onNextsizeofSAM = () => {
    setShowsizeofSAM(true);
  }
  const onNextshowCalSAMBTN = () => {
    setshowCalSAMBTN(true);
  }
  const onNextshowSAMIcon = () => {
    setshowSAMIcon(true);
  }

  const onSAMCalBTNclick = () => {
    setCalSAMBTNclick(true)
  }

  return (
    <div>
      {TutorialMode ?
        // TutorialMode=True
        <div className="sam-calculation">
          <Header />
          <BackButton topOffset="10vh" />
          {/* <TamIcon /> */}
          <TableComponent
            hideTotalSum={true}
            headingText="Serviceable Addressable Market"
            hideSaveDetailsButton={true}
            NumbertoWordsCOL={false}
            PercentageConvCOL={showpercent}
            SizeofSAMCOL={showsizeofSAM}
            showCalSAMBTN={showCalSAMBTN}
            SAMCalBTNclick={onSAMCalBTNclick}
            // holdTAMIcon={true}
            showSAMIcon={showSAMIcon}
            TutorialMode={TutorialMode}
          />
          {FooterVisible &&
            <Footer
              onNextPercent={onNextPercent}
              onNextsizeofSAM={onNextsizeofSAM}
              onNextshowCalSAMBTN={onNextshowCalSAMBTN}
              onNextshowSAMIcon={onNextshowSAMIcon}
              onNextNavtoCSP={handleNavToCSP}
              CalSAMBTNclick={CalSAMBTNclick}
              texts={footerTexts} />}
          {/* <button onClick={navigateNext}>NEXT</button> */}
        </div>
        :
        // TutorialMode=False
        <div className="sam-calculation">
          <Header />
          <BackButton topOffset="10vh" />
          {/* <TamIcon /> */}
          <TableComponent
            hideTotalSum={true}
            headingText="Serviceable Addressable Market"
            hideSaveDetailsButton={true}
            NumbertoWordsCOL={false}
            PercentageConvCOL={showpercent}
            SizeofSAMCOL={showsizeofSAM}
            showCalSAMBTN={showCalSAMBTN}
            SAMCalBTNclick={onSAMCalBTNclick}
            // holdTAMIcon={true}
            showSAMIcon={showSAMIcon}
            TutorialMode={TutorialMode}
          />
        </div>}
    </div>

  );
};

export default SAMCalc;
