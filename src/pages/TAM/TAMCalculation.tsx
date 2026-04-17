import { useState, useEffect } from 'react';
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import "../../css/TamCalculation.css";
import TableComponent from '../../components/MainTable';
import { useNavigate } from 'react-router-dom';

const TAMCalc = () => {
  const [showTable, setShowTable] = useState(false); // State to control visibility of TableComponent
  const [FooterVisible, setFooterVisible] = useState(true);
  const navigate = useNavigate();


  const [showTAMIcon, setshowTAMIcon] = useState(false);
  const [showSAMIcon, setshowSAMIcon] = useState(false);
  const [showCSPIcon, setshowCSPIcon] = useState(false);
  const [showSOMIcon, setshowSOMIcon] = useState(false);
  const [showOpExIcon, setshowOpExIcon] = useState(false);
  const [showCapExIcon, setshowCapExIcon] = useState(false);
  const [showEBTWCIcon, setshowEBTWCIcon] = useState(false);
  const [showFundingIcon, setshowFundingIcon] = useState(false);
  const [showDashBoardIcon, setshowDashboardIcon] = useState(false);
  const [TutorialMode, setTutorialMode] = useState(false);



  const handleNext = () => {
    setShowTable(true); // Show TableComponent
  };

  const onNextshowTAMIcon = () => {
    setshowTAMIcon(true)
  }

  useEffect(() => {
    try {
      let TutorialMode = localStorage.getItem("TutorialMode")
      const storedRows = localStorage.getItem('rows');
      const storedTotalSize = localStorage.getItem('TAM');

      // When TAM is Calculated - Disable footer 
      if (storedTotalSize) setFooterVisible(false)

      if (TutorialMode === 'true') setTutorialMode(true)
      else setTutorialMode(false)

      if (storedRows && storedTotalSize) {
        setShowTable(true)
      }
    } catch (error) {
      console.log("Business Name Error", error);
    }
  }, [])

  const showNavIconIfData = () => {
    try {
      // show TAM ICON
      const TAMtotal = localStorage.getItem('TAM');
      if (TAMtotal) setshowTAMIcon(true)

      // show SAM ICON
      const SAMtotal = localStorage.getItem('SAM');
      if (SAMtotal) setshowSAMIcon(true)
      // }

    } catch (error) {
      console.log("showNavIconIfData Error", error)
    }
  }


  const handleNavToSAM = () => {
    let SAM = localStorage.getItem("SAM")
    if (SAM) navigate('/Biz-Sim-V2/sam-calculation');
    else navigate('/Biz-Sim-V2/towards-sam');

  }

  const footerTexts = [
    "Here in TAM, the first thing you need to mention are the different customer segments in the field given under the column of “Customer Segments”, and mention a near accurate approximation of the number of people in that customer segment in the field next to the specified customer segment under the column of 'Size'.",
    "You can add more customer segments by clicking on the “ADD CUSTOMER SEGMENT” button. You can also edit an entry by hovering over it or you can completely remove a row of customer segment by clicking on the “[ - ]” icon before the start of every row.",
    "Once you have completed filling the details for all possible customer segments and their sizes for your business, please click the “SAVE DETAILS” button to get the overall sum value for your Total Addressable Market.",
    "Great! You have successfully defined and calculated your Total Addressable Market. To mark this milestone we have added an icon on your right side bar, you can use to to come back to TAM later if you need to make any changes.",
    "Click on the downward arrow here to move on to the next section.",
    "",
  ];

  return (

    <div>
      {TutorialMode ?
        // TutorialMode=true
        <div className="tam-calculation">
          <Header />
          <BackButton topOffset="10vh" /> {/* Adjust the value as needed */}
          {!showTable && <div className='table-placeholder'></div>}
          {showTable &&
            <TableComponent
              headingText="Total Addressable Market"
              NumbertoWordsCOL={true}
              showTAMIcon={showTAMIcon}
              TutorialMode={TutorialMode}
            />}

          {FooterVisible &&
            <Footer
              onNext={handleNext}
              onNextshowTAMIcon={onNextshowTAMIcon}
              onNextNavtoSAM={handleNavToSAM}
              texts={footerTexts} />}
        </div>
        :
        // TutorialMode=false
        <div className="tam-calculation">
          <Header />
          <BackButton topOffset="10vh" /> {/* Adjust the value as needed */}
          <TableComponent
            headingText="Total Addressable Market"
            NumbertoWordsCOL={true}
            // showTAMIcon={showTAMIcon}
            TutorialMode={TutorialMode}
          />
        </div>
      }
    </div>

  );


};

export default TAMCalc;


