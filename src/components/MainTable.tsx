import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { debounce } from 'lodash';
import CustomerSegment from './CustomerSegmentCell';
import Size from './SizeCell';
import NumberToWords from './NumberToWords';
import TransitionWrapper from './TransitionWrapper'; // Import TransitionWrapper
import '../css/MainTable.css';
import Percentage from './PercentageCell';
import SizeofSAM from './SizeofSAM';
import { motion, AnimatePresence } from 'framer-motion';

interface TableComponentProps {
  hideTotalSum?: boolean; // Add prop to conditionally hide total sum
  headingText?: string;
  hideSaveDetailsButton?: boolean;
  NumbertoWordsCOL?: boolean;
  PercentageConvCOL?: boolean;
  SizeofSAMCOL?: boolean;
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


const TableComponent = ({ hideTotalSum, headingText, hideSaveDetailsButton, NumbertoWordsCOL, PercentageConvCOL, SizeofSAMCOL }: TableComponentProps) => {
  const [rows, setRows] = useState([
    { id: 1, customerSegment: '', size: '', percentage: '', sizeofSAM: '' },
    { id: 2, customerSegment: '', size: '', percentage: '', sizeofSAM: '' },
    { id: 3, customerSegment: '', size: '', percentage: '', sizeofSAM: '' },
  ]);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalSize, setTotalSize] = useState<number | null>(null);
  const [showNext, setShowNext] = useState(false);
  const [showText, setShowText] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedRows = localStorage.getItem('rows');
    const storedTotalSize = localStorage.getItem('TAM');

    if (storedRows) {
      setRows(JSON.parse(storedRows));
    }
    if (storedTotalSize) {
      setTotalSize(parseInt(storedTotalSize, 10));
    }
  }, []);

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
    setShowNext(true); // Show Next button when details are saved
  };

  const handleClearTotal = () => {
    setTotalSize(null);
    localStorage.removeItem('TAM');
    localStorage.removeItem('rows');
    setShowNext(false); // Hide Next button when total is cleared
  };

  const handleNext = () => {
    const image = document.querySelector('.image-container');
    if (image) {
      image.classList.add('show-image');
    }
    setTimeout(() => {
      setShowText(true); // Show text after image transition
    }, 2500);
  };

  const navigateToNextPage = () => {
    navigate('/Biz-Sim-V2/towards-sam'); // Navigate to the next page after transitions
  };

  return (
    <div className="table-container">
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
        {/* TODO: transition from Save details button th next screen after delay and not on click "NEXT button" */}
        {showNext && (
          <TransitionWrapper delays={[0, 2500, 5000]}>
            {(visibleStates) => (
              <>
                <button
                  className={`next-button ${visibleStates[2] ? 'visible' : ''}`}
                  onClick={() => {
                    handleNext();
                    setTimeout(navigateToNextPage, 5000); // Navigate after transition
                  }}
                >
                  NEXT
                </button>
              </>
            )}
          </TransitionWrapper>
        )}
      </div>
      {!hideTotalSum && totalSize !== null && (
        <div className="total-size-container">
          <span className="total-size-clear-icon" onClick={handleClearTotal}>x</span>
          <span className="total-size-words"><NumberToWords value={totalSize.toString()} /></span>
          <input
            type="text"
            value={totalSize}
            readOnly
            className="total-size-field"
          />
        </div>
      )}
      <div className="image-container">
        <img src="src/assets/img/tam-icon.png" alt="img" className="transition-image" />
        {showText && <span className="transition-text">Total Addressable Market</span>}
      </div>
    </div>
  );
};

export default TableComponent;
