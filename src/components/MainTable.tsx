import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { debounce } from 'lodash';
import CustomerSegment from './CustomerSegmentCell';
import Size from './SizeCell';
import NumberToWords from './NumberToWords';
import '../css/MainTable.css';
import Percentage from './PercentageCell';
import SizeofSAM from './SizeofSAM';
import { motion, AnimatePresence } from 'framer-motion';

import tamIcon from "../assets/img/tam-icon.png";
import samIcon from "../assets/img/sam-icon.png";
import DashboardIcon from "../assets/img/DashB-Icon.png";
import somIcon from "../assets/img/som-icon.png";
import cspIcon from "../assets/img/csp-icon.png";
import opexIcon from "../assets/img/OpEx-icon.png";
import capexIcon from "../assets/img/CapEx-icon.png";
import ebtwcIcon from "../assets/img/EBT_WC.png";
import FundingIcon from "../assets/img/funding-icon.png";


interface TableComponentProps {
  hideTotalSum?: boolean; // Add prop to conditionally hide total sum
  headingText?: string;
  hideSaveDetailsButton?: boolean;
  showCalSAMBTN?: boolean;
  NumbertoWordsCOL?: boolean;
  PercentageConvCOL?: boolean;
  SizeofSAMCOL?: boolean;
  showTAMIcon?: boolean;
  holdTAMIcon?: boolean;
  showSAMIcon?: boolean;
  holdSAMIcon?: boolean;
  TutorialMode?: boolean;
  FooterVisible?: boolean;
  SAMCalBTNclick?: () => void;
}

const AnimatedColumn = ({ children, keyName }: { children: React.ReactNode; keyName: string }) => (
  <AnimatePresence mode="wait">
    <motion.td
      key={keyName}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.td>
  </AnimatePresence>
);

const AnimatedHeader = ({ children, keyName }: { children: React.ReactNode; keyName: string }) => (
  <AnimatePresence mode="wait">
    <motion.th
      key={keyName}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.th>
  </AnimatePresence>
);

const PopUp = ({ children, keyName }: { children: React.ReactNode; keyName: string }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={keyName}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);


const TableComponent = ({
  hideTotalSum,
  headingText,
  hideSaveDetailsButton,
  NumbertoWordsCOL,
  PercentageConvCOL,
  SizeofSAMCOL,
  showCalSAMBTN,
  showSAMIcon,
  showTAMIcon,
  holdTAMIcon,
  holdSAMIcon,
  TutorialMode,
  FooterVisible,
  SAMCalBTNclick

}: TableComponentProps) => {
  const [rows, setRows] = useState([
    { id: 1, customerSegment: '', size: '', percentage: '', sizeofSAM: '' },
    { id: 2, customerSegment: '', size: '', percentage: '', sizeofSAM: '' },
    { id: 3, customerSegment: '', size: '', percentage: '', sizeofSAM: '' },
  ]);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalSize, setTotalSize] = useState(0);
  const [SAM, setSAM] = useState(0);
  // const [showNext, setShowNext] = useState(false);
  // const [showText, setShowText] = useState(false);

  const [showTAMIconText, setshowTAMIconText] = useState(false);
  const [showSAMIconText, setshowSAMIconText] = useState(false);
  const [showPercentageConvCOL, setPercentageConvCOL] = useState(PercentageConvCOL);
  const [showSizeofSAMCOL, setSizeofSAMCOL] = useState(SizeofSAMCOL);
  const [showshowCalSAMBTN, setshowCalSAMBTN] = useState(showCalSAMBTN);
  const [fullscreen, setfullscreen] = useState(false);


  const [showTAMIcon1, setshowTAMIcon] = useState(false);
  const [showSAMIcon1, setshowSAMIcon] = useState(false);
  const [showCSPIcon, setshowCSPIcon] = useState(false);
  const [showSOMIcon, setshowSOMIcon] = useState(false);
  const [showOpExIcon, setshowOpExIcon] = useState(false);
  const [showCapExIcon, setshowCapExIcon] = useState(false);
  const [showEBTWCIcon, setshowEBTWCIcon] = useState(false);
  const [showFundingIcon, setshowFundingIcon] = useState(false);
  const [showDashBoardIcon, setshowDashboardIcon] = useState(false);
  const [isTutorialMode, setTutorialMode] = useState(TutorialMode);


  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedRows = localStorage.getItem('rows');
    const storedTotalSize = localStorage.getItem('TAM');

    console.log("Main Table TutorialMode", isTutorialMode)

    if (storedRows) {
      setRows(JSON.parse(storedRows));
    }
    if (storedTotalSize) {
      setTotalSize(parseInt(storedTotalSize, 10));
    }
    showNavIconIfData()

  }, []);

  const showNavIconIfData = () => {
    // console.log("showNavIconIfData");
    // console.log("showNavIconIfData", window.location.href.split("/").includes("sam-calculation"));

    try {
      // show TAM ICON
      const TAMtotal = localStorage.getItem('TAM');
      if (TAMtotal) setshowTAMIcon(true)
      if (TAMtotal && window.location.href.split("/").includes("tam-calculation")) {
        console.log("SAMtotal", TAMtotal);
        setfullscreen(true)
      }

      // show SAM ICON
      const SAMtotal = localStorage.getItem('SAM');
      if (SAMtotal) setshowSAMIcon(true)
      // if SAM Calculated show all col in TutorialMode
      if (SAMtotal && window.location.href.split("/").includes("sam-calculation")) {
        console.log("SAMtotal", SAMtotal);
        setfullscreen(true)
        setPercentageConvCOL(true)
        setSizeofSAMCOL(true)
        setshowCalSAMBTN(true)
      }

    } catch (error) {
      console.log("showNavIconIfData Error", error)
    }
  }

  // hide SAM text after 2 sec
  useEffect(() => {
    if (showTAMIcon) {
      setTimeout(() => {
        setshowTAMIcon(true)
        setTimeout(() => {
          // console.log("setshowTAMIconText(true)");
          setshowTAMIconText(true)
          setTimeout(() => {
            // console.log("setshowTAMIconText(false)");
            setshowTAMIconText(false)
            // setTimeout(() => {
            //   // console.log("setshowTAMIconText(false)");
            //   navigateToTowardsSam()
            // }, 1000 * 2);
          }, 1000 * 2.5);
        }, 1000);
      }, 1000 * 2);
    }
    if (showSAMIcon) {
      setTimeout(() => {
        setshowSAMIcon(true)
        setTimeout(() => {
          // console.log("setshowSAMIconText(true)");
          setshowSAMIconText(true)
          setTimeout(() => {
            // console.log("setshowSAMIconText(false)");
            setshowSAMIconText(false)
            // setTimeout(() => {
            //   // console.log("setshowSAMIconText(false)");
            //   navigateToTowardsCSP()
            // }, 1000 * 2);
          }, 1000 * 2.5);
        }, 1000);
      }, 1000 * 2);
    }
  }, [showSAMIcon, showTAMIcon])

  const handleAddRow = () => {
    const newRow = {
      id: rows.length ? rows[rows.length - 1].id + 1 : 1,
      customerSegment: '',
      size: '',
      percentage: '',
      sizeofSAM: ''
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    if (rows.length === 1) {
      setErrorMessage('Please enter at least one segment.');
      return;
    }
    setRows(rows.filter(row => row.id !== id));
  };

  const handleCustomerSegmentChange = (id: number, value: string) => {
    const updatedRows = rows.map(row =>
      row.id === id ? { ...row, customerSegment: value } : row
    );
    setRows(updatedRows);
  };

  const handleSizeChange = (id: number, value: string) => {
    const row = rows.find(r => r.id === id);
    const percentage = row?.percentage || '';
    debouncedUpdateSizeofSAM(id, value, percentage);
  };

  const handlePercentageChange = (id: number, value: string) => {
    const row = rows.find(r => r.id === id);
    const size = row?.size || '';
    debouncedUpdateSizeofSAM(id, size, value);
  };

  const updateSizeofSAM = (id: number, updatedSize: string, updatedPercentage: string) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        const size = updatedSize || row.size;
        const percentage = updatedPercentage || row.percentage;

        if (size && percentage && !isNaN(Number(size)) && !isNaN(Number(percentage))) {
          const product = (parseFloat(size) * parseFloat(percentage)) / 100;
          return { ...row, size, percentage, sizeofSAM: product.toFixed(2) };
        }

        return { ...row, size, percentage, sizeofSAM: '' };
      }
      return row;
    });

    setRows(updatedRows);
  };

  const debouncedUpdateSizeofSAM = debounce((id: number, size: string, percentage: string) => {
    updateSizeofSAM(id, size, percentage);
  }, 10); // 10ms debounce


  const handleSaveDetails = () => {
    const allFieldsFilled = rows.every(row => row.customerSegment !== '' && row.size !== '');
    if (!allFieldsFilled) {
      setErrorMessage('Please enter details in all cells.');
      return;
    }
    setErrorMessage('');
    const total = rows.reduce((total, row) => total + parseInt(row.size), 0);
    setTotalSize(total);
    localStorage.setItem('TAM', total.toString());
    localStorage.setItem('rows', JSON.stringify(rows));
    // setShowNext(true); // Show Next button when details are saved
  };

  const handleCalSAM = () => {
    const allFieldsFilled = rows.every(row => row.customerSegment !== '' && row.size !== '' && row.percentage !== '');
    if (!allFieldsFilled) {
      setErrorMessage('Please enter details in all cells.');
      return;
    }
    setErrorMessage('');
    const totalsize = rows.reduce((total, row) => total + parseInt(row.size), 0);
    setTotalSize(totalsize);
    const totalSAM = rows.reduce((total, row) => total + parseInt(row.sizeofSAM), 0);
    setSAM(totalSAM);
    localStorage.setItem('TAM', totalsize.toString());
    localStorage.setItem('SAM', totalSAM.toString());
    localStorage.setItem('rows', JSON.stringify(rows));
    if (SAMCalBTNclick) {
      SAMCalBTNclick()
    }
  }


  // const handleClearTotal = () => {
  //   setTotalSize(0);
  //   localStorage.removeItem('TAM');
  //   localStorage.removeItem('rows');
  //   setShowNext(false); // Hide Next button when total is cleared
  // };

  // const handleNext = () => {
  //   const image = document.querySelector('.image-container');
  //   if (image) {
  //     image.classList.add('show-image');
  //   }
  //   setTimeout(() => {
  //     setShowText(true); // Show text after image transition
  //   }, 2500);
  // };

  const navigateToTowardsSam = () => {
    navigate('/Biz-Sim-V2/towards-sam'); // Navigate to the next page after transitions
  };
  const navigateToTowardsCSP = () => {
    navigate('/Biz-Sim-V2/towards-csp'); // Navigate to the next page after transitions
  };

  return (
    <div>
      {TutorialMode ?
        // TutorialMode = True
        <div className={fullscreen ? 'table-container vh-90' : 'table-container'}>

          <div className='indicatorIcon-container'>
            {/* TAM Icon */}
            <div className='Icon-div' onClick={() => navigate('/Biz-Sim-V2/tam-calculation')}>

              {/* Animate the icon entry */}
              <AnimatePresence mode="wait">
                {holdTAMIcon || showTAMIcon1 ? (
                  <motion.img
                    key="tam-img"
                    src={tamIcon}
                    alt="Tam-Icon"
                    className="Tam-Icon"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 1 }}
                  />
                ) : <div></div>}
              </AnimatePresence>

              {/* Animate the text entry/exit */}
              <AnimatePresence mode="wait">
                {showTAMIconText && (
                  <motion.span
                    key="Tam-Icon-Text"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 1 }}
                  >
                    Total Addressable Market
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {/* SAM Icon */}
            <div className='Icon-div' onClick={() => navigate('/Biz-Sim-V2/sam-calculation')}>

              {/* Animate the icon entry */}
              <AnimatePresence mode="wait">
                {holdSAMIcon || showSAMIcon1 ? (
                  <motion.img
                    key="sam-img"
                    src={samIcon}
                    alt="Sam-Icon"
                    className="Tam-Icon"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 1 }}
                  />
                ) : <div></div>}
              </AnimatePresence>

              {/* Animate the text entry/exit */}
              <AnimatePresence mode="wait">
                {showSAMIconText && (
                  <motion.span
                    key="Sam-Icon-Text"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 1 }}
                  >
                    Serviceable Addressable Market
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <h2>{headingText}</h2>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Customer Segment</th>
                <th>Size</th>
                {NumbertoWordsCOL && <th></th>}{/* NumberToWords header */}
                {PercentageConvCOL && <AnimatedHeader keyName='precentConv'> Percentage Conversion</AnimatedHeader>}
                {SizeofSAMCOL && <AnimatedHeader keyName='SizeofSAM'>Size of SAM</AnimatedHeader>}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id}>
                  <td>
                    <button className="delete-button" onClick={() => handleDeleteRow(row.id)}>-</button>
                  </td>
                  <td>
                    <CustomerSegment
                      value={row.customerSegment}
                      onChange={(value) => handleCustomerSegmentChange(row.id, value)}
                    />
                  </td>
                  <td>
                    <Size
                      value={row.size}
                      onChange={(value) => handleSizeChange(row.id, value)}
                    />
                  </td>
                  {NumbertoWordsCOL &&
                    <td className="size-in-words">
                      <NumberToWords value={row.size} />
                    </td>
                  }
                  {PercentageConvCOL && <AnimatedColumn keyName={`percent-${row.id}`}>
                    <Percentage
                      value={row.percentage}
                      onChange={(value) => handlePercentageChange(row.id, value)} />
                  </AnimatedColumn>
                  }
                  {SizeofSAMCOL && <AnimatedColumn keyName={`sizeofSAM-${row.id}`}>
                    <SizeofSAM
                      value={row.sizeofSAM}
                    />
                  </AnimatedColumn>

                  }
                </tr>
              ))}
            </tbody>
          </table>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="button-container">
            <button className="add-button" onClick={handleAddRow}>ADD CUSTOMER SEGMENT</button>
            {!hideSaveDetailsButton && <button className="save-button" onClick={handleSaveDetails}>SAVE DETAILS</button>}
            {showCalSAMBTN && <PopUp keyName='CalSAMBTN'> <button className="save-button" onClick={handleCalSAM}>CALCULATE SAM</button></PopUp>}
          </div>
          {hideTotalSum && SAM !== 0 && (
            <div className="total-size-container">
              {/* <span className="total-size-clear-icon" onClick={handleClearTotal}>x</span> */}
              <span className="total-size-words"><NumberToWords value={SAM.toString()} /></span>
              <input
                type="text"
                value={SAM}
                readOnly
                className="total-size-field"
              />
            </div>
          )}
          {!hideTotalSum && totalSize !== null && (
            <div className="total-size-container">
              {/* <span className="total-size-clear-icon" onClick={handleClearTotal}>x</span> */}
              <span className="total-size-words"><NumberToWords value={totalSize.toString()} /></span>
              <input
                type="text"
                value={totalSize}
                readOnly
                className="total-size-field"
              />
            </div>
          )}
        </div>
        :// TutorialMode = False
        <div className='table-container vh-90'>

          <div className="indicatorIcon-container">
            <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/dashboard')}>
              <img src={DashboardIcon} alt="Dashboard-Icon" className="Dashboard-Icon" />
            </div>
            <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/tam-calculation')}>
              <img src={tamIcon} alt="TAM-Icon" className="Tam-Icon" />
            </div>
            <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/sam-calculation')}>
              <img src={samIcon} alt="SAM-Icon" className="SAM-Icon" />
            </div>
            <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/csp')}>
              <img src={cspIcon} alt="CSP-Icon" className="CSP-Icon" />
            </div>
            <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/som')}>
              <img src={somIcon} alt="SOM-Icon" className="SOM-Icon" />
            </div>
            <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/opex-calculation')}>
              <img src={opexIcon} alt="OpEx-Icon" className="OpEx-Icon" />
            </div>
            <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/capex-calculation')}>
              <img src={capexIcon} alt="CapEx-Icon" className="CapEx-Icon" />
            </div>
            <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/EBT_WC-calculation')}>
              <img src={ebtwcIcon} alt="EBT_WC-Icon" className="EBTWC-Icon" />
            </div>
            <div className="Icon-div" onClick={() => navigate('/Biz-Sim-V2/funding')}>
              <img src={FundingIcon} alt="Funding-Icon" className="Funding-Icon" />
            </div>
          </div>

          <h2>{headingText}</h2>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Customer Segment</th>
                <th>Size</th>
                {NumbertoWordsCOL && <th></th>}{/* NumberToWords header */}
                <AnimatedHeader keyName='precentConv'> Percentage Conversion</AnimatedHeader>
                <AnimatedHeader keyName='SizeofSAM'>Size of SAM</AnimatedHeader>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id}>
                  <td>
                    <button className="delete-button" onClick={() => handleDeleteRow(row.id)}>-</button>
                  </td>
                  <td>
                    <CustomerSegment
                      value={row.customerSegment}
                      onChange={(value) => handleCustomerSegmentChange(row.id, value)}
                    />
                  </td>
                  <td>
                    <Size
                      value={row.size}
                      onChange={(value) => handleSizeChange(row.id, value)}
                    />
                  </td>
                  {NumbertoWordsCOL &&
                    <td className="size-in-words">
                      <NumberToWords value={row.size} />
                    </td>
                  }
                  <AnimatedColumn keyName={`percent-${row.id}`}>
                    <Percentage
                      value={row.percentage}
                      onChange={(value) => handlePercentageChange(row.id, value)} />
                  </AnimatedColumn>

                  <AnimatedColumn keyName={`sizeofSAM-${row.id}`}>
                    <SizeofSAM
                      value={row.sizeofSAM}
                    />
                  </AnimatedColumn>


                </tr>
              ))}
            </tbody>
          </table>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="button-container">
            <button className="add-button" onClick={handleAddRow}>ADD CUSTOMER SEGMENT</button>
            {!hideSaveDetailsButton && <button className="save-button" onClick={handleSaveDetails}>SAVE DETAILS</button>}
            {showshowCalSAMBTN && <PopUp keyName='CalSAMBTN'> <button className="save-button" onClick={handleCalSAM}>CALCULATE SAM</button></PopUp>}
          </div>
          {hideTotalSum && SAM !== 0 && (
            <div className="total-size-container">
              {/* <span className="total-size-clear-icon" onClick={handleClearTotal}>x</span> */}
              <span className="total-size-words"><NumberToWords value={SAM.toString()} /></span>
              <input
                type="text"
                value={SAM}
                readOnly
                className="total-size-field"
              />
            </div>
          )}
          {!hideTotalSum && totalSize !== null && (
            <div className="total-size-container">
              {/* <span className="total-size-clear-icon" onClick={handleClearTotal}>x</span> */}
              <span className="total-size-words"><NumberToWords value={totalSize.toString()} /></span>
              <input
                type="text"
                value={totalSize}
                readOnly
                className="total-size-field"
              />
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default TableComponent;
